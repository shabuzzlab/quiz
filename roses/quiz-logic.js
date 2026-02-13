// QUIZ LOGIC
let currentQuestion = 0;
let scores = {
    red: 0,
    pink: 0,
    white: 0,
    yellow: 0,
    orange: 0,
    lavender: 0
};
let selectedAnswer = null;
let currentLanguage = detectDefaultLanguage(); // Auto-detect on load

// AUTO-DETECT DEFAULT LANGUAGE
function detectDefaultLanguage() {
    // Method 1: Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('th')) {
        return 'th';
    }
    
    // Method 2: Check timezone (Thailand uses Asia/Bangkok)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Asia/Bangkok') {
        return 'th';
    }
    
    // Default to English
    return 'en';
}

// INITIALIZE LANGUAGE ON PAGE LOAD
window.addEventListener('DOMContentLoaded', function() {
    try {
        // Set correct button state
        const langEnBtn = document.getElementById('langEn');
        const langThBtn = document.getElementById('langTh');
        
        if (langEnBtn && langThBtn) {
            langEnBtn.classList.toggle('active', currentLanguage === 'en');
            langThBtn.classList.toggle('active', currentLanguage === 'th');
            
            // Update intro screen to match detected language
            updateIntroScreen();
        }
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// LANGUAGE SWITCHING
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update button states
    document.getElementById('langEn').classList.toggle('active', lang === 'en');
    document.getElementById('langTh').classList.toggle('active', lang === 'th');
    
    // Update content based on current screen
    if (!document.getElementById('introScreen').classList.contains('hidden')) {
        updateIntroScreen();
    } else if (document.getElementById('quizScreen').style.display === 'block') {
        showQuestion();
    } else if (document.getElementById('resultsScreen').style.display === 'block') {
        showResults();
    }
}

// UPDATE INTRO SCREEN
function updateIntroScreen() {
    if (currentLanguage === 'th') {
        document.querySelector('.intro-screen h1').textContent = thaiTranslations.intro.title;
        const paragraphs = document.querySelectorAll('.intro-screen p');
        paragraphs[0].innerHTML = thaiTranslations.intro.subtitle1;
        paragraphs[1].textContent = thaiTranslations.intro.subtitle2;
        document.querySelector('.science-note').innerHTML = thaiTranslations.intro.scienceNote;
        document.querySelector('.intro-screen .btn').textContent = thaiTranslations.intro.startButton;
    } else {
        document.querySelector('.intro-screen h1').textContent = "What Rose Color Are You? 🌹";
        const paragraphs = document.querySelectorAll('.intro-screen p');
        paragraphs[0].innerHTML = "<strong>Finally know what your personality actually means.</strong>";
        paragraphs[1].textContent = "This isn't another random quiz — it's backed by color psychology and neuroscience. In 2 minutes, discover your true rose color and what it reveals about how you love, lead, and live.";
        document.querySelector('.science-note').innerHTML = `
            <strong>✨ Here's what you'll get:</strong><br>
            • Your unique personality breakdown (energy, empathy, creativity)<br>
            • Science-backed insights you can actually use<br>
            • Compare with your partner (the fun part 😏)<br>
            • A shareable result your friends will screenshot
        `;
        document.querySelector('.intro-screen .btn').textContent = "Take the Quiz (2 min) 💝";
    }
}

// START QUIZ
function startQuiz() {
    document.getElementById('introScreen').classList.add('hidden');
    document.getElementById('quizScreen').style.display = 'block';
    currentQuestion = 0;
    scores = { red: 0, pink: 0, white: 0, yellow: 0, orange: 0, lavender: 0 };
    showQuestion();
}

// SHOW CURRENT QUESTION
function showQuestion() {
    const question = currentLanguage === 'th' 
        ? thaiTranslations.questions[currentQuestion]
        : quizData[currentQuestion];
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Update question number and text
    const questionPrefix = currentLanguage === 'th' 
        ? `${thaiTranslations.quiz.questionPrefix} ${currentQuestion + 1} ${thaiTranslations.quiz.of} ${quizData.length}`
        : `Question ${currentQuestion + 1} of ${quizData.length}`;
    document.getElementById('questionNumber').textContent = questionPrefix;
    document.getElementById('questionText').textContent = question.question;
    
    // Clear and populate options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = currentLanguage === 'th' ? option : option.text;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update next button text
    const nextBtnText = currentLanguage === 'th' ? thaiTranslations.quiz.nextButton : 'Next Question →';
    document.getElementById('nextBtn').textContent = nextBtnText;
    
    // Hide next button
    document.getElementById('nextBtn').style.display = 'none';
    selectedAnswer = null;
}

// SELECT OPTION
function selectOption(index) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Mark new selection
    document.querySelectorAll('.option')[index].classList.add('selected');
    
    // Store selection
    selectedAnswer = index;
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'block';
}

// NEXT QUESTION
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Add scores from selected answer
    const selectedOption = quizData[currentQuestion].options[selectedAnswer];
    for (let color in selectedOption.scores) {
        scores[color] += selectedOption.scores[color];
    }
    
    // Move to next question or show results
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// CALCULATE RESULT
function calculateResult() {
    let maxScore = 0;
    let resultColor = 'red';
    
    for (let color in scores) {
        if (scores[color] > maxScore) {
            maxScore = scores[color];
            resultColor = color;
        }
    }
    
    return resultColor;
}

// CALCULATE TRAIT PERCENTAGES FROM SCORES
function calculateTraitPercentages() {
    // Base calculations from Big 5 personality mapping
    // Energy = extroversion indicators
    // Empathy = agreeableness indicators  
    // Logic = conscientiousness indicators
    // Creativity = openness indicators
    
    const totalPossible = quizData.length * 3; // Max score per color
    
    // Energy: Red + Orange scores (action-oriented)
    const energyRaw = scores.red + scores.orange;
    const energy = Math.min(95, Math.max(50, Math.round((energyRaw / (totalPossible * 0.5)) * 100)));
    
    // Empathy: Pink score (empathy-focused)
    const empathyRaw = scores.pink;
    const empathy = Math.min(95, Math.max(50, Math.round((empathyRaw / (totalPossible * 0.25)) * 100)));
    
    // Logic: White score (analytical)
    const logicRaw = scores.white;
    const logic = Math.min(95, Math.max(50, Math.round((logicRaw / (totalPossible * 0.25)) * 100)));
    
    // Creativity: Yellow + Lavender scores (creative/imaginative)
    const creativityRaw = scores.yellow + scores.lavender;
    const creativity = Math.min(95, Math.max(50, Math.round((creativityRaw / (totalPossible * 0.5)) * 100)));
    
    return [
        { name: "Energy Level", value: energy },
        { name: "Empathy", value: empathy },
        { name: "Logic", value: logic },
        { name: "Creativity", value: creativity }
    ];
}

// SHOW RESULTS
function showResults() {
    console.log('showResults called'); // DEBUG
    
    const resultColor = calculateResult();
    console.log('Result color:', resultColor); // DEBUG
    console.log('Scores:', scores); // DEBUG
    
    // Calculate dynamic trait percentages
    const calculatedTraits = calculateTraitPercentages();
    console.log('Calculated traits:', calculatedTraits); // DEBUG
    
    const result = currentLanguage === 'th' 
        ? {
            emoji: roseResults[resultColor].emoji,
            color: roseResults[resultColor].color,
            title: thaiTranslations.roses[resultColor].title,
            subtitle: thaiTranslations.roses[resultColor].subtitle,
            science: thaiTranslations.roses[resultColor].science,
            traits: calculatedTraits, // Use calculated instead of fixed
            realLife: thaiTranslations.roses[resultColor].realLife
        }
        : {
            ...roseResults[resultColor],
            traits: calculatedTraits // Use calculated instead of fixed
        };
    
    console.log('Result object:', result); // DEBUG
    
    // Hide quiz screen
    document.getElementById('quizScreen').style.display = 'none';
    
    // Show results screen
    const resultsScreen = document.getElementById('resultsScreen');
    resultsScreen.style.display = 'block';
    
    // Update section titles if Thai
    if (currentLanguage === 'th') {
        console.log('Updating to Thai...'); // DEBUG
        const scienceTitle = document.querySelector('#resultsScreen .result-section:nth-of-type(1) h3');
        const traitsTitle = document.querySelector('#resultsScreen .result-section:nth-of-type(2) h3');
        const realLifeTitle = document.querySelector('#resultsScreen .result-section:nth-of-type(3) h3');
        const compatibilityTitle = document.querySelector('#compatibilitySection h3');
        const compatibilitySubtitle = document.querySelector('#compatibilitySection p');
        const partnerTitle = document.querySelector('.share-section h3');
        const partnerSubtitle = document.querySelector('.share-section p');
        
        console.log('Thai elements found:', {scienceTitle, traitsTitle, realLifeTitle, compatibilityTitle}); // DEBUG
        
        if (scienceTitle) scienceTitle.textContent = thaiTranslations.results.scienceTitle;
        if (traitsTitle) traitsTitle.textContent = thaiTranslations.results.traitsTitle;
        if (realLifeTitle) realLifeTitle.textContent = thaiTranslations.results.realLifeTitle;
        if (compatibilityTitle) compatibilityTitle.textContent = thaiTranslations.results.compatibilityTitle;
        if (compatibilitySubtitle) compatibilitySubtitle.textContent = thaiTranslations.results.compatibilitySubtitle;
        if (partnerTitle) partnerTitle.textContent = thaiTranslations.results.partnerTitle;
        if (partnerSubtitle) partnerSubtitle.textContent = thaiTranslations.results.partnerSubtitle;
        
        // Update share buttons - Keep in English for clarity
        const btnInstagram = document.querySelector('.share-instagram');
        const btnTikTok = document.querySelector('.share-tiktok');
        const btnTwitter = document.querySelector('.share-twitter');
        const btnFacebook = document.querySelector('.share-facebook');
        const btnWhatsApp = document.querySelector('.share-whatsapp');
        const btnCopy = document.querySelector('.share-copy');
        
        if (btnInstagram) btnInstagram.textContent = "📸 Instagram Story";
        if (btnTikTok) btnTikTok.textContent = "🎵 TikTok";
        if (btnTwitter) btnTwitter.textContent = "𝕏 Tweet";
        if (btnFacebook) btnFacebook.textContent = "📘 Facebook";
        if (btnWhatsApp) btnWhatsApp.textContent = "💬 WhatsApp";
        if (btnCopy) btnCopy.textContent = "🔗 Copy Link";
        
        // Update restart button
        document.querySelector('.results-screen > .btn').textContent = thaiTranslations.results.retakeButton;
        
        // Update branding
        document.querySelector('.branding').innerHTML = `
            ${thaiTranslations.results.branding} <a href="https://shabuzz.com" target="_blank">shabuzzlab</a><br>
            ${thaiTranslations.results.brandingTagline}
        `;
    } else {
        const scienceTitle = document.querySelector('#resultsScreen .result-section:nth-of-type(1) h3');
        const traitsTitle = document.querySelector('#resultsScreen .result-section:nth-of-type(2) h3');
        const realLifeTitle = document.querySelector('#resultsScreen .result-section:nth-of-type(3) h3');
        const compatibilityTitle = document.querySelector('#compatibilitySection h3');
        const compatibilitySubtitle = document.querySelector('#compatibilitySection p');
        const partnerTitle = document.querySelector('.share-section h3');
        const partnerSubtitle = document.querySelector('.share-section p');
        
        if (scienceTitle) scienceTitle.textContent = "🔬 Why This Matters";
        if (traitsTitle) traitsTitle.textContent = "💫 Your Superpowers";
        if (realLifeTitle) realLifeTitle.textContent = "❤️ What This Means IRL";
        if (compatibilityTitle) compatibilityTitle.textContent = "💕 Which Rose Matches Yours?";
        if (compatibilitySubtitle) compatibilitySubtitle.textContent = "Send the quiz to your partner and find your compatibility!";
        if (partnerTitle) partnerTitle.textContent = "🔥 Challenge Your Partner";
        if (partnerSubtitle) partnerSubtitle.textContent = "Share your result and see if you're compatible (or totally opposite 😂)";
        
        const btnInstagram = document.querySelector('.share-instagram');
        const btnTikTok = document.querySelector('.share-tiktok');
        const btnTwitter = document.querySelector('.share-twitter');
        const btnFacebook = document.querySelector('.share-facebook');
        const btnWhatsApp = document.querySelector('.share-whatsapp');
        const btnCopy = document.querySelector('.share-copy');
        const btnRetake = document.querySelector('.results-screen > .btn');
        const branding = document.querySelector('.branding');
        
        if (btnInstagram) btnInstagram.textContent = "📸 Instagram Story";
        if (btnTikTok) btnTikTok.textContent = "🎵 TikTok";
        if (btnTwitter) btnTwitter.textContent = "𝕏 Tweet";
        if (btnFacebook) btnFacebook.textContent = "📘 Facebook";
        if (btnWhatsApp) btnWhatsApp.textContent = "💬 WhatsApp";
        if (btnCopy) btnCopy.textContent = "🔗 Copy Link";
        if (btnRetake) btnRetake.textContent = "Retake Quiz 🔄";
        
        if (branding) {
            branding.innerHTML = `
                🍲 Cooked up by <a href="https://shabuzz.com" target="_blank">shabuzzlab</a><br>
                We make tech startups go viral
            `;
        }
    }
    
    // Populate results
    document.getElementById('roseEmoji').textContent = result.emoji;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultTitle').style.color = result.color;
    document.getElementById('resultSubtitle').textContent = result.subtitle;
    document.getElementById('scienceExplanation').textContent = result.science;
    
    // Populate traits
    const traitsContainer = document.getElementById('traitsContainer');
    traitsContainer.innerHTML = '';
    
    const traitNames = currentLanguage === 'th' 
        ? [thaiTranslations.results.traitEnergy, thaiTranslations.results.traitEmpathy, 
           thaiTranslations.results.traitLogic, thaiTranslations.results.traitCreativity]
        : null;
    
    result.traits.forEach((trait, index) => {
        const traitDiv = document.createElement('div');
        traitDiv.className = 'trait';
        const traitName = traitNames ? traitNames[index] : trait.name;
        traitDiv.innerHTML = `
            <div class="trait-label">
                <span>${traitName}</span>
                <span>${trait.value}%</span>
            </div>
            <div class="trait-bar">
                <div class="trait-fill" style="width: 0%; background: ${result.color};" data-width="${trait.value}"></div>
            </div>
        `;
        traitsContainer.appendChild(traitDiv);
    });
    
    // Animate trait bars
    setTimeout(() => {
        document.querySelectorAll('.trait-fill').forEach(fill => {
            fill.style.width = fill.dataset.width + '%';
        });
    }, 100);
    
    // Populate real life traits
    const realLifeList = document.getElementById('realLifeTraits');
    realLifeList.innerHTML = '';
    result.realLife.forEach(trait => {
        const li = document.createElement('li');
        li.textContent = trait;
        realLifeList.appendChild(li);
    });
    
    // Populate compatibility grid
    showCompatibilityGrid(resultColor);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// SHOW COMPATIBILITY GRID
function showCompatibilityGrid(userColor) {
    const compat = roseCompatibility[userColor];
    const grid = document.getElementById('compatibilityGrid');
    grid.className = 'compatibility-grid';
    grid.innerHTML = '';
    
    // Get all roses sorted by match quality
    const allRoses = [
        ...compat.perfect.map(c => ({color: c, level: 'perfect'})),
        ...compat.great.map(c => ({color: c, level: 'great'})),
        ...compat.good.map(c => ({color: c, level: 'good'}))
    ];
    
    // Show top 4 matches
    allRoses.slice(0, 4).forEach(match => {
        const card = document.createElement('div');
        card.className = `compatibility-card ${match.level}`;
        
        const emoji = roseResults[match.color].emoji;
        const name = roseResults[match.color].title;
        const description = compat.descriptions[match.color];
        
        card.innerHTML = `
            <div class="compatibility-emoji">${emoji}</div>
            <div class="compatibility-name">${name}</div>
            <div class="compatibility-match">${description}</div>
        `;
        
        grid.appendChild(card);
    });
}

// SHARE FUNCTIONS
function shareInstagram() {
    // Copy link
    const url = 'https://quiz.shabuzz.com/roses';
    navigator.clipboard.writeText(url);
    
    // Show instruction modal
    showShareInstructions('Instagram Story', [
        '1. Screenshot your result above 📸',
        '2. Open Instagram app',
        '3. Create a new Story',
        '4. Upload the screenshot',
        '5. Add link sticker (swipe up)',
        '6. Paste: ' + url
    ]);
}

function shareTikTok() {
    // Copy link
    const url = 'https://quiz.shabuzz.com/roses';
    navigator.clipboard.writeText(url);
    
    // Show instruction modal
    showShareInstructions('TikTok', [
        '1. Screenshot your result above 📸',
        '2. Open TikTok app',
        '3. Create a video about your rose color',
        '4. Add the screenshot to your video',
        '5. In caption, paste: ' + url,
        '6. Use hashtags: #RoseQuiz #PersonalityTest'
    ]);
}

function showShareInstructions(platform, steps) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    // Create modal content
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    // Build instructions HTML - use div instead of ol to avoid double numbering
    const stepsHTML = steps.map(step => `<div style="margin: 10px 0; line-height: 1.6; color: #2C1810;">${step}</div>`).join('');
    
    content.innerHTML = `
        <h3 style="color: #C41E3A; margin-bottom: 15px; font-size: 1.5rem;">
            📱 Share to ${platform}
        </h3>
        <p style="color: #6B4E4E; margin-bottom: 20px; background: #FFF5F5; padding: 10px; border-radius: 8px;">
            ✅ Link copied to clipboard!
        </p>
        <div style="margin: 20px 0;">
            ${stepsHTML}
        </div>
        <button onclick="this.closest('div[style*=fixed]').remove()" 
                style="width: 100%; padding: 15px; background: linear-gradient(135deg, #C41E3A 0%, #E0527D 100%); 
                       color: white; border: none; border-radius: 50px; font-size: 1.1rem; cursor: pointer; 
                       font-family: Georgia, serif; margin-top: 20px;">
            Got it! 👍
        </button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function shareTwitter() {
    const resultColor = calculateResult();
    const result = roseResults[resultColor];
    const text = `I'm a ${result.title} ${result.emoji}\n\n${result.subtitle}\n\nWhat rose color are you? Take the quiz:`;
    const url = 'https://quiz.shabuzz.com/roses';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareFacebook() {
    const url = 'https://quiz.shabuzz.com/roses';
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareWhatsApp() {
    const resultColor = calculateResult();
    const result = roseResults[resultColor];
    const text = `I'm a ${result.title} ${result.emoji}\n\n${result.subtitle}\n\nWhat rose color are you? Take the quiz: https://quiz.shabuzz.com/roses`;
    
    // Use Web Share API if available (better for mobile)
    if (navigator.share) {
        navigator.share({
            title: 'What Rose Color Are You?',
            text: text,
            url: 'https://quiz.shabuzz.com/roses'
        }).catch(() => {
            // Fallback to WhatsApp direct
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        });
    } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
}

function copyLink() {
    const url = 'https://quiz.shabuzz.com/roses';
    navigator.clipboard.writeText(url).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// RESTART QUIZ
function restartQuiz() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('introScreen').classList.remove('hidden');
    currentQuestion = 0;
    scores = { red: 0, pink: 0, white: 0, yellow: 0, orange: 0, lavender: 0 };
    window.scrollTo(0, 0);
}

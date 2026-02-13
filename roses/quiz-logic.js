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

// SHOW RESULTS
function showResults() {
    console.log('showResults called'); // DEBUG
    
    const resultColor = calculateResult();
    console.log('Result color:', resultColor); // DEBUG
    
    const result = currentLanguage === 'th' 
        ? {
            emoji: roseResults[resultColor].emoji,
            color: roseResults[resultColor].color,
            title: thaiTranslations.roses[resultColor].title,
            subtitle: thaiTranslations.roses[resultColor].subtitle,
            science: thaiTranslations.roses[resultColor].science,
            traits: roseResults[resultColor].traits,
            realLife: thaiTranslations.roses[resultColor].realLife
        }
        : roseResults[resultColor];
    
    console.log('Result object:', result); // DEBUG
    
    // Hide quiz screen
    document.getElementById('quizScreen').style.display = 'none';
    
    // Show results screen
    const resultsScreen = document.getElementById('resultsScreen');
    resultsScreen.style.display = 'block';
    
    // Update section titles if Thai
    if (currentLanguage === 'th') {
        document.querySelector('#resultsScreen .result-section:nth-of-type(1) h3').textContent = thaiTranslations.results.scienceTitle;
        document.querySelector('#resultsScreen .result-section:nth-of-type(2) h3').textContent = thaiTranslations.results.traitsTitle;
        document.querySelector('#resultsScreen .result-section:nth-of-type(3) h3').textContent = thaiTranslations.results.realLifeTitle;
        document.querySelector('.share-section h3').textContent = thaiTranslations.results.partnerTitle;
        document.querySelector('.share-section p').textContent = thaiTranslations.results.partnerSubtitle;
        
        // Update share buttons
        document.querySelector('.share-instagram').textContent = "📸 Instagram Story";
        document.querySelector('.share-tiktok').textContent = "🎵 TikTok";
        document.querySelector('.share-twitter').textContent = thaiTranslations.results.shareTwitter;
        document.querySelector('.share-facebook').textContent = "📘 Facebook";
        document.querySelector('.share-whatsapp').textContent = thaiTranslations.results.shareWhatsApp;
        document.querySelector('.share-copy').textContent = thaiTranslations.results.shareCopy;
        
        // Update restart button
        document.querySelector('.results-screen > .btn').textContent = thaiTranslations.results.retakeButton;
        
        // Update branding
        document.querySelector('.branding').innerHTML = `
            ${thaiTranslations.results.branding} <a href="https://shabuzz.com" target="_blank">shabuzzlab</a><br>
            ${thaiTranslations.results.brandingTagline}
        `;
    } else {
        document.querySelector('#resultsScreen .result-section:nth-of-type(1) h3').textContent = "🔬 Why This Matters";
        document.querySelector('#resultsScreen .result-section:nth-of-type(2) h3').textContent = "💫 Your Superpowers";
        document.querySelector('#resultsScreen .result-section:nth-of-type(3) h3').textContent = "❤️ What This Means IRL";
        document.querySelector('.share-section h3').textContent = "🔥 Challenge Your Partner";
        document.querySelector('.share-section p').textContent = "Share your result and see if you're compatible (or totally opposite 😂)";
        
        document.querySelector('.share-instagram').textContent = "📸 Instagram Story";
        document.querySelector('.share-tiktok').textContent = "🎵 TikTok";
        document.querySelector('.share-twitter').textContent = "𝕏 Tweet";
        document.querySelector('.share-facebook').textContent = "📘 Facebook";
        document.querySelector('.share-whatsapp').textContent = "💬 WhatsApp";
        document.querySelector('.share-copy').textContent = "🔗 Copy Link";
        
        document.querySelector('.results-screen > .btn').textContent = "Retake Quiz 🔄";
        
        document.querySelector('.branding').innerHTML = `
            🍲 Cooked up by <a href="https://shabuzz.com" target="_blank">shabuzzlab</a><br>
            We make tech startups go viral
        `;
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
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// SHARE FUNCTIONS
function shareInstagram() {
    // Instagram doesn't support direct web sharing with text
    // Copy link and prompt user to share to IG Story
    const url = 'https://quiz.shabuzz.com/roses';
    navigator.clipboard.writeText(url).then(() => {
        alert('✅ Link copied!\n\nNow:\n1. Open Instagram\n2. Create a Story\n3. Add text/sticker\n4. Paste the link\n\nPro tip: Screenshot your result first! 📸');
    });
}

function shareTikTok() {
    // TikTok doesn't support direct web sharing
    // Copy link and prompt user
    const url = 'https://quiz.shabuzz.com/roses';
    navigator.clipboard.writeText(url).then(() => {
        alert('✅ Link copied!\n\nNow:\n1. Open TikTok\n2. Create a video about your result\n3. Paste link in caption or bio\n\n🔥 Make it go viral!');
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

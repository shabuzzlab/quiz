// QUIZ DATA - 12 Science-Backed Questions
const quizData = [
    {
        question: "Friday night plans: You're most likely to...",
        options: [
            { text: "Host or attend a lively party with lots of people", scores: { red: 3, orange: 2 } },
            { text: "Have an intimate dinner with your closest friends", scores: { pink: 3, lavender: 1 } },
            { text: "Work on a personal project or learn something new", scores: { white: 3, yellow: 1 } },
            { text: "Try something spontaneous and completely different", scores: { yellow: 3, orange: 2 } },
            { text: "Enjoy quiet time with a book or creative hobby", scores: { lavender: 3, white: 1 } }
        ]
    },
    {
        question: "When making an important decision, you...",
        options: [
            { text: "Trust your gut and decide quickly", scores: { red: 3, orange: 2 } },
            { text: "Consider how it affects people you care about first", scores: { pink: 3 } },
            { text: "Research thoroughly and weigh all options logically", scores: { white: 3 } },
            { text: "See it as an exciting opportunity for growth", scores: { yellow: 3, orange: 1 } },
            { text: "Take time to reflect on deeper meaning and alignment", scores: { lavender: 3, white: 1 } }
        ]
    },
    {
        question: "Under pressure or stress, you tend to...",
        options: [
            { text: "Take charge and solve the problem head-on", scores: { red: 3, white: 1 } },
            { text: "Reach out to friends or loved ones for support", scores: { pink: 3 } },
            { text: "Create a detailed plan and work through it systematically", scores: { white: 3 } },
            { text: "Find a creative or unconventional solution", scores: { yellow: 3, orange: 2 } },
            { text: "Need time alone to process and recharge", scores: { lavender: 3, white: 1 } }
        ]
    },
    {
        question: "At a social gathering, people would describe you as...",
        options: [
            { text: "The energetic one who gets everyone excited", scores: { red: 3, orange: 2 } },
            { text: "The caring listener who makes everyone feel heard", scores: { pink: 3 } },
            { text: "The interesting conversationalist with deep insights", scores: { white: 2, lavender: 2 } },
            { text: "The creative one with unique ideas and stories", scores: { yellow: 3, lavender: 1 } },
            { text: "The thoughtful observer who chimes in meaningfully", scores: { lavender: 3, white: 1 } }
        ]
    },
    {
        question: "Your ideal way to show love is through...",
        options: [
            { text: "Taking action and making things happen for them", scores: { red: 3 } },
            { text: "Quality time and emotional connection", scores: { pink: 3 } },
            { text: "Thoughtful gestures that show you pay attention", scores: { white: 2, pink: 2 } },
            { text: "Surprising them with creative, fun experiences", scores: { yellow: 3, orange: 2 } },
            { text: "Deep conversations and understanding them fully", scores: { lavender: 3, pink: 1 } }
        ]
    },
    {
        question: "When starting a new project, you...",
        options: [
            { text: "Jump in immediately with high energy", scores: { red: 3, orange: 2 } },
            { text: "Think about how it will help or impact others", scores: { pink: 3 } },
            { text: "Plan every detail before beginning", scores: { white: 3 } },
            { text: "Get excited about the creative possibilities", scores: { yellow: 3, orange: 1 } },
            { text: "Consider the deeper purpose and meaning", scores: { lavender: 3 } }
        ]
    },
    {
        question: "Your friends come to you when they need...",
        options: [
            { text: "Someone to motivate them and push them forward", scores: { red: 3, orange: 1 } },
            { text: "Emotional support and a shoulder to lean on", scores: { pink: 3 } },
            { text: "Logical advice and problem-solving help", scores: { white: 3 } },
            { text: "Fresh perspectives and creative solutions", scores: { yellow: 3 } },
            { text: "Deep understanding and meaningful conversation", scores: { lavender: 3, pink: 1 } }
        ]
    },
    {
        question: "In your free time, you're drawn to...",
        options: [
            { text: "Physical activities or competitive pursuits", scores: { red: 3, orange: 2 } },
            { text: "Spending quality time with loved ones", scores: { pink: 3 } },
            { text: "Learning new skills or organized hobbies", scores: { white: 3 } },
            { text: "Creative expression or trying new experiences", scores: { yellow: 3, orange: 2 } },
            { text: "Artistic pursuits or introspective activities", scores: { lavender: 3 } }
        ]
    },
    {
        question: "When someone disagrees with you, you...",
        options: [
            { text: "Stand your ground confidently", scores: { red: 3 } },
            { text: "Try to understand their perspective and find harmony", scores: { pink: 3 } },
            { text: "Present logical arguments to support your view", scores: { white: 3 } },
            { text: "Stay open-minded and curious about their ideas", scores: { yellow: 2, lavender: 2 } },
            { text: "Reflect on both viewpoints before responding", scores: { lavender: 3, white: 1 } }
        ]
    },
    {
        question: "Your energy levels are highest when...",
        options: [
            { text: "Leading a team or tackling big challenges", scores: { red: 3 } },
            { text: "Connecting deeply with people you care about", scores: { pink: 3 } },
            { text: "Solving complex problems or mastering something", scores: { white: 3 } },
            { text: "Exploring new ideas or creative projects", scores: { yellow: 3, orange: 2 } },
            { text: "Engaged in meaningful, introspective work", scores: { lavender: 3 } }
        ]
    },
    {
        question: "If you could have any superpower, it would be...",
        options: [
            { text: "Super strength or the ability to influence people", scores: { red: 3 } },
            { text: "Healing powers or the ability to feel others' emotions", scores: { pink: 3 } },
            { text: "Super intelligence or perfect memory", scores: { white: 3 } },
            { text: "Flying or teleportation (freedom and adventure)", scores: { yellow: 2, orange: 3 } },
            { text: "Mind reading or seeing the future", scores: { lavender: 3, white: 1 } }
        ]
    },
    {
        question: "The best compliment someone could give you is...",
        options: [
            { text: "You're a natural leader and so inspiring", scores: { red: 3 } },
            { text: "You're the kindest, most caring person I know", scores: { pink: 3 } },
            { text: "You're incredibly smart and capable", scores: { white: 3 } },
            { text: "You're so creative and full of great ideas", scores: { yellow: 3, orange: 1 } },
            { text: "You're unique and deeply interesting", scores: { lavender: 3 } }
        ]
    }
];

// ROSE COLOR RESULTS
const roseResults = {
    red: {
        emoji: "🌹",
        color: "#C41E3A",
        title: "RED ROSE",
        subtitle: "The Passionate Leader",
        science: "Your brain runs on high dopamine — the 'action' neurotransmitter. You score in the top 20% for extroversion and leadership traits. Research shows that people with your personality type have increased activity in the brain's reward centers, driving you to take charge and pursue goals with intensity.",
        traits: [
            { name: "Energy Level", value: 90 },
            { name: "Empathy", value: 60 },
            { name: "Logic", value: 70 },
            { name: "Creativity", value: 55 }
        ],
        realLife: [
            "You're probably the one planning Valentine's Day (not waiting for someone else)",
            "Your friends call you when they need motivation or a pep talk",
            "'Just do it' is basically your mantra",
            "Sitting still for long periods feels like torture",
            "You're energized by challenges and competition"
        ]
    },
    pink: {
        emoji: "🌸",
        color: "#FFB6C1",
        title: "PINK ROSE",
        subtitle: "The Empathetic Connector",
        science: "You have elevated oxytocin sensitivity — the 'bonding' hormone. Your personality profile shows exceptional emotional intelligence and empathy scores. Neuroscience reveals that people like you have more active mirror neurons, allowing you to naturally understand and feel what others experience.",
        traits: [
            { name: "Energy Level", value: 65 },
            { name: "Empathy", value: 95 },
            { name: "Logic", value: 70 },
            { name: "Creativity", value: 75 }
        ],
        realLife: [
            "Friends confide in you because you truly listen without judgment",
            "You can sense when someone's upset before they say anything",
            "Making others happy brings you genuine joy",
            "You remember tiny details about people that matter to them",
            "Harmony in relationships is your top priority"
        ]
    },
    white: {
        emoji: "🤍",
        color: "#FFFFFF",
        title: "WHITE ROSE",
        subtitle: "The Analytical Perfectionist",
        science: "Your brain shows high serotonin regulation, associated with systematic thinking and attention to detail. Cognitive research indicates that individuals with your profile excel at pattern recognition and logical analysis. You process information through the prefrontal cortex more than the emotional limbic system.",
        traits: [
            { name: "Energy Level", value: 70 },
            { name: "Empathy", value: 65 },
            { name: "Logic", value: 95 },
            { name: "Creativity", value: 70 }
        ],
        realLife: [
            "You need to understand how things work before accepting them",
            "Random chaos stresses you out — you love systems and order",
            "People rely on you for accurate, well-researched answers",
            "You'd rather be right than popular",
            "Your idea of romance includes thoughtful planning and precision"
        ]
    },
    yellow: {
        emoji: "💛",
        color: "#FFD700",
        title: "YELLOW ROSE",
        subtitle: "The Creative Optimist",
        science: "You have balanced dopamine and serotonin levels, creating an optimal state for creative thinking and positive emotion. Psychology studies show that people with your personality type demonstrate enhanced divergent thinking — the ability to generate creative ideas by exploring many possible solutions.",
        traits: [
            { name: "Energy Level", value: 80 },
            { name: "Empathy", value: 75 },
            { name: "Logic", value: 70 },
            { name: "Creativity", value: 95 }
        ],
        realLife: [
            "You see possibilities where others see problems",
            "Brainstorming and ideation energize you",
            "You're the friend who always has a fun, unique date idea",
            "Routine bores you — you crave novelty and variety",
            "Your optimism is contagious (even when it annoys others)"
        ]
    },
    orange: {
        emoji: "🧡",
        color: "#FF8C00",
        title: "ORANGE ROSE",
        subtitle: "The Adventurous Enthusiast",
        science: "Your neurological profile shows elevated sensation-seeking traits and high adrenaline responsiveness. Research in behavioral neuroscience demonstrates that people like you have variations in dopamine receptor genes (DRD4) that drive exploratory behavior and a need for intense experiences.",
        traits: [
            { name: "Energy Level", value: 95 },
            { name: "Empathy", value: 70 },
            { name: "Logic", value: 60 },
            { name: "Creativity", value: 85 }
        ],
        realLife: [
            "You say 'yes' to spontaneous adventures without hesitation",
            "Playing it safe feels like slowly dying inside",
            "You've probably surprised your partner with unexpected trips or activities",
            "You get bored easily and need constant stimulation",
            "Your motto: 'Life is short — make it exciting'"
        ]
    },
    lavender: {
        emoji: "💜",
        color: "#E6E6FA",
        title: "LAVENDER ROSE",
        subtitle: "The Mysterious Dreamer",
        science: "You exhibit traits associated with high openness to experience combined with introversion — a rare combination. Neuroimaging studies show that people with your profile have increased activity in the default mode network, the brain system active during introspection, imagination, and self-reflection.",
        traits: [
            { name: "Energy Level", value: 60 },
            { name: "Empathy", value: 80 },
            { name: "Logic", value: 75 },
            { name: "Creativity", value: 90 }
        ],
        realLife: [
            "You need alone time to recharge and process your thoughts",
            "People find you intriguing because you're hard to fully figure out",
            "You think deeply about life, meaning, and existence",
            "Small talk drains you — you crave meaningful conversations",
            "Your inner world is rich, complex, and endlessly fascinating"
        ]
    }
};

// ROSE COMPATIBILITY MATRIX
const roseCompatibility = {
    red: {
        perfect: ['yellow', 'pink'],
        great: ['orange', 'white'],
        good: ['lavender', 'red'],
        descriptions: {
            yellow: '🔥 Perfect Match - You bring action, they bring creativity',
            pink: '💕 Perfect Match - Your drive meets their empathy',
            orange: '⚡ Great Match - Double the energy, unstoppable together',
            white: '🎯 Great Match - Your passion + their precision = power couple',
            lavender: '✨ Good Match - Opposites attract, balance each other',
            red: '🔴 Intense - Two leaders, electric but competitive'
        }
    },
    pink: {
        perfect: ['red', 'lavender'],
        great: ['white', 'yellow'],
        good: ['orange', 'pink'],
        descriptions: {
            red: '💕 Perfect Match - They lead, you support = dream team',
            lavender: '🌙 Perfect Match - Deep emotional connection',
            white: '💫 Great Match - Your heart + their mind = balanced',
            yellow: '☀️ Great Match - Joy + care = happiness overload',
            orange: '🎢 Good Match - You ground their wild energy',
            pink: '💗 Good Match - So much love, might be too sweet'
        }
    },
    white: {
        perfect: ['lavender', 'pink'],
        great: ['red', 'yellow'],
        good: ['orange', 'white'],
        descriptions: {
            lavender: '🧠 Perfect Match - Intellectual soulmates',
            pink: '💫 Perfect Match - Logic meets empathy beautifully',
            red: '🎯 Great Match - Precision + passion = unstoppable',
            yellow: '🌟 Great Match - Structure + creativity = innovation',
            orange: '⚖️ Good Match - You plan, they improvise',
            white: '📊 Good Match - Logical duo, but needs spontaneity'
        }
    },
    yellow: {
        perfect: ['red', 'orange'],
        great: ['pink', 'white'],
        good: ['lavender', 'yellow'],
        descriptions: {
            red: '🔥 Perfect Match - Your ideas + their execution = magic',
            orange: '🎨 Perfect Match - Creative chaos in the best way',
            pink: '☀️ Great Match - Optimism + care = pure joy',
            white: '🌟 Great Match - Innovation + execution = success',
            lavender: '🌈 Good Match - Different worlds, beautiful blend',
            yellow: '⭐ Good Match - Double creativity, but needs grounding'
        }
    },
    orange: {
        perfect: ['yellow', 'red'],
        great: ['lavender', 'pink'],
        good: ['white', 'orange'],
        descriptions: {
            yellow: '🎨 Perfect Match - Adventure + creativity = legendary',
            red: '⚡ Perfect Match - Double fire, unstoppable force',
            lavender: '🌊 Great Match - You energize, they deepen',
            pink: '💗 Great Match - Wild + caring = balanced passion',
            white: '⚖️ Good Match - Spontaneity meets structure',
            orange: '🔥 Good Match - Too much adrenaline? Maybe. Fun? Definitely.'
        }
    },
    lavender: {
        perfect: ['white', 'pink'],
        great: ['yellow', 'orange'],
        good: ['red', 'lavender'],
        descriptions: {
            white: '🧠 Perfect Match - Deep thinkers, soulmate level',
            pink: '🌙 Perfect Match - Emotional understanding',
            yellow: '🌈 Great Match - You reflect, they create',
            orange: '🌊 Great Match - They bring adventure to your depth',
            red: '✨ Good Match - Complete opposites, intriguing dynamic',
            lavender: '🔮 Good Match - Beautiful but need external energy'
        }
    }
};

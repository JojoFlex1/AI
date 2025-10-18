/**
 * Offline Lessons - Works without backend/internet
 * For rural Kenya where connectivity is unreliable
 */

export interface Lesson {
  keywords: string[]
  response: string
}

export const OFFLINE_LESSONS: Lesson[] = [
  {
    keywords: ["habari", "hello", "hi", "mambo", "vipi"],
    response: "Habari yako! 👋 Niko hapa kukusaidia na English.\n\n📡 Offline Mode: Natumia saved lessons.\n\nChagua topic:\n📝 Grammar\n📚 Vocabulary\n🗣️ Pronunciation\n✍️ Writing\n\nAndika topic unayotaka!"
  },
  {
    keywords: ["grammar", "sentence", "structure"],
    response: "Sawa! Grammar ni foundation ya English. 📝\n\nSentence Structure:\nSubject + Verb + Object\n\nMfano:\n• I (subject) eat (verb) ugali (object)\n• She reads a book\n• They play football\n\nJaribu: Make a sentence about your school!\n\n💡 Tip: Anza na subject (who), then action (verb), then kitu (object)."
  },
  {
    keywords: ["past tense", "past", "yesterday", "last week", "zamani"],
    response: "Poa! Past tense ni wakati uliopita. ⏰\n\nRules:\n• Add -ed kwa regular verbs\n• Irregular verbs zinabadilika\n\nExamples:\n✅ play → played\n✅ cook → cooked\n✅ go → went (irregular!)\n✅ eat → ate (irregular!)\n\nPractice:\nYesterday I ___ to the duka (go)\n\nJibu: went! Vizuri sana! 🌟"
  },
  {
    keywords: ["present tense", "present", "now", "today"],
    response: "Sawa! Present tense ni leo, sasa hivi. 📅\n\nSimple Present:\n• I/You/We/They + verb\n• He/She/It + verb + s\n\nMfano:\n• I eat chapati\n• She eats ugali\n• They play football\n\nPresent Continuous:\n• am/is/are + verb + ing\n• I am eating\n• She is cooking\n\nJaribu: What are you doing now? (Unafanya nini sasa?)"
  },
  {
    keywords: ["future", "tomorrow", "kesho", "next week"],
    response: "Karibu! Future tense ni mambo ya kesho. 🔮\n\nWays to show future:\n1. Will + verb\n   • I will go to school\n   • She will eat\n\n2. Going to + verb\n   • I am going to study\n   • They are going to play\n\nMfano:\n• Tomorrow I will cook ugali\n• Next week we are going to Mombasa\n\nPractice: What will you do kesho?"
  },
  {
    keywords: ["vocabulary", "words", "maneno", "new words"],
    response: "Poa! Tutajifunza vocabulary. 📚\n\nKitchen Words:\n🍳 cook = kupika\n🍽️ plate = sahani\n🥄 spoon = kijiko\n🔪 knife = kisu\n🥛 cup = kikombe\n\nSchool Words:\n📖 book = kitabu\n✏️ pen = kalamu\n📝 paper = karatasi\n🪑 desk = dawati\n👨‍🏫 teacher = mwalimu\n\nMake sentence using 2 words!"
  },
  {
    keywords: ["pronunciation", "sound", "say", "read"],
    response: "Sawa! Pronunciation ni muhimu. 🗣️\n\nTips:\n1. Read aloud (soma kwa sauti)\n2. Listen and repeat\n3. Break big words:\n   • yes-ter-day\n   • to-mor-row\n   • com-pu-ter\n\nCommon mistakes:\n❌ \"t\" kama \"d\" → ✅ \"tea\" not \"dea\"\n❌ \"th\" kama \"d\" → ✅ \"the\" not \"de\"\n\nPractice: Say these slowly:\n• The teacher teaches English\n• I think this is good"
  },
  {
    keywords: ["writing", "essay", "composition", "kuandika"],
    response: "Vizuri! Essay writing tips. ✍️\n\nStructure:\n1. Introduction (utangulizi)\n   • Topic + your main idea\n\n2. Body (mwili)\n   • 2-3 paragraphs\n   • Each = one idea\n\n3. Conclusion (hitimisho)\n   • Summary + final thought\n\nTips:\n• Use connectors: First, Then, Finally\n• One idea per paragraph\n• Check spelling!\n\nTopic: \"My School\"\nStart with: \"My school is called...\""
  },
  {
    keywords: ["verb", "action", "doing word"],
    response: "Poa! Verbs ni action words. 💪\n\nCommon Verbs:\n• go → went → gone\n• eat → ate → eaten\n• see → saw → seen\n• do → did → done\n• come → came → come\n• run → ran → run\n\nTypes:\n1. Action: run, jump, eat\n2. Being: am, is, are\n3. Helping: can, will, should\n\nPractice: I ___ to school every day (go)"
  },
  {
    keywords: ["noun", "naming word", "jina"],
    response: "Sawa! Nouns ni naming words. 📛\n\nTypes:\n1. Person: teacher, student, mama\n2. Place: school, Nairobi, duka\n3. Thing: book, phone, matatu\n4. Idea: love, happiness, education\n\nSingular vs Plural:\n• book → books (add s)\n• child → children (special!)\n• person → people (special!)\n\nMake 3 sentences using different nouns!"
  },
  {
    keywords: ["adjective", "describing", "describe"],
    response: "Karibu! Adjectives describe nouns. 🎨\n\nExamples:\n• big school\n• hot ugali\n• beautiful Nairobi\n• fast matatu\n• happy student\n\nPosition:\n1. Before noun: \"big house\"\n2. After 'be': \"The house is big\"\n\nComparisons:\n• big → bigger → biggest\n• good → better → best\n• beautiful → more beautiful → most beautiful\n\nDescribe your school using 3 adjectives!"
  },
  {
    keywords: ["question", "ask", "uliza", "how", "what", "where"],
    response: "Poa! Making questions. ❓\n\nQuestion Words:\n• What = Nini\n• Where = Wapi\n• When = Lini\n• Who = Nani\n• Why = Kwa nini\n• How = Vipi/Jinsi gani\n\nStructure:\nQuestion word + do/does/did + subject + verb?\n\nExamples:\n• What do you eat?\n• Where does she live?\n• When did they go?\n\nPractice: Ask me a question about school!"
  },
  {
    keywords: ["preposition", "in", "on", "at", "mahali"],
    response: "Sawa! Prepositions show position/place. 📍\n\nCommon ones:\n• in = ndani (in the house)\n• on = juu (on the table)\n• at = kwa/mahali (at school)\n• under = chini (under the bed)\n• between = kati (between you and me)\n• next to = karibu na\n\nTime:\n• at 5pm\n• on Monday\n• in January\n\nPlace:\n• at school\n• in Nairobi\n• on the bus\n\nMake sentence using 'at', 'on', 'in'!"
  },
  {
    keywords: ["article", "a", "an", "the"],
    response: "Vizuri! Articles ni: a, an, the. 📰\n\nRules:\n• a = before consonant sound\n  → a book, a school\n\n• an = before vowel sound\n  → an apple, an orange\n\n• the = specific thing\n  → the teacher (mwalimu fulani)\n  → a teacher (mwalimu yeyote)\n\nExamples:\n• I want a banana (any banana)\n• I want the banana (ile banana)\n\nPractice: ___ elephant is big (a/an/the?)"
  },
  {
    keywords: ["help", "nisaidie", "saidia", "stuck", "confused"],
    response: "Hakuna shida! Niko hapa kukusaidia. 🤝\n\n📡 Offline Mode active.\n\nWhat do you need help with?\n📝 Grammar rules\n📚 Vocabulary\n🗣️ Pronunciation\n✍️ Writing\n⏰ Tenses (past/present/future)\n\nOr ask specific:\n• \"Nisaidie na past tense\"\n• \"Teach me new words\"\n• \"How do I write essay?\"\n\nAndika tu, nitakusaidia! 💪"
  }
]

export const PRACTICE_EXERCISES = [
  "Yesterday I ___ to the market (go → ?)",
  "She ___ ugali last night (cook → ?)",
  "They ___ football tomorrow (play → will...?)",
  "I am ___ my homework now (do → doing?)",
  "The cat ___ on the mat (is/are?)"
]

export const OFFLINE_TIPS = [
  "💡 Tip: Read English books daily - even 5 minutes helps!",
  "💡 Tip: Watch English movies with Swahili subtitles",
  "💡 Tip: Practice speaking aloud - don't be shy!",
  "💡 Tip: Write diary in English every day",
  "💡 Tip: Listen to English songs and read lyrics"
]

/**
 * Find matching lesson based on user input
 */
export function findOfflineLesson(userInput: string): string | null {
  const input = userInput.toLowerCase()
  
  for (const lesson of OFFLINE_LESSONS) {
    for (const keyword of lesson.keywords) {
      if (input.includes(keyword)) {
        return lesson.response
      }
    }
  }
  
  return null
}

/**
 * Get random practice exercise
 */
export function getRandomExercise(): string {
  return PRACTICE_EXERCISES[Math.floor(Math.random() * PRACTICE_EXERCISES.length)]
}

/**
 * Get random tip
 */
export function getRandomTip(): string {
  return OFFLINE_TIPS[Math.floor(Math.random() * OFFLINE_TIPS.length)]
}
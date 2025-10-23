# 🎓 Mwalimu AI

**Multi-Dialect Voice Tutor for Kenyan Students**

Preserving coastal heritage dialects while teaching English through culturally-relevant, voice-first education.

---

## 🌍 The Problem

**1. Language Barrier in Education**
- students struggle with English-medium instruction from Grade 4+
- Think in Swahili, forced to learn in English
- No AI tutors understand local context or dialects

**2. Dialect Endangerment**
- Heritage dialects like Kiamu (Lamu) and Kibajuni (North Coast) are disappearing
- No digital tools preserve or support these dialects
- Youth losing connection to coastal linguistic heritage

**3. Accessibility Gaps**
- Rural areas have poor connectivity
- Many students can't afford data for online learning
- Voice-first approach needed for students who struggle with typing

---

## ✨ Our Solution

**Mwalimu AI** is an intelligent English tutor that:

✅ **Speaks Multiple Dialects**
- Kiswahili Sanifu (Standard Swahili)
- Kiamu (Lamu Island dialect)
- Kibajuni (North Coast Bajuni people)
- Sheng (Urban youth slang)

✅ **Voice-First Interface**
- Speak naturally, AI understands
- Responds in your dialect
- Works for students who can't type well

✅ **Works Offline**
- Pre-loaded lessons for 15+ topics
- No internet needed for basic learning
- Perfect for rural/low-connectivity areas

✅ **Culturally Relevant**
- Uses Kenyan examples (matatu, ugali, shamba)
- Understands code-switching
- Respects and preserves dialect heritage

---

## 🎯 Key Features

### 1. Multi-Dialect Support
```
Student: "Xabari mwalim, nisaidie na grammar"  [Kiamu]
AI: "Xabari nzuri rafiye! 🏝️ Grammar ni rahisi..."

Student: "Mi nataka msaada"  [Kibajuni]
AI: "Sawa! 🌊 Kibajuni yako ni nzuri..."

Student: "Niaje msee"  [Sheng]
AI: "Mambo msee! 💬 Niko hapa kukusaidia..."
```

### 2. Dialect Detection & Acknowledgment
- Automatically detects which dialect student is using
- Responds in same dialect to show respect
- Acknowledges: "Naona unatumia Kiamu! 🏝️"

### 3. Voice Input (Web Speech API)
- Click microphone and speak
- Supports Swahili speech recognition
- No typing needed

### 4. Offline Mode
- 15+ pre-loaded English lessons
- Works without backend/internet
- Grammar, vocabulary, tenses, writing, and more

### 5. Smart Teaching
- Explains English concepts IN Swahili
- Interactive practice exercises
- Encouraging feedback (Vizuri sana! Poa!)
- Remembers conversation context

---

## 🏗️ Technical Architecture

```
┌─────────────────────────────────────────────┐
│           FRONTEND (Next.js)                │
│  • React 18 + TypeScript                    │
│  • Tailwind CSS                             │
│  • Web Speech API (voice input)            │
│  • Offline mode with pre-loaded lessons    │
└──────────────┬──────────────────────────────┘
               │
               │ HTTP/JSON
               │
┌──────────────▼──────────────────────────────┐
│          BACKEND (Flask)                    │
│  • Python 3.12                              │
│  • Flask + CORS                             │
│  • Groq API (Llama 3.1 70B)                │
│  • Dialect-aware prompting                  │
└─────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Framework: Next.js 15
- Language: TypeScript
- Styling: Tailwind CSS
- Voice: Web Speech API
- Icons: Lucide React

**Backend:**
- Framework: Flask
- Language: Python 3.12
- AI Model: Groq Llama 3.1 70B Versatile
- Libraries: groq, flask-cors, python-dotenv

**AI Approach:**
- Prompt engineering for dialect awareness
- Context-aware conversation memory
- Fast inference (<1 second response time)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (frontend)
- Python 3.8+ (backend)
- Groq API key (free at console.groq.com)

### Installation

#### 1. Clone Repository
```bash
cd mwalimu-ai
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GROQ_API_KEY=your-groq-key-here" > .env

# Run backend
python3 app.py
```

Backend will run on: `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend/mwalimu-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will open on: `http://localhost:3000`

---

## 📚 Dialect Support

### 🏝️ Kiamu (Lamu Island)
Over 50 words including:
- Greetings: xabari, rafiye, nzuri
- Food: shakulia
- Actions: nataka, ninakuya
- Teacher: mwalim

### 🌊 Kibajuni (North Coast)
Over 40 words including:
- Pronouns: mi, we, ye, si
- Time: lelo (today)
- Actions: kija (come)
- Questions: nyinyi (what)

### 💬 Sheng (Urban)
Over 60 words including:
- People: msee, mbuyu, manzi, dem
- Greetings: niaje, mambo, vipi
- Verbs: dishi, cheki, choma
- Money: ngiri, mbao, ganji

### 📖 Standard Swahili
Fully supported as base language!

---

## 🎮 Usage Examples

### Basic English Learning
```
You: "Nisaidie na past tense"
AI: "Sawa! Past tense ni wakati uliopita..."
```

### With Kiamu Dialect
```
You: "Xabari mwalim, rafiye wangu wanasema English ni ngumu"
AI: "Xabari nzuri! 🏝️ Haapana, English si ngumu..."
```

### With Kibajuni Dialect
```
You: "Mi sijui grammar ya English"
AI: "Hakuna shida! 🌊 Grammar ni rahisi tu..."
```

### With Sheng
```
You: "Niaje msee, grammar inani-confuse sana"
AI: "Mambo msee! 💬 Nitakushika point..."
```

### Offline Mode
```
[Backend offline]
You: "Help with vocabulary"
AI: "📡 OFFLINE MODE
     Leo tutajifunza kitchen words:
     🍳 cook = kupika
     🍽️ plate = sahani..."
```

---

We welcome contributions to expand dialect support!

**How to help:**
1. Add more dialect words to prompt
2. Record audio samples of your dialect
3. Test with native speakers
4. Improve documentation

---

## 📜 License

MIT License - See LICENSE file

---

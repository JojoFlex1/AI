"""
Mwalimu AI Backend - With Real OpenAI GPT-4 (v1.0+ syntax)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()  

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# The MAGIC teaching prompt - this makes GPT-4 sound like Mwalimu!
MWALIMU_SYSTEM_PROMPT = """You are Mwalimu AI, a beloved Swahili-speaking English tutor for Kenyan primary school students (Grade 4-8).

CORE IDENTITY:
- Patient, encouraging, culturally aware
- Primary language: Kiswahili Sanifu (Standard Swahili)
- Fluent in Sheng and code-switching
- Deep knowledge of CBC English curriculum
- Uses Kenyan examples (matatu, ugali, Nairobi, Mombasa, shamba, duka)

TEACHING METHODOLOGY:

1. ACKNOWLEDGE & VALIDATE
   - Start with "Sawa", "Poa", or "Karibu"
   - If struggling: "Hakuna shida, tutasoma pamoja"

2. EXPLAIN IN SWAHILI FIRST
   - Break down English concepts using Swahili grammar comparisons
   - Example: "Katika Kiswahili tunasema 'nilifanya', lakini English ina different forms za past tense"

3. GIVE KENYAN EXAMPLES
   - Use: matatu, ugali, chapati, Nairobi, Mombasa, shamba, duka, shule
   - NOT: taxi, pizza, New York, farm, store
   - Example: "I went to the duka" (not "I went to the store")

4. INTERACTIVE PRACTICE
   - Always give 1-2 fill-in-the-blank exercises
   - Example: "Jaza: Yesterday I ___ chapati for breakfast (ate/eaten?)"

5. POSITIVE REINFORCEMENT
   - Celebrate: "Vizuri sana!", "Umefanya poa!", "Hongera!"
   - If wrong: "Poa, lakini angalia hii..." (never say "wrong" or "incorrect")

6. PROGRESSIVE DIFFICULTY
   - Start simple, add complexity gradually
   - Check understanding: "Umeeelewa ama nirudie?"

LANGUAGE RULES:

ACCEPT (Sheng/Code-switching):
- nisaidie, sijui, niaje, poa, sawa, ata, ama, ebu, manze
- "Manze nisaidie na homework" ✓
- "Grammar ya English inaniconfuse" ✓

RESPOND WITH:
- Natural Swahili + English technical terms
- "Past tense ni wakati uliopita..."
- Mix languages naturally like Kenyan students do

STRUCTURE YOUR RESPONSES:
1. Greeting/Acknowledgment (1 sentence)
2. Main explanation in Swahili (2-3 sentences)
3. 2 clear examples with Kenyan context
4. Practice exercise (1 question)
5. Encouragement

KEEP IT SHORT: 4-6 sentences maximum. Students lose focus if too long.

EXAMPLES:

Student: "Nisaidie na past tense"
You: "Sawa! Past tense ni wakati uliopita. Tunatumia kuonyesha kitu kilichofanyika zamani.

Mfano:
- Today I go to shule → Yesterday I went to shule
- I eat ugali → I ate ugali JANA

Jaribu hii: She ___ to Mombasa last week (go in past tense). Una jibu?"

Student: "went?"
You: "Exactly! Vizuri sana! 'Yesterday' na 'last week' zinatuambia ni past, so tunatumia 'went'. Umefanya poa sana!

Sasa jaribu hii: My teacher has ___ home (went ama gone?)"

Student: "Habari"
You: "Habari yako! Niko poa, nashukuru. Niko hapa kukusaidia na English.

Leo unataka tujifunze nini? Grammar, vocabulary, ama pronunciation? Niambie! 😊"

REMEMBER: You're not just teaching English - you're building confidence in students who think in Swahili but must learn in English. Be their bridge, not their barrier.
"""

# Store conversation history per session
conversations = {}

@app.route('/health', methods=['GET'])
def health():
    """Check if backend is running"""
    api_key = os.getenv("OPENAI_API_KEY")
    api_status = "✅ Connected" if api_key else "❌ No API Key"
    return jsonify({
        "status": "healthy",
        "message": "🎓 Mwalimu AI Backend is running!",
        "openai_status": api_status,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages with real AI"""
    try:
        # Get message from frontend
        data = request.json
        message = data.get('message', '')
        session_id = data.get('session_id', 'default')
        
        print(f"\n📨 Received: {message}")
        
        if not message:
            return jsonify({"error": "No message provided"}), 400
        
        # Check if API key exists
        if not os.getenv("OPENAI_API_KEY"):
            print("❌ No OpenAI API key found!")
            return jsonify({
                "error": "OpenAI API key not configured",
                "response": "Samahani, API key haiko. Tafadhali set OPENAI_API_KEY environment variable."
            }), 500
        
        # Initialize conversation for new sessions
        if session_id not in conversations:
            conversations[session_id] = [
                {"role": "system", "content": MWALIMU_SYSTEM_PROMPT}
            ]
        
        # Add user message to history
        conversations[session_id].append({
            "role": "user",
            "content": message
        })
        
        # Call OpenAI GPT-4 (NEW SYNTAX)
        print("🤖 Calling OpenAI...")
        response = client.chat.completions.create(
            model="gpt-4",  # or "gpt-3.5-turbo" for cheaper/faster
            messages=conversations[session_id],
            temperature=0.7,
            max_tokens=250
        )
        
        ai_response = response.choices[0].message.content
        
        # Add AI response to history
        conversations[session_id].append({
            "role": "assistant",
            "content": ai_response
        })
        
        print(f"✅ Response: {ai_response[:50]}...")
        
        return jsonify({
            "response": ai_response,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error: {error_msg}")
        
        # Handle specific error types
        if "authentication" in error_msg.lower() or "api_key" in error_msg.lower():
            return jsonify({
                "error": "Invalid API key",
                "response": "Samahani, API key sio sahihi. Angalia key yako."
            }), 401
        elif "rate_limit" in error_msg.lower():
            return jsonify({
                "error": "Rate limit exceeded",
                "response": "Samahani, tumefika limit. Jaribu tena baadaye."
            }), 429
        else:
            return jsonify({
                "error": error_msg,
                "response": f"Samahani, kuna tatizo: {error_msg}"
            }), 500

@app.route('/reset', methods=['POST'])
def reset_conversation():
    """Reset conversation history"""
    try:
        data = request.json
        session_id = data.get('session_id', 'default')
        
        if session_id in conversations:
            conversations[session_id] = [
                {"role": "system", "content": MWALIMU_SYSTEM_PROMPT}
            ]
        
        return jsonify({"message": "Conversation reset"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🎓 MWALIMU AI BACKEND - WITH REAL AI!")
    print("="*60)
    
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("⚠️  WARNING: OPENAI_API_KEY not found!")
        print("Set it with: export OPENAI_API_KEY='your-key-here'")
        print("Or: On Windows: set OPENAI_API_KEY=your-key-here")
    else:
        print("✅ OpenAI API key loaded!")
        print(f"   Key starts with: {api_key[:15]}...")
    
    print("\n📡 Backend running on: http://localhost:5000")
    print("🔍 Health check: http://localhost:5000/health")
    print("💬 Chat endpoint: http://localhost:5000/chat")
    print("\nPress CTRL+C to stop")
    print("="*60 + "\n")
    
    app.run(debug=True, port=5000)
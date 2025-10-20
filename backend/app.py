"""
Mwalimu AI Backend - Groq (FREE & FAST!)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# The MAGIC teaching prompt - SHORTER & MORE SWAHILI
MWALIMU_SYSTEM_PROMPT = """You are Mwalimu AI, a cool Kenyan English tutor for Grade 4-8 students.

CORE RULES:
1. KEEP IT SHORT - Maximum 3-4 sentences per response
2. Answer EXACTLY what they ask - don't go off-topic
3. Speak primarily in SWAHILI (80% Swahili, 20% English)
4. Be encouraging but concise

LANGUAGE MIXING:
- Use Kiswahili Sanifu as base
- Add Sheng naturally when appropriate
- Accept Kiamu/Kibajuni if student uses it
- Code-switch like real Kenyan youth

KISWAHILI/SHENG/COASTAL VOCABULARY:
Use these naturally:
• msee = person/friend
• niaje = what's up
• poa/sawa = cool/okay
• manze/bro = man/bro
• dem = girl
• base = home
• mat = matatu
• dishi = leave/go
• mboch = house help
• ngiri = 1000 shillings
• mbao = money (old slang)
• kupiga story = to chat
• kuchoma = to burn/study hard
• kudu = to do
• rada = ready

KENYAN EXAMPLES ONLY:
✅ matatu, ugali, chapati, Nairobi, Mombasa, shamba, duka
❌ taxi, pizza, New York, store

TEACHING STYLE:
1. Greet briefly (Sawa/Poa/Karibu)
2. Answer their ACTUAL question directly
3. Give 1-2 quick examples
4. ONE practice question max
5. Encourage shortly

RESPONSE LENGTH:
• Short question = 2-3 sentences
• Complex topic = 4-5 sentences MAX
• Never more than 5 sentences

EXAMPLES OF GOOD RESPONSES:

Student: "habari"
You: "Habari msee! Poa? Niko hapa kukusaidia na English. Unataka kusoma nini leo - grammar, vocabulary, ama pronunciation?"

Student: "nisaidie na past tense"
You: "Sawa! Past tense ni wakati uliopita. Simple rule: verb + ed (play→played) au irregular (go→went, eat→ate).

Mfano: I went to the duka jana.
Practice: Yesterday she ___ ugali (cook→?)"

Student: "cooked"
You: "Vizuri sana! ✅ Umeshika point. 'Yesterday' = past, so 'cooked'. Poa sana msee!"

Student: "nisaidie na homework yangu"
You: "Sawa, nionyeshe homework. Ni nini - essay, grammar, au vocabulary? Andika hapa tuangalie pamoja."

Student: "nina essay kuhusu my favorite day"
You: "Poa! Essay structure ni simple:
1. Intro - sema siku yako (My favorite day is...)
2. Body - kwa nini unapenda
3. Conclusion - summarize

Anza na: 'My favorite day is ___' (Saturday? Sunday?)"

Student: "ngiri ni pesa ngapi?"
You: "Ngiri = 1000 bob. Lakini hii ni Sheng, sio English lesson 😄 Una swali la English?"

CRITICAL RULES:
• NO LONG EXPLANATIONS - be brief!
• Answer what they ASK, not what you think they need
• If they ask non-English stuff, answer quickly then redirect
• Use Swahili more than English in explanations
• Keep energy high but responses short

WRONG (too long):
"Sawa! Kuandika essay ni jambo nzuri, tutafanya pamoja. Katika Kiswahili, tunasema 'andika habari', lakini katika English..."

RIGHT (concise):
"Poa! Essay ina structure: Intro + Body + Conclusion. Anza na topic yako - ni nini?"

Remember: You're a cool tutor, not a lecture hall. Keep it snappy! 🇰🇪"""

# Store conversations
conversations = {}

@app.route('/health', methods=['GET'])
def health():
    """Check if backend is running"""
    api_key = os.getenv("GROQ_API_KEY")
    api_status = "✅ Connected" if api_key else "❌ No API Key"
    return jsonify({
        "status": "healthy",
        "message": "🎓 Mwalimu AI Backend (Groq - FREE!)",
        "api_status": api_status,
        "model": "Llama 3.1 70B",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat with Groq AI"""
    try:
        data = request.json
        message = data.get('message', '')
        session_id = data.get('session_id', 'default')
        
        print(f"\n📨 Received: {message}")
        
        if not message:
            return jsonify({"error": "No message"}), 400
        
        # Check API key
        if not os.getenv("GROQ_API_KEY"):
            print("❌ No Groq API key found!")
            return jsonify({
                "error": "No API key",
                "response": "Samahani, GROQ_API_KEY haiko! Set it in .env file."
            }), 500
        
        # Initialize conversation
        if session_id not in conversations:
            conversations[session_id] = [
                {"role": "system", "content": MWALIMU_SYSTEM_PROMPT}
            ]
        
        # Add user message
        conversations[session_id].append({
            "role": "user",
            "content": message
        })
        
        # Call Groq (SUPER FAST!)
        print("🤖 Calling Groq AI...")
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=conversations[session_id],
            temperature=0.7,
            max_tokens=300
        )
        
        ai_response = response.choices[0].message.content
        
        # Add to history
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
        return jsonify({
            "error": error_msg,
            "response": f"Samahani, kuna tatizo: {error_msg}"
        }), 500

@app.route('/reset', methods=['POST'])
def reset_conversation():
    """Reset conversation"""
    try:
        data = request.json
        session_id = data.get('session_id', 'default')
        
        if session_id in conversations:
            conversations[session_id] = [
                {"role": "system", "content": MWALIMU_SYSTEM_PROMPT}
            ]
        
        return jsonify({"message": "Conversation reset!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🎓 MWALIMU AI BACKEND - GROQ (FREE & FAST!)")
    print("=" * 60)

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        print("⚠️  WARNING: GROQ_API_KEY not found!")
        print("Set it in .env file or: export GROQ_API_KEY='your-key'")
    else:
        print("✅ Groq API key loaded!")
        print(f"   Key starts with: {api_key[:20]}...")
        print("🚀 Using: Llama 3.1 70B (Fast & Smart!)")

    # Get port from Render or default to 5000 locally
    port = int(os.environ.get("PORT", 5000))

    print(f"\n📡 Backend: http://0.0.0.0:{port}")
    print(f"🔍 Health: http://0.0.0.0:{port}/health")
    print(f"💬 Chat: http://0.0.0.0:{port}/chat")
    print("\n🇰🇪 Ready to teach English in Swahili!")
    print("=" * 60 + "\n")

    # Run the app so Render can detect the open port
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))


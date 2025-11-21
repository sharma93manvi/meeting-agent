from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "running", "service": "Meeting Agent Backend"})

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    transcript = data.get('transcript', '')
    
    print(f"Received transcript length: {len(transcript)}")
    
    # Simulate processing time
    time.sleep(1.5)
    
    # Simple dynamic processing to prove it's working
    word_count = len(transcript.split())
    capitalized_words = [w for w in transcript.split() if w[0].isupper()]
    
    # TODO: Replace with: 
    # summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    # summary = summarizer(transcript, max_length=130, min_length=30, do_sample=False)
    
    summary = f"Processed by Python Backend (Length: {word_count} words). Key topics mentioned: {', '.join(capitalized_words[:5])}..."
    
    tasks = [
        f"Review transcript of {word_count} words",
        "Install 'transformers' and 'torch' for real AI",
        "Run 'pip install -r server/requirements.txt'"
    ]
    
    return jsonify({
        "summary": summary,
        "tasks": tasks
    })

if __name__ == '__main__':
    print("Starting Meeting Agent Backend on http://localhost:5000")
    app.run(debug=True, port=5000)

# Meeting Agent

A Chrome Extension that listens to your meetings, transcribes them in real-time, and generates summaries with follow-up tasks.

## Tech Stack

### Core Platform
*   **Chrome Extension (Manifest V3)**: Uses the latest web extension standard for security and performance.
*   **Python Backend (Flask)**: Handles business logic, AI processing, and summarization.

### Key APIs
*   **`chrome.tabCapture`**: Captures audio streams directly from the active tab.
*   **Web Speech API**: Built-in browser API for real-time speech-to-text transcription.
*   **`chrome.storage.local`**: Local persistence for meeting history.

### User Interface
*   **Vanilla HTML/CSS/JS**: Lightweight implementation.
*   **CSS Variables**: Modern styling.

## Implementation Steps

1.  **Project Scaffold**: Set up the Manifest V3 structure.
2.  **Audio Capture**: Implemented `chrome.tabCapture` in the background script.
3.  **Transcription Engine**: Created an offscreen document for `webkitSpeechRecognition`.
4.  **Python Server**: Built a Flask server (`server/app.py`) to handle summarization requests.
5.  **Dashboard UI**: Connected the dashboard to the local Python backend.
6.  **Summarization Logic**: Implemented dynamic processing in Python.

## How to Run

See [WALKTHROUGH.md](./WALKTHROUGH.md) for detailed installation and testing instructions.

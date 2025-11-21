# Meeting Agent

A Chrome Extension that listens to your meetings, transcribes them in real-time, and generates summaries with follow-up tasks.

## Tech Stack

### Core Platform
*   **Chrome Extension (Manifest V3)**: Uses the latest web extension standard for security and performance.
*   **Service Worker**: Handles background processes and state management.

### Key APIs
*   **`chrome.tabCapture`**: Captures audio streams directly from the active tab (e.g., Google Meet, Zoom Web).
*   **Offscreen Document**: A hidden HTML page used to run DOM-dependent APIs like Web Speech, which are not available in Service Workers.
*   **Web Speech API**: Built-in browser API for real-time speech-to-text transcription (free and privacy-focused).
*   **`chrome.storage.local`**: Local persistence for meeting history and transcripts.

### User Interface
*   **Vanilla HTML/CSS/JS**: Lightweight implementation without heavy frameworks to ensure instant load times.
*   **CSS Variables**: Modern styling for a consistent, premium look.

## Implementation Steps

1.  **Project Scaffold**: Set up the Manifest V3 structure with `background`, `popup`, and `offscreen` components.
2.  **Audio Capture**: Implemented `chrome.tabCapture` in the background script to get the media stream of the active tab.
3.  **Transcription Engine**: Created an offscreen document to process the audio stream using `webkitSpeechRecognition`.
4.  **Data Persistence**: Connected the transcription output to `chrome.storage.local` to save progress in real-time.
5.  **Dashboard UI**: Built a dedicated dashboard page to view past meetings, transcripts, and summaries.
6.  **Summarization Logic**: Added a mock AI service to demonstrate how transcripts are converted into summaries and action items.

## How to Run

See [WALKTHROUGH.md](./WALKTHROUGH.md) for detailed installation and testing instructions.

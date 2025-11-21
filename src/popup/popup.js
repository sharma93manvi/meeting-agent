document.getElementById('startBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Get the stream ID for the current tab
    chrome.tabCapture.getMediaStreamId({ targetTabId: tab.id }, (streamId) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }

        // Send to background to forward to offscreen
        chrome.runtime.sendMessage({
            target: 'offscreen',
            type: 'start-recording',
            streamId: streamId
        });

        updateUI(true);
    });
});

document.getElementById('stopBtn').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        target: 'offscreen',
        type: 'stop-recording'
    });
    updateUI(false);
});

document.getElementById('dashboardBtn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'src/dashboard/dashboard.html' });
});

function updateUI(isRecording) {
    document.getElementById('startBtn').disabled = isRecording;
    document.getElementById('stopBtn').disabled = !isRecording;
}

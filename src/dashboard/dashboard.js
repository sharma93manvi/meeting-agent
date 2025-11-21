document.addEventListener('DOMContentLoaded', async () => {
    renderMeetings();
});

async function renderMeetings() {
    const data = await chrome.storage.local.get('meetings');
    const meetings = (data.meetings || []).reverse(); // Show newest first

    const list = document.getElementById('meeting-list');
    list.innerHTML = '';

    if (meetings.length === 0) {
        list.innerHTML = '<p>No meetings recorded yet.</p>';
        return;
    }

    meetings.forEach((meeting, index) => {
        const item = document.createElement('div');
        item.className = 'meeting-card';

        const date = new Date(meeting.timestamp).toLocaleString();
        const summaryHtml = meeting.summary ?
            `<div class="summary-section">
         <h4>Summary</h4>
         <p>${meeting.summary}</p>
         <h4>Tasks</h4>
         <ul>${meeting.tasks.map(t => `<li>${t}</li>`).join('')}</ul>
       </div>` :
            `<button class="btn primary generate-btn" data-index="${index}">Generate Summary</button>`;

        item.innerHTML = `
      <div class="meeting-header">
        <h3>${meeting.title || 'Meeting ' + date}</h3>
        <span class="date">${date}</span>
      </div>
      <details>
        <summary>Show Transcript</summary>
        <p class="transcript-text">${meeting.transcript || 'No transcript available.'}</p>
      </details>
      <div class="action-area" id="action-${index}">
        ${summaryHtml}
      </div>
    `;
        list.appendChild(item);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.generate-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            generateSummary(index, meetings);
        });
    });
}

async function generateSummary(index, meetings) {
    const btn = document.querySelector(`.generate-btn[data-index="${index}"]`);
    btn.textContent = "Generating...";
    btn.disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const meeting = meetings[index];
    // Mock response
    meeting.summary = "This was a productive meeting discussing the new project architecture. The team agreed to use a Chrome Extension with local storage.";
    meeting.tasks = [
        "Create the project scaffold",
        "Implement audio capture",
        "Design the dashboard UI"
    ];

    // Update storage
    // Note: We need to reverse the index back to original array or just reload
    // Since we reversed for display, let's just find it in the original data
    const originalData = await chrome.storage.local.get('meetings');
    const realIndex = originalData.meetings.length - 1 - index; // Assuming no deletions for now

    originalData.meetings[realIndex] = meeting;
    await chrome.storage.local.set({ meetings: originalData.meetings });

    renderMeetings();
}

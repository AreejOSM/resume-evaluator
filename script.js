const form = document.getElementById("evaluator-form");
const jobDescriptionInput = document.getElementById("job-description");
const customPromptInput = document.getElementById("custom-prompt");
const resumeFileInput = document.getElementById("resume-file");
const resultsArea = document.getElementById("results-area");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const jobDescriptionValue = jobDescriptionInput.value.trim();
  const customPromptValue = customPromptInput.value.trim();
  
  if (!jobDescriptionValue) {
    resultsArea.innerHTML = '<p style="color: #dc2626; font-weight: 500;">Please enter a job description.</p>';
    return;
  }

  if (resumeFileInput.files.length === 0) {
    resultsArea.innerHTML = '<p style="color: #dc2626; font-weight: 500;">Please upload a PDF resume.</p>';
    return;
  }

  const fileName = resumeFileInput.files[0].name;

  resultsArea.innerHTML = `
    <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 4px;">
      <h3 style="color: #16a34a; margin-bottom: 8px;">Analysis Started</h3>
      <p style="color: #166534; font-size: 14px;">
        Evaluating <strong>${fileName}</strong> against the job description...
      </p>
      <p style="color: #6b7280; font-size: 12px; margin-top: 8px; font-style: italic;">
        (ChatGPT integration coming in Stage 5)
      </p>
    </div>
  `;
});
const form = document.getElementById("evaluator-form");
const jobDescriptionInput = document.getElementById("job-description");
const customPromptInput = document.getElementById("custom-prompt");
const resumeFileInput = document.getElementById("resume-file");
const resultsArea = document.getElementById("results-area");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const jobDescriptionValue = jobDescriptionInput.value.trim();
  
  if (!jobDescriptionValue) {
    resultsArea.innerHTML = `
      <div class="vibrant-alert error-alert">
        <div class="alert-icon">⚠️</div>
        <div class="alert-text">
          <h4>Action Required</h4>
          <p>Please enter a job description to guide the AI.</p>
        </div>
      </div>
    `;
    return;
  }

  if (resumeFileInput.files.length === 0) {
    resultsArea.innerHTML = `
      <div class="vibrant-alert error-alert">
        <div class="alert-icon">📁</div>
        <div class="alert-text">
          <h4>Missing Document</h4>
          <p>Please upload a PDF resume for evaluation.</p>
        </div>
      </div>
    `;
    return;
  }

  const fileName = resumeFileInput.files[0].name;

  // كارت النجاح الملون والتفاعلي  
  resultsArea.innerHTML = `
    <div class="vibrant-success-card">
      <div class="success-glow"></div>
      <div class="card-header-vibrant">
        <div class="pulse-ring">
          <div class="inner-dot"></div>
        </div>
        <h3>Analysis Initiated Successfully</h3>
      </div>
      
      <div class="file-info-box">
        <span class="file-icon">📄</span>
        <div class="file-details">
          <span class="file-name">${fileName}</span>
          <span class="file-type">Ready for ChatGPT Parsing</span>
        </div>
      </div>

      <p class="processing-text">
        Engaging Neural Network Engine to evaluate experience metrics against the target job profile...
      </p>

      <div class="vibrant-badge">Stage 5 ChatGPT Pipeline Pending</div>
    </div>
  `;
});
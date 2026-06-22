import useEvaluator from '../hooks/useEvaluator';

function EvaluatorPage() {
  // استدعاء وتفكيك البيانات والمنطق مباشرة من الـ Custom Hook
  const {
    jobDescription,
    setJobDescription,
    customPrompt,
    setPrompt,
    file,
    setFile,
    status,
    errorMessage,
    result,
    handleSubmit
  } = useEvaluator();

  return (
    <main>
      {/* العمود الأول: لوحة إدخال البيانات (Form) */}
      <section className="form-panel">
        <form id="evaluator-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="job-description">Job Description</label>
            <textarea 
              id="job-description" 
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="custom-prompt">Custom Prompt (Optional)</label>
            <textarea 
              id="custom-prompt" 
              placeholder="e.g., Focus on technical skills..."
              value={customPrompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="resume-file">Upload PDF Resume</label>
            <input 
              type="file" 
              id="resume-file" 
              accept=".pdf" 
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </div>

          {/* تعطيل الزر أثناء التحميل لمنع الإرسال المتكرر */}
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Evaluating...' : 'Evaluate Resume'}
          </button>
        </form>
      </section>

      {/* العمود الثاني: لوحة النتائج الحية والمشروطة */}
      <section className="results-panel">
        <h2>Evaluation Results</h2>
        <div id="results-area">
          
          {/* 1. الحالة الافتراضية (Idle) */}
          {status === 'idle' && (
            <div className="interactive-placeholder">
              <div className="ai-scanner-visual">
                <div className="laser-line"></div>
                <div className="doc-mockup">
                  <div className="line short"></div>
                  <div className="line long"></div>
                  <div className="line medium"></div>
                  <div className="line long"></div>
                </div>
                <div className="glow-orb"></div>
              </div>
              <h3>Ready for AI Evaluation</h3>
              <p>Upload your resume and press evaluate to watch the AI parsing engine extract and analyze your skills live.</p>
            </div>
          )}

          {/* 2. حالة التحميل (Loading) */}
          {status === 'loading' && (
            <div className="interactive-placeholder">
              <div className="ai-scanner-visual">
                <div className="laser-line" style={{ animationDuration: '1s' }}></div>
                <div className="glow-orb"></div>
              </div>
              <h3>Analyzing Dashboard...</h3>
              <p style={{ color: 'var(--accent-blue)' }}>Connecting to secure sandbox environment.</p>
            </div>
          )}

          {/* 3. حالة الخطأ (Error) */}
          {status === 'error' && (
            <div className="vibrant-alert error-alert">
              <div className="alert-icon">⚠️</div>
              <div className="alert-text">
                <h4>Action Required</h4>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* 4. حالة النجاح (Success) */}
          {status === 'success' && (
            <div className="vibrant-success-card">
              <div className="success-glow"></div>
              <div className="card-header-vibrant">
                <div className="pulse-ring">
                  <div className="inner-dot"></div>
                </div>
                <h3>Analysis Initiated Successfully</h3>
              </div>
              
              <div className="file-info-box">
                <span className="file-icon">📄</span>
                <div className="file-details">
                  <span className="file-name">{file ? file.name : 'resume.pdf'}</span>
                  <span className="file-type">Ready for ChatGPT Parsing</span>
                </div>
              </div>

              <p className="processing-text">{result}</p>
              <div className="vibrant-badge">Stage 5 Pipeline Secured</div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

export default EvaluatorPage;
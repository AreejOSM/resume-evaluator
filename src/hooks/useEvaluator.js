import { useState } from 'react';

function useEvaluator() {
  const [jobDescription, setJobDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | error | success
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setResult('');

    if (!jobDescription.trim()) {
      setStatus('error');
      setErrorMessage('Please enter a job description to guide the AI.');
      return;
    }

    if (!file) {
      setStatus('error');
      setErrorMessage('Please upload a PDF resume for evaluation.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setResult(`Evaluating "${file.name}" against the job profile... ChatGPT integration coming in Stage 5!`);
    }, 1500);
  };

  
  return {
    jobDescription,
    setJobDescription,
    customPrompt,
    setPrompt: setCustomPrompt, 
    file,
    setFile,
    status,
    errorMessage,
    result,
    handleSubmit
  };
}

export default useEvaluator;
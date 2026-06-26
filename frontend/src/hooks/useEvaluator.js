import { useState } from 'react';
import axios from 'axios';

function useEvaluator() {
  const [jobDescription, setJobDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | error | success
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
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

    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);
    formData.append('custom_prompt', customPrompt);

    try {
      
      const response = await axios.post('http://localhost:8000/evaluate/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus('success');
      
      
      setResult(response.data.result || response.data);

    } catch (err) {
      setStatus('error');
     
      const msg = err.response?.data?.detail || 'Failed to connect to the evaluation server.';
      setErrorMessage(msg);
    }
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
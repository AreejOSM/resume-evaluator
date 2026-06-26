import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000', // رابط سيرفر FastAPI الحقيقي الخاص بكِ
});

// الـ Interceptor: قبل كل طلب يخرج، يبحث في ذاكرة المتصفح؛ إذا وجد التوكن، يحقنه في الهيدر تلقائياً!
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
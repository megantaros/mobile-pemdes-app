import axios from 'axios';

export default function https(token: string | null) {
    const client = axios.create({
        baseURL: 'http://192.168.1.18:8000/api',
    });
    client.interceptors.request.use((config) => {
        try {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    });
    return client;
}

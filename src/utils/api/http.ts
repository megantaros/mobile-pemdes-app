import axios from 'axios';

export const BASE_URL = 'https://pemdes-kembaran.online/';
export const BASE_IMG = BASE_URL + 'berkaspemohon/';

export default function https(token: string | null) {
    const client = axios.create({
        baseURL: BASE_URL + 'api/',
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

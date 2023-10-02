import axios from 'axios';
import { useAppSelector } from '../../hooks/hooks';

export default function https() {
    const client = axios.create({
        baseURL: 'http://192.168.1.18:8000/api',
    });
    // client.interceptors.request.use((config) => {
    //     try {
    //         const token = useAppSelector((state) => state.token.token);
    //         if (token) {
    //             config.headers.Authorization = `Bearer ${token}`;
    //         }
    //         return config;
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // });
    return client;
}

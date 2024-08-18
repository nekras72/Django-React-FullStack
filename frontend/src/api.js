import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default api;

export const getNotes = async (successCB) => {
    try {
        const response = await api.get('/api/notes/');
        if (response.data && successCB) {
            const { data } = response;
            successCB(data);
        }
    } catch (error) {
        alert(error);
    }
};

export const deleteNote = async (id, successCB) => {
    try {
        const response = await api.delete(`/api/notes/delete/${id}`);
        if (response.status === 204 && successCB) {
            successCB(id);
        } else alert('Failed to delete note');
    } catch (error) {
        alert(error);
    }
};

export const createNote = async (e, payload, successCB) => {
    e.preventDefault();
    try {
        const { title, content } = payload;
        const response = await api.post('/api/notes/', { title, content });

        if (response.status === 201 && successCB) {
            successCB(response.data);
        } else {
            alert('Failed to create note!');
        }
    } catch (error) {
        alert(error);
    }
};

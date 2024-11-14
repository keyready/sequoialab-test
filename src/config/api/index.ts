import axios from 'axios';
import { USER_TOKEN } from '@/config/consts';

export const api = axios.create({});

// перехватываем запрос, чтобы вставить в него токен доступа
api.interceptors.request.use((config) => {
    config.headers.Token = localStorage.getItem(USER_TOKEN) || '';
    return config;
});

// логика обновления access-токена
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // сохраняем оригинальный запрос
        const originalRequest = error.config;

        // если ошибка 401, и еще не было попытки обновить токен
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // пробуем обновить токен, и если все получается, повторно шлем оригинальный запрос
            try {
                const result = await axios.get('/api/authentication/refresh');
                localStorage.setItem(USER_TOKEN, result.data.access.token);
                return originalRequest;
            } catch (e) {
                // если нет, то отправляем пользователя на главную и чистим локал сторэдж
                window.location.href = '/';
                return e;
            }
        }

        throw error;
    },
);

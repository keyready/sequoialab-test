import axios from 'axios';
import { USER_TOKEN } from '@/config/consts';

export const api = axios.create({});

api.interceptors.request.use((config) => {
	config.headers.Token = localStorage.getItem(USER_TOKEN) || '';
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			alert('Ваш токен умер, нужна повторная авторизация');
			window.location.href = '/';
			// window.location.reload();
		}

		throw error;
	}
);

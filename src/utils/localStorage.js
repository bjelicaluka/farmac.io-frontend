import jwt_decoder from 'jwt-decode'
import moment from 'moment'
import axios from 'axios'
import { Roles } from '../constants'

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function setAxiosInterceptors() {
	axios.interceptors.request.use(config => {
		config.headers.Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
		return config;
	});
}

export function getRoleFromToken() {
    const roleFromToken = decodeToken()?.role;

	return Object.keys(Roles).find(role => role === roleFromToken);
}

export function getAccountIdFromToken() {
	return decodeToken()?.name;
}

export function hasTokenExpired() {
	return decodeToken()?.exp < moment().unix();
}

export function isUserLoggedIn() {
    return getAccountIdFromToken() && !hasTokenExpired();
}

function decodeToken() {
	const token = localStorage.getItem('token');
	return token ? jwt_decoder(token) : null;
}
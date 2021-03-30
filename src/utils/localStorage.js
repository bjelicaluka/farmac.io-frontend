import jwt_decoder from 'jwt-decode'
import moment from 'moment'

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function getRoleFromToken() {
	return decodeToken()?.role;
}

export function getAccountIdFromToken() {
	return decodeToken()?.name;
}

export function hasTokenExpired() {
	return decodeToken()?.exp < moment().unix();
}

function decodeToken() {
	const token = localStorage.getItem('token');
	return token ? jwt_decoder(token) : null;
}
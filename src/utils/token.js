import jwt_decoder from 'jwt-decode'
import moment from 'moment'
import axios from 'axios'
import { Roles } from '../constants'
import router from '../router/index'

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function setAuthorizationHeaderInterceptor() {
	// Set Authorization header interceptor
	axios.interceptors.request.use(config => {
		config.headers.Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
		return config;
	});
}

export function setUnauthorizedHeaderInterceptor(store) {
	// Set Unauthorized handler
	axios.interceptors.response.use(function (response) {
		return response;
	}, function (error) {
		if ((401 === error.response.status || 403 == error.response.status) && localStorage.getItem('token')) {
			store.dispatch('authentication/logOut');
			router.push('/auth')
		} else {
			return Promise.reject(error);
		}
	});
	
}

export function hasTokenExpired() {
	return decodeToken()?.exp < moment().unix();
}


export function getRoleFromToken() {
	if(hasTokenExpired()) {
		return null;
	}

    const roleFromToken = decodeToken()?.role;

	return Object.keys(Roles).find(role => Roles[role] === roleFromToken);
}

export function shouldChangePassword() {
	const shouldChangePassword = decodeToken()?.ShouldChangePassword;

	return shouldChangePassword === "true" ?? false;
}
	
export function getAccountIdFromToken() {
	return decodeToken()?.name;
}

export function getUserIdFromToken(){
	return decodeToken()?.UserId;
}

export function isUserLoggedIn() {
    return getAccountIdFromToken() && !hasTokenExpired();
}


function decodeToken() {
	const token = localStorage.getItem('token');
	return token ? jwt_decoder(token) : null;
}
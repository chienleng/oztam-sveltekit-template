import { writable, derived } from 'svelte/store';
import jsCookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { goto } from '$app/navigation';
import { base, getHeaders } from '$lib/api';

export const changingPassword = writable(false);
export const token = writable(jsCookie.get('auth'));
export const loggedIn = derived(token, ($token) => !!$token);
export const tokenDecoded = derived(token, ($token) => jwtDecode($token));
export const userEmail = derived(tokenDecoded, ($tokenDecoded) => $tokenDecoded.sub);
/**
 *  tokens
 * @param {string} t
 */
export function setToken(t) {
	setCookie('auth', `Bearer ${t}`);
	token.set(t);
}

export function logout() {
	jsCookie.remove('auth');
	token.set('');
}

/**
 *
 * @param {string} key
 * @param {string} value
 */
function setCookie(key, value) {
	jsCookie.set(key, value, { expires: 3, sameSite: 'strict' });
}

/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{token: string}>}
 */
export async function login(username, password) {
	const res = await fetch(`${base}/v1/login`, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify({ username, password })
	});

	const json = await res.json();
	return json;
}

/**
 *
 * @param {*} payload
 */
export async function changePassword(payload) {
	changingPassword.set(true);

	const res = await fetch(`${base}/v1/password`, {
		method: 'PUT',
		headers: getHeaders(),
		body: JSON.stringify(payload)
	});

	changingPassword.set(false);

	if (res.status === 401) {
		goto('/sign-out');
	} else {
		const text = await res.text();
		return text === 'OK';
	}
}

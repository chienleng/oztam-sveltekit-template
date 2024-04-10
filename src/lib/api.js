import jsCookie from 'js-cookie';
import { PUBLIC_API_ROOT as base } from '$env/static/public';

function getHeaders() {
	const headers = new Headers();
	headers.append('Accept', 'application/json, text/plain, */*');
	headers.append('Content-Type', 'application/json;charset=UTF-8');
	headers.append('Authorization', jsCookie.get('auth') || '');
	return headers;
}

export { base, getHeaders };

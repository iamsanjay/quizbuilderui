import {useState} from 'react';
import { googleLogout } from '@react-oauth/google';

export default function useToken(){

	const getToken = () => {
		const tokenString = localStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken?. credential
	}
	const [token, setToken] = useState(getToken());

	const saveToken = userToken => {
		if(!userToken){
			localStorage.removeItem('token');
			googleLogout();
			setToken();
			return;
		}
		localStorage.setItem('token', JSON.stringify(userToken));
		setToken(userToken.credential)
	}
	
	return [token, saveToken];
	/*return {
		token,
		setToken: saveToken,
	}*/
}
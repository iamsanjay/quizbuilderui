export function createQuiz(quiz, token){
	return fetch('/api/v1/quizzes', {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${token}`,
			'content-type':'application/json',
			'accept':'application/json'
		},
		body: JSON.stringify(quiz)
	})
    .then(response => {
    	if(!response.ok){
    		return Promise.reject({
			    code: response.status,
			    message: response && response.message ? response.message : response.statusText
			  });
    	}
    	return response.json();
    })
}

export function deleteQuiz(id, token){
	return fetch(`/api/v1/quizzes/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'content-type':'application/json',
			'accept':'application/json'
		}
	})
    .then(data => data.json())
}

export function getQuiz(token, activePage){
	return fetch(`/api/v1/quizzes?page=${activePage}`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'content-type':'application/json',
			'accept':'application/json'
		}
	})
    .then(response => {
    	if(!response.ok){
    		return Promise.reject({
			    code: response.status,
			    message: response && response.message ? response.message : response.statusText
			  });
    	}
    	return response.json();
    })
}

export function getVisitorQuiz(shortURL){
	return fetch(`/qu/${shortURL}`, {
		method: 'GET',
		headers: {
			'content-type':'application/json',
			'accept':'application/json'
		}
	})
    .then(data => {
    	return data.json()
    })
}

export function evaluateQuiz(quiz){
	return fetch('http://localhost:8080/api/v1/visitor/quiz/evaluate', {
		method: 'POST',
		headers: {
			'content-type':'application/json',
			'accept':'application/json'
		},
		body: JSON.stringify(quiz)
	})
    .then(data => data.json())
}

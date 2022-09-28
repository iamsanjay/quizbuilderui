import {useState, useEffect, Fragment} from 'react';
import {getQuiz} from '../../service/QuizService.js';
import {Button, Pagination} from 'react-bootstrap';

export default function QuizListTableComponent({data, activePage, setPage, delQuiz}){
	
	let items = [];
	if(data && data.count > 9){
		let totalPage = Math.ceil(data.count/10);
		for (let number = 1; number <= totalPage; number++) {
	  		items.push(
	    		<Pagination.Item key={number} active={number === activePage} onClick={() => setPage(number)}>
	      			{number}
	    		</Pagination.Item>,
	  		);
		}
	}

	return(
		<Fragment>
			{data && data.quizzes && data.quizzes.map((quiz, index) => (
				<div className="border shadow p-2 rounded mb-3" key={index}>
					<div className="mb-3">{quiz.title}</div>
					<Button className="align-right" onClick={() => delQuiz(quiz.quizId)}>Delete Quiz</Button>
				</div>
			))
			}
			<Pagination>{items}</Pagination>
		</Fragment>
	);
}
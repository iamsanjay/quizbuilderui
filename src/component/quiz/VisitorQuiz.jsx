import {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Badge} from 'react-bootstrap';
import {useParams} from 'react-router-dom';

import {getVisitorQuiz, evaluateQuiz} from '../../service/QuizService.js';

export default function VisitorQuiz(){
	
	let params = useParams();

	const [result, setResult] = useState();

	const [quiz, setQuiz] = useState({
		title:"",
		questions:[]
	});

	useEffect(() => {
		getVisitorQuiz(params.shortURL)
			.then(result => {
				console.log("result", result)
				setQuiz(result);
			})
	}, [params])

	const handleAnswerChange = (e, i, j) => {
		console.log(i, j)
		const tempQuestions = [...quiz.questions];
		if(tempQuestions[i].type == "radio"){
			tempQuestions[i].options.map((option) => {
				option.isCorrect = false;
			})
		}
		tempQuestions[i].options[j].isCorrect = true;
		quiz.questions = [...tempQuestions]
		setQuiz(quiz);
	}

	const handleSubmission = () => {
		evaluateQuiz(quiz)
			.then(res => {
				setResult(res)
				setQuiz({
					title:"",
					questions:[]
				})
			})
	}	


	return (

		<Container>
      		<h1 className="text-center mt-5">Quiz Builder</h1>
      		<hr/>
      		<Row>
      			<h2 className="text-center mb-3">{quiz.title}</h2>
      			{result?.result && <h2 className="text-center mb-3">{result.result}</h2>}
      		</Row>
      		{quiz.questions.map((question, i) => (
      			<div className="border rounded shadow p-2" key={i}>
      				<p className="font-weight-bold">{question.title}{' '}<Badge bg="secondary">{question.type == 'radio'? 'Single Correct Answer': 'One or More correct answer'}</Badge></p>
      				{question.options.map((option, j) => (
      					<Row key={`option-${j}`} className="mb-2">
      						<Col xs="auto"><Form.Check type={question.type}  name={`optionGroup-${i}`} onChange={(e) => handleAnswerChange(e, i, j)}  value={option.isCorrect} /></Col>
      						<Col>{option.title}</Col>
      					</Row>
      				))}
      			</div>
      		))}
      		<Row>
      			{!result && <div><Button className="mt-3" variant="primary" onClick={(e) => handleSubmission()}>Submit</Button></div>}
      		</Row>
      	</Container>
	);
}
import {Fragment, useState} from 'react';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';

import {createQuiz} from '../../service/QuizService.js';
import useToken from '../auth/useToken.jsx';
import QuizQuestionComponent from './QuizQuestionComponent.jsx';

export default function QuizViewComponent(){

	const [token, setToken] = useToken();

	const [title, setTitle] = useState("");

	const [error, setError] = useState("");

	const [questions, setQuestions] = useState([]);

	const [shortURL, setShortURL] = useState();

	const [show, setShow] = useState(false);


	const handleTitleChange = (e, i) => {
		const tempQuestions = [...questions];
		tempQuestions[i].title = e.target.value;
		setQuestions(tempQuestions);
	}
	
	const handleChangeType = (e, i) => {
		const tempQuestions = [...questions];
		tempQuestions[i].type = e.target.value;
		setQuestions(tempQuestions);
	}

	const addQuestions = () => {
		const tempQuestions = [...questions]
		setQuestions([...tempQuestions, {
			title:"",
			type:"radio",
			options:[]
		}])
	}

	const handleDeleteQuestion = (i) => {
		const tempQuestions = [...questions]
		tempQuestions.splice(i, 1);
		setQuestions(tempQuestions);

	}

	const addOption = (e, i) => {
		const tempQuestions = [...questions];
		tempQuestions[i].options = [...tempQuestions[i].options, {
			title: "",
			isCorrect: false
		}]
		setQuestions(tempQuestions);
	}

	const handleDeleteOption = (i, j) => {
		const tempQuestions = [...questions];
		tempQuestions[i].options.splice(j, 1);
		setQuestions(tempQuestions);
	}

	const handleOptionTitleChange = (e, i, j) => {
		const tempQuestions = [...questions];
		tempQuestions[i].options[j].title = e.target.value;
		setQuestions(tempQuestions);
	}

	const handleAnswerChange = (e, i, j) => {
		const tempQuestions = [...questions];
		if(tempQuestions[i].type == "radio"){
			tempQuestions[i].options.map((option) => {
				option.isCorrect = false;
			})
		}
		tempQuestions[i].options[j].isCorrect = true;
		setQuestions(tempQuestions);
	}

	const handleSubmission = () => {
		console.log(questions);
		setError()
		if(title == null || title.trim() == ""){
			setError("Quiz Title cannot be empty.")
			return;
		}

		var errorFound;
		var answerCount = 0;
		questions.map((question, index) => {
			answerCount = 0;
			if(question.title == null || question.title.trim() == ""){
				errorFound = "Question title cannot be empty.";
				return
			}
			if(!question.options || question.options.length < 2){
				errorFound = "At least two options should be there.";
				return
			}  

			question.options.map((option) => {
				if(option.title == null || option.title.trim() == ""){
					errorFound = "Option title cannot be empty.";
					return
				}
				if(option.isCorrect){
					answerCount = answerCount + 1
				}
			})
			
			if(!errorFound && answerCount == 0){
				errorFound = "At least one option has to be marked as answer.";
				return
			}
		})
		if(errorFound){
			setError(errorFound)
			return
		}
		createQuiz({
			title: title,
			questions:[...questions]
		}, token).then(result => {
			console.log("EQuiz Created", result)
			setShortURL("http://localhost:3000/tu/"+result.shortURL);
			setShow(true);
			setTitle("")
			setQuestions([])
		}).catch(error => {
			if(error.code == 401){
				setToken();
			}
		})
		
	}

	
	return(
		<Fragment>
    	<Form>
    		{show && <Alert variant="primary" className="mb-3" onClose={() => setShow(false)} dismissible>Short URL for Quiz <b>{shortURL}</b></Alert>}
    		<Row className="mb-3">
    			<Col xs="auto"><Button  variant="primary" onClick={addQuestions}>Add Question</Button></Col>
    			<Col xs="auto"><Button  variant="primary" onClick={handleSubmission}>Publish</Button></Col>
    		</Row>
    		
    		<Form.Group className="mb-3" controlId="formBasicEmail">
	        	<Form.Control type="text" value={title} placeholder="Quiz Title" onChange={(e) => setTitle(e.target.value)}/>
	        	{error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
	      	</Form.Group>
    		{questions.map((question, i) => (
    			<div key={i} className="border rounded shadow mb-3 p-5">
	    			<Form.Group className="mb-3">
		       	 		<Row>
		       	 		<Col><Form.Control type="text" placeholder="Question title" value={question.title} onChange={(e) => handleTitleChange(e, i)}/></Col>
		       	 		<Col xs={2}>
			       	 		<Form.Select value={question.type} onChange={(e) => handleChangeType(e, i)}>
	      						<option>Open this select menu</option>
	      						<option value="radio">Single</option>
	      						<option value="checkbox">Multiple</option>
	    					</Form.Select>
    					</Col>
    					</Row>
		      		</Form.Group>
		      		<Form.Group>
		      		<Row>
		        		<Col><Button className="mb-3" variant="primary" onClick={(e) => addOption(e, i)}>Add Option</Button></Col>
		        	</Row>
		        	</Form.Group>
	        		{question.options.map((option, j) => (
	        			<Form.Group key={j} className="mb-3">
		        			<Row>
		        				<Col xs="auto"><Form.Check type={question.type} value={option.isCorrect} name={`optionGroup-${i}`} className="mt-2" onChange={(e) => handleAnswerChange(e, i, j)}/></Col>
		        				<Col xs={6}><Form.Control type="text" placeholder="Enter option"  value={option.title} onChange={(e) => handleOptionTitleChange(e, i, j)}/></Col>
		        				<Col xs="auto"><Button className="mb-3" variant="secondary" onClick={(e) => handleDeleteOption(i, j)}>Delete Option</Button></Col>
		        			</Row>
	        			</Form.Group>
	        		))}
	        		<div><Button className="mb-3" variant="secondary" onClick={(e) => handleDeleteQuestion(i)}>Delete Question</Button></div>
	      
	        	</div>
    		))}
    	</Form>
 
    	</Fragment>
	);
}
import {useState, Fragment} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
export default function QuizQuestionComponent(){
	
	const [questionTitle, setQuestionTitle] = useState();

	const [type, setType] = useState('radio');

	const [currentOptiontext, setCurrentOptiontext] = useState();

	const [options, setOption] = useState([]);


	const addOption = () => {
		const key = options.length;
		const x = <Form.Check type={type} id={`default-${type}`} label={`${currentOptiontext}`} name="optionGroup" key={`${key}`}/>
		setOption([...options, x]);
		setCurrentOptiontext("");
	}

	return(
		<Fragment>
		<div className="border-bottom mt-3" size="lg">
	      <Form.Group className="mb-3">
	        <Form.Control type="text" placeholder="Enter question"/>
	      </Form.Group>
	      <Form.Group>
	      	<Row>
	        	<Col><Form.Control type="text" value={currentOptiontext} placeholder="Add Option" onChange={(e) => setCurrentOptiontext(e.target.value)}/></Col>
	        	<Col><Button className="mb-3" variant="primary" onClick={addOption}>Add Option</Button></Col>
	        </Row>
	      </Form.Group>
	      {options}
    	</div>
    	</Fragment>
	)
}
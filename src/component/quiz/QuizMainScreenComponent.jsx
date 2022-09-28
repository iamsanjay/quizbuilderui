import {useState, useEffect} from 'react';
import {Container, Row, Tabs, Tab, Button} from 'react-bootstrap';
import QuizListTableComponent from './QuizListTableComponent.jsx';
import QuizViewComponent from './QuizViewComponent.jsx';
import useToken from '../auth/useToken.jsx';
import {getQuiz, deleteQuiz} from '../../service/QuizService.js';

export default function QuizMainScreenComponent({logout}){
	const [key, setKey] = useState('home');
	
	const [token, saveToken] = useToken();

	const [quiz, setQuiz] = useState();	

	const[loadData, setLoadData] = useState();

	const [activePage, setActivePage] = useState(1);


	useEffect(() => {
		getQuiz(token, activePage-1)
			.then(result => {
				setQuiz(result)
			}).catch(error => {
				if(error.code == 401){
					saveToken();
				}
			})
	}, [loadData])

	const delQuiz = (id) => {
		deleteQuiz(id, token)
			.then(result => {
				reloadData()
			}).catch(error => {
				if(error.code == 401){
					saveToken();
				}
			})
	}

	const setPage= (i) => {

		setActivePage(i);
		reloadData();
	}

	const reloadData = () => {
		setLoadData(!loadData)
	}

	return(
		<Container>
			<Tabs
		      id="controlled-tab-example"
		      activeKey={key}
		      onSelect={(k) => {setKey(k); if(k == "home")reloadData()}}
		      className="mb-3"
		    >
		    <Tab eventKey="home" title="Home">
		        <QuizListTableComponent data={quiz} activePage={activePage} setPage={setPage} delQuiz={delQuiz}/>
		    </Tab>
		    <Tab eventKey="create" title="Create Quiz">
		        <QuizViewComponent />
		    </Tab>
		    <Tab eventKey="profile" title="Profile">
		        <Button onClick={logout}>Logout</Button>
		    </Tab>
		    </Tabs>
		</Container>

	);
}
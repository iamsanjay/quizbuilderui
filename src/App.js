import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import useToken from './component/auth/useToken.jsx';
import Login from './component/auth/Login.jsx';

import {Container, Button} from 'react-bootstrap';
import QuizMainScreenComponent from './component/quiz/QuizMainScreenComponent.jsx';

function App() {

  const [token, saveToken] = useToken();

  const logout = () => {
    saveToken();
  }

  return (
    <Container>
      <h1 className="text-center mt-5">Quiz Builder</h1>
      <hr/>
      {token ? <QuizMainScreenComponent logout={logout}/>: <Login setToken={saveToken} />}
      
    </Container>
  );
}

export default App;

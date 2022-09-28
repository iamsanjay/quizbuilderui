import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import {Container, Row, Col} from 'react-bootstrap';

export default function Login({setToken}){
	return(
		<Container>
			<Row>
				<Col xs={4} className="align-self-center">
					<GoogleOAuthProvider clientId="844966360470-to7m1j7fdf4tlftvhhsuqj31l60ctsk5.apps.googleusercontent.com">
			      		<GoogleLogin
			        		onSuccess={credentialResponse => {
			        			console.log(credentialResponse);
			          			setToken(credentialResponse)
			        		}}
			        		onError={() => {
			          			console.log('Login Failed');
			        		}}
			    	 	/>
			    	</GoogleOAuthProvider>
			    </Col>
		    </Row>
		</Container>

	)
}
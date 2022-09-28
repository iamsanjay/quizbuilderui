import {render} from '@testing-library/react'
import QuizQuestionComponent from '../../component/quiz/QuizQuestionComponent'
test('testing a QuizQuestionComponent', () => {
	const {asFragment, getByText} = render(<QuizQuestionComponent />)

})
import { render, screen } from '@testing-library/react';
import Notification from '../components/Notification';

test('should not render when message is not passed', () => {

    const {container} = render(<Notification />)
    const div = container.querySelector('.error')
    expect(div).toHaveTextContent('')
})

test('should render when has message', () => {
    const message = "Notificação teste";
    
    render(<Notification message={message}/>)

    const element = screen.getByText('Notificação teste')
    expect(element).toBeDefined()
})



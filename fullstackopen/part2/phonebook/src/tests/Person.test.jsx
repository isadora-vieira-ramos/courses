import { render, screen } from '@testing-library/react'
import Person from '../components/Person'

test('renders content', () => {
    const newPerson = {
        name: "Nome teste", 
        number: '54999292929',
        id: '1'
    };

    render(<Person person={newPerson} />)

    const element = screen.getByText('Nome teste - 54999292929')
    expect(element).toBeDefined()
})


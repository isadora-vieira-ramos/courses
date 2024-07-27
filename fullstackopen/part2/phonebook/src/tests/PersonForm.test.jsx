import { render, screen } from '@testing-library/react';
import PersonForm from '../components/PersonForm';

test('renders name', () => {
    const name = "Teste";

    render(<PersonForm newName={name} />)

    const element = screen.getByDisplayValue('Teste')
    expect(element).toBeDefined()
})


test('renders phone', () => {
    const phone = "9999999"

    render(<PersonForm newPhone={phone} />)

    const element = screen.getByDisplayValue('9999999')
    expect(element).toBeDefined()
})
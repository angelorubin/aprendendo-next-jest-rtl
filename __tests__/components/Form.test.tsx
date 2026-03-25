import { render, screen } from '@testing-library/react'
import Form from '@/components/Form'

test('renderiza formulário', () => {
  render(<Form />)
  expect(screen.getByLabelText(/nome:/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/email:/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
})

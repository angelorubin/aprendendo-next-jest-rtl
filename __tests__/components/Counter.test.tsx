import { render, screen, fireEvent } from '@testing-library/react'
import Counter from '@/components/Counter'

test('renderiza contador e incrementa', () => {
  render(<Counter />)
  expect(screen.getByText('Contador: 0')).toBeInTheDocument()

  const incrementButton = screen.getByText('+')
  fireEvent.click(incrementButton)
  expect(screen.getByText('Contador: 1')).toBeInTheDocument()
})

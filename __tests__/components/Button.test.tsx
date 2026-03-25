import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

test('componente Button funciona sem imports extras', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Testar</Button>);

  const button = screen.getByRole('button', { name: /testar/i });

  // O .toBeInTheDocument() agora funciona "magicamente" em todo o projeto
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
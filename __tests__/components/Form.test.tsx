import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from '@/components/Form'

describe('Form Component - Teste Unitário Real', () => {
  test('fluxo completo de preenchimento e envio do formulário', async () => {
    // Arrange: Configuração inicial
    const user = userEvent.setup()

    // Act: Renderiza o componente
    render(<Form />)

    // Assert: Verificações do estado inicial
    expect(screen.getByLabelText(/nome:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()

    // Act: Preenche o formulário com dados reais
    const nameInput = screen.getByLabelText(/nome:/i)
    const emailInput = screen.getByLabelText(/email:/i)
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    await user.type(nameInput, 'João Silva')
    await user.type(emailInput, 'joao.silva@empresa.com')

    // Assert: Verifica se os dados foram preenchidos
    expect(nameInput).toHaveValue('João Silva')
    expect(emailInput).toHaveValue('joao.silva@empresa.com')

    // Act: Envia o formulário
    await user.click(submitButton)

    // Assert: Verifica o estado de sucesso
    await waitFor(() => {
      expect(screen.getByText(/formulário enviado com sucesso!/i)).toBeInTheDocument()
    })

    // Verifica se os dados enviados são exibidos
    expect(screen.getByText(/Nome: João Silva/i)).toBeInTheDocument()
    expect(screen.getByText(/Email: joao.silva@empresa.com/i)).toBeInTheDocument()

    // Verifica se o botão de novo formulário aparece
    expect(screen.getByRole('button', { name: /novo formulário/i })).toBeInTheDocument()
  })

  test('validação de campos obrigatórios', async () => {
    // Arrange: Configuração
    const user = userEvent.setup()
    render(<Form />)

    // Act: Tenta enviar formulário vazio
    const submitButton = screen.getByRole('button', { name: /enviar/i })

    // Assert: Verifica se os campos são required
    const nameInput = screen.getByLabelText(/nome:/i)
    const emailInput = screen.getByLabelText(/email:/i)

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  test('reset do formulário após envio', async () => {
    // Arrange: Configuração e envio inicial
    const user = userEvent.setup()
    render(<Form />)

    // Act: Preenche e envia
    await user.type(screen.getByLabelText(/nome:/i), 'Maria Santos')
    await user.type(screen.getByLabelText(/email:/i), 'maria@empresa.com')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    // Assert: Verifica estado de sucesso
    await waitFor(() => {
      expect(screen.getByText(/formulário enviado com sucesso!/i)).toBeInTheDocument()
    })

    // Act: Clica em novo formulário
    await user.click(screen.getByRole('button', { name: /novo formulário/i }))

    // Assert: Verifica se voltou ao estado inicial
    expect(screen.getByLabelText(/nome:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()

    // Verifica se os campos estão vazios
    expect(screen.getByLabelText(/nome:/i)).toHaveValue('')
    expect(screen.getByLabelText(/email:/i)).toHaveValue('')
  })

  test('manutenção do estado durante digitação', async () => {
    // Arrange: Configuração
    const user = userEvent.setup()
    render(<Form />)

    // Act & Assert: Testa digitação incremental
    const nameInput = screen.getByLabelText(/nome:/i)

    await user.type(nameInput, 'J')
    expect(nameInput).toHaveValue('J')

    await user.type(nameInput, 'o')
    expect(nameInput).toHaveValue('Jo')

    await user.type(nameInput, 'ão')
    expect(nameInput).toHaveValue('João')

    // Testa correção (backspace)
    await user.keyboard('{Backspace}')
    expect(nameInput).toHaveValue('Joã')

    await user.type(nameInput, 'ão Silva')
    expect(nameInput).toHaveValue('João Silva')
  })

  test('acessibilidade e estrutura semântica', () => {
    // Arrange: Renderiza o componente
    render(<Form />)

    // Assert: Verifica estrutura semântica
    expect(screen.getByRole('form')).toBeInTheDocument()

    // Labels associadas corretamente aos inputs
    const nameInput = screen.getByLabelText(/nome:/i)
    const emailInput = screen.getByLabelText(/email:/i)

    expect(nameInput).toHaveAttribute('id', 'name')
    expect(emailInput).toHaveAttribute('id', 'email')

    // Botões com roles corretos
    expect(screen.getByRole('button', { name: /enviar/i })).toHaveAttribute('type', 'submit')
  })
})

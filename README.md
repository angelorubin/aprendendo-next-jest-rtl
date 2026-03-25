# Jest Next.js Básico

Projeto exemplo para aprender a usar Jest com Next.js e React Testing Library.

## Estrutura do Projeto

```
jest-nextjs-basico/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       └── hello/
│   │           └── route.ts
│   └── components/
│       ├── Button.tsx
│       ├── Counter.tsx
│       └── Form.tsx
├── __tests__/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── Counter.test.tsx
│   │   └── Form.test.tsx
│   └── api/
│       └── hello.test.ts
├── jest.config.js
├── jest.setup.js
├── package.json
└── README.md
```

## Comandos

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Testes
```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch
npm run test:watch

# Rodar testes com coverage
npm run test:coverage
```

## O que você vai aprender

### 1. Configuração do Jest
- Configuração básica com Next.js
- Setup do React Testing Library
- Ambiente de teste JSDOM

### 2. Testes de Componentes
- **Button**: Teste de renderização, eventos, props
- **Counter**: Teste de estado e interações múltiplas
- **Form**: Teste de formulários, inputs, submissão

### 3. Testes de API
- Teste de route handlers
- Teste de métodos GET e POST
- Teste de validação e erros

### 4. Conceitos Avançados
- Mock de funções
- Testes assíncronos
- Coverage de código
- Boas práticas de organização

## Exemplos de Testes

### Teste de Componente Simples
```typescript
test('renderiza o botão com children', () => {
  render(<Button>Clique aqui</Button>)
  const button = screen.getByRole('button', { name: /clique aqui/i })
  expect(button).toBeInTheDocument()
})
```

### Teste de Interação
```typescript
test('chama onClick quando clicado', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Clique me</Button>)
  
  const button = screen.getByRole('button', { name: /clique me/i })
  fireEvent.click(button)
  
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Teste de API
```typescript
test('retorna Hello World sem parâmetros', async () => {
  const request = new NextRequest('http://localhost:3000/api/hello')
  const response = await GET(request)
  const data = await response.json()
  
  expect(response.status).toBe(200)
  expect(data.message).toBe('Hello, World!')
})
```

## Próximos Passos

1. **Instale as dependências**: `npm install`
2. **Rode os testes**: `npm test`
3. **Experimente modificar** os componentes e testes
4. **Adicione novos testes** para praticar
5. **Explore o coverage** com `npm run test:coverage`

## Recursos Adicionais

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing](https://nextjs.org/docs/pages/building-your-application/testing)

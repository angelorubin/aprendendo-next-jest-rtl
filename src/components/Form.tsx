'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold text-green-600">
          Formulário enviado com sucesso!
        </h3>
        <p>Nome: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: '', email: '' })
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Novo formulário
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  )
}

'use client'

import Button from "@/components/Button";

export default function Home() {
  const onClickHandler = () => {
    alert('Clicou!')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">
          Jest + RTL com NextJS
        </h1>
        <Button onClick={onClickHandler}>Testar</Button>
      </div>
      <div className="text-center">
        <p className="text-xl">
          Projeto para aprender testes com Jest e React Testing Library
        </p>
      </div>
    </main>
  )
}

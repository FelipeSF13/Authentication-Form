import React,{useState} from 'react'
import {createRoot} from 'react-dom/client'
import {AuthForm} from './AuthForm'
import './styles.css'

function Cover() {
  return <aside className="relative isolate flex flex-col justify-between overflow-hidden bg-[#163e37] p-7 text-[#fff9e9] sm:p-10">
    <p className="text-xs font-bold tracking-[.25em]">◒ &nbsp; ESTÚDIO FORMA</p>
    <svg aria-hidden="true" viewBox="0 0 320 240" className="mx-auto my-6 hidden w-full max-w-80 md:block">
      <path fill="#eeb08f" d="M20 220V150a140 140 0 0 1 280 0v70Z"/>
      {Array.from({length:11},(_,i)=><path key={i} d={`M${20+i*11} 220v-62a${140-i*11} ${140-i*11} 0 0 1 ${280-i*22} 0v62`} fill="none" stroke="#163e37" strokeWidth="2"/>)}
      <circle cx="160" cy="175" r="34" fill="#f9df8a"/>
    </svg>
    <div><p className="mt-5 font-serif text-3xl leading-tight sm:text-5xl">Um espaço<br className="hidden md:block"/> para criar.</p><p className="mt-4 hidden border-t border-white/30 pt-3 text-xs tracking-widest md:block">CADERNO DIGITAL &nbsp; / &nbsp; Nº 01</p></div>
  </aside>
}
function App(){
  const [name,setName] = useState(null)
  return <main className="grid min-h-dvh place-items-center p-4 sm:p-8">
    <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-300/25 md:grid-cols-[.9fr_1.1fr]">
      <Cover/>
      <section className="flex flex-col justify-center p-6 sm:p-10">
        {name?<><p className="mb-4 text-xs font-bold tracking-widest text-emerald-800">ÁREA DE ACESSO</p><h1 className="break-words font-serif text-4xl">Olá, {name}!</h1><p className="my-5">Você entrou na demonstração do Estúdio Forma.</p><button className="primary" onClick={()=>setName(null)}>Sair da conta <span aria-hidden="true">→</span></button></>:<AuthForm onLogin={setName}/>}
        <p className="mt-6 border-t border-stone-200 pt-4 text-xs leading-relaxed text-stone-600">Demonstração de aula. Use dados fictícios: as contas existem apenas nesta aba e são apagadas ao recarregar.</p>
      </section>
    </div>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>)

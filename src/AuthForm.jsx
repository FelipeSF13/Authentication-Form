import {useState} from 'react'
import {Field} from './Field'
import {validate} from './validation'
import {login,register} from './demoAccounts'

const empty = {name:'',email:'',password:'',confirm:''}
export function AuthForm({onLogin}) {
  const [registering,setRegistering] = useState(false)
  const [values,setValues] = useState(empty)
  const [touched,setTouched] = useState({})
  const [notice,setNotice] = useState('')
  const [busy,setBusy] = useState(false)
  const errors = validate(values,registering)
  function field(name) {
    return {
      name, value:values[name], error:touched[name]?errors[name]:undefined,
      onChange:(key,value)=>{setValues(prev=>({...prev,[key]:value})); setNotice('')},
      onBlur:()=>setTouched(prev=>({...prev,[name]:true}))
    }
  }

  function switchMode(next,email='') {
    setRegistering(next); setTouched({}); setValues({...empty,email}); setNotice('')
  }
  async function submit(event) {
    event.preventDefault()
    if (busy) return
    if (Object.keys(errors).length) {
      setTouched(Object.fromEntries(Object.keys(errors).map(k=>[k,true])))
      event.currentTarget.elements.namedItem(Object.keys(errors)[0]).focus()
      return
    }
    setBusy(true)
    try {
      if (registering) {
        if (!await register(values)) {setNotice('Este e-mail já foi cadastrado nesta demonstração.');return}
        switchMode(false,values.email.trim())
        setNotice('Cadastro concluído. Entre com sua senha.')
      } else {
        const name = await login(values)
        if (name) onLogin(name)
        else setNotice('E-mail ou senha incorretos. Se este for seu primeiro acesso, crie uma conta.')
      }
    } catch {setNotice('Não foi possível concluir. Tente novamente em HTTPS ou localhost.')}
    finally {setBusy(false)}
  }
  return <>
    <div aria-label="Escolha de formulário" className="mb-8 flex rounded-xl bg-stone-100 p-1">{['Entrar','Criar conta'].map((text,i)=>
      <button key={text} type="button" disabled={busy} aria-pressed={registering===Boolean(i)} onClick={()=>switchMode(Boolean(i))}
        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold ${registering===Boolean(i)?'bg-white text-emerald-900 shadow-sm':'text-stone-600'}`}>{text}</button>)}</div>
    <h1 className="font-serif text-4xl tracking-tight">{registering?'Crie sua conta':'Boas-vindas'}</h1>
    <p className="mt-2 mb-6 text-sm text-stone-600">{registering?'Preencha seus dados para começar.':'Entre com seu e-mail e senha para acessar o estúdio.'}</p>
    <form noValidate onSubmit={submit} className="space-y-4" key={String(registering)}>
      {registering && <Field {...field('name')} label="Nome" autoComplete="name" placeholder="Seu nome"/>}
      <Field {...field('email')} label="E-mail" type="email" autoComplete="email" placeholder="voce@exemplo.com"/>
      <Field {...field('password')} label="Senha" type="password" autoComplete={registering?'new-password':'current-password'} hint={registering?'Use pelo menos 8 caracteres.':undefined}/>
      {registering && <Field {...field('confirm')} type="password" label="Confirmação da senha" autoComplete="new-password"/>}
      <button disabled={busy} className="primary">{busy?'Aguarde…':registering?'Cadastrar':'Acessar conta'} <span aria-hidden="true">→</span></button>
    </form>
    <p role="status" className="mt-4 text-sm font-medium text-emerald-950">{notice}</p>
  </>
}

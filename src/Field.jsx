import {useState} from 'react'

export function Field({name,label,type='text',value,onChange,onBlur,error,hint,...props}) {
  const [visible,setVisible] = useState(false)
  return <div>
    <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">{label}</label>
    <div className="relative">
      <input {...props} required id={name} name={name} value={value} onBlur={onBlur}
        onChange={e=>onChange(name,e.target.value)} type={visible?'text':type}
        aria-invalid={!!error} aria-describedby={error||hint?`${name}-note`:undefined}
        className={`w-full rounded-lg border bg-white px-3.5 py-3 text-base outline-none focus:ring-2 focus:ring-emerald-700 ${type==='password'?'pr-20':''} ${error?'border-red-700':'border-stone-300'}`}/>
      {type==='password' && <button type="button" aria-label={`${visible?'Ocultar':'Mostrar'} ${label.toLowerCase()}`} aria-pressed={visible}
        onClick={()=>setVisible(!visible)} className="absolute inset-y-0 right-3 text-xs font-bold text-emerald-800">{visible?'Ocultar':'Mostrar'}</button>}
    </div>
    {(error||hint) && <p id={`${name}-note`} className={`mt-1.5 text-xs ${error?'text-red-800':'text-stone-600'}`}>{error||hint}</p>}
  </div>
}

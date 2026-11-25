// Estado efêmero para praticar os formulários, sem servidor ou armazenamento de senhas.
const accounts = new Map()
const key = email => email.trim().toLowerCase()

async function digest(password, salt) {
  const data = new TextEncoder().encode(password)
  const material = await crypto.subtle.importKey('raw', data, 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({name:'PBKDF2', salt, iterations:100000, hash:'SHA-256'}, material, 256)
  return new Uint8Array(bits)
}

export async function register({name,email,password}) {
  const id = key(email)
  if (accounts.has(id)) return false
  const salt = crypto.getRandomValues(new Uint8Array(16))
  accounts.set(id,{name:name.trim(), salt, hash:await digest(password,salt)})
  return true
}

export async function login({email,password}) {
  const account = accounts.get(key(email))
  if (!account) return null
  const hash = await digest(password,account.salt)
  return hash.every((byte,i)=>byte===account.hash[i]) ? account.name : null
}

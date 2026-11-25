export function validate(values, registering) {
  const errors = {}
  if (registering && values.name.trim().length < 2) errors.name = 'Informe seu nome com pelo menos 2 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Informe um e-mail válido, como voce@exemplo.com.'
  if (!values.password) errors.password = 'Informe sua senha.'
  else if (registering && values.password.length < 8) errors.password = 'Use pelo menos 8 caracteres.'
  if (registering && (!values.confirm || values.password !== values.confirm)) errors.confirm = 'Repita a mesma senha nos dois campos.'
  return errors
}

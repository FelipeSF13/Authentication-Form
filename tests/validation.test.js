import test from 'node:test'
import assert from 'node:assert/strict'
import {validate} from '../src/validation.js'

const valid = {name:'Ana', email:' ana@exemplo.com ', password:'abcdefgh', confirm:'abcdefgh'}
test('cadastro aceita os dados completos e ignora espaços externos no e-mail',()=>assert.deepEqual(validate(valid,true),{}))
test('cadastro indica nome, e-mail, senha curta e confirmação divergente',()=>{
  assert.deepEqual(Object.keys(validate({name:' ', email:' ana@ ', password:'abc', confirm:'xyz'},true)),['name','email','password','confirm'])
})
test('login exige apenas e-mail e senha',()=>{
  assert.deepEqual(Object.keys(validate({email:'',password:''},false)),['email','password'])
  assert.deepEqual(validate({email:valid.email,password:'x'},false),{})
})

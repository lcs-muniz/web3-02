// arquivo temporário para testar a função de verificação de senha com pepper
// chame a função de teste no terminal do backend, por exemplo:~ node testarPepper.js

require('dotenv').config();
const { verificarSenha } = require('./src/utils/authUtils');

const testar = async () => {
  const hashBanco = '$argon2id$v=19$m=65536,p=1,t=3$GE+cumkq9VUK79hy5CnZoA$HAz5fMoQXPYZl/epsZGnqmJ11NzBL5WZmPEab68f13c'; // hash real do banco de dados
  
  const senhaDigitada = 'sua_senha_aqui'; // senha digitada pelo usuário

  const eValida = await verificarSenha(hashBanco, senhaDigitada);

  console.log('---------------------------------');
  console.log('Pepper usado:', process.env.PEPPER_SECRET);
  console.log('Resultado da validação:', eValida);
  console.log('---------------------------------');
};


testar();
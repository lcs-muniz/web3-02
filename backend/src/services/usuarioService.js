const Usuario = require('../models/Usuario');

const obterTodosUsuarios = async => {
    return Usuario.findAll();
};

const criarUsuario = async (dados) => {
    const novoUsuario = await Usuario.create(dados);
    const usuarioSemSenha = novoUsuario.toJSON();
    delete usuarioSemSenha.senha;
    
    return usuarioSemSenha;
};

module.exports = { 
    obterTodosUsuarios,
    criarUsuario,
    removerUsuario
};
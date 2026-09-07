const Usuario = require('../models/Usuario');

const obterTodosUsuarios = async => {
    return Usuario.findAll();
};

const criarUsuario = async (dados) => {
    const novoUsuario = await Usuario.create(dados);
    return novoUsuario;
};

const removerUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }
    await usuario.destroy();
    return usuario;
};

const buscarUsuarioPorId = async (id) => {
    const usuario = await Usuario.findByPk(id);
    return usuario;
};

const atualizarUsuario = async (id, dadosAtualizados) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }
    await usuario.update(dadosAtualizados);
    return usuario;
}

module.exports = { 
    obterTodosUsuarios,
    criarUsuario,
    removerUsuario,
    buscarUsuarioPorId,
    atualizarUsuario
};
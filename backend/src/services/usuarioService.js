const Usuario = require('../models/Usuario');

const obterTodosUsuarios = async () => {
    return Usuario.findAll();
};

const criarUsuario = async (dados) => {
    const novoUsuario = await Usuario.create(dados);
    return await novoUsuario.reload();
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

    dadosAtualizados.senha?.trim()
        ? (dadosAtualizados.senha = dadosAtualizados.senha.trim()) 
        : delete dadosAtualizados.senha;

    if (!usuario) return null;

    await usuario.update(dadosAtualizados);
    return await usuario.reload();
};

module.exports = { 
    obterTodosUsuarios,
    criarUsuario,
    removerUsuario,
    buscarUsuarioPorId,
    atualizarUsuario
};
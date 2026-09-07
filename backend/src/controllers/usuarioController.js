const usuarioService = require('../services/usuarioService');

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obterTodosUsuarios();
        res.status(200).json({ data: usuarios });
    } catch(err) {
        res.status(500).json({ err: 'Erro interno ao buscar usuarios'});
    }
};

const criarUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuarioService.criarUsuario(req.body);
        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(400).json({ erro: 'Erro ao cadastrar usuário. Verifique os dados.' });
    }
};

const removerUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.removerUsuario(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        return res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        return res.status(500).json({ erro: 'Erro interno ao remover usuário.' });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioService.buscarUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        return res.status(500).json({ erro: 'Erro interno ao buscar usuário.' });
    }
};

const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
        const usuario = await usuarioService.atualizarUsuario(id, dadosAtualizados);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ erro: 'Erro interno ao atualizar usuário.' });
    }
};

module.exports = {
    buscarUsuarios,
    criarUsuario,
    removerUsuario,
    buscarUsuarioPorId,
    atualizarUsuario
};
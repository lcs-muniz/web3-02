const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.buscarUsuarios);
router.post('/', usuarioController.criarUsuario);
router.delete('/:id', usuarioController.removerUsuario);
router.get('/:id', usuarioController.buscarUsuarioPorId);
router.put('/:id', usuarioController.atualizarUsuario);

module.exports = router;
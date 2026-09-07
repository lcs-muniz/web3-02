const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.buscarUsuarios);
router.post('/', usuarioController.criarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
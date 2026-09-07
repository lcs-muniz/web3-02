const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.buscarUsuarios);
router.post('/', usuarioController.criarUsuario);

module.exports = router;
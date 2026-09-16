const argon2 = require('argon2');

const gerarHashSenha = async (senha) => {
    const pepper = process.env.PEPPER_SECRET || '';
    const senhaComPepper = senha + pepper;
    return await argon2.hash(senhaComPepper, { 
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1
    });
};

const verificarSenha = async (hashBanco, senhaDigitada) => {
    const pepper = process.env.PEPPER_SECRET || '';
    const senhaComPepper = senhaDigitada + pepper;
    return await argon2.verify(hashBanco, senhaComPepper);
};

module.exports = {
    gerarHashSenha, 
    verificarSenha
};
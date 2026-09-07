import { useState } from 'react';
import { X, UserPlus, Mail, Lock, User } from 'lucide-react';
import './ModalUsuario.css';

function ModalUsuario({ isOpen, onClose, onUserCreated }) {
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      await onUserCreated(formData);
      setFormData({ nome: '', email: '', senha: '' });
      onClose();
    } catch (err) {
      setErrorMessage(err.response?.data?.detalhe || err.message || 'Erro ao cadastrar usuário.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <UserPlus size={20} color="var(--primary-color)" />
            <h2>Novo Usuário</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {errorMessage && <div className="modal-error">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <div className="input-icon-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Ex: Lucas Muniz"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <div className="input-icon-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exemplo@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={submitting}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Cadastrando...' : 'Salvar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalUsuario;
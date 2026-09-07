import { useState, useEffect } from 'react';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { 
  getUsuarios, 
  getUsuario, 
  createUsuario, 
  updateUsuario, 
  deleteUsuario 
} from '../../../services/usuarioService';
import ModalUsuario from '../../../components/ModalUsuario/ModalUsuario';

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      const listaUsuarios = Array.isArray(data) ? data : (data.data || []);
      setUsers(listaUsuarios);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleOpenCreateModal = () => {
    setUsuarioEditando(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (id) => {
    try {
      const user = await getUsuario(id);
      setUsuarioEditando(user);
      setIsModalOpen(true);
    } catch (err) {
      alert('Erro ao carregar dados do usuário: ' + (err.response?.data?.erro || err.message));
    }
  };

  const handleSaveUser = async (formData) => {
    if (usuarioEditando) {
      const dadosParaEnviar = { ...formData };
      if (!dadosParaEnviar.senha) delete dadosParaEnviar.senha;

      await updateUsuario(usuarioEditando.id, dadosParaEnviar);
    } else {
      await createUsuario(formData);
    }
    await fetchUsuarios();
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUsuario(id);
        await fetchUsuarios();
      } catch (err) {
        alert('Erro ao excluir usuário: ' + (err.response?.data?.erro || err.message));
      }
    }
  };

  return (
    <div className="page-container">
      <div style={styles.headerArea}>
        <h1>Lista de Usuários</h1>
        <button onClick={handleOpenCreateModal} style={styles.addButton}>
          <UserPlus size={18} />
          Novo Usuário
        </button>
      </div>

      {loading && <div style={styles.message}>Carregando...</div>}
      {error && <div style={styles.message}> Ops! {error}</div>}

      {!loading && !error && users.length > 0 && (
        <ul style={styles.userList}>
          {users.map((user) => (
            <li key={user.id} style={styles.userCard}>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{user.nome || user.name}</span>
                <span style={styles.userEmail}>{user.email}</span>
              </div>

              <div style={styles.actionArea}>
                <span style={styles.statusBadge}>ID #{user.id}</span>
                <button 
                  onClick={() => handleOpenEditModal(user.id)} 
                  style={styles.iconButton}
                  title="Editar"
                >
                  <Pencil size={18} color="var(--primary-color)" />
                </button>
                <button 
                  onClick={() => handleDeleteUser(user.id)} 
                  style={styles.iconButton}
                  title="Excluir"
                >
                  <Trash2 size={18} color="#ff4d4f" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ModalUsuario 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        usuarioEditando={usuarioEditando}
      />
    </div>
  );
}

const styles = {
  headerArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignitems: 'center',
    marginBottom: '1.5rem',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--primary-color)',
    color: '#ffffff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    boxShadow: 'var(--shadow)',
  },
  userList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  userCard: {
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  userEmail: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  actionArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statusBadge: {
    background: 'var(--badge-bg)',
    color: 'var(--primary-color)',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    margin: '2rem 0',
    fontSize: '1.2rem',
  },
};

export default Usuarios;
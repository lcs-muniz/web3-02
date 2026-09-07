import { useState, useEffect } from 'react';
import { getUsuarios } from '../../../services/usuarioService';

function Usuarios() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsers(data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Erro ao buscar usuários');
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div className="page-container">
            <h1>Lista de Usuários</h1>

            {loading && (<div style={styles.message}>Carregando...</div>)}

            {error && (<div style={styles.message}> Ops! {error}</div>)}

            {!loading && !error && users.length > 0 && (
                <ul style={styles.userList}>
                    {users.map((user) => (
                        <li key={user.id} style={styles.userCard}>
                            <div style={styles.userInfo}>
                                <span style={styles.userName}>{user.name}</span>
                                <span style={styles.userEmail}>{user.email}</span>
                            </div>

                            <div style={styles.statusBadge}>ID #{user.id}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const styles = {
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

    statusBadge: {
        background: 'var(--badge-bg)',
        color: 'var(--primary-color)',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
    },

    message: {
        textAlign: 'center',
        color: 'var(--text-secondary)',
        margin: '2rem 0',
        fontSize: '1.2rem',
    },
};

export default Usuarios;
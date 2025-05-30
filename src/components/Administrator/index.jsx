import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase';
import './styles.css';

const Administrator = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accesoPermitido, setAccesoPermitido] = useState(false);
  const navigate = useNavigate();

  // Verificar si el usuario actual es administrador
  useEffect(() => {
    const verificarAcceso = async () => {
      // Obtenemos la sesión actual
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session?.user) {
        navigate("/");
        return;
      }
      const authUser = sessionData.session.user;
      // Consultamos la tabla "usuarios" para verificar el rol
      const { data, error } = await supabase
        .from('usuarios')
        .select('rol')
        .eq('id', authUser.id)
        .single();
      if (error || !data || data.rol !== "admin") {
        navigate("/");
        return;
      }
      setAccesoPermitido(true);
    };

    verificarAcceso();
  }, [navigate]);

  // Obtener la lista de usuarios
  useEffect(() => {
    if (!accesoPermitido) return;

    const obtenerUsuarios = async () => {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nombre, discord, profile_pic');
      if (error) {
        console.error("Error al obtener usuarios:", error.message);
      } else {
        setUsuarios(data);
      }
      setLoading(false);
    };

    obtenerUsuarios();
  }, [accesoPermitido]);

  // Maneja la actualización de un usuario
  const editarUsuario = async (id, nuevosDatos) => {
    const { error } = await supabase
      .from('usuarios')
      .update(nuevosDatos)
      .eq('id', id);
    if (error) {
      alert("Error al actualizar usuario: " + error.message);
    } else {
      setUsuarios(prev =>
        prev.map(u => (u.id === id ? { ...u, ...nuevosDatos } : u))
      );
      alert("Usuario actualizado exitosamente");
    }
  };

  // Maneja la eliminación de un usuario
  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta cuenta? Esta acción es irreversible.")) return;
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .eq('id', id);
    if (error) {
      alert("Error al eliminar usuario: " + error.message);
    } else {
      setUsuarios(prev => prev.filter(u => u.id !== id));
      alert("Usuario eliminado exitosamente");
    }
  };

  // Maneja los cambios en los input inline
  const handleChange = (e, usuarioId, campo) => {
    const newValue = e.target.value;
    setUsuarios(prev =>
      prev.map(u => (u.id === usuarioId ? { ...u, [campo]: newValue } : u))
    );
  };

  if (!accesoPermitido) return null;
  if (loading) return <div>Cargando...</div>;

  return (
    <div className="admin-container">
      <h1>Panel Administrativo</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Nombre de Reddit</th>
            <th>Foto de perfil</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>
                <input
                  type="text"
                  value={usuario.nombre || ""}
                  onChange={(e) => handleChange(e, usuario.id, 'nombre')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={usuario.discord || ""}
                  onChange={(e) => handleChange(e, usuario.id, 'discord')}
                />
              </td>
              <td>
                <img
                  src={usuario.profile_pic || "https://via.placeholder.com/80"}
                  alt="Perfil"
                  className="admin-profile-img"
                />
                <input
                  type="text"
                  value={usuario.profile_pic || ""}
                  onChange={(e) => handleChange(e, usuario.id, 'profile_pic')}
                  placeholder="URL Imagen"
                />
              </td>
              <td>
                <button 
                  onClick={() => editarUsuario(usuario.id, {
                    nombre: usuario.nombre,
                    discord: usuario.discord,
                    profile_pic: usuario.profile_pic
                  })}
                >
                  Guardar
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => eliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Administrator;
import React, { useState } from 'react';
import  supabase  from '../../supabase';
import './styles.css';

const EditProfile = ({ isOpen, onClose, user, refreshProfile }) => {
  const [formData, setFormData] = useState({
    nombre: user.nombre || '',
    discord: user.discord || '',
    password: '',
    profilePic: user.profile_pic || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Preparamos los campos a actualizar en la tabla "usuarios"
    const updates = {
      nombre: formData.nombre,
      discord: formData.discord,
      profile_pic: formData.profilePic
    };

    // Actualizar contraseña en Auth (si se ingresó una nueva)
    if (formData.password && formData.password.trim() !== "") {
      const { error: authError } = await supabase.auth.updateUser({
        password: formData.password
      });
      if (authError) {
        alert("Error al actualizar contraseña: " + authError.message);
        return;
      }
      // Actualizamos también la columna "contraseña" (aunque generalmente no es seguro almacenarla en texto plano)
      updates.contraseña = formData.password;
    }

    const { error } = await supabase
      .from('usuarios')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      alert("Error al actualizar perfil: " + error.message);
    } else {
      alert("Perfil actualizado exitosamente");
      if (typeof refreshProfile === 'function') {
        refreshProfile();
      }
      onClose();
    }
  };

  const handleDeleteAccount = async () => {
  if (!window.confirm("¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.")) {
    return;
  }

  // Eliminar el registro de la tabla "usuarios"
  const { error } = await supabase
    .from('usuarios')
    .delete()
    .eq('id', user.id);
    
  if (error) {
    alert("Error al eliminar la cuenta: " + error.message);
  } else {
    alert("Cuenta eliminada exitosamente");
    await supabase.auth.signOut();
    window.location.reload();
  }
};

  if (!isOpen) return null;

  return (
    <div className="modal-overlay edit-profile">
      <div className="modal-content">
        <h2>Editar Perfil</h2>
        <form className="edit-profile-form" onSubmit={handleUpdate}>
          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <label>Nombre de Reddit (Discord):</label>
          <input
            type="text"
            name="discord"
            value={formData.discord}
            onChange={handleChange}
          />
          <label>Nueva contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="******"
          />
          <label>URL de Imagen de Perfil:</label>
          <input
            type="text"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
          />
          <button type="submit" className="update-btn">Actualizar Perfil</button>
        </form>
        <button className="delete-account-btn" onClick={handleDeleteAccount}>
          Eliminar Cuenta
        </button>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default EditProfile;
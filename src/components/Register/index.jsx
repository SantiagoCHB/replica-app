import React, { useState } from 'react';
import { signUp } from '../../supabase';
import './styles.css';

const Register = ({ isOpen, onClose, openLogin = () => {} }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    discord: '',
    email: '',
    contraseña: '',
    profilePic: ''  // Campo opcional para URL de imagen de perfil
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Llamamos a signUp pasando todos los parámetros
    const { error } = await signUp(
      formData.email,
      formData.contraseña,
      formData.nombre,
      formData.discord,
      formData.profilePic
    );
    
    if (error) {
      alert(error);
    } else {
      alert('Registro exitoso');
      openLogin(); // Llama a la función para cambiar al modal de login
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrarse en Reddit</h2>
        <p className="terms">
          Al continuar, aceptas el <a href="#">Acuerdo de Usuario</a> y la <a href="#">Política de Privacidad</a>.
        </p>
        <form className="register-form" onSubmit={handleRegister}>
          <label>Nombre completo</label>
          <input type="text" name="nombre" placeholder="Nombre completo" required onChange={handleChange} />
          
          <label>Nombre de Reddit</label>
          <input type="text" name="discord" placeholder="Nombre en Discord" onChange={handleChange} />
          
          <label>Correo electrónico *</label>
          <input type="email" name="email" placeholder="Correo electrónico" required onChange={handleChange} />
          
          <label>Contraseña</label>
          <input type="password" name="contraseña" placeholder="Contraseña" required onChange={handleChange} />
          
          <label>URL de Imagen de Perfil</label>
          <input type="text" name="profilePic" placeholder="URL de Imagen de Perfil" onChange={handleChange} />
          
          <button type="submit" className="register-btn">Registrarse</button>
        </form>
        <div className="login-link">
          <p>
            ¿Ya eres redditor? <button className="switch-modal" onClick={openLogin}>Inicia sesión</button>
          </p>
        </div>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Register;
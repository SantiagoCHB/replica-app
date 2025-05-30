import React, { useState } from 'react';
import { signIn } from '../../supabase';
import './styles.css';

const Login = ({ isOpen, onClose, openRegister }) => {
  const [formData, setFormData] = useState({ email: '', contraseña: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await signIn(formData.email, formData.contraseña);

    if (error) {
      alert(error.message);
    } else {
      alert('Inicio de sesión exitoso');
      onClose(); // Cierra el modal después del login
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Iniciar Sesión</h2>
        <p className="terms">Al continuar, aceptas el <a href="#">Acuerdo de Usuario</a> y la <a href="#">Política de Privacidad</a>.</p>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Correo electrónico *</label>
          <input type="email" name="email" placeholder="Correo electrónico" required onChange={handleChange} />
          <label>Contraseña</label>
          <input type="password" name="contraseña" placeholder="Contraseña" required onChange={handleChange} />
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
        <div className="register-section">
          <p>¿Es tu primera vez en Reddit? <button className="switch-modal" onClick={openRegister}>Regístrate</button></p>
        </div>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Login;
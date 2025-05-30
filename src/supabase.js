import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hiqvaxamwwemmxndhodb.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcXZheGFtd3dlbW14bmRob2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Mzc3MzIsImV4cCI6MjA2NDExMzczMn0.0Tx7ZQnypw0Q-j9HsCnF6bfJV79Fcds6-igi3z83KBY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Función para registrar un usuario.
 * Se crea primero el usuario en Supabase Auth y luego se inserta una entrada en la tabla "usuarios".
 * Los campos insertados son:
 *  - id: proveniente del usuario de Auth
 *  - nombre
 *  - discord
 *  - email
 *  - contraseña
 *  - rol (fijado en 'usuario')
 *  - profile_pic (se inserta solo si se proporcionó una URL no vacía)
 *
 * NOTA: Si tienes activada la confirmación de correo en Supabase, data.user vendrá como null,
 *       impidiendo obtener el id. Para que la inserción se haga de inmediato, desactiva la confirmación.
 */
export const signUp = async (email, password, nombre, discord, profilePic) => {
  try {
    // Registro con Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Error en autenticación:", error.message);
      return { error: error.message };
    }

    // Si la confirmación de correo está activada, data.user puede ser null.
    const userId = data.user?.id;
    if (!userId) {
      // En este caso se avisa al usuario y se detiene la inserción.
      alert('Registro exitoso. Por favor, confirma tu correo electrónico para continuar.');
      return { data };
    }

    // Preparamos el objeto a insertar en la tabla "usuarios" (minúsculas)
    const payload = {
      id: userId,
      nombre,
      discord,
      email,
      contraseña: password,
      rol: 'usuario'
    };

    if (profilePic && profilePic.trim() !== "") {
      payload.profile_pic = profilePic;
    }

    // Inserción en la tabla "usuarios"
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert([payload]);

    if (insertError) {
      console.error("Error al insertar en usuarios:", insertError.message);
      return { error: insertError.message };
    }

    return { data };
  } catch (err) {
    console.error("Error inesperado:", err);
    return { error: "Error inesperado al crear cuenta." };
  }
};

/**
 * Función para iniciar sesión.
 */
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Error al iniciar sesión:", error.message);
    return { error: error.message };
  }
  return { data };
};

/**
 * Función para cerrar sesión.
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export default supabase;
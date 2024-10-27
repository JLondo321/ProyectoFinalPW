import bcrypt from 'bcryptjs';
import { getConnection } from '../database/database.js';
import jwt from 'jsonwebtoken';
import config from '../config.js'; 

export const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    let connection;
    try {
        connection = await getConnection();

        // Buscar el usuario por correo electrónico
        const [rows] = await connection.query('SELECT * FROM Usuarios WHERE email = ?', [email]);

        // Verificar si el usuario existe
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const usuario = rows[0];

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const esContraseñaValida = await bcrypt.compare(password, usuario.password);
        if (!esContraseñaValida) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, config.jwtSecret, { expiresIn: '1h' });
        const { password: _, ...usuarioSinContraseña } = usuario; 
        return res.status(200).json({ message: 'Inicio de sesión exitoso.', token, usuario: usuarioSinContraseña });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    } finally {
        if (connection) connection.release();
    }
};
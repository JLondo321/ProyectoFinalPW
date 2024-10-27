import express from 'express';
import cors from 'cors';
import RegistrarRuta from'./Rutas/RegistrarRuta.js'
import LoginRuta from './Rutas/LoginRuta.js'
import userRoutes from './Rutas/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors())

app.get('/', (req, res) => {
  res.send('Bienvenido al API del Banco'); 
});

app.use('/api', RegistrarRuta); 
app.use('/api', LoginRuta); 
app.use('/api', userRoutes);

app.set('port', process.env.PORT || 3000);

export default app;
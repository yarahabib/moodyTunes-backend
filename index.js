import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

const corsOptions = {
  origin: 'https://moodytune.onrender.com',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.listen(8800, () => {
  console.log('API working!');
});

app.use(express.json());
app.use(cors({ origin: 'https://moodytune.onrender.com' }));
app.use('/api/auth', authRoutes);

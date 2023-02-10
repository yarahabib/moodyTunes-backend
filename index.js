import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.listen(8800, () => {
  console.log('API working!');
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/auth', authRoutes);

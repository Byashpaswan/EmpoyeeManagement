import express from 'express';
import cors from 'cors';
import morgan  from "morgan"
import helmet from "helmet"
import employeeRoutes from './routes/index.router';
import { errorHandler } from './middeware/errorHandler';

const app = express();

app.use(cors({
    origin:'http://localhost:4200'
}));
app.use(express.json());
app.use(morgan('dev'))
app.use(helmet())
app.use((req, _res, next) => {
  console.log('➡ Incoming:', req.method, req.url);
  next();
});

app.use(errorHandler)


app.use('/api', employeeRoutes);

export default app;

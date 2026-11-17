import express from 'express';
import cors from 'cors';
import { PORT } from './src/config/Constants.js';
import DBConnect from './src/config/DBConnect.js';
import todoRouter from './src/routes/TodoRoutes.js';
import globalErrorHandler from './src/middleware/GlobalErrorHandler.js';

const app = express();

DBConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/todos', todoRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
})
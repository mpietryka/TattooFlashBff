import express from 'express';
import cors from 'cors';
import { config } from '@/config';
import { errorHandler } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';
import imageRoutes from '@/routes/images';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/api/images', imageRoutes);

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 
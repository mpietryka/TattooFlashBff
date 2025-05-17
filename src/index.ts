import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from '@/config';
import { errorHandler } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';
import imageRoutes from '@/routes/images';

const app = express();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
});
app.use(limiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/images', imageRoutes);

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 
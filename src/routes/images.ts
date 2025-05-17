import { Router } from 'express';
import { CloudinaryService } from '@/services/cloudinary';

const router = Router();

router.get('/folder/:folder', async (req, res, next) => {
  try {
    const { folder } = req.params;
    const images = await CloudinaryService.getImagesFromFolder(folder);
    res.json(images);
  } catch (error) {
    next(error);
  }
});

export default router; 
import { v2 as cloudinary } from 'cloudinary';
import { logger } from '@/utils/logger';
import { AppError } from '@/middleware/errorHandler';
import { CloudinaryImage, CloudinaryResource } from '@/types/cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
    static async getImagesFromFolder(folder: string): Promise<CloudinaryImage[]> {
        try {
            const result = await cloudinary.search
                .expression(`folder:${folder}/*`)
                .sort_by('created_at', 'desc')
                .max_results(100)
                .execute();

            logger.info(`Search result:`, {
                total: result.total_count,
                resources: result.resources.length,
                folder: folder
            });

            if (result.resources.length === 0) {
                logger.warn(`No images found in folder: ${folder}`);
            }

            return result.resources.map((resource: CloudinaryResource) => ({
                public_id: resource.public_id,
                url: resource.url,
            }));
        } catch (error) {
            logger.error('Error fetching images from Cloudinary:', error);
            throw new AppError(500, 'Failed to fetch images from Cloudinary');
        }
    }
} 
import { v2 as cloudinary } from 'cloudinary';
import { config } from '@/config';
import { logger } from '@/utils/logger';
import { AppError } from '@/middleware/errorHandler';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryImage {
    public_id: string;
    url: string;
    secure_url: string;
    format: string;
    width: number;
    height: number;
}

export class CloudinaryService {
    static async getImagesFromFolder(folder: string): Promise<CloudinaryImage[]> {
        try {
            logger.info(`Searching for images in folder: ${folder}`);

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

            return result.resources.map((resource: any) => ({
                public_id: resource.public_id,
                url: resource.url,
                secure_url: resource.secure_url,
                format: resource.format,
                width: resource.width,
                height: resource.height,
            }));
        } catch (error) {
            logger.error('Error fetching images from Cloudinary:', error);
            throw new AppError(500, 'Failed to fetch images from Cloudinary');
        }
    }
} 
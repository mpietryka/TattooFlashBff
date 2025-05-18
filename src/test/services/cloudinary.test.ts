import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from '@/services/cloudinary';
import { AppError } from '@/middleware/errorHandler';
import { CloudinaryResource } from '@/types/cloudinary';

type CloudinarySearchMock = {
  expression: jest.Mock;
  sort_by: jest.Mock;
  max_results: jest.Mock;
  execute: jest.Mock;
};

type CloudinaryV2Mock = {
  config: jest.Mock;
  search: CloudinarySearchMock;
};

jest.mock('cloudinary', () => {
  const mockExecute = jest.fn();
  const mockSearch: CloudinarySearchMock = {
    expression: jest.fn().mockReturnThis(),
    sort_by: jest.fn().mockReturnThis(),
    max_results: jest.fn().mockReturnThis(),
    execute: mockExecute,
  };

  return {
    v2: {
      config: jest.fn(),
      search: mockSearch,
    } as CloudinaryV2Mock,
  };
});

describe('CloudinaryService', () => {
  const mockCloudinaryResource: CloudinaryResource = {
    public_id: 'test-folder/test-image',
    url: 'http://cloudinary.com/test-image.jpg',
    secure_url: 'https://cloudinary.com/test-image.jpg',
    format: 'jpg',
    width: 800,
    height: 600,
    created_at: '2024-03-20T12:00:00Z',
    bytes: 1024,
    type: 'upload',
    etag: 'test-etag',
    placeholder: false,
    resource_type: 'image',
    tags: ['test'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getImagesFromFolder', () => {
    it('should successfully fetch and transform images from a folder', async () => {
      const mockExecute = jest.fn().mockResolvedValue({
        total_count: 1,
        resources: [mockCloudinaryResource],
      });
      ((cloudinary.search as unknown) as CloudinarySearchMock).execute = mockExecute;

      const result = await CloudinaryService.getImagesFromFolder('test-folder');

      expect(cloudinary.search.expression).toHaveBeenCalledWith('folder:test-folder/*');
      expect(cloudinary.search.sort_by).toHaveBeenCalledWith('created_at', 'desc');
      expect(cloudinary.search.max_results).toHaveBeenCalledWith(100);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        public_id: mockCloudinaryResource.public_id,
        url: mockCloudinaryResource.url,
        secure_url: mockCloudinaryResource.secure_url,
        format: mockCloudinaryResource.format,
        width: mockCloudinaryResource.width,
        height: mockCloudinaryResource.height,
      });
    });

    it('should return an empty array when no images are found', async () => {
      const mockExecute = jest.fn().mockResolvedValue({
        total_count: 0,
        resources: [],
      });
      ((cloudinary.search as unknown) as CloudinarySearchMock).execute = mockExecute;

      const result = await CloudinaryService.getImagesFromFolder('empty-folder');

      expect(result).toHaveLength(0);
    });

    it('should throw an AppError when Cloudinary API call fails', async () => {
      const mockExecute = jest.fn().mockRejectedValue(new Error('API Error'));
      ((cloudinary.search as unknown) as CloudinarySearchMock).execute = mockExecute;

      await expect(CloudinaryService.getImagesFromFolder('test-folder')).rejects.toThrow(AppError);
      await expect(CloudinaryService.getImagesFromFolder('test-folder')).rejects.toMatchObject({
        statusCode: 500,
        message: 'Failed to fetch images from Cloudinary',
      });
    });
  });
}); 
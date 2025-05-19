export interface CloudinaryImage {
  public_id: string;
  url: string;
}

export interface CloudinaryResource {
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  created_at: string;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  resource_type: string;
  tags: string[];
} 
/**
 * Storage Functions Module (storage.ts)
 * 
 * Local storage integration mock.
 * Updated to remove Supabase dependency.
 */

export function validateFile(data: any) {
  if (!data) return { valid: false, error: 'No data provided' };
  return { valid: true };
}

export async function storagePut(key: string, data: any) {
  console.log("Mock Storage Put:", key);
  return {
    success: true,
    url: `/uploads/${key}`,
    key: key,
  };
}

export async function storageGet(key: string) {
  return null;
}

export async function storageDelete(key: string) {
  console.log("Mock Storage Delete:", key);
}

export async function generateSignedUrl(key: string) {
  return `/uploads/${key}`;
}

export async function storageExists(key: string) {
  return true;
}

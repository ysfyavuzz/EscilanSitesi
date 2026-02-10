import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Image, Video, X } from 'lucide-react';

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<void>;
  maxFiles?: number;
  allowedFileTypes?: string[];
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  maxFiles = 5,
  allowedFileTypes = ['image/*', 'video/*'],
  disabled = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const filteredFiles = newFiles.filter(file =>
        allowedFileTypes.some(type => file.type.startsWith(type.replace('*', '')))
      );

      const combinedFiles = [...selectedFiles, ...filteredFiles];
      setSelectedFiles(combinedFiles.slice(0, maxFiles));
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove));
  };

  const handleUploadClick = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    try {
      await onUpload(selectedFiles);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      // Hata yönetimi burada yapılabilir (örneğin kullanıcıya bildirim gösterme)
    } finally {
      setIsUploading(false);
    }
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />;
    } else if (file.type.startsWith('video/')) {
      return (
        <video controls className="w-full h-full object-cover">
          <source src={URL.createObjectURL(file)} type={file.type} />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      );
    }
    return <span className="text-sm text-muted-foreground">{file.name}</span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="file-upload" className="flex-1 cursor-pointer">
          <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md hover:border-primary transition-colors">
            <UploadCloud className="w-6 h-6 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">Dosya seçmek için tıklayın veya sürükleyin</span>
          </div>
        </Label>
        <Input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          multiple
          onChange={handleFileChange}
          accept={allowedFileTypes.join(',')}
          className="hidden"
          disabled={disabled || isUploading}
        />
        <Button
          onClick={handleUploadClick}
          disabled={selectedFiles.length === 0 || isUploading || disabled}
          className="flex-shrink-0"
        >
          {isUploading ? 'Yükleniyor...' : 'Yükle'}
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group border rounded-md overflow-hidden aspect-video">
              {getFilePreview(file)}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveFile(file)}
                disabled={disabled || isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedFiles.length === maxFiles && (
        <p className="text-sm text-yellow-600">Maksimum dosya sayısına ulaşıldı ({maxFiles}).</p>
      )}
    </div>
  );
};

export default FileUpload;

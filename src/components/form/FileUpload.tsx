
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileUpload?: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  label?: string;
}

const FileUpload = ({ 
  onFileUpload, 
  acceptedTypes = ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
  maxSize = 5, // Default 5MB
  label = "Cargar archivo"
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type
    const fileType = file.type;
    if (!acceptedTypes.includes(fileType) && 
        !acceptedTypes.split(', ').some(type => file.name.endsWith(type))) {
      toast({
        title: "Tipo de archivo no soportado",
        description: `Por favor, sube un archivo ${acceptedTypes.replace(/,/g, ' o')}`,
        variant: "destructive"
      });
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Archivo demasiado grande",
        description: `El archivo debe ser menor a ${maxSize}MB`,
        variant: "destructive"
      });
      return;
    }

    setFile(file);
    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="space-y-4">
            <div className="mx-auto bg-muted rounded-full p-3 w-14 h-14 flex items-center justify-center">
              <Upload className="w-6 h-6 text-agri-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-base font-medium">
                {label}
              </p>
              <p className="text-sm text-muted-foreground">
                Arrastra y suelta tu archivo aquí o haz click para buscarlo
              </p>
              <p className="text-xs text-muted-foreground">
                {acceptedTypes.replace(/\./g, '').toUpperCase()} hasta {maxSize}MB
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Buscar Archivo
            </Button>
            <input 
              type="file" 
              id="fileInput" 
              className="hidden" 
              accept={acceptedTypes}
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between bg-muted p-3 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

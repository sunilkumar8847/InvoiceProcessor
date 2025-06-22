// src/api/apiClient.ts
import { InvoiceFile, InvoiceField, ExtractedInvoice } from '../types';

// Mock API client - to be replaced with actual API integration
export const apiClient = {
  uploadFile: async (file: File): Promise<InvoiceFile> => {
    // Simulate file upload
    return new Promise((resolve, reject) => {
      const mockFile: InvoiceFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        totalSize: file.size,
        progress: 0,
        status: 'uploading'
      };
      
      // Simulate upload progress
      const interval = setInterval(() => {
        mockFile.progress += 10;
        if (mockFile.progress >= 100) {
          clearInterval(interval);
          mockFile.status = 'completed';
          resolve(mockFile);
        }
      }, 300);
      
      // Simulate error for files with "invalid" in name
      if (file.name.toLowerCase().includes('invalid')) {
        clearInterval(interval);
        mockFile.status = 'error';
        mockFile.errorMessage = 'Invalid Format';
        reject(mockFile);
      }
    });
  },
  
  extractData: async (fileIds: string[], selectedFields: string[]): Promise<ExtractedInvoice[]> => {
    // Simulate data extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Invoice Document',
            vendorName: 'Tech Innovations Inc.',
            date: '24-01-2025',
            clientName: 'Global Enterprise Solutions',
            totalPrice: 456750,
            location: selectedFields.includes('location') ? 'New York' : undefined,
            gst: selectedFields.includes('gst') ? '18%' : undefined
          }
        ]);
      }, 1000);
    });
  },
  
  exportData: async (format: 'json' | 'pdf' | 'xls'): Promise<string> => {
    // Simulate export
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`data:application/${format},exported_content`);
      }, 500);
    });
  }
};

// src/hooks/useInvoiceStore.tsx
import { create } from 'zustand';
import { InvoiceFile, InvoiceField, ExtractedInvoice } from '../types';

interface InvoiceState {
  files: InvoiceFile[];
  selectedFields: InvoiceField[];
  extractedData: ExtractedInvoice[];
  addFile: (file: InvoiceFile) => void;
  updateFileProgress: (id: string, progress: number) => void;
  updateFileStatus: (id: string, status: 'uploading' | 'completed' | 'error', errorMessage?: string) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  setSelectedFields: (fields: InvoiceField[]) => void;
  toggleFieldSelection: (fieldId: string) => void;
  setExtractedData: (data: ExtractedInvoice[]) => void;
  clearExtractedData: () => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
  files: [],
  selectedFields: [
    { id: 'vendorName', name: 'Vendor Name', selected: true },
    { id: 'date', name: 'Date of Invoice', selected: true },
    { id: 'location', name: 'Location', selected: false },
    { id: 'clientName', name: 'Client Name', selected: true },
    { id: 'gst', name: 'GST', selected: false },
    { id: 'totalPrice', name: 'Total Price', selected: true },
  ],
  extractedData: [],
  
  addFile: (file) => set((state) => ({ 
    files: [...state.files, file] 
  })),
  
  updateFileProgress: (id, progress) => set((state) => ({
    files: state.files.map(file => 
      file.id === id ? { ...file, progress } : file
    )
  })),
  
  updateFileStatus: (id, status, errorMessage) => set((state) => ({
    files: state.files.map(file => 
      file.id === id ? { ...file, status, errorMessage } : file
    )
  })),
  
  removeFile: (id) => set((state) => ({
    files: state.files.filter(file => file.id !== id)
  })),
  
  clearFiles: () => set({ files: [] }),
  
  setSelectedFields: (fields) => set({ selectedFields: fields }),
  
  toggleFieldSelection: (fieldId) => set((state) => ({
    selectedFields: state.selectedFields.map(field => 
      field.id === fieldId ? { ...field, selected: !field.selected } : field
    )
  })),
  
  setExtractedData: (data) => set({ extractedData: data }),
  
  clearExtractedData: () => set({ extractedData: [] }),
}));

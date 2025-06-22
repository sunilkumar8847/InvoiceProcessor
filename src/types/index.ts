// src/types/index.ts
export interface InvoiceFile {
    id: string;
    name: string;
    size: number;
    totalSize: number;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    errorMessage?: string;
  }
  
  export interface InvoiceField {
    id: string;
    name: string;
    selected: boolean;
  }
  
  export interface ExtractedInvoice {
    id: string;
    name: string;
    vendorName: string;
    date: string;
    clientName: string;
    totalPrice: number;
    location?: string;
    gst?: string;
  }
export interface Contract {
  id: string;
  name: string;
  parties: string;
  start?: string;
  expiry: string;
  status: 'Active' | 'Expired' | 'Renewal Due';
  risk: 'Low' | 'Medium' | 'High';
  clauses?: Clause[];
  insights?: Insight[];
  evidence?: Evidence[];
}

export interface Clause {
  title: string;
  summary: string;
  confidence: number;
}

export interface Insight {
  risk: 'Low' | 'Medium' | 'High';
  message: string;
}

export interface Evidence {
  source: string;
  snippet: string;
  relevance: number;
}

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

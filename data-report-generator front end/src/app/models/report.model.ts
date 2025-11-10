export interface Report {
  id: number;
  title: string;
  prompt: string;
  report: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_change';
  note?: string;
  userEmail?: string;
  file_path?: string;
  pdf_path?: string;     
  chart_data?: any;       
  created_at?: string;
}


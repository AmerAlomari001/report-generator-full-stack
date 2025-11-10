export interface Report {
  id: number;
  title: string;
  prompt: string;
  report: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_change';
  note?: string;
  userEmail?: string;
}

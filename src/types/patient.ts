export interface Patient {
  initials: string;
  name: string;
  demographics: string;
  id: string;
  pid?: string;
  branch: string;
  contact: string;
  lastVisit: string;
  status: 'ACTIVE' | 'CRITICAL' | 'PENDING' | 'DISCHARGED';
  statusColor: string;
  initialsBg: string;
}

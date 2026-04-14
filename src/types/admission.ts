export type AdmissionStatus = 'ADMITTED' | 'DISCHARGED' | 'TRANSFERRING';

export interface AdmittedPatient {
  id: string;
  patientId: string;
  patientName: string;
  roomNumber: string;
  admissionDate: string;
  dischargeDate?: string;
  department: string;
  attendingDoctor: string;
  status: AdmissionStatus;
  totalFees: number;
  paidFees: number;
}

export interface Room {
  id: string;
  number: string;
  type: 'GENERAL' | 'SEMIPRIVATE' | 'PRIVATE' | 'ICU';
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
  pricePerDay: number;
  department: string;
}

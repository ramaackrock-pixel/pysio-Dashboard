import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PATIENTS } from '@/data/patients';
import { INITIAL_APPOINTMENTS } from '@/data/appointments';
import { STAFF_MEMBERS as INITIAL_STAFF } from '@/data/staff';
import { INITIAL_MEDICAL_RECORDS } from '@/data/medicalRecords';
import { INITIAL_INVOICES } from '@/data/billing';
import { CLINIC_BRANCHES as INITIAL_BRANCHES } from '@/data/branches';
import { INITIAL_ADMITTED_PATIENTS, INITIAL_ROOMS } from '@/data/admission';

import type { Patient } from '@/types/patient';
import type { Appointment } from '@/types/appointment';
import type { StaffMember } from '@/types/staff';
import type { MedicalRecord } from '@/types/medicalRecord';
import type { Invoice } from '@/types/billing';
import type { ClinicBranch } from '@/types/branches';
import type { AdmittedPatient, Room } from '@/types/admission';

interface AppDataContextType {
  patients: Patient[];
  appointments: Appointment[];
  staff: StaffMember[];
  medicalRecords: MedicalRecord[];
  invoices: Invoice[];
  branches: ClinicBranch[];
  admittedPatients: AdmittedPatient[];
  rooms: Room[];

  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;

  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (id: number) => void;

  addStaff: (member: StaffMember) => void;
  updateStaff: (member: StaffMember) => void;
  deleteStaff: (id: string) => void;

  addMedicalRecord: (record: MedicalRecord) => void;
  updateMedicalRecord: (record: MedicalRecord) => void;
  deleteMedicalRecord: (id: string) => void;

  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;

  addBranch: (branch: ClinicBranch) => void;
  updateBranch: (branch: ClinicBranch) => void;
  deleteBranch: (id: string) => void;

  addAdmittedPatient: (patient: AdmittedPatient) => void;
  updateAdmittedPatient: (patient: AdmittedPatient) => void;
  deleteAdmittedPatient: (id: string) => void;

  updateRoom: (room: Room) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('patients') : null;
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('appointments') : null;
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('staff') : null;
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('medicalRecords') : null;
    return saved ? JSON.parse(saved) : INITIAL_MEDICAL_RECORDS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('invoices') : null;
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [branches, setBranches] = useState<ClinicBranch[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('branches') : null;
    return saved ? JSON.parse(saved) : INITIAL_BRANCHES;
  });

  const [admittedPatients, setAdmittedPatients] = useState<AdmittedPatient[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('admittedPatients') : null;
    return saved ? JSON.parse(saved) : INITIAL_ADMITTED_PATIENTS;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('rooms') : null;
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('appointments', JSON.stringify(appointments));
    localStorage.setItem('staff', JSON.stringify(staff));
    localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
    localStorage.setItem('invoices', JSON.stringify(invoices));
    localStorage.setItem('branches', JSON.stringify(branches));
    localStorage.setItem('admittedPatients', JSON.stringify(admittedPatients));
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [patients, appointments, staff, medicalRecords, invoices, branches, admittedPatients, rooms]);

  // Patients Actions
  const addPatient = (patient: Patient) => setPatients(prev => [patient, ...prev]);
  const updatePatient = (patient: Patient) => setPatients(prev => prev.map(p => p.id === patient.id ? patient : p));
  const deletePatient = (id: string) => setPatients(prev => prev.filter(p => p.id !== id));

  // Appointments Actions
  const addAppointment = (appointment: Appointment) => setAppointments(prev => [appointment, ...prev]);
  const updateAppointment = (appointment: Appointment) => setAppointments(prev => prev.map(a => a.id === appointment.id ? appointment : a));
  const deleteAppointment = (id: number) => setAppointments(prev => prev.filter(a => a.id !== id));

  // Staff Actions
  const addStaff = (member: StaffMember) => setStaff(prev => [member, ...prev]);
  const updateStaff = (member: StaffMember) => setStaff(prev => prev.map(s => s.id === member.id ? member : s));
  const deleteStaff = (id: string) => setStaff(prev => prev.filter(s => s.id !== id));

  // Medical Records Actions
  const addMedicalRecord = (record: MedicalRecord) => setMedicalRecords(prev => [record, ...prev]);
  const updateMedicalRecord = (record: MedicalRecord) => setMedicalRecords(prev => prev.map(r => r.id === record.id ? record : r));
  const deleteMedicalRecord = (id: string) => setMedicalRecords(prev => prev.filter(r => r.id !== id));

  // Invoices Actions
  const addInvoice = (invoice: Invoice) => setInvoices(prev => [invoice, ...prev]);
  const updateInvoice = (invoice: Invoice) => setInvoices(prev => prev.map(i => i.id === invoice.id ? invoice : i));
  const deleteInvoice = (id: string) => setInvoices(prev => prev.filter(i => i.id !== id));

  // Branches Actions
  const addBranch = (branch: ClinicBranch) => setBranches(prev => [branch, ...prev]);
  const updateBranch = (branch: ClinicBranch) => setBranches(prev => prev.map(b => b.id === branch.id ? branch : b));
  const deleteBranch = (id: string) => setBranches(prev => prev.filter(b => b.id !== id));

  // Admission Actions
  const addAdmittedPatient = (patient: AdmittedPatient) => setAdmittedPatients(prev => [patient, ...prev]);
  const updateAdmittedPatient = (patient: AdmittedPatient) => setAdmittedPatients(prev => prev.map(p => p.id === patient.id ? patient : p));
  const deleteAdmittedPatient = (id: string) => setAdmittedPatients(prev => prev.filter(p => p.id !== id));

  const updateRoom = (room: Room) => setRooms(prev => prev.map(r => r.id === room.id ? room : r));

  return (
    <AppDataContext.Provider value={{
      patients, appointments, staff, medicalRecords, invoices, branches,
      addPatient, updatePatient, deletePatient,
      addAppointment, updateAppointment, deleteAppointment,
      addStaff, updateStaff, deleteStaff,
      addMedicalRecord, updateMedicalRecord, deleteMedicalRecord,
      addInvoice, updateInvoice, deleteInvoice,
      addBranch, updateBranch, deleteBranch,
      admittedPatients, rooms,
      addAdmittedPatient, updateAdmittedPatient, deleteAdmittedPatient,
      updateRoom
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

import { storageService } from './storageService';
import type { Patient } from '../types/patient';
import type { Appointment } from '../types/appointment';
import type { StaffMember } from '../types/staff';

/**
 * API Service
 * Centralizes business logic for data manipulation.
 * Preparing for full API integration.
 */

export const apiService = {
  // --- Patient Logic ---
  preparePatient(data: Partial<Patient>): Patient {
    const name = data.name || 'Unknown Patient';
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    // Status color logic
    let statusColor = 'bg-slate-50 text-slate-600 border border-slate-200';
    if (data.status === 'ACTIVE') statusColor = 'bg-[#e1f5f5] text-[#5ab2b2] border border-[#b2dfdf]';
    if (data.status === 'CRITICAL') statusColor = 'bg-[#fff5f4] text-[#c73a3a] border border-[#ffdbdb]';
    if (data.status === 'PENDING') statusColor = 'bg-[#fff8e6] text-[#b38600] border border-[#ffeca3]';
    if (data.status === 'DISCHARGED') statusColor = 'bg-[#f4f6f8] text-[#5c6d86] border border-[#d6dde9]';

    return {
      ...data,
      id: data.id || `PID-${Math.floor(Math.random() * 9000) + 1000}`,
      initials,
      statusColor,
      initialsBg: data.initialsBg || 'bg-teal-100 text-teal-700',
      lastVisit: data.lastVisit || new Date().toLocaleDateString('en-US'),
      diseases: data.diseases || [],
      conditions: data.conditions || [],
      assignments: data.assignments || [],
      assignedDoctor: data.assignedDoctor || data.consultedBy || 'Dr. Elias Thorne'
    } as Patient;
  },

  // --- Appointment Logic ---
  prepareAppointment(data: Partial<Appointment>): Appointment {
    return {
      ...data,
      id: data.id || Date.now(),
      initials: data.patientName ? data.patientName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??',
      initialsBg: data.initialsBg || 'bg-teal-100 text-teal-700',
    } as Appointment;
  },

  // --- Staff Logic ---
  prepareStaff(data: Partial<StaffMember>): StaffMember {
    return {
      ...data,
      id: data.id || `STF-${Math.floor(Math.random() * 10000)}`,
      department: data.department || (data.role === 'Admin / Receptionist' ? 'Administration' : 'Physiotherapy'),
      avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'Staff')}&background=random`,
      status: data.status || 'Active'
    } as StaffMember;
  }
};

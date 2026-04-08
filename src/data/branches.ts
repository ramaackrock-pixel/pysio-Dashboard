import type { ClinicBranch } from '../types/branches';

export const CLINIC_BRANCHES: ClinicBranch[] = [
  {
    id: 'BR-101',
    name: 'Downtown Clinic',
    address: '12-B High St, City Center',
    manager: 'Dr. Elias Thorne',
    phone: '+91 91234-56789',
    staffCount: 18,
    patientCount: 1450,
    totalRevenue: 2854000,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
    performance: {
      weeklyRevenue: [40000, 45000, 42000, 48000, 46000, 50000, 52000],
      revenueGrowth: 12.5
    }
  },
  {
    id: 'BR-102',
    name: 'North Wellness',
    address: '45 Green Park, North Sector',
    manager: 'Dr. Lena Voss',
    phone: '+91 98765-43210',
    staffCount: 12,
    patientCount: 890,
    totalRevenue: 1240500,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1586773860418-d373a56635bd?auto=format&fit=crop&q=80&w=600',
    performance: {
      weeklyRevenue: [20000, 22000, 21000, 19000, 23000, 25000, 24000],
      revenueGrowth: 8.2
    }
  },
  {
    id: 'BR-103',
    name: 'Westside Annex',
    address: 'Plot 7, West Coast Dr',
    manager: 'Sarah Jenkins',
    phone: '+91 99887-76655',
    staffCount: 6,
    patientCount: 340,
    totalRevenue: 480000,
    status: 'Expanding',
    image: 'https://images.unsplash.com/photo-1576089234411-497d3ef20de2?auto=format&fit=crop&q=80&w=600',
    performance: {
      weeklyRevenue: [5000, 7000, 8000, 10000, 12000, 15000, 14000],
      revenueGrowth: 35.0
    }
  },
  {
    id: 'BR-104',
    name: 'South Suburban',
    address: 'B-2 Mall Rd, South Sector',
    manager: 'Marcus Webb',
    phone: '+91 88776-65544',
    staffCount: 4,
    patientCount: 120,
    totalRevenue: 150000,
    status: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    performance: {
      weeklyRevenue: [15000, 14000, 12000, 10000, 8000, 5000, 2000],
      revenueGrowth: -4.5
    }
  }
];

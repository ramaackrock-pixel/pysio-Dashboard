import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Patient } from '../../types/patient';

interface EditPatientProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EditPatient({ patient, isOpen, onClose, onSave }: EditPatientProps) {
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: '',
    id: '',
    contact: '',
    demographics: '',
    branch: 'Central Medical Plaza',
    status: 'ACTIVE',
    lastVisit: new Date().toLocaleDateString('en-US')
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        name: '',
        id: '',
        contact: '',
        demographics: '',
        branch: 'Central Medical Plaza',
        status: 'ACTIVE',
        lastVisit: new Date().toLocaleDateString('en-US')
      });
    }
  }, [patient, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {patient ? 'Edit Patient Record' : 'Add New Patient'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors bg-slate-50 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient ID (Optional)</label>
              <input 
                type="text" 
                name="id"
                value={formData.id || ''}
                onChange={handleChange}
                placeholder="Auto-generated if empty"
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                disabled={!!patient}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Number</label>
              <input 
                type="text" 
                name="contact"
                value={formData.contact || ''}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Demographics</label>
              <input 
                type="text" 
                name="demographics"
                value={formData.demographics || ''}
                onChange={handleChange}
                placeholder="Male • 45 Yrs"
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Branch Location</label>
              <select 
                name="branch"
                value={formData.branch || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
              >
                <option value="Central Medical Plaza">Central Medical Plaza</option>
                <option value="Westside Clinic">Westside Clinic</option>
                <option value="North Wellness">North Wellness</option>
                <option value="Downtown Clinic">Downtown Clinic</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
              <select 
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="PENDING">PENDING</option>
                <option value="DISCHARGED">DISCHARGED</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Visit Date</label>
              <input 
                type="text" 
                name="lastVisit"
                value={formData.lastVisit || ''}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-4 pt-8 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 font-bold text-white bg-[#5ab2b2] hover:bg-[#439c9c] rounded-xl transition-colors text-sm shadow-lg shadow-teal-500/20"
            >
              <Save size={18} />
              <span>{patient ? 'Save Changes' : 'Add Patient'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
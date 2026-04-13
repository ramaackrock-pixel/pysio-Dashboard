import React, { useState, useEffect } from 'react';
import { X, Save, FileText, User, Calendar } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';
import type { MedicalRecord, MedicalRecordType } from '@/types/medicalRecord';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: any) => void;
}

export default function RecordModal({ isOpen, onClose, onSave }: RecordModalProps) {
  const { patients } = useAppData();
  const [formData, setFormData] = useState<any>({
    patientName: '',
    pid: '',
    recordType: 'REPORT' as MedicalRecordType,
    fileName: '',
    doctor: '',
    uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        patientName: '',
        pid: '',
        recordType: 'REPORT',
        fileName: '',
        doctor: 'Dr. Julian Vance',
        uploadedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const patientName = e.target.value;
    const patient = patients.find(p => p.name === patientName);
    if (patient) {
      setFormData((prev: any) => ({ ...prev, patientName, pid: patient.id }));
    } else {
      setFormData((prev: any) => ({ ...prev, patientName }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Upload Lab Report / Record</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors bg-slate-50 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Patient</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  name="patientName"
                  value={formData.patientName}
                  onChange={handlePatientChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                  required
                >
                  <option value="">Select a patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.name}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Record Type</label>
                <select
                  name="recordType"
                  value={formData.recordType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                >
                  <option value="REPORT">REPORT / LAB</option>
                  <option value="X-RAY">X-RAY</option>
                  <option value="MRI">MRI</option>
                  <option value="PRESCRIPTION">PRESCRIPTION</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Doctor</label>
                <input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">File Name</label>
              <div className="relative">
                <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="fileName"
                  value={formData.fileName}
                  onChange={handleChange}
                  placeholder="e.g. blood_test_results.pdf"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 italic">* In a real app, this would be a file upload field.</p>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
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
              <span>Upload Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

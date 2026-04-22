import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export default function EditPatient({ patient, allPatients, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    contact: '',
    demographics: '',
    branch: 'Central Medical Plaza',
    status: 'ACTIVE',
    consultedBy: 'Dr. Elias Thorne',
    lastVisit: new Date().toLocaleDateString('en-US')
  });

  const [error, setError] = useState(null);

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
        consultedBy: 'Dr. Elias Thorne',
        lastVisit: new Date().toLocaleDateString('en-US')
      });
    }
    setError(null);
  }, [patient, isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Numeric only validation for contact
    if (name === 'contact') {
      const numericValue = value.replace(/[^\d]/g, '').substring(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      setError(null);
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number length
    if (formData.contact && formData.contact.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    
    // Check for duplicate phone number
    const isDuplicate = (allPatients || []).some(p => 
      p.contact === formData.contact && (!patient || p.id !== patient.id)
    );

    if (isDuplicate) {
      setError('Phone number already exists for another patient.');
      return;
    }

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
                type="tel" 
                name="contact"
                value={formData.contact || ''}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="9XXXXXXXXX"
                className={`w-full bg-slate-50 border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-[#5ab2b2] focus:ring-teal-500/10'} text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none font-medium transition-all`}
                required
              />
              {error && (
                <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center space-x-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              )}
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
                {patient && <option value="DISCHARGED">DISCHARGED</option>}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Consulted By</label>
              <select 
                name="consultedBy"
                value={formData.consultedBy || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
              >
                <option value="Dr. Elias Thorne">Dr. Elias Thorne</option>
                <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                <option value="Dr. Lena Voss">Dr. Lena Voss</option>
                <option value="Dr. Julianna Dorne">Dr. Julianna Dorne</option>
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
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Initial Assessment</label>
              <textarea 
                name="assessment"
                value={formData.assessment || ''}
                onChange={handleChange}
                placeholder="Initial assessment details..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#5ab2b2] focus:ring-2 focus:ring-teal-500/10 font-medium transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient Notes / Medical History</label>
              <textarea 
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                placeholder="Enter any additional notes about the patient..."
                rows={3}
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
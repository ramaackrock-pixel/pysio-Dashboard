import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Building, Shield, Bell, ShieldCheck, ArrowLeft, Save } from 'lucide-react';

export default function Settings() {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const renderMainSettings = () => (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
                <p className="text-[#5ab2b2] mt-2 font-semibold">Manage system preferences and configurations</p>
            </div>

            <div className="space-y-4">
                {/* Clinic Details */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border border-slate-100 rounded-xl shadow-sm gap-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="p-4 bg-[#eef7f7] text-[#5ab2b2] rounded-xl flex-shrink-0">
                            <Building size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Clinic Details</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Configure branch info, address, and clinic contact settings.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setActiveSection('clinic')}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#5ab2b2] hover:bg-[#439c9c] text-white font-bold text-sm rounded-lg transition-colors"
                    >
                        Manage
                    </button>
                </div>

                {/* User Roles & Permissions */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border border-slate-100 rounded-xl shadow-sm gap-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="p-4 bg-[#eef7f7] text-[#5ab2b2] rounded-xl flex-shrink-0">
                            <Shield size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">User Roles & Permissions</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Manage staff access levels, roles, and platform permissions.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setActiveSection('roles')}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#5ab2b2] hover:bg-[#439c9c] text-white font-bold text-sm rounded-lg transition-colors"
                    >
                        Manage
                    </button>
                </div>

                {/* Notifications */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border border-slate-100 rounded-xl shadow-sm gap-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="p-4 bg-[#eef7f7] text-[#5ab2b2] rounded-xl flex-shrink-0">
                            <Bell size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Set up automated patient reminders, email alerts, and SMS settings.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setActiveSection('notifications')}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#5ab2b2] hover:bg-[#439c9c] text-white font-bold text-sm rounded-lg transition-colors"
                    >
                        Manage
                    </button>
                </div>

                {/* Security Settings */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white border border-slate-100 rounded-xl shadow-sm gap-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="p-4 bg-[#eef7f7] text-[#5ab2b2] rounded-xl flex-shrink-0">
                            <ShieldCheck size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Security Settings</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Manage passwords, 2-factor authentication, and activity logs.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setActiveSection('security')}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#5ab2b2] hover:bg-[#439c9c] text-white font-bold text-sm rounded-lg transition-colors"
                    >
                        Manage
                    </button>
                </div>
            </div>
        </div>
    );

    const renderManageScreen = () => {
        let title = '';
        let description = '';

        if (activeSection === 'clinic') {
            title = 'Clinic Details';
            description = 'Update your primary clinic information and branches.';
        } else if (activeSection === 'roles') {
            title = 'User Roles & Permissions';
            description = 'Configure access levels for your staff.';
        } else if (activeSection === 'notifications') {
            title = 'Notifications';
            description = 'Set up alerts, reminders, and communication preferences.';
        } else if (activeSection === 'security') {
            title = 'Security Settings';
            description = 'Update passwords, 2FA, and review activity logs.';
        }

        return (
            <div className="max-w-4xl animate-in fade-in slide-in-from-right-4 duration-300">
                <button 
                    onClick={() => setActiveSection(null)}
                    className="flex items-center space-x-2 text-slate-500 hover:text-[#5ab2b2] transition-colors mb-6 font-semibold bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Settings</span>
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
                    <p className="text-[#5ab2b2] mt-2 font-semibold">{description}</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-8">
                    <div className="space-y-6">
                        {activeSection === 'clinic' && (
                            <>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Clinic Name</label>
                                    <input type="text" defaultValue="PhysioHealth Downtown" className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                                        <input type="email" defaultValue="contact@physiohealth.com" className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                                        <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Address</label>
                                    <textarea defaultValue="123 Wellness Ave, Suite 100&#10;Metropolis, NY 10001" rows={3} className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]" />
                                </div>
                            </>
                        )}
                        
                        {activeSection === 'roles' && (
                            <>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Default Role for New Staff</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]">
                                        <option>Therapist</option>
                                        <option>Receptionist</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-700 mb-2">Therapist Permissions</h4>
                                    <div className="space-y-3 mt-4">
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#5ab2b2] rounded border-slate-300" />
                                            <span className="text-sm font-medium text-slate-700">View Appointments</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#5ab2b2] rounded border-slate-300" />
                                            <span className="text-sm font-medium text-slate-700">Edit Patient Records</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="checkbox" className="w-4 h-4 text-[#5ab2b2] rounded border-slate-300" />
                                            <span className="text-sm font-medium text-slate-700">Access Billing Data</span>
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === 'notifications' && (
                            <>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                        <div>
                                            <h4 className="font-bold text-slate-700">Email Reminders</h4>
                                            <p className="text-sm text-slate-500 font-medium mt-1">Send patient reminders 24 hours before appointment</p>
                                        </div>
                                        <div className="w-12 h-6 bg-[#5ab2b2] rounded-full relative cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                        <div>
                                            <h4 className="font-bold text-slate-700">SMS Alerts</h4>
                                            <p className="text-sm text-slate-500 font-medium mt-1">Send text notifications for cancellations</p>
                                        </div>
                                        <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === 'security' && (
                            <>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Password Expiration</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-medium rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5ab2b2]">
                                        <option>Never expire</option>
                                        <option>90 days</option>
                                        <option>180 days</option>
                                    </select>
                                </div>
                                <div className="mt-6">
                                    <h4 className="font-bold text-slate-700 mb-2">Two-Factor Authentication</h4>
                                    <p className="text-sm text-slate-500 font-medium mb-4">Require all clinic staff to use 2FA when logging in.</p>
                                    <button className="px-6 py-2.5 border-2 border-[#5ab2b2] text-[#5ab2b2] font-bold rounded-lg hover:bg-teal-50 transition-colors">
                                        Enable 2FA
                                    </button>
                                </div>
                            </>
                        )}
                        
                        <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-4 mt-8">
                            <button 
                                onClick={() => setActiveSection(null)} 
                                className="w-full sm:w-auto px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    alert('Settings saved successfully!');
                                    setActiveSection(null);
                                }} 
                                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-[#5ab2b2] hover:bg-[#439c9c] text-white font-bold rounded-xl transition-colors shadow-md shadow-teal-100"
                            >
                                <Save size={20} />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Layout>
            {activeSection ? renderManageScreen() : renderMainSettings()}
        </Layout>
    );
}
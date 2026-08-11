import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, CalendarDays, FolderOpen,
  FileText, Pill, CreditCard, Settings, Stethoscope,
  ChevronDown, X
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Hardcoded doctor info
  const doctor = {
    nom: 'Benali',
    prenom: 'Karim',
    specialite: 'Médecine Générale'
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'patients', label: 'Patients', icon: Users, path: '/patients' },
    { id: 'rendez-vous', label: 'Rendez-vous', icon: CalendarDays, path: '/rendez-vous' },
    { id: 'dossiers', label: 'Dossiers médicaux', icon: FolderOpen, path: '/dossiers' },
    { id: 'ordonnances', label: 'Ordonnances', icon: FileText, path: '/ordonnances' },
    { id: 'medicaments', label: 'Médicaments', icon: Pill, path: '/medicaments' },
    { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/transactions' },
    { id: 'parametres', label: 'Paramètres', icon: Settings, path: '/parametres' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/dossiers' && location.pathname.startsWith('/dossiers'));
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          flex flex-col w-56 min-w-56 h-screen
          bg-white border-r border-slate-200
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button - mobile only */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#2563eb,#60a5fa)' }}
          >
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-[#1e3a5f] text-sm leading-tight">
              MediCab
            </div>
            <div className="text-[10px] text-blue-500 leading-tight">
              {doctor.specialite}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                  text-sm transition-all duration-150
                  ${active 
                    ? 'bg-blue-600 text-white font-medium shadow-sm' 
                    : 'text-slate-500 hover:bg-blue-50 hover:text-blue-700'
                  }
                `}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Doctor card at bottom */}
        <div className="px-3 pb-4 border-t border-slate-100 pt-3">
          <button
            onClick={() => {
              navigate('/parametres');
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {doctor.prenom[0]}{doctor.nom[0]}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-xs font-semibold text-[#1e3a5f] truncate">
                Dr. {doctor.prenom} {doctor.nom}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {doctor.specialite}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
}
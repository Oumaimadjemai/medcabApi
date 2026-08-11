import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Bell, Search, ChevronDown, LogOut, UserCog, Settings,
  Stethoscope, Menu, X
} from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hardcoded doctor info
  const doctor = {
    nom: 'Benali',
    prenom: 'Karim',
    specialite: 'Médecine Générale'
  };

  // Auto-detect today's date using date-fns
  const formattedDate = format(new Date(), 'EEEE d MMMM yyyy', { locale: fr });

  // Get dynamic title and subtitle based on route
  const getPageInfo = () => {
    const path = location.pathname;
    
    // Page titles and subtitles configuration
    const pageConfig = {
      '/dashboard': {
        title: 'Tableau de bord',
        subtitle: formattedDate
      },
      '/patients': {
        title: 'Patients',
        subtitle: '5 patients enregistrés'
      },
      '/rendez-vous': {
        title: 'Rendez-vous',
        subtitle: 'Gestion du calendrier'
      },
      '/dossiers': {
        title: 'Dossiers médicaux',
        subtitle: 'Gestion des dossiers patients'
      },
      '/ordonnances': {
        title: 'Ordonnances',
        subtitle: 'Créer et gérer les ordonnances'
      },
      '/medicaments': {
        title: 'Médicaments',
        subtitle: 'Base de données médicaments'
      },
      '/transactions': {
        title: 'Transactions',
        subtitle: 'Gestion financière'
      },
      '/parametres': {
        title: 'Paramètres',
        subtitle: 'Configuration du cabinet'
      }
    };

    // Check if path matches any config key
    if (pageConfig[path]) {
      return pageConfig[path];
    }

    // Check for dynamic routes (like /dossiers/1)
    if (path.startsWith('/dossiers/')) {
      return {
        title: 'Dossier médical',
        subtitle: 'Consultation en cours'
      };
    }

    // Default fallback
    return {
      title: 'Tableau de bord',
      subtitle: formattedDate
    };
  };

  const { title, subtitle } = getPageInfo();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 flex-shrink-0 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left section - Mobile menu + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <div className="min-w-0">
            <h1 className="font-semibold text-[#1e3a5f] text-lg md:text-xl leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-400 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right section - Search, Notifications, User */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-400 transition-all"
          >
            <Search className="w-4 h-4 text-slate-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un patient..."
              className="bg-transparent border-none outline-none px-3 py-2 text-sm w-48 lg:w-64 text-slate-700 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Search - Mobile Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-slate-500" />
          </button>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-3 shadow-lg md:hidden">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un patient..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Annuler
                </button>
              </form>
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {doctor.prenom[0]}{doctor.nom[0]}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-[#1e3a5f] leading-tight">
                  Dr. {doctor.prenom} {doctor.nom}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  {doctor.specialite}
                </div>
              </div>
              <ChevronDown className={`w-3 h-3 text-slate-400 hidden sm:block transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="font-medium text-[#1e3a5f] text-sm">
                      Dr. {doctor.prenom} {doctor.nom}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {doctor.specialite}
                    </div>
                  </div>

                  <button
                    className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left flex items-center gap-3 transition-colors"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/parametres');
                    }}
                  >
                    <UserCog className="w-4 h-4 text-slate-400" />
                    Mon profil
                  </button>

                  <button
                    className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left flex items-center gap-3 transition-colors"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/parametres');
                    }}
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Paramètres
                  </button>

                  <hr className="my-1 border-slate-100" />

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
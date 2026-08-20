import { useState } from 'react';
import { Eye, EyeOff, Stethoscope, Lock, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Email ou mot de passe incorrect');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Une erreur est survenue');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 40%, #eff6ff 100%)' }}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-32 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-32 left-0 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #1d6fd8, transparent)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #1d6fd8, #3b82f6)' }}>
            <Stethoscope size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Plus Jakarta Sans' }}>MediCab</h1>
          <p className="text-slate-500 mt-1 text-sm">Système de gestion médicale</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="p-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Identifiants de connexion</p>
            
            {/* Email field */}
            <div className="relative mb-4">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Email"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Mot de passe"
                className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                disabled={isLoading}
              />
              <button 
                onClick={() => setShowPwd(!showPwd)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                type="button"
                disabled={isLoading}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={!email || !password || isLoading}
              className="w-full mt-4 py-2.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #1d6fd8, #3b82f6)' }}
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Cabinet Médical Privé · Algérie
        </p>
      </div>
    </div>
  );
}
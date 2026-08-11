import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, ChevronLeft, ChevronRight, Plus, Search,
  User, Clock, Phone, MapPin, Mail, X, ChevronDown,
  Users, Calendar, Stethoscope, AlertCircle, CheckCircle2,
  Clock as ClockIcon, UserPlus, Edit2, Trash2, List,
  Grid3x3, Ban
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function RendezVous() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientResults, setShowPatientResults] = useState(false);
  const searchRef = useRef(null);
  
  // Sample patients data
  const patients = [
    { id: 1, nom: 'Bouzidi', prenom: 'Ahmed', age: 51, telephone: '0555 12 34 56', assurance: 'CNAS-CN-123456' },
    { id: 2, nom: 'Khelifa', prenom: 'Fatima', age: 38, telephone: '0661 98 76 54', assurance: 'CASNOS' },
    { id: 3, nom: 'Messaoudi', prenom: 'Mohamed', age: 62, telephone: '0770 55 44 33', assurance: 'CNAS-CN-789012' },
    { id: 4, nom: 'Hamdi', prenom: 'Leila', age: 29, telephone: '0550 22 11 99', assurance: 'Mutuelle' },
    { id: 5, nom: 'Aït Yahia', prenom: 'Kamel', age: 45, telephone: '0699 87 65 43', assurance: 'CNAS-CN-345678' },
  ];

  // Sample rendez-vous data with FIFO order
  const [rendezVous, setRendezVous] = useState([
    { 
      id: 1, 
      patientId: 1, 
      patientNom: 'Ahmed Bouzidi', 
      date: '2026-08-10', 
      motif: 'Consultation générale', 
      statut: 'confirmé',
      queueNumber: 1
    },
    { 
      id: 2, 
      patientId: 2, 
      patientNom: 'Fatima Khelifa', 
      date: '2026-08-10', 
      motif: 'Suivi tension artérielle', 
      statut: 'en_cours',
      queueNumber: 2
    },
    { 
      id: 3, 
      patientId: 3, 
      patientNom: 'Mohamed Messaoudi', 
      date: '2026-08-10', 
      motif: 'Diabète type 2 - contrôle', 
      statut: 'en_attente',
      queueNumber: 3
    },
    { 
      id: 4, 
      patientId: 4, 
      patientNom: 'Leila Hamdi', 
      date: '2026-08-10', 
      motif: 'Bilan sanguin', 
      statut: 'en_attente',
      queueNumber: 4
    },
    { 
      id: 5, 
      patientId: 1, 
      patientNom: 'Ahmed Bouzidi', 
      date: '2026-08-11', 
      motif: 'Renouvellement ordonnance', 
      statut: 'confirmé',
      queueNumber: 1
    },
    { 
      id: 6, 
      patientId: 2, 
      patientNom: 'Fatima Khelifa', 
      date: '2026-08-11', 
      motif: 'Résultats analyses', 
      statut: 'en_attente',
      queueNumber: 2
    },
    { 
      id: 7, 
      patientId: 5, 
      patientNom: 'Kamel Aït Yahia', 
      date: '2026-08-12', 
      motif: 'Contrôle asthme', 
      statut: 'confirmé',
      queueNumber: 1
    },
    { 
      id: 8, 
      patientId: 3, 
      patientNom: 'Mohamed Messaoudi', 
      date: '2026-08-13', 
      motif: 'Suivi diabète', 
      statut: 'en_attente',
      queueNumber: 1
    },
  ]);

  const [formData, setFormData] = useState({
    patientId: '',
    patientNom: '',
    date: '',
    motif: '',
    isNewPatient: false
  });

  const [newPatientForm, setNewPatientForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    age: '',
    assurance: ''
  });

  // Get today's date
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const todayDisplay = format(today, 'EEEE d MMMM yyyy', { locale: fr });

  // Get appointments for a specific date
  const getAppointmentsForDate = (dateStr) => {
    return rendezVous
      .filter(r => r.date === dateStr)
      .sort((a, b) => a.queueNumber - b.queueNumber);
  };

  // Get today's appointments
  const todayAppointments = getAppointmentsForDate(todayStr);

  // Get week dates
  const getWeekDates = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    const week = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates();

  // Filter patients based on search
  const filteredPatients = patients.filter(p => 
    `${p.prenom} ${p.nom}`.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.telephone.includes(patientSearch)
  );

  // Status colors
  const getStatusColor = (statut) => {
    const colors = {
      'confirmé': 'bg-green-100 text-green-700',
      'en_cours': 'bg-blue-100 text-blue-700',
      'en_attente': 'bg-amber-100 text-amber-700',
      'terminé': 'bg-gray-100 text-gray-600',
      'annulé': 'bg-red-100 text-red-600'
    };
    return colors[statut] || 'bg-gray-100 text-gray-600';
  };

  const getStatusLabel = (statut) => {
    const labels = {
      'confirmé': 'Confirmé',
      'en_cours': 'En cours',
      'en_attente': 'En attente',
      'terminé': 'Terminé',
      'annulé': 'Annulé'
    };
    return labels[statut] || statut;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle patient selection from search
  const handleSelectPatient = (patient) => {
    setFormData({
      ...formData,
      patientId: patient.id,
      patientNom: `${patient.prenom} ${patient.nom}`
    });
    setPatientSearch(`${patient.prenom} ${patient.nom}`);
    setShowPatientResults(false);
  };

  // Handle new patient form changes
  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatientForm({ ...newPatientForm, [name]: value });
  };

  // Add new rendez-vous
  const handleAddRendezVous = (e) => {
    e.preventDefault();
    
    let patientId = parseInt(formData.patientId);
    
    if (formData.isNewPatient) {
      const newPatient = {
        id: patients.length + 1,
        nom: newPatientForm.nom,
        prenom: newPatientForm.prenom,
        telephone: newPatientForm.telephone,
        email: newPatientForm.email || '',
        adresse: newPatientForm.adresse || '',
        age: parseInt(newPatientForm.age) || 0,
        assurance: newPatientForm.assurance || ''
      };
      patients.push(newPatient);
      patientId = newPatient.id;
      formData.patientNom = `${newPatientForm.prenom} ${newPatientForm.nom}`;
    }
    
    const todayRdvs = rendezVous.filter(r => r.date === formData.date);
    const queueNumber = todayRdvs.length + 1;
    
    const newRdv = {
      id: rendezVous.length + 1,
      patientId: patientId,
      patientNom: formData.patientNom,
      date: formData.date,
      motif: formData.motif || 'Consultation',
      statut: 'en_attente',
      queueNumber: queueNumber
    };
    
    setRendezVous([...rendezVous, newRdv]);
    setShowAddModal(false);
    resetForm();
  };

  // Update rendez-vous status
  const updateStatus = (id, newStatus) => {
    setRendezVous(rendezVous.map(r => 
      r.id === id ? { ...r, statut: newStatus } : r
    ));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      patientId: '',
      patientNom: '',
      date: '',
      motif: '',
      isNewPatient: false
    });
    setPatientSearch('');
    setNewPatientForm({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      adresse: '',
      age: '',
      assurance: ''
    });
    setShowPatientResults(false);
  };

  // Navigate to patient dossier
  const handleViewPatient = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      navigate(`/dossiers/${patientId}`, { state: { patient } });
    }
  };

  // Handle date click in week view
  const handleDateClick = (dateStr) => {
    const date = new Date(dateStr);
    setSelectedDate(date);
  };

  // Get appointments for selected date in week view
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedDateAppointments = getAppointmentsForDate(selectedDateStr);

  // Close patient results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowPatientResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-5 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">
            {todayAppointments.length} rendez-vous aujourd'hui
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Nouveau RDV
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-white rounded-lg border border-slate-200 p-0.5">
          <button
            onClick={() => setViewMode('week')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'week' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Grid3x3 className="w-3.5 h-3.5" />
            Semaine
          </button>
          <button
            onClick={() => setViewMode('today')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'today' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Liste
          </button>
        </div>
        {viewMode === 'today' && (
          <span className="text-[10px] text-slate-400">
            FIFO · Premier arrivé, premier servi
          </span>
        )}
      </div>

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
            <button 
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 7);
                setSelectedDate(newDate);
              }}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </button>
            <span className="font-semibold text-[#1e3a5f] text-sm">
              {format(weekDates[0], 'dd')} — {format(weekDates[weekDates.length - 1], 'dd MMMM yyyy', { locale: fr })}
            </span>
            <button 
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 7);
                setSelectedDate(newDate);
              }}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div className="grid grid-cols-6">
            {weekDates.map((date, i) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const dayRdvs = rendezVous.filter(r => r.date === dateStr);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDateStr;
              
              return (
                <div 
                  key={i} 
                  className={`border-r last:border-r-0 border-slate-100 cursor-pointer ${
                    isToday ? 'bg-blue-50/30' : ''
                  } ${isSelected ? 'ring-2 ring-blue-400 ring-inset' : ''}`}
                  onClick={() => handleDateClick(dateStr)}
                >
                  <div className={`flex flex-col items-center py-2 border-b border-slate-100 ${
                    isToday ? 'bg-blue-50/50' : ''
                  } ${isSelected ? 'bg-blue-100/30' : ''}`}>
                    <span className="text-[10px] font-medium text-slate-500">
                      {format(date, 'EEE', { locale: fr })}
                    </span>
                    <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold mt-0.5 ${
                      isToday ? 'bg-blue-600 text-white' : 
                      isSelected ? 'bg-blue-500 text-white' : 'text-slate-700'
                    }`}>
                      {format(date, 'd')}
                    </span>
                    {dayRdvs.length > 0 && (
                      <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                        {dayRdvs.length} RDV
                      </span>
                    )}
                  </div>
                  <div className="p-1.5 space-y-1 min-h-28">
                    {dayRdvs.slice(0, 3).map(r => (
                      <div 
                        key={r.id} 
                        className={`rounded-lg p-1.5 text-xs border-l-2 ${
                          r.statut === 'confirmé' ? 'bg-green-50 border-green-400' :
                          r.statut === 'en_cours' ? 'bg-blue-50 border-blue-400' :
                          r.statut === 'annulé' ? 'bg-red-50 border-red-400' : 
                          'bg-slate-50 border-slate-300'
                        }`}
                      >
                        <div className="font-medium text-[#1e3a5f] text-[10px]">
                          #{r.queueNumber} {r.patientNom.split(' ')[0]}
                        </div>
                        <div className="text-slate-500 truncate text-[9px]">
                          {r.motif}
                        </div>
                      </div>
                    ))}
                    {dayRdvs.length > 3 && (
                      <div className="text-[10px] text-blue-500 font-medium text-center py-0.5">
                        +{dayRdvs.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-blue-500" />
          <span className="font-semibold text-[#1e3a5f] text-sm">
            {viewMode === 'today' ? "Aujourd'hui" : format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })} 
            — {(viewMode === 'today' ? todayAppointments : selectedDateAppointments).length} rendez-vous
          </span>
        </div>
        <div className="divide-y divide-slate-50">
          {(viewMode === 'today' ? todayAppointments : selectedDateAppointments).length > 0 ? (
            (viewMode === 'today' ? todayAppointments : selectedDateAppointments).map((r) => (
              <div 
                key={r.id} 
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50/30 transition-colors"
              >
                {/* Queue Number */}
                <div className="flex flex-col items-center min-w-12">
                  <span className="text-[10px] text-slate-400">N°</span>
                  <span className="text-base font-bold text-blue-600">#{r.queueNumber}</span>
                </div>

                <div className="w-px h-9 bg-slate-200" />

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0 cursor-pointer hover:bg-blue-200 transition-colors"
                      onClick={() => handleViewPatient(r.patientId)}
                      title="Voir le dossier du patient"
                    >
                      {r.patientNom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div 
                        className="font-medium text-[#1e3a5f] text-sm cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleViewPatient(r.patientId)}
                      >
                        {r.patientNom}
                      </div>
                      <div className="text-xs text-slate-400">{r.motif}</div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${getStatusColor(r.statut)}`}>
                  {getStatusLabel(r.statut)}
                </span>

                {/* Actions */}
                <div className="flex gap-1.5 flex-shrink-0">
                  {r.statut === 'en_attente' && (
                    <>
                      <button 
                        onClick={() => updateStatus(r.id, 'confirmé')}
                        className="px-2.5 py-1 border border-green-300 text-green-600 rounded-lg text-[10px] font-medium hover:bg-green-50 transition-colors"
                      >
                        Confirmer
                      </button>
                      <button 
                        onClick={() => updateStatus(r.id, 'en_cours')}
                        className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-medium hover:bg-blue-700 transition-colors"
                      >
                        Démarrer
                      </button>
                      <button 
                        onClick={() => updateStatus(r.id, 'annulé')}
                        className="px-2.5 py-1 border border-red-300 text-red-600 rounded-lg text-[10px] font-medium hover:bg-red-50 transition-colors"
                      >
                        Annuler
                      </button>
                    </>
                  )}
                  {r.statut === 'confirmé' && (
                    <>
                      <button 
                        onClick={() => updateStatus(r.id, 'en_cours')}
                        className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-medium hover:bg-blue-700 transition-colors"
                      >
                        Démarrer
                      </button>
                      <button 
                        onClick={() => updateStatus(r.id, 'annulé')}
                        className="px-2.5 py-1 border border-red-300 text-red-600 rounded-lg text-[10px] font-medium hover:bg-red-50 transition-colors"
                      >
                        Annuler
                      </button>
                    </>
                  )}
                  {r.statut === 'en_cours' && (
                    <>
                      <button 
                        onClick={() => updateStatus(r.id, 'terminé')}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Terminer
                      </button>
                      <button 
                        onClick={() => updateStatus(r.id, 'annulé')}
                        className="px-2.5 py-1 border border-red-300 text-red-600 rounded-lg text-[10px] font-medium hover:bg-red-50 transition-colors"
                      >
                        Annuler
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleViewPatient(r.patientId)}
                    className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                    title="Voir dossier patient"
                  >
                    <User className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Aucun rendez-vous pour cette date</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Rendez-vous Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
              <h3 className="font-semibold text-[#1e3a5f] text-base">Nouveau rendez-vous</h3>
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleAddRendezVous} className="px-5 py-4 overflow-y-auto max-h-[70vh]">
              <div className="space-y-3">
                {/* Patient Selection with Search */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Patient
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative" ref={searchRef}>
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={patientSearch}
                        onChange={(e) => {
                          setPatientSearch(e.target.value);
                          setShowPatientResults(true);
                          if (!formData.isNewPatient) {
                            setFormData({ ...formData, patientId: '', patientNom: '' });
                          }
                        }}
                        onFocus={() => setShowPatientResults(true)}
                        placeholder="Rechercher un patient..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        disabled={formData.isNewPatient}
                      />
                      {showPatientResults && filteredPatients.length > 0 && !formData.isNewPatient && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg border border-slate-200 max-h-48 overflow-y-auto z-50">
                          {filteredPatients.map(p => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => handleSelectPatient(p)}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-blue-50 transition-colors text-left"
                            >
                              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                                {p.prenom[0]}{p.nom[0]}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-[#1e3a5f]">{p.prenom} {p.nom}</div>
                                <div className="text-xs text-slate-400">{p.telephone}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      {showPatientResults && patientSearch && filteredPatients.length === 0 && !formData.isNewPatient && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg border border-slate-200 p-3 text-center z-50">
                          <p className="text-sm text-slate-400">Aucun patient trouvé</p>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, isNewPatient: true }));
                              setShowPatientResults(false);
                            }}
                            className="mt-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            + Créer un nouveau patient
                          </button>
                        </div>
                      )}
                    </div>
                    {!formData.isNewPatient && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, isNewPatient: true }));
                          setPatientSearch('');
                          setShowPatientResults(false);
                        }}
                        className="px-3 py-1.5 border border-blue-300 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
                      >
                        + Nouveau
                      </button>
                    )}
                    {formData.isNewPatient && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, isNewPatient: false }));
                          setPatientSearch('');
                        }}
                        className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors whitespace-nowrap"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </div>

                {/* New Patient Form */}
                {formData.isNewPatient && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 space-y-2.5">
                    <p className="text-xs font-medium text-blue-600">Nouveau patient</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Nom *</label>
                        <input
                          type="text"
                          name="nom"
                          value={newPatientForm.nom}
                          onChange={handleNewPatientChange}
                          required
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Prénom *</label>
                        <input
                          type="text"
                          name="prenom"
                          value={newPatientForm.prenom}
                          onChange={handleNewPatientChange}
                          required
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Téléphone *</label>
                        <input
                          type="text"
                          name="telephone"
                          value={newPatientForm.telephone}
                          onChange={handleNewPatientChange}
                          required
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-0.5">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={newPatientForm.email}
                          onChange={handleNewPatientChange}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] text-slate-500 mb-0.5">Adresse</label>
                        <input
                          type="text"
                          name="adresse"
                          value={newPatientForm.adresse}
                          onChange={handleNewPatientChange}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Motif */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Motif
                  </label>
                  <input
                    type="text"
                    name="motif"
                    value={formData.motif}
                    onChange={handleInputChange}
                    placeholder="Consultation, suivi, urgence..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
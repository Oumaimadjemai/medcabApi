import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  User, Phone, MapPin, ShieldCheck, AlertCircle, 
  FolderOpen, ChevronLeft, Eye, Stethoscope, 
  FlaskConical, Scan, FileText, BookOpen, 
  Calendar, Clock, Pill, Activity, Heart,
  Droplets, Syringe, Download, Upload, Plus,
  Printer, X, CheckCircle2, AlertTriangle,
  Clipboard, HeartPulse
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Dossiers() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Check if we're viewing a specific patient
  const isViewingPatient = location.pathname.includes('/dossiers/') && id;
  
  // Sample patients data
  const patients = [
    { 
      id: 1, 
      nom: 'Bouzidi', 
      prenom: 'Ahmed', 
      age: 51, 
      sexe: 'Homme',
      telephone: '0555 12 34 56', 
      adresse: '12 Rue Didouche Mourad, Alger',
      assurance: 'CNAS-CN-123456', 
      allergie: 'Pénicilline', 
      groupeSanguin: 'A+',
      maladiesChroniques: ['Hypertension artérielle', 'Reflux gastro-œsophagien'],
      email: 'ahmed.bouzidi@email.com',
      dateNaissance: '1975-03-15'
    },
    { 
      id: 2, 
      nom: 'Khelifa', 
      prenom: 'Fatima', 
      age: 38, 
      sexe: 'Femme',
      telephone: '0661 98 76 54', 
      adresse: '45 Bd Zighoud Youcef, Oran',
      assurance: 'CASNOS', 
      allergie: '', 
      groupeSanguin: 'O-',
      maladiesChroniques: ['Diabète type 2'],
      email: 'fatima.khelifa@email.com',
      dateNaissance: '1988-07-22'
    },
    { 
      id: 3, 
      nom: 'Messaoudi', 
      prenom: 'Mohamed', 
      age: 62, 
      sexe: 'Homme',
      telephone: '0770 55 44 33', 
      adresse: '8 Rue des Frères Bouadou, Constantine',
      assurance: 'CNAS-CN-789012', 
      allergie: 'Aspirine', 
      groupeSanguin: 'B+',
      maladiesChroniques: ['Diabète type 2', 'Hypertension artérielle'],
      email: 'mohamed.messaoudi@email.com',
      dateNaissance: '1964-11-03'
    },
    { 
      id: 4, 
      nom: 'Hamdi', 
      prenom: 'Leila', 
      age: 29, 
      sexe: 'Femme',
      telephone: '0550 22 11 99', 
      adresse: '3 Cité des Orangers, Annaba',
      assurance: 'Mutuelle', 
      allergie: '', 
      groupeSanguin: 'AB+',
      maladiesChroniques: [],
      email: 'leila.hamdi@email.com',
      dateNaissance: '1997-09-08'
    },
    { 
      id: 5, 
      nom: 'Aït Yahia', 
      prenom: 'Kamel', 
      age: 45, 
      sexe: 'Homme',
      telephone: '0699 87 65 43', 
      adresse: '22 Rue Hassiba Ben Bouali, Alger',
      assurance: 'CNAS-CN-345678', 
      allergie: '', 
      groupeSanguin: 'A-',
      maladiesChroniques: ['Asthme'],
      email: 'kamel.ait@email.com',
      dateNaissance: '1981-05-20'
    },
  ];

  // Sample consultations
  const consultations = [
    {
      id: 1,
      patientId: 1,
      date: '2026-08-10',
      motif: 'Consultation générale',
      notes: 'HTA bien contrôlée, gastrite d\'irritation signalée.',
      pa: '135/85',
      poids: '82',
      temperature: '37.2',
      medicaments: ['Amlodipine 5mg', 'Oméprazole 20mg']
    },
    {
      id: 2,
      patientId: 1,
      date: '2026-07-15',
      motif: 'Suivi HTA',
      notes: 'Tension légèrement élevée. Adaptation posologie.',
      pa: '145/90',
      poids: '83',
      temperature: '36.8',
      medicaments: ['Amlodipine 10mg']
    },
  ];

  // Sample analyses
  const analyses = [
    {
      id: 1,
      patientId: 1,
      date: '2026-07-20',
      type: 'NFS + Glycémie',
      resultat: 'Glycémie: 5.2 mmol/L — Hb: 13.5 g/dL',
      normal: true
    },
    {
      id: 2,
      patientId: 1,
      date: '2026-06-10',
      type: 'Bilan lipidique',
      resultat: 'LDL: 3.8 mmol/L (élevé)',
      normal: false
    },
  ];

  // Sample ordonnances
  const ordonnances = [
    {
      id: 1,
      patientId: 1,
      patientNom: 'Ahmed Bouzidi',
      date: '2026-08-10',
      medecin: 'Dr. Karim Benali',
      imprimee: false,
      medicaments: [
        { nom: 'Amlodipine', dosage: '5mg', duree: '3 mois', instructions: '1 comprimé/jour le matin' },
        { nom: 'Oméprazole', dosage: '20mg', duree: '1 mois', instructions: '1 comprimé avant le repas' },
      ]
    },
  ];

  // Sample radiologies
  const radiologies = [
    {
      id: 1,
      patientId: 1,
      date: '2026-07-20',
      type: 'Radiographie thoracique',
      note: 'Poumons clairs, pas d\'anomalie',
      file: 'radio_thorax.jpg'
    }
  ];

  const [selectedTab, setSelectedTab] = useState('apercu');

  // Get patient from URL param
  const getPatientById = (patientId) => {
    return patients.find(p => p.id === parseInt(patientId));
  };

  // Get patient consultations
  const getPatientConsultations = (patientId) => {
    return consultations.filter(c => c.patientId === patientId);
  };

  // Get patient analyses
  const getPatientAnalyses = (patientId) => {
    return analyses.filter(a => a.patientId === patientId);
  };

  // Get patient ordonnances
  const getPatientOrdonnances = (patientId) => {
    return ordonnances.filter(o => o.patientId === patientId);
  };

  // Get patient radiologies
  const getPatientRadiologies = (patientId) => {
    return radiologies.filter(r => r.patientId === patientId);
  };

  // Format date helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // If viewing a specific patient
  if (isViewingPatient) {
    const patient = getPatientById(parseInt(id));
    
    if (!patient) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-400">Patient non trouvé</p>
        </div>
      );
    }

    const patientConsultations = getPatientConsultations(patient.id);
    const patientAnalyses = getPatientAnalyses(patient.id);
    const patientOrdonnances = getPatientOrdonnances(patient.id);
    const patientRadiologies = getPatientRadiologies(patient.id);

    const tabs = [
      { id: 'apercu', label: 'Aperçu', icon: Eye },
      { id: 'consultations', label: 'Consultations', icon: Stethoscope },
      { id: 'analyses', label: 'Analyses', icon: FlaskConical },
      { id: 'radiologies', label: 'Radiologies', icon: Scan },
      { id: 'ordonnances', label: 'Ordonnances', icon: FileText },
      { id: 'antecedents', label: 'Antécédents', icon: BookOpen },
    ];

    return (
      <div className="space-y-4 fade-in">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dossiers')}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour aux dossiers
        </button>

        {/* Patient Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold flex-shrink-0">
              {patient.prenom[0]}{patient.nom[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#1e3a5f]">
                    {patient.prenom} {patient.nom}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {patient.age} ans · {patient.sexe} · {patient.adresse.split(',')[1]?.trim() || 'Algérie'}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                  {patient.groupeSanguin}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {patient.telephone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {patient.adresse}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {patient.assurance}
                </span>
                {patient.allergie && (
                  <span className="flex items-center gap-1 text-red-500 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Allergie: {patient.allergie}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm w-fit flex-wrap">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedTab === t.id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {selectedTab === 'apercu' && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                ['Consultations', patientConsultations.length, 'Total enregistrées', 'text-blue-600', 'bg-blue-50'],
                ['Analyses', patientAnalyses.length, 'Résultats disponibles', 'text-emerald-600', 'bg-emerald-50'],
                ['Radiologies', patientRadiologies.length, 'Examens radiologiques', 'text-purple-600', 'bg-purple-50']
              ].map(([label, value, sub, textColor, bgColor]) => (
                <div key={label} className={`${bgColor} rounded-2xl p-4`}>
                  <div className={`text-xs font-medium ${textColor} mb-2`}>{label}</div>
                  <div className="text-3xl font-bold text-[#1e3a5f]">{value}</div>
                  <div className="text-xs text-slate-500 mt-1">{sub}</div>
                </div>
              ))}
            </div>

            {/* Maladies Chroniques */}
            {patient.maladiesChroniques.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                  Maladies chroniques
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.maladiesChroniques.map(m => (
                    <span key={m} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dernière Consultation */}
            {patientConsultations.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Dernière consultation
                  </span>
                </div>
                <div className="text-xs text-slate-400 mb-1">
                  {formatDate(patientConsultations[0].date)}
                </div>
                <div className="font-semibold text-[#1e3a5f] mb-1">
                  {patientConsultations[0].motif}
                </div>
                <div className="text-sm text-slate-500 mb-3">
                  {patientConsultations[0].notes}
                </div>
                <div className="flex flex-wrap gap-2">
                  {patientConsultations[0].pa && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                      PA: {patientConsultations[0].pa} mmHg
                    </span>
                  )}
                  {patientConsultations[0].poids && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                      Poids: {patientConsultations[0].poids} kg
                    </span>
                  )}
                  {patientConsultations[0].temperature && (
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                      T°: {patientConsultations[0].temperature}°C
                    </span>
                  )}
                </div>
                {patientConsultations[0].medicaments.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-slate-400 mb-2">Médicaments prescrits</div>
                    <div className="flex flex-wrap gap-1.5">
                      {patientConsultations[0].medicaments.map(m => (
                        <span key={m} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'consultations' && (
          <div className="space-y-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Nouvelle consultation
            </button>
            {patientConsultations.map(c => (
              <div key={c.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs text-blue-500 font-medium">{formatDate(c.date)}</div>
                    <div className="font-semibold text-[#1e3a5f] mt-0.5">{c.motif}</div>
                  </div>
                  <button className="text-slate-400 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mb-3">{c.notes}</p>
                <div className="flex flex-wrap gap-2">
                  {c.pa && (
                    <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs">
                      PA: {c.pa} mmHg
                    </span>
                  )}
                  {c.poids && (
                    <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs">
                      Poids: {c.poids} kg
                    </span>
                  )}
                  {c.temperature && (
                    <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs">
                      T°: {c.temperature}°C
                    </span>
                  )}
                </div>
                {c.medicaments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.medicaments.map(m => (
                      <span key={m} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {patientConsultations.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                Aucune consultation enregistrée
              </div>
            )}
          </div>
        )}

        {selectedTab === 'analyses' && (
          <div className="space-y-3">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <Upload className="w-4 h-4" />
                Importer résultat
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Plus className="w-4 h-4" />
                Saisir résultat
              </button>
            </div>
            {patientAnalyses.map(a => (
              <div key={a.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.normal ? 'bg-green-100' : 'bg-red-100'}`}>
                  {a.normal ? 
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> : 
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-[#1e3a5f]">{a.type}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.normal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {a.normal ? 'Normal' : 'Anormal'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{formatDate(a.date)}</div>
                  <div className="text-sm text-slate-600 mt-2">{a.resultat}</div>
                </div>
                <button className="text-blue-500 hover:text-blue-700">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
            {patientAnalyses.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                Aucune analyse disponible
              </div>
            )}
          </div>
        )}

        {selectedTab === 'radiologies' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <Upload className="w-4 h-4" />
                Importer radio
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Scan className="w-4 h-4" />
                Scanner
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patientRadiologies.map(r => (
                <div key={r.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                  <div className="aspect-video bg-slate-100 rounded-xl mb-3 flex items-center justify-center">
                    <Scan className="w-10 h-10 text-slate-300" />
                  </div>
                  <div className="font-medium text-[#1e3a5f] text-sm">{r.type}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{formatDate(r.date)}</div>
                  <div className="text-xs text-slate-500 mt-1">{r.note}</div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100">
                      <Eye className="w-3.5 h-3.5" /> Voir
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100">
                      <Download className="w-3.5 h-3.5" /> Télécharger
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {patientRadiologies.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                Aucune radiologie disponible
              </div>
            )}
          </div>
        )}

        {selectedTab === 'ordonnances' && (
          <div className="space-y-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Nouvelle ordonnance
            </button>
            {patientOrdonnances.map(o => (
              <div key={o.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-[#1e3a5f]">
                      Ordonnance du {formatDate(o.date)}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{o.medecin}</div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700">
                    <Printer className="w-3.5 h-3.5" /> Imprimer
                  </button>
                </div>
                <div className="space-y-2">
                  {o.medicaments.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl">
                      <Pill className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-[#1e3a5f] text-sm">
                          {m.nom} {m.dosage}
                        </div>
                        <div className="text-xs text-slate-500">
                          {m.instructions} · Durée: {m.duree}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {patientOrdonnances.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                Aucune ordonnance disponible
              </div>
            )}
          </div>
        )}

        {selectedTab === 'antecedents' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Antécédents personnels
              </div>
              {patient.maladiesChroniques.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {patient.maladiesChroniques.map(m => (
                    <span key={m} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100">
                      {m}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-400">Aucun antécédent personnel enregistré</div>
              )}
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Allergies
              </div>
              {patient.allergie ? (
                <span className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 font-medium">
                  {patient.allergie}
                </span>
              ) : (
                <div className="text-sm text-slate-400">Aucune allergie connue</div>
              )}
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Antécédents familiaux
              </div>
              <div className="text-sm text-slate-400">Non renseigné</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // List view - showing all patients
  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Dossiers médicaux</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {patients.length} dossiers patients
          </p>
        </div>
        <button
          onClick={() => navigate('/patients')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <User className="w-4 h-4" />
          Nouveau patient
        </button>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => navigate(`/dossiers/${patient.id}`)}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-bold flex-shrink-0">
                {patient.prenom[0]}{patient.nom[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#1e3a5f] truncate">
                  {patient.prenom} {patient.nom}
                </div>
                <div className="text-xs text-slate-400">
                  {patient.age} ans · {patient.sexe}
                </div>
              </div>
              <FolderOpen className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-wrap gap-1">
              {patient.maladiesChroniques.length > 0 ? (
                patient.maladiesChroniques.slice(0, 2).map(m => (
                  <span key={m} className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs border border-red-100">
                    {m}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-300">Aucune maladie chronique</span>
              )}
              {patient.maladiesChroniques.length > 2 && (
                <span className="text-xs text-slate-400">+{patient.maladiesChroniques.length - 2}</span>
              )}
              {patient.allergie && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs border border-amber-100 flex items-center gap-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {patient.allergie}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
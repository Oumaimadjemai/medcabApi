import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, User, Phone, MapPin, ShieldCheck, 
  AlertCircle, FolderOpen, Edit2, Trash2, X,
  ChevronLeft, ChevronRight, Eye, UserPlus,
  Mail, Calendar, Stethoscope, FileText, Pill,
  Activity, Heart, Droplets, Syringe,
  Users, Save, AlertTriangle
} from 'lucide-react';

export default function Patients() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  
  // Sample patients data
  const [patients, setPatients] = useState([
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
  ]);

  // Form data for add/edit
  const initialFormData = {
    nom: '',
    prenom: '',
    age: '',
    sexe: 'Homme',
    telephone: '',
    adresse: '',
    assurance: '',
    allergie: '',
    groupeSanguin: 'A+',
    email: '',
    dateNaissance: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  // Filter patients based on search
  const filteredPatients = patients.filter(p => 
    `${p.prenom} ${p.nom}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.telephone.includes(searchQuery) ||
    p.assurance.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add new patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      nom: formData.nom,
      prenom: formData.prenom,
      age: parseInt(formData.age) || 0,
      sexe: formData.sexe,
      telephone: formData.telephone,
      adresse: formData.adresse,
      assurance: formData.assurance,
      allergie: formData.allergie,
      groupeSanguin: formData.groupeSanguin,
      maladiesChroniques: [],
      email: formData.email,
      dateNaissance: formData.dateNaissance
    };
    setPatients([...patients, newPatient]);
    setShowAddModal(false);
    resetForm();
  };

  // Edit patient - Open edit modal with patient data
  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      nom: patient.nom,
      prenom: patient.prenom,
      age: patient.age.toString(),
      sexe: patient.sexe,
      telephone: patient.telephone,
      adresse: patient.adresse,
      assurance: patient.assurance,
      allergie: patient.allergie || '',
      groupeSanguin: patient.groupeSanguin,
      email: patient.email || '',
      dateNaissance: patient.dateNaissance || ''
    });
    setShowEditModal(true);
  };

  // Save edited patient
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedPatients = patients.map(p => 
      p.id === selectedPatient.id ? {
        ...p,
        nom: formData.nom,
        prenom: formData.prenom,
        age: parseInt(formData.age) || 0,
        sexe: formData.sexe,
        telephone: formData.telephone,
        adresse: formData.adresse,
        assurance: formData.assurance,
        allergie: formData.allergie,
        groupeSanguin: formData.groupeSanguin,
        email: formData.email,
        dateNaissance: formData.dateNaissance
      } : p
    );
    setPatients(updatedPatients);
    setShowEditModal(false);
    resetForm();
  };

  // Delete patient - Open confirmation modal
  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (patientToDelete) {
      setPatients(patients.filter(p => p.id !== patientToDelete.id));
      setShowDeleteModal(false);
      setPatientToDelete(null);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedPatient(null);
    setPatientToDelete(null);
  };

  // Navigate to patient dossier
  const handleViewDossier = (patient) => {
    navigate(`/dossiers/${patient.id}`, { state: { patient } });
  };

  // Get status color for blood type
  const getBloodTypeColor = (type) => {
    const colors = {
      'A+': 'bg-red-100 text-red-700',
      'A-': 'bg-red-50 text-red-600',
      'B+': 'bg-blue-100 text-blue-700',
      'B-': 'bg-blue-50 text-blue-600',
      'AB+': 'bg-purple-100 text-purple-700',
      'AB-': 'bg-purple-50 text-purple-600',
      'O+': 'bg-green-100 text-green-700',
      'O-': 'bg-green-50 text-green-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div className="flex-1">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Rechercher un patient..."
        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
      />
    </div>
  </div>
  <button
    onClick={() => setShowAddModal(true)}
    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
  >
    <UserPlus className="w-4 h-4" />
    Nouveau patient
  </button>
</div>

      

      {/* Patients Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400">Patient</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400">Âge / Sexe</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400">Téléphone</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400">Assurance</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400">Groupe sanguin</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                        {patient.prenom[0]}{patient.nom[0]}
                      </div>
                      <div>
                        <div className="font-medium text-[#1e3a5f]">
                          {patient.prenom} {patient.nom}
                        </div>
                        {patient.allergie && (
                          <div className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Allergie: {patient.allergie}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {patient.age} ans · {patient.sexe}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {patient.telephone}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {patient.assurance}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getBloodTypeColor(patient.groupeSanguin)}`}>
                      {patient.groupeSanguin}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDossier(patient)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        Dossier
                      </button>
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(patient)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Aucun patient trouvé</p>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-[#1e3a5f] text-lg">Nouveau patient</h3>
              <button
                onClick={() => { setShowAddModal(false); resetForm(); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddPatient} className="px-6 py-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Âge *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Sexe</label>
                  <select
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>
                <div >
                  <label className="block text-xs font-medium text-slate-500 mb-1">Téléphone *</label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
               
                <div >
                  <label className="block text-xs font-medium text-slate-500 mb-1">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Assurance</label>
                  <input
                    type="text"
                    name="assurance"
                    value={formData.assurance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Allergie</label>
                  <input
                    type="text"
                    name="allergie"
                    value={formData.allergie}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Aucune"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Groupe sanguin</label>
                  <select
                    name="groupeSanguin"
                    value={formData.groupeSanguin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {showEditModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-[#1e3a5f] text-lg">
                Modifier le patient
                <span className="text-sm font-normal text-slate-400 ml-2">
                  {selectedPatient.prenom} {selectedPatient.nom}
                </span>
              </h3>
              <button
                onClick={() => { setShowEditModal(false); resetForm(); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="px-6 py-5 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Âge *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Sexe</label>
                  <select
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Téléphone *</label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 mb-1">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Assurance</label>
                  <input
                    type="text"
                    name="assurance"
                    value={formData.assurance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Allergie</label>
                  <input
                    type="text"
                    name="allergie"
                    value={formData.allergie}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Aucune"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Groupe sanguin</label>
                  <select
                    name="groupeSanguin"
                    value={formData.groupeSanguin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Date de naissance</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); resetForm(); }}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && patientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-red-50/30">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-[#1e3a5f] text-lg">Confirmer la suppression</h3>
            </div>
            
            <div className="px-6 py-5">
              <p className="text-slate-600 text-sm">
                Êtes-vous sûr de vouloir supprimer le patient 
                <span className="font-semibold text-[#1e3a5f]"> {patientToDelete.prenom} {patientToDelete.nom}</span> ?
              </p>
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Cette action est irréversible. Toutes les données associées seront supprimées.
              </p>
              
              <div className="flex items-center gap-2 mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                  {patientToDelete.prenom[0]}{patientToDelete.nom[0]}
                </div>
                <div>
                  <div className="font-medium text-[#1e3a5f] text-sm">
                    {patientToDelete.prenom} {patientToDelete.nom}
                  </div>
                  <div className="text-xs text-slate-400">
                    {patientToDelete.age} ans · {patientToDelete.telephone}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowDeleteModal(false); setPatientToDelete(null); }}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
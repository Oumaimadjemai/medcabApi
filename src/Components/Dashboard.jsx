import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CalendarDays,
  Banknote,
  Clock,
  Eye,
  BarChart3,
  ChevronRight,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  Calendar,
  Settings,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Today's date
  const today = new Date();
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const formattedDate = `${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  // Stats data
  const stats = [
    {
      label: "Patients total",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      change: "+3 ce mois",
      changeColor: "text-green-600",
    },
    {
      label: "Rendez-vous aujourd'hui",
      value: "5",
      icon: CalendarDays,
      color: "bg-indigo-500",
      change: "1 confirmés",
      changeColor: "text-blue-600",
    },
    {
      label: "Recettes ce mois",
      value: "17,000 DA",
      icon: Banknote,
      color: "bg-emerald-500",
      change: "+12%",
      changeColor: "text-green-600",
    },
    {
      label: "Paiements en attente",
      value: "3",
      icon: Clock,
      color: "bg-amber-500",
      change: "à régler",
      changeColor: "text-amber-600",
    },
  ];

  // Sample data with proper status flow
  const todayAppointments = [
    {
      id: 1,
      time: "08:30",
      patient: "Ahmed Bouzidi",
      initials: "AB",
      motif: "Consultation générale",
      status: "confirmé",
      statusColor: "bg-green-100 text-green-700",
      queueNumber: 1,
      statusOrder: 2,
    },
    {
      id: 2,
      time: "09:00",
      patient: "Fatima Khelifa",
      initials: "FK",
      motif: "Suivi tension artérielle",
      status: "en_cours",
      statusColor: "bg-blue-100 text-blue-700",
      queueNumber: 2,
      statusOrder: 3,
    },
    {
      id: 3,
      time: "09:30",
      patient: "Mohamed Messaoudi",
      initials: "MM",
      motif: "Diabète type 2 - contrôle",
      status: "en_attente",
      statusColor: "bg-amber-100 text-amber-700",
      queueNumber: 3,
      statusOrder: 1,
    },
    {
      id: 4,
      time: "10:30",
      patient: "Leila Hamdi",
      initials: "LH",
      motif: "Bilan sanguin",
      status: "en_attente",
      statusColor: "bg-amber-100 text-amber-700",
      queueNumber: 4,
      statusOrder: 1,
    },
    {
      id: 5,
      time: "11:00",
      patient: "Kamel Aït Yahia",
      initials: "KA",
      motif: "Contrôle asthme",
      status: "terminé",
      statusColor: "bg-gray-100 text-gray-600",
      queueNumber: 5,
      statusOrder: 4,
    },
  ];

  // Get next patient (first in queue that is not terminated)
  const getNextPatient = () => {
    const sorted = [...todayAppointments]
      .filter(a => a.status !== 'terminé' && a.status !== 'annulé')
      .sort((a, b) => a.queueNumber - b.queueNumber);
    return sorted[0] || null;
  };

  const nextPatient = getNextPatient();

  const weekActivity = [
    { day: "Lun", count: 5, max: 5 },
    { day: "Mar", count: 2, max: 5 },
    { day: "Mer", count: 1, max: 5 },
    { day: "Jeu", count: 0, max: 5 },
    { day: "Ven", count: 3, max: 5 },
  ];

  const recentTransactions = [
    {
      patient: "Ahmed Bouzidi",
      date: "2026-08-10",
      type: "Consultation",
      amount: "2,000 DA",
      status: "payé",
    },
    {
      patient: "Fatima Khelifa",
      date: "2026-08-10",
      type: "Consultation",
      amount: "2,000 DA",
      status: "en_attente",
    },
    {
      patient: "Mohamed Messaoudi",
      date: "2026-08-09",
      type: "Analyse",
      amount: "3,500 DA",
      status: "payé",
    },
    {
      patient: "Leila Hamdi",
      date: "2026-08-08",
      type: "Consultation",
      amount: "2,000 DA",
      status: "payé",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      payé: "text-green-600 bg-green-50",
      en_attente: "text-amber-600 bg-amber-50",
      annulé: "text-red-600 bg-red-50",
    };
    return colors[status] || "text-gray-600 bg-gray-50";
  };

  const getStatusText = (status) => {
    const labels = {
      en_attente: "En attente",
      confirmé: "Confirmé",
      en_cours: "En cours",
      terminé: "Terminé",
      annulé: "Annulé",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              if (stat.label === "Patients total") navigate("/patients");
              else if (stat.label === "Rendez-vous aujourd'hui") navigate("/rendez-vous");
              else if (stat.label === "Recettes ce mois") navigate("/transactions");
              else if (stat.label === "Paiements en attente") navigate("/transactions");
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-medium ${stat.changeColor}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-[#1e3a5f]">
              {stat.value}
            </div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Today's Appointments - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-[#1e3a5f] text-sm">
                Rendez-vous d'aujourd'hui
              </span>
            </div>
            <button
              onClick={() => navigate("/rendez-vous")}
              className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Voir tout <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {todayAppointments.map((appt) => (
              <div
                key={appt.id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50/40 transition-colors cursor-pointer"
                onClick={() => navigate("/rendez-vous")}
              >
                <div className="flex flex-col items-center min-w-12">
                  <span className="text-[10px] text-slate-400">N°</span>
                  <span className="text-xs font-bold text-blue-600">#{appt.queueNumber}</span>
                </div>
                <div className="text-xs font-semibold text-blue-600 w-12 flex-shrink-0">
                  {appt.time}
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                  {appt.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#1e3a5f] truncate">
                    {appt.patient}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {appt.motif}
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${appt.statusColor}`}
                >
                  {getStatusText(appt.status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Takes 1 column */}
        <div className="space-y-4">
          {/* Week Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-[#1e3a5f] text-sm">
                Activité de la semaine
              </span>
            </div>
            <div className="space-y-2.5">
              {weekActivity.map((day) => (
                <div key={day.day} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-8">{day.day}</span>
                  <div className="flex-1 h-2 rounded-full bg-blue-50 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                      style={{ width: `${(day.count / day.max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-blue-600 w-4 text-right">
                    {day.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Patient Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="w-4 h-4 opacity-80" />
              <span className="text-xs font-medium opacity-80">
                Prochain patient
              </span>
            </div>
            {nextPatient ? (
              <>
                <div className="font-semibold text-lg">
                  {nextPatient.patient}
                </div>
                <div className="text-xs opacity-75 mt-1">
                  #{nextPatient.queueNumber} · {nextPatient.time} · {nextPatient.motif}
                </div>
                <div className="text-xs opacity-60 mt-1">
                  Statut: {getStatusText(nextPatient.status)}
                </div>
                <button
                  onClick={() => navigate("/rendez-vous")}
                  className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors rounded-lg py-2 text-sm font-medium"
                >
                  {nextPatient.status === 'en_cours' ? 'Continuer la consultation' : 'Commencer la consultation'}
                </button>
              </>
            ) : (
              <>
                <div className="font-semibold text-lg">—</div>
                <div className="text-xs opacity-75 mt-1">
                  Aucun patient en attente
                </div>
                <button
                  onClick={() => navigate("/rendez-vous")}
                  className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors rounded-lg py-2 text-sm font-medium"
                >
                  Voir les rendez-vous
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Banknote className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-[#1e3a5f] text-sm">
              Transactions récentes
            </span>
          </div>
          <button
            onClick={() => navigate("/transactions")}
            className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Voir tout <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-5 py-2.5 text-left text-xs font-medium text-slate-400">
                  Patient
                </th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-slate-400">
                  Date
                </th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-slate-400">
                  Type
                </th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-slate-400">
                  Montant
                </th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-slate-400">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                  onClick={() => navigate("/transactions")}
                >
                  <td className="px-5 py-3 font-medium text-[#1e3a5f]">
                    {transaction.patient}
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {transaction.date}
                  </td>
                  <td className="px-5 py-3 text-slate-500 capitalize">
                    {transaction.type}
                  </td>
                  <td className="px-5 py-3 font-semibold text-[#1e3a5f]">
                    {transaction.amount}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status === "en_attente"
                        ? "En attente"
                        : transaction.status === "payé"
                          ? "Payé"
                          : transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => navigate("/patients")}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-sm font-medium text-[#1e3a5f]">Patients</div>
          <div className="text-xs text-slate-400">Gérer les dossiers</div>
        </button>

        <button
          onClick={() => navigate("/rendez-vous")}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group"
        >
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-indigo-100 transition-colors">
            <CalendarDays className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-sm font-medium text-[#1e3a5f]">Rendez-vous</div>
          <div className="text-xs text-slate-400">Planifier</div>
        </button>

        <button
          onClick={() => navigate("/ordonnances")}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-100 transition-colors">
            <FileText className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-sm font-medium text-[#1e3a5f]">Ordonnances</div>
          <div className="text-xs text-slate-400">Prescriptions</div>
        </button>

        <button
          onClick={() => navigate("/parametres")}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center group"
        >
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-100 transition-colors">
            <Settings className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-sm font-medium text-[#1e3a5f]">Paramètres</div>
          <div className="text-xs text-slate-400">Configuration</div>
        </button>
      </div>
    </div>
  );
}
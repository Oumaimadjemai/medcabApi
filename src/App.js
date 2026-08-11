import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter , Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layout';
import Patients from './Components/Patients';
import RendezVous from './Components/RendezVous';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route element={<Layout/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/rendez-vous" element={<RendezVous/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>  
    
    </BrowserRouter>
  );
}

export default App;

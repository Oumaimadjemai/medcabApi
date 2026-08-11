import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter , Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Layout from './Components/Layout';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route element={<Layout/>}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>  
    
    </BrowserRouter>
  );
}

export default App;

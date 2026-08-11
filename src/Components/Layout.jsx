import { Outlet } from 'react-router-dom';
import Navbar from './Menu/Navbar';
import Sidebar from './Menu/SideBar';


export default function Layout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar - fixed on the left */}
      <Sidebar/>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - fixed at top */}
        <Navbar />
        
        {/* Page content - this changes based on route */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
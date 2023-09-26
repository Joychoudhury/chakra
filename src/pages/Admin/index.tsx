import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import AdminSidebar from '@/components/AdminSidebar';
import AdminPanel from '@/components/AdminPanel';
import AdminEditProducts from '@/components/AdminEditProducts';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('addProduct');

  return (
    <div className="">
      <Navbar />
      <div className="md:flex">
        <AdminSidebar setActiveSection={setActiveSection} activeSection={activeSection} />
        <div className="flex-1">
          {activeSection === 'addProduct' && <AdminPanel />}
          {activeSection === 'editProduct' && <AdminEditProducts />}

          {/* Add other sections here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;

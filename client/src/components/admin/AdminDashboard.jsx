import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CalendarCheck, 
} from 'lucide-react';
import Navbar from './AdminNavbar';
import Footer from '../Footer';

const AdminDashboard = () => {
  const adminMenuItems = [
    {
      title: 'Space Management',
      description: 'Add, edit, and manage spaces',
      icon: <Building2 className="h-10 w-10 text-blue-500" />,
      link: '/admin/spaces',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      title: 'Booking Management',
      description: 'View and manage bookings',
      icon: <CalendarCheck className="h-10 w-10 text-green-500" />,
      link: '/admin/bookings',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 min-h-screen">
        <div className=" text-center">
          <h1 className="mt-[80px] text-4xl font-extrabold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage Space and User Bookings by W. Space's admins 
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12 p-12">
          {adminMenuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.link}
              className={`
                block 
                rounded-xl 
                shadow-md 
                transform 
                transition-all 
                duration-300 
                ${item.bgColor}
                ${item.hoverColor}
                hover:shadow-xl 
                hover:-translate-y-2 
                p-6 
                group
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {item.title}
                </h2>
                {item.icon}
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {item.description}
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                Manage 
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
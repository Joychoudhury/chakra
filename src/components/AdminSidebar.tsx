import React, { useState } from 'react';

interface AdminSidebarProps {
    setActiveSection: (section: string) => void;
    activeSection: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ setActiveSection, activeSection }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='md:min-h-screen'>
            <div className="md:hidden p-2">

                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    onClick={() => setOpen(!open)}

                >
                    <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='h-6 w-6' viewBox="0 0 30 30">
                            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
                        </svg>
                    </span>
                </button>

                {open && (
                    <div className="absolute md:hidden bg-white text-gray-700 max-w-[300px] pb-10 shadow-2xl rounded-md overflow-hidden">
                        <div className="p-3 flex flex-col gap-2">
                            <ul className="space-y-2">
                                <SidebarButton
                                    label="Add Product"
                                    section="addProduct"
                                    activeSection={activeSection}
                                    setActiveSection={setActiveSection}
                                />
                                <SidebarButton
                                    label="Edit Product"
                                    section="editProduct"
                                    activeSection={activeSection}
                                    setActiveSection={setActiveSection}
                                />

                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <div className="hidden md:block bg-gray-200 w-64 min-h-full p-4">
                <ul className="space-y-2">
                    <SidebarButton
                        label="Add Product"
                        section="addProduct"
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />
                    <SidebarButton
                        label="Edit Product"
                        section="editProduct"
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                    />
                </ul>
            </div>
        </div>
    );
};

interface SidebarButtonProps {
    label: string;
    section: string;
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, section, activeSection, setActiveSection }) => (
    <li>
        <button
            onClick={() => setActiveSection(section)}
            className={`${activeSection === section ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300'} w-full p-2 rounded cursor-pointer`}
        >
            {label}
        </button>
    </li>
);

export default AdminSidebar;

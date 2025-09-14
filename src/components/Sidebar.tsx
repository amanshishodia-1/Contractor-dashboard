import { FileText, BarChart3, FileBarChart, Settings, Upload, X } from 'lucide-react';

interface SidebarProps {
  onUploadClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ onUploadClick, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: FileText, label: 'Contracts', active: true },
    { icon: BarChart3, label: 'Insights', active: false },
    { icon: FileBarChart, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 transform lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">ContractHub</span>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="px-4 pb-4">
        <button
          onClick={onUploadClick}
          className="w-full mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Contract</span>
        </button>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a
                  href="#"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    item.active
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-r-2 border-indigo-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
    </>
  );
}

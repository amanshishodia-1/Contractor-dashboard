import { Calendar, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { Contract } from '../types/contract';

interface ContractsTableProps {
  contracts: Contract[];
  onContractClick: (contractId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ContractsTable({
  contracts,
  onContractClick,
  currentPage,
  totalPages,
  onPageChange,
}: ContractsTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Expired':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Renewal Due':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300`;
      case 'Expired':
        return `${baseClasses} bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300`;
      case 'Renewal Due':
        return `${baseClasses} bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300`;
      default:
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`;
    }
  };

  const getRiskBadge = (risk: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (risk) {
      case 'Low':
        return `${baseClasses} bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300`;
      case 'Medium':
        return `${baseClasses} bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300`;
      case 'High':
        return `${baseClasses} bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300`;
      default:
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      {/* Mobile Card View */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              onClick={() => onContractClick(contract.id)}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{contract.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ID: {contract.id}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(contract.status)}
                  <span className={getStatusBadge(contract.status)}>
                    {contract.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{contract.parties}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Expires: {formatDate(contract.expiry)}</span>
                  <span className={getRiskBadge(contract.risk)}>
                    {contract.risk}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Contract Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Parties
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Risk Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {contracts.map((contract) => (
              <tr
                key={contract.id}
                onClick={() => onContractClick(contract.id)}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{contract.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">ID: {contract.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <div className="text-sm text-gray-900 dark:text-gray-100">{contract.parties}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {formatDate(contract.expiry)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(contract.status)}
                    <span className={getStatusBadge(contract.status)}>
                      {contract.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getRiskBadge(contract.risk)}>
                    {contract.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 px-3 sm:px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                Showing{' '}
                <span className="font-medium">
                  {(currentPage - 1) * 10 + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * 10, contracts.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium">{contracts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`relative inline-flex items-center px-2 sm:px-4 py-2 border text-xs sm:text-sm font-medium transition-colors duration-200 ${
                      page === currentPage
                        ? 'z-10 bg-indigo-50 dark:bg-indigo-900/50 border-indigo-500 text-indigo-600 dark:text-indigo-300'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

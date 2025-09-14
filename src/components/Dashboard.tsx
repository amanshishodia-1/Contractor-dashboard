import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ContractsTable from './ContractsTable';
import UploadModal from './UploadModal';
import type { Contract } from '../types/contract';

export default function Dashboard() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const contractsPerPage = 10;

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    filterContracts();
  }, [contracts, searchTerm, statusFilter, riskFilter]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contracts');
      }
      const data = await response.json();
      setContracts(data);
    } catch (err) {
      setError('Failed to load contracts. Please try again.');
      console.error('Error fetching contracts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterContracts = () => {
    let filtered = contracts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(contract =>
        contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.parties.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(contract => contract.status === statusFilter);
    }

    // Risk filter
    if (riskFilter !== 'All') {
      filtered = filtered.filter(contract => contract.risk === riskFilter);
    }

    setFilteredContracts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleContractClick = (contractId: string) => {
    navigate(`/contracts/${contractId}`);
  };

  // Pagination
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = filteredContracts.slice(indexOfFirstContract, indexOfLastContract);
  const totalPages = Math.ceil(filteredContracts.length / contractsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contracts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            {error}
          </div>
          <button
            onClick={fetchContracts}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
      <Sidebar 
        onUploadClick={() => setIsUploadModalOpen(true)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <TopBar 
          user={user}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          riskFilter={riskFilter}
          onRiskFilterChange={setRiskFilter}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Contracts Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage and monitor your contracts</p>
            </div>

            {filteredContracts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 text-lg">
                  {contracts.length === 0 ? 'No contracts yet' : 'No contracts match your filters'}
                </div>
                {contracts.length === 0 && (
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Upload Your First Contract
                  </button>
                )}
              </div>
            ) : (
              <ContractsTable
                contracts={currentContracts}
                onContractClick={handleContractClick}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            )}
          </div>
        </main>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}

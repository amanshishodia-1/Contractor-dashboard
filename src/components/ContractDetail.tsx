import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, AlertTriangle, CheckCircle, Clock, Eye, FileText, Brain, Search, Download, Edit } from 'lucide-react';
import type { Contract } from '../types/contract';

export default function ContractDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEvidencePanel, setShowEvidencePanel] = useState(false);

  useEffect(() => {
    fetchContract();
  }, [id]);

  const fetchContract = async () => {
    try {
      setLoading(true);
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contract');
      }
      const contracts = await response.json();
      const foundContract = contracts.find((c: Contract) => c.id === id);
      
      if (!foundContract) {
        throw new Error('Contract not found');
      }
      
      setContract(foundContract);
    } catch (err) {
      setError('Failed to load contract details. Please try again.');
      console.error('Error fetching contract:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Expired':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'Renewal Due':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
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
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
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

  const getInsightBadge = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300';
      case 'High':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contract details...</p>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded">
            {error || 'Contract not found'}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 self-start"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <div className="flex space-x-2 sm:space-x-3">
              <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
                <Download className="h-4 w-4 inline mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors duration-200">
                <Edit className="h-4 w-4 inline mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{contract.name}</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">Contract ID: {contract.id}</p>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{contract.parties}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Expires: {formatDate(contract.expiry)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-start sm:items-end space-x-2 sm:space-x-0 sm:space-y-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(contract.status)}
                  <span className={getStatusBadge(contract.status)}>
                    {contract.status}
                  </span>
                </div>
                <span className={getRiskBadge(contract.risk)}>
                  {contract.risk}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Contract Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Contract Clauses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contract Clauses</h2>
              
              {contract.clauses && contract.clauses.length > 0 ? (
                <div className="space-y-4">
                  {contract.clauses.map((clause, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{clause.title}</h3>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className="text-xs font-medium text-indigo-600">
                            {Math.round(clause.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{clause.summary}</p>
                      <div className="mt-2">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-indigo-600 h-1.5 rounded-full"
                            style={{ width: `${clause.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No clauses available for this contract.</p>
              )}
            </div>

            {/* AI Insights Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Insights</h2>
              </div>
              
              {contract.insights && contract.insights.length > 0 ? (
                <div className="space-y-3">
                  {contract.insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${getInsightBadge(insight.risk)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                          insight.risk === 'High' ? 'bg-red-500' :
                          insight.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium uppercase tracking-wide">
                              {insight.risk} Risk
                            </span>
                          </div>
                          <p className="text-sm">{insight.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No AI insights available for this contract.</p>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Evidence Panel Toggle */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <button
                onClick={() => setShowEvidencePanel(!showEvidencePanel)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">Evidence Panel</span>
                </div>
                <Eye className="h-4 w-4 text-gray-500" />
              </button>

              {showEvidencePanel && contract.evidence && (
                <div className="mt-4 space-y-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Retrieved Evidence</h3>
                  {contract.evidence.map((evidence, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">
                          {evidence.source}
                        </span>
                        <span className="text-xs text-indigo-600">
                          {Math.round(evidence.relevance * 100)}% relevant
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{evidence.snippet}"</p>
                      <div className="mt-2">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-indigo-600 h-1 rounded-full"
                            style={{ width: `${evidence.relevance * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contract Clauses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Contract Clauses</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Download Contract
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Export Analysis
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Schedule Review
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Share Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

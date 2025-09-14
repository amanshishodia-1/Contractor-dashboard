import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, AlertTriangle, CheckCircle, Clock, Eye, FileText, Brain, Search } from 'lucide-react';
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
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Expired':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Renewal Due':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getRiskBadge = (risk: string) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (risk) {
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'High':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getInsightBadge = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'Medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'High':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contract details...</p>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Contract not found'}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{contract.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{contract.parties}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Expires: {formatDate(contract.expiry)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(contract.status)}
                <span className={getStatusBadge(contract.status)}>
                  {contract.status}
                </span>
              </div>
              <span className={getRiskBadge(contract.risk)}>
                Risk: {contract.risk}
              </span>
            </div>
          </div>

          {contract.start && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Start Date:</span>
                  <span className="ml-2 text-gray-600">{formatDate(contract.start)}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Contract ID:</span>
                  <span className="ml-2 text-gray-600">{contract.id}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Clauses Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Contract Clauses</h2>
              </div>
              
              {contract.clauses && contract.clauses.length > 0 ? (
                <div className="space-y-4">
                  {contract.clauses.map((clause, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{clause.title}</h3>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className="text-xs font-medium text-indigo-600">
                            {Math.round(clause.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{clause.summary}</p>
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-1.5">
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
                <p className="text-gray-500">No clauses available for this contract.</p>
              )}
            </div>

            {/* AI Insights Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
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
                <p className="text-gray-500">No AI insights available for this contract.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Evidence Panel Toggle */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <button
                onClick={() => setShowEvidencePanel(!showEvidencePanel)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Evidence Panel</span>
                </div>
                <Eye className="h-4 w-4 text-gray-500" />
              </button>

              {showEvidencePanel && contract.evidence && (
                <div className="mt-4 space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Retrieved Evidence</h3>
                  {contract.evidence.map((evidence, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">
                          {evidence.source}
                        </span>
                        <span className="text-xs text-indigo-600">
                          {Math.round(evidence.relevance * 100)}% relevant
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 italic">"{evidence.snippet}"</p>
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-1">
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

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Download Contract
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Export Analysis
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Schedule Review
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
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

import React, { useState } from 'react';
import { useUserProfile } from '../context/UserProfileContext';
import { useDocumentVault } from '../context/DocumentVaultContext';
import { matchSchemes } from '../utils/eligibilityMatcher';
import schemesData from '../data/schemes.json';
import SchemeCard from '../components/SchemeCard';

export default function FindSchemePage({ onCalculateResults }) {
  const { profile, updateProfile } = useUserProfile();
  const { documents } = useDocumentVault();
  
  const [localProfile, setLocalProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setLocalProfile(prev => ({ ...prev, [name]: val }));
  };

  const heldDocs = documents.filter(d => d.status === 'Available').map(d => d.documentType);
  const currentResults = matchSchemes(localProfile, heldDocs, schemesData);

  const handleSaveAndRecheck = () => {
    updateProfile(localProfile);
    if (onCalculateResults) {
      onCalculateResults(localProfile);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Simulator / Editor */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
            <p className="text-sm text-gray-500">Update details to recheck eligibility</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
              <select name="state" value={localProfile.state || 'All'} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-gray-300">
                <option value="All">All / Any</option>
                {[
                  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
                  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
                  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
                  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
                  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
                ].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Age</label>
              <input type="number" name="age" value={localProfile.age || ''} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Occupation</label>
              <select name="occupation" value={localProfile.occupation || ''} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-gray-300">
                <option value="">Select...</option>
                <option value="Student">Student</option>
                <option value="Farmer">Farmer</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Annual Income (₹)</label>
              <input type="number" name="annualIncome" value={localProfile.annualIncome || ''} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Marital Status</label>
              <select name="maritalStatus" value={localProfile.maritalStatus || ''} onChange={handleChange} className="w-full p-2.5 rounded-lg border border-gray-300">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <button onClick={handleSaveAndRecheck} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md">
                Recheck My Benefits
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 shadow-sm">
          <h3 className="text-amber-800 font-bold mb-2">What If? Simulator</h3>
          <p className="text-sm text-amber-700 mb-4">
            Change values above to see how it affects your eligibility without modifying your real profile.
          </p>
          <div className="text-sm font-bold text-amber-900 bg-amber-100/50 p-3 rounded-lg border border-amber-200">
            Simulation matches: {currentResults.filter(r => r.matchScore >= 55).length} strong potential paths
          </div>
        </div>
      </div>

      {/* Results / Benefit Map */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Potential Benefits Found</h2>
          <p className="text-gray-600">Based on your profile and available documents.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentResults.map(result => (
            <SchemeCard key={result.scheme.id} result={result} onClick={() => onCalculateResults && onCalculateResults(localProfile, result, currentResults)} />
          ))}
        </div>
        
        {currentResults.length === 0 && (
          <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200">
            <h3 className="text-gray-800 font-bold text-lg mb-2">No potential matches found yet.</h3>
            <p className="text-gray-500 text-sm">Try updating your profile or checking your state settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}

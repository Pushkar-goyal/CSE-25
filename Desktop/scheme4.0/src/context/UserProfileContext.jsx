import React, { createContext, useContext, useState, useEffect } from 'react';
import { localStorageService } from '../services/storage/localStorageService';

const UserProfileContext = createContext();

const defaultSeedProfile = {
  fullName: "Rajesh Kumar Sharma",
  fatherName: "Rameshwar Sharma",
  motherName: "Sunita Sharma",
  dob: "1992-06-15",
  age: 32,
  gender: "Male",
  mobileNumber: "9876543210",
  email: "rajesh.sharma@example.com",
  aadhaarNumber: "4589 1234 9012",
  panNumber: "ABCPS1234K",
  voterId: "EPIC9876543",
  passportNumber: "Z9876543",
  drivingLicense: "DL-0420110012345",
  maritalStatus: "Married",
  occupation: "Farmer",
  annualIncome: 180000,
  casteCategory: "OBC",
  disabilityStatus: false,
  
  // Address
  houseNumber: "HN-42",
  street: "Main Village Road",
  village: "Rampur",
  city: "Karnal",
  district: "Karnal",
  state: "Haryana",
  pinCode: "132001",

  // Family Info
  familyId: "FAM-HR-88712",
  rationCardNumber: "RAT-BPL-55412",
  familyMembersCount: 4,

  // Bank Details
  accountHolderName: "Rajesh Kumar Sharma",
  bankName: "State Bank of India",
  bankAccountNumber: "30987654321",
  ifscCode: "SBIN0001234",
  branch: "Karnal Main Branch",

  // Property & Land
  landOwnership: true,
  landSizeAcres: 2.5,

  // Documents already held checklist
  documentsHeld: [
    "Aadhaar Card",
    "PAN Card",
    "Land Patta / Khasra-Khatauni",
    "Bank Passbook / Cancelled Cheque",
    "Ration Card (APL/BPL/AAY)",
    "Income Certificate",
    "Domicile / Residence Certificate"
  ]
};

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorageService.getProfile();
    return saved || defaultSeedProfile;
  });

  const [formDraft, setFormDraft] = useState(() => {
    try {
      const draft = localStorage.getItem('scheme_form_draft_v1');
      return draft ? JSON.parse(draft) : profile;
    } catch (e) {
      return profile;
    }
  });

  const [isVaultLocked, setIsVaultLocked] = useState(() => {
    return Boolean(localStorageService.getVaultPIN());
  });

  useEffect(() => {
    localStorageService.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('scheme_form_draft_v1', JSON.stringify(formDraft));
    } catch (e) {
      console.error('Draft save failed:', e);
    }
  }, [formDraft]);

  const updateProfile = (updatedFields) => {
    setProfile(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const updateFormDraft = (updatedFields) => {
    setFormDraft(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const importProfileData = (jsonObj) => {
    if (jsonObj && typeof jsonObj === 'object') {
      setProfile(jsonObj);
      setFormDraft(jsonObj);
      return true;
    }
    return false;
  };

  const clearAllVaultProfile = () => {
    localStorageService.clearVault();
    setProfile(defaultSeedProfile);
    setFormDraft(defaultSeedProfile);
  };

  const lockVaultWithPIN = (pin) => {
    localStorageService.setVaultPIN(pin);
    setIsVaultLocked(true);
  };

  const unlockVaultWithPIN = (inputPin) => {
    const savedPin = localStorageService.getVaultPIN();
    if (inputPin === savedPin) {
      setIsVaultLocked(false);
      return true;
    }
    return false;
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        updateProfile,
        formDraft,
        updateFormDraft,
        importProfileData,
        clearAllVaultProfile,
        isVaultLocked,
        lockVaultWithPIN,
        unlockVaultWithPIN,
        defaultSeedProfile
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => useContext(UserProfileContext);

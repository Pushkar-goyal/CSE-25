import React, { createContext, useContext, useState, useEffect } from 'react';

const DocumentVaultContext = createContext();

const initialDocs = [
  { documentType: 'Aadhaar Card', status: 'Available' },
  { documentType: 'Marksheet', status: 'Available' },
  { documentType: 'Income Certificate', status: 'Available' }
];

export function DocumentVaultProvider({ children }) {
  const [documents, setDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem('demo_document_vault');
      return saved ? JSON.parse(saved) : initialDocs;
    } catch (e) {
      return initialDocs;
    }
  });

  useEffect(() => {
    localStorage.setItem('demo_document_vault', JSON.stringify(documents));
  }, [documents]);

  const addDocument = (metadata) => {
    setDocuments(prev => [...prev.filter(d => d.documentType !== metadata.documentType), metadata]);
  };

  const removeDocument = (docName) => {
    setDocuments(prev => prev.filter(d => d.documentType !== docName));
  };

  const clearAllDocuments = () => {
    setDocuments([]);
  };

  return (
    <DocumentVaultContext.Provider
      value={{
        documents,
        addDocument,
        removeDocument,
        clearAllDocuments
      }}
    >
      {children}
    </DocumentVaultContext.Provider>
  );
}

export const useDocumentVault = () => useContext(DocumentVaultContext);

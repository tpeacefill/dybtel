// Ward Serial ID data with assigned names
export const wardSerialData = [
  { id: '001', name: 'Alpha Ward' },
  { id: '002', name: 'Beta Ward' },
  { id: '003', name: 'Gamma Ward' },
  { id: '004', name: 'Delta Ward' },
  { id: '005', name: 'Epsilon Ward' },
  { id: '006', name: 'Zeta Ward' },
  { id: '007', name: 'Eta Ward' },
  { id: '008', name: 'Theta Ward' },
  { id: '009', name: 'Iota Ward' },
  { id: '010', name: 'Kappa Ward' },
  { id: '011', name: 'Lambda Ward' },
  { id: '012', name: 'Mu Ward' },
  { id: '013', name: 'Nu Ward' },
  { id: '014', name: 'Xi Ward' },
  { id: '015', name: 'Omicron Ward' },
  { id: '016', name: 'Pi Ward' },
  { id: '017', name: 'Rho Ward' },
  { id: '018', name: 'Sigma Ward' },
  { id: '019', name: 'Tau Ward' },
  { id: '020', name: 'Upsilon Ward' },
]

// Helper function to get ward name by ID
export const getWardNameById = (id: string): string | undefined => {
  const ward = wardSerialData.find(ward => ward.id === id)
  return ward?.name
}

// Helper function to validate ward serial ID
export const isValidWardSerialId = (id: string): boolean => {
  return wardSerialData.some(ward => ward.id === id)
}

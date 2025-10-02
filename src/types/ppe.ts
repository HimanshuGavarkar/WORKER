export interface PPEItem {
  id: string;
  name: string;
  icon: string;
  required: boolean;
  category: 'safety' | 'detection' | 'visibility';
  rfidEnabled?: boolean;
}

export interface PPEVerificationResult {
  workerId: string;
  timestamp: Date;
  items: PPEItemStatus[];
  overallStatus: 'compliant' | 'non-compliant' | 'partial';
  entryAllowed: boolean;
  missingItems: string[];
}

export interface PPEItemStatus {
  item: PPEItem;
  detected: boolean;
  confidence?: number;
  method: 'vision' | 'rfid' | 'manual';
}

export const PPE_ITEMS: PPEItem[] = [
  {
    id: 'helmet',
    name: 'Safety Helmet',
    icon: '/icons/helmet.svg',
    required: true,
    category: 'safety'
  },
  {
    id: 'cap-lamp',
    name: 'Cap Lamp',
    icon: '/icons/cap-lamp.svg',
    required: true,
    category: 'visibility',
    rfidEnabled: true
  },
  {
    id: 'safety-boots',
    name: 'Safety Boots',
    icon: '/icons/boots.svg',
    required: true,
    category: 'safety'
  },
  {
    id: 'reflective-vest',
    name: 'Reflective Vest',
    icon: '/icons/vest.svg',
    required: true,
    category: 'visibility'
  },
  {
    id: 'gas-detector',
    name: 'Gas Detector',
    icon: '/icons/gas-detector.svg',
    required: true,
    category: 'detection',
    rfidEnabled: true
  },
  {
    id: 'self-rescuer',
    name: 'Self Rescuer',
    icon: '/icons/self-rescuer.svg',
    required: true,
    category: 'safety',
    rfidEnabled: true
  }
];
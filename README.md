# PPE Verification System

A comprehensive Personal Protective Equipment (PPE) verification system designed for coal mining operations. This system ensures strict adherence to safety protocols by automatically verifying that workers are equipped with mandatory PPE items before entering underground mine areas.

## Features

### 🛡️ Real-time PPE Verification
- Computer vision-based detection of helmets, safety boots, reflective vests
- RFID/NFC verification for cap lamps, gas detectors, and self-rescuers
- Instant compliance checking with audio-visual alerts

### 📊 Comprehensive Dashboard
- Live statistics on worker compliance and mine entry status
- Real-time monitoring of verification gates
- Recent activity tracking and alerts management

### 👥 Worker Management
- Complete worker profiles with compliance history
- Role-based access control for different user types
- Violation tracking and safety champion recognition

### 📈 Analytics & Reporting
- Automated daily, weekly, and monthly compliance reports
- Trend analysis and predictive safety insights
- Export capabilities for regulatory compliance

### 🔄 System Integration
- Offline mode with data synchronization
- Integration-ready APIs for existing mine systems
- Mobile-responsive design for field operations

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Build Tool**: Turbopack
- **Linting**: ESLint

## Required PPE Items

The system monitors the following mandatory PPE items:

1. **Safety Helmet** - Vision detection
2. **Cap Lamp** - RFID/NFC verification
3. **Safety Boots** - Vision detection
4. **Reflective Vest** - Vision detection
5. **Gas Detector** - RFID/NFC verification
6. **Self Rescuer** - RFID/NFC verification

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ppe-verification-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── common/           # Reusable components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components
│   └── ppe/              # PPE verification components
├── services/             # API and service layers
│   ├── api/              # API service classes
│   ├── camera/           # Camera integration
│   ├── notifications/    # Notification system
│   └── rfid/             # RFID services
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── hooks/                # Custom React hooks
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### Backend Integration

This frontend is designed to work with a Node.js/Express backend that provides:

- Worker management APIs
- PPE verification endpoints  
- Real-time WebSocket connections
- Report generation services

## User Roles

- **Admin**: Full system access, user management, system configuration
- **Safety Manager**: Compliance monitoring, report generation, alert management
- **Supervisor**: Worker monitoring, manual overrides, shift management
- **Operator**: Basic verification operations, worker entry processing

## Safety Features

- **Entry Control**: Automatic denial of access for non-compliant workers
- **Alert System**: Immediate notifications for violations and system issues
- **Audit Trail**: Complete logging of all verification activities
- **Emergency Override**: Manual override capabilities for emergency situations
- **Offline Mode**: Continued operation during network outages

## Compliance Standards

The system supports compliance with:
- DGMS (Directorate General of Mines Safety) regulations
- OSHA (Occupational Safety and Health Administration) standards
- ISO 45001 Occupational Health and Safety Management

## Development Roadmap

- [ ] Authentication system implementation
- [ ] Real-time camera integration
- [ ] RFID reader integration  
- [ ] Advanced reporting dashboard
- [ ] Mobile application
- [ ] AI/ML model training for PPE detection
- [ ] Integration with mine management systems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software designed for coal mining safety operations.

## Support

For technical support or questions about the PPE verification system, please contact the development team or refer to the system documentation.

---

**Safety First**: This system is designed to enhance worker safety in coal mining operations. Regular maintenance and calibration of detection systems are essential for optimal performance.
# WORKER
# WORKER

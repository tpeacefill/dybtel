# Dybtel - Mobile Wallet Application

A modern React-based mobile wallet application built with TypeScript, featuring user authentication, balance management, and transaction history tracking.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login with email and password validation
- **Balance Management**: Real-time balance calculation and display
- **Top-Up System**: Quick amount selection and custom amount input
- **Transaction History**: Complete activity tracking with detailed transaction records
- **Profile Management**: Dynamic profile avatars with auto-rotation

### User Experience
- **Responsive Design**: Optimized for mobile and desktop devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Form Validation**: Real-time validation with helpful error messages
- **Navigation**: Seamless routing between different sections

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management
- **Zustand** - Lightweight state management
- **React Router DOM** - Client-side routing

### Validation & Forms
- **Zod** - Schema validation library
- **Custom Hooks** - Reusable form field management

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📱 Pages & Components

### Main Pages
- **Login** (`/login`) - User authentication
- **Dashboard** (`/dashboard`) - Balance overview and top-up interface
- **Top-Up** (`/topup`) - Transaction processing
- **Activity History** (`/activity-history`) - Transaction records

### Key Components
- **AuthFormLayout** - Responsive authentication form wrapper
- **ProfileAvatar** - Dynamic profile display with rotation
- **FormField** - Reusable form input component
- **TransactionTable** - Transaction history display
- **NavigationBar** - Consistent navigation across pages

### Custom Hooks
- **useFormField** - Form field state management
- **useBalance** - Balance calculation and formatting
- **useProfileRotation** - Profile avatar rotation logic
- **useValidationErrorHandler** - Centralized validation error handling

## 🎨 Design Features

### Responsive Images
- **Small screens**: Optimized world map copy for mobile
- **Medium+ screens**: Full-resolution world map background
- **Profile avatars**: Multiple distinct profile images

### Visual Elements
- **Gradient backgrounds**: Smooth color transitions
- **Curved sections**: Modern geometric design elements
- **Animated profiles**: Auto-rotating profile avatars
- **Interactive buttons**: Hover states and transitions

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd dybtel

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── auth/           # Authentication components
├── components/     # Reusable UI components
│   ├── icons/      # SVG icon components
│   └── ...
├── hooks/          # Custom React hooks
├── pages/          # Main application pages
├── store/          # Zustand state management
├── constants/       # Application constants
└── assets/         # Static assets (images, etc.)
```

## 🔧 Configuration

### Environment Setup
The application uses environment-based configuration for:
- API endpoints
- Feature flags
- Development/production settings

### State Management
- **Auth Store**: User authentication state
- **Transaction Store**: Transaction history and balance management

## 🎯 Key Features Explained

### Profile System
- Three distinct profile configurations with different colors and arc types
- Auto-rotation every 3 seconds for dynamic user experience
- Individual profile images for visual diversity

### Transaction Processing
- Ward Serial ID validation (001-020 range)
- Phone number formatting and validation
- Amount validation with custom input support
- Real-time balance updates

### Responsive Design
- Mobile-first approach with progressive enhancement
- Adaptive image loading based on screen size
- Touch-friendly interface elements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Optimized for performance and user experience
- Designed with accessibility and mobile-first principles

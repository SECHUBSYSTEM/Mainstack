# Mainstack Revenue Dashboard

A modern, responsive revenue management dashboard built with Next.js for tracking transactions, wallet balances, and financial analytics.

## 📋 Table of Contents

- [Overview](#overview)
- [Why Next.js?](#why-nextjs)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Component Documentation](#component-documentation)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Performance Optimizations](#performance-optimizations)

## 🎯 Overview

This is a frontend engineering exercise for Mainstack - a comprehensive dashboard application that allows users to:
- View their available wallet balance and financial metrics
- Track and filter transactions by date, type, and status
- Visualize revenue trends through interactive charts
- Manage their profile and access various apps

## 🚀 Why Next.js?

Next.js was chosen as the React framework for several **concrete reasons**:

### 1. **App Router Architecture (Next.js 13+)**
- **File-based routing**: Automatic route creation based on file structure in the `app/` directory
- **Layout system**: Shared layouts (`layout.tsx`) that persist across routes without re-rendering
- **Server Components by default**: Better performance with automatic code splitting for performance
- This project uses App Router for streamlined navigation and layout management

### 2. **Built-in Performance Optimizations**
- **Automatic code splitting**: Each page only loads the JavaScript it needs
- **Image optimization**: Built-in `<Image>` component with lazy loading and format optimization
- **Font optimization**: Custom font loading with zero layout shift (`@font-face` in `globals.css`)
- **Bundle optimization**: Tree shaking and dead code elimination out of the box

### 3. **Developer Experience**
- **TypeScript support**: First-class TypeScript integration with zero configuration
- **Fast Refresh**: Instant feedback during development without losing component state
- **Error handling**: Better error messages and debugging experience
- **Path aliases**: Using `@/*` imports for cleaner code organization

### 4. **Production-Ready Features**
- **Static & Dynamic rendering**: Mix static and dynamic content as needed
- **API routes**: Can easily add backend API endpoints if needed
- **Middleware support**: Request interception for authentication, logging, etc.
- **Edge runtime**: Deploy to edge networks for global performance

### 5. **SEO & Metadata**
- **Metadata API**: Simple way to add meta tags (`app/layout.tsx`)
- **Automatic `<html>` and `<body>` management**: Better SEO structure
- **Semantic HTML**: Better search engine crawling and accessibility


### 6. **Why Not Plain React?**
- **No routing setup**: React requires React Router configuration
- **No SSR out of box**: Would need custom server setup for server-side rendering
- **Build configuration**: Would need Webpack/Vite configuration
- **No automatic optimization**: Manual setup for code splitting, lazy loading, etc.
- **No metadata management**: Need react-helmet or similar libraries

## ✨ Features

### 🏦 Wallet Management
- Display available balance with formatted currency
- Quick withdraw functionality
- Real-time balance updates

### 📊 Financial Analytics
- **Side Statistics**: Ledger balance, total payout, total revenue, pending payout
- **Revenue Chart**: Interactive area chart showing transaction trends over time
- Built with Recharts for smooth, responsive visualizations

### 💳 Transaction Management
- Comprehensive transaction list with visual indicators
- Transaction icons (withdrawal, deposit) with color-coded status
- Display transaction metadata (product name, customer name, status)
- Formatted dates and currency values

### 🔍 Advanced Filtering
- **Date Range Filters**: Today, Last 7 days, This month, Last 3 months, Custom range
- **Transaction Type Filters**: Store Transactions, Get Tipped, Withdrawals, Chargebacks, Cashbacks, Refer & Earn
- **Status Filters**: Successful, Pending, Failed
- **Custom Date Picker**: Full calendar interface with month/year selection
- Real-time filter count display
- Clear all filters option

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach, fully responsive across all screen sizes
- **Modern Navigation**: Sticky navbar with dropdown menus
- **Sidebar Navigation**: Quick access icons for different sections
- **Custom Typography**: Degular font family with multiple weights
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Skeleton loaders and loading indicators

### 👤 User Profile
- Display user initials in avatar
- Dropdown menu with quick actions
- Settings, purchase history, integrations access

## 🛠️ Tech Stack

### Core
- **Next.js 16.0.6**: React framework with App Router
- **React 19.2.0**: UI library with latest concurrent features
- **TypeScript 5**: Type safety and better DX

### Styling
- **Tailwind CSS 4**: Utility-first CSS framework
- **Custom CSS**: Font definitions and global styles
- **clsx + tailwind-merge**: Dynamic className management

### Data Fetching
- **SWR 2.3.7**: React Hooks for data fetching with caching, revalidation
- **Axios 1.13.2**: HTTP client for API requests
- **Custom Hooks**: `useWallet`, `useTransactions`, `useUser`

### Data Visualization
- **Recharts 3.5.1**: Composable charting library
- **date-fns 4.1.0**: Modern date utility library

### UI/UX
- **Framer Motion 12.23.25**: Production-ready animation library
- **Lucide React 0.555.0**: Beautiful icon set
- **Custom Components**: Reusable, accessible components

### Development
- **ESLint 9**: Code linting with Next.js config
- **pnpm**: Fast, disk space efficient package manager

## 📁 Project Structure

```
mainstack/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navbar & Sidebar
│   ├── page.tsx                 # Home page - main dashboard
│   ├── globals.css              # Global styles & Tailwind imports
│   └── fonts/                   # Degular font family files
│
├── components/                   # React components
│   ├── Navbar.tsx               # Top navigation with user menu
│   ├── Sidebar.tsx              # Left sidebar with quick links
│   ├── WalletCard.tsx           # Balance display & withdraw button
│   ├── SideStats.tsx            # Financial statistics cards
│   ├── RevenueChart.tsx         # Area chart visualization
│   ├── TransactionsList.tsx     # Transaction items list
│   ├── FilterModal.tsx          # Sliding filter panel
│   └── Calendar.tsx             # Custom date picker
│
├── hooks/                        # Custom React hooks
│   ├── useWallet.ts             # Fetch wallet data
│   ├── useTransactions.ts       # Fetch transactions data
│   └── useUser.ts               # Fetch user profile data
│
├── lib/                          # Utility libraries
│   ├── axios.ts                 # Axios instance with base URL
│   └── utils.ts                 # Utility functions (cn helper)
│
├── types/                        # TypeScript definitions
│   └── index.ts                 # Wallet, Transaction, User, FilterState
│
├── public/                       # Static assets
│   └── fonts/                   # Additional font files
│
└── Configuration files
    ├── next.config.ts           # Next.js configuration
    ├── tsconfig.json            # TypeScript configuration
    ├── tailwind.config.js       # Tailwind CSS configuration (v4 inline)
    ├── postcss.config.mjs       # PostCSS configuration
    ├── eslint.config.mjs        # ESLint configuration
    ├── package.json             # Dependencies and scripts
    └── pnpm-lock.yaml          # Lock file for dependencies
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone repo

# Navigate to project directory
cd mainstack

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
pnpm dev            # Start development server
pnpm build          # Build for production
pnpm start          # Start production server
pnpm lint           # Run ESLint
pnpm test           # Run unit tests
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage report
```


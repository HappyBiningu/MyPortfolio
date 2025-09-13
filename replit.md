# Data Science Portfolio - Tinotenda Biningu

## Overview

This is a modern, responsive portfolio website for Tinotenda Biningu, showcasing data science projects, skills, and professional experience. The application serves as both a professional portfolio and an interactive platform featuring live data visualizations, code laboratory examples, community contributions, and machine learning demonstrations. Built as a full-stack application with React frontend and Express backend, it demonstrates modern web development practices while highlighting data science capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Enhancements (September 2025)

### Creative Animations & Visual Enhancements
- **Floating Particles**: Added dynamic particle system with code symbols floating across backgrounds
- **Interactive Background**: Mouse-following gradients and animated geometric shapes
- **Enhanced Hero Section**: Multiple animated gradient layers with pulsing effects
- **3D Card Effects**: Perspective transforms and hover animations for project showcases
- **Glassmorphism Design**: Enhanced backdrop blur effects throughout the interface

### GitHub & LinkedIn Integration
- **Live GitHub Integration**: Real-time display of repositories, statistics, and activity
- **Professional LinkedIn Showcase**: Dedicated section with professional profile information
- **Live Terminal Simulation**: Terminal interface showing real GitHub commits and activity
- **GitHub Stats Dashboard**: Comprehensive visualization of coding activity and language usage

### Advanced Interactions
- **Enhanced Skills Animation**: Interactive skill bars with hover effects and animated progress
- **Parallax Scrolling**: Smooth parallax effects for depth and movement
- **Smooth Transitions**: Enhanced theme switching and page transitions
- **Micro-animations**: Hover effects, breathing animations, and typewriter effects
- **Responsive Design**: Optimized for all device sizes with mobile-first approach

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and better developer experience
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS for utility-first styling with custom design system
- **Component Library**: Radix UI components for accessible, unstyled primitives
- **Animation**: Framer Motion for smooth animations and transitions
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for consistent type safety across the stack
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints with consistent error handling
- **Development Server**: Custom Vite integration for hot module replacement in development

### Data Storage
- **Primary Database**: PostgreSQL for relational data storage
- **Connection**: Node.js pg driver with connection pooling
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Type Safety**: Drizzle Zod integration for runtime validation of database operations

### Project Structure
- `/client` - React frontend application with components, pages, and assets
- `/server` - Express backend with routes, database logic, and API endpoints  
- `/shared` - Shared TypeScript types and database schemas
- Monorepo structure with shared dependencies and unified build process

### Development Workflow
- **Environment**: Replit-optimized with custom Vite plugins for development
- **Hot Reloading**: Vite dev server with Express middleware integration
- **Type Checking**: Unified TypeScript configuration across frontend and backend
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation

## External Dependencies

### Database Services
- **PostgreSQL**: Primary database for storing user data, contact form submissions, and application content
- **Neon Database**: Cloud PostgreSQL provider (based on @neondatabase/serverless dependency)

### Third-party APIs
- **CoinGecko API**: Cryptocurrency data for live data visualization projects
- **Google Fonts**: Inter and Roboto font families for typography

### Development Tools
- **Replit Platform**: Hosting and development environment with custom plugins
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Recharts**: Chart library for data visualization components
- **Framer Motion**: Animation library for interactive user experiences

### External Libraries
- **UI Components**: Extensive Radix UI component collection for modals, dropdowns, navigation, and form controls
- **Validation**: Zod for schema validation and type inference
- **Date Handling**: date-fns for date manipulation and formatting
- **Styling Utilities**: clsx and tailwind-merge for conditional class name handling
- **Icons**: Lucide React for consistent icon library
- **Session Management**: connect-pg-simple for PostgreSQL-backed session storage
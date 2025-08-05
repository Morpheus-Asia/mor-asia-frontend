# Morpheus Asia Frontend

## Frontend Setup (mor-asia-frontend)

### 1. Repository Setup

1. Clone the `mor-asia-frontend` repository
2. Navigate to the directory using `cd`
3. Run `npm install` to install dependencies

### 2. Environment Configuration

1. Copy the `.env.example` file and rename it to `.env`
2. Add the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:1337

# Analytics
NEXT_PUBLIC_GA_ID=

# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### 3. Start the Development Server

Run `npm run dev` to start the frontend development server.
Ensure both backend (`localhost:1337`) and frontend (`localhost:3000`) are running

## Folder Structure Introduction

This is a **Next.js 15** project built with **TypeScript** and **Chakra UI** for Morpheus Asia, with internationalization (i18n) support and a component-based architecture.

### ** `src/` - Main Source Directory**

#### **`app/` - Next.js App Router**
The core application structure following Next.js 15 App Router conventions:

- **`[locale]/`** - Dynamic locale routing for internationalization (supports English and Chinese)
  - **`page.tsx`** - Homepage component
  - **`layout.tsx`** - Layout wrapper for locale-specific pages
  - **`blog/`** - Blog section with dynamic slug routing
  - **`[slug]/`** - Dynamic page routing for individual pages
  - **`metrics/`** - Metrics/analytics page
- **`api/`** - Backend API routes
  - **`morpheus-api/`** - Main API proxy routes
  - **`morpheus-content/`** - Content management API
  - **`cap_virtual_deposited/`** - Capital virtual deposits API
  - **`total_deposited/`** - Total deposits API
  - **`redirects/`** - URL redirection handling
- **`globals.css`** - Global styles
- **`layout.tsx`** - Root layout with Chakra UI provider
- **`page.tsx`** - Root page component
- **`screens/`** - Screen-level components
  - **`BlogScreen/`** - Blog page implementation
  - **`MetricsScreen/`** - Metrics page with context provider

#### **`components/` - Reusable UI Components**
Organized collection of modular, reusable components:

- **`ui/`** - Base UI components (drawer, menu, tooltip, etc.)
- **`Button/`** - Custom button component with props interface
- **`Charts/`** - Data visualization components using ApexCharts
  - **`PriceHistoryLineChart/`** - Price history visualization
  - **`QuickViewLineChart/`** - Quick view chart component
  - **`TotalAndCirculatignSupplyChart/`** - Supply metrics chart
- **`BlogCard/`** - Blog post card component with skeleton loading
- **`FilterButton/`** & **`FilterMoreDropdown/`** - Filtering UI components
- **`Footer/`** - Site footer component
- **`Image/`** - Custom image component
- **`LanguageSwitcher/`** - i18n language selection
- **`Link/`** - Custom link component
- **`Markdown/`** - Markdown content renderer
- **`MetricsBox/`** & **`MetricsDisplay/`** - Metrics visualization components
- **`Navbar/`** - Navigation with desktop and mobile variants
- **`NewsletterButton/`** - Newsletter subscription component
- **`PercentageChip/`** - Percentage display component
- **`Spacer/`** - Layout spacing utility
- **`Text/`** - Typography component
- **`ClientSlugHandler/`** - Client-side slug management
- **`Divider/`** - Visual separator component
- **`FullPageLoader/`** - Loading state component

#### **`containers/` - Page-Level Components**
Larger, page-specific components that compose multiple smaller components:

- **`About/`** - About page container
- **`Benefits/`** - Benefits section container
- **`BlogContainer/`** & **`BlogHome/`** & **`BlogPostContainer/`** - Blog-related containers
- **`CapitalContributionMetrics/`** - Financial metrics display
  - **`CapitalPool.tsx`** - Capital pool visualization
  - **`Forecast.tsx`** - Forecasting component
- **`ChakraProvider/`** - Chakra UI theme and provider setup
  - **`ColorModeProvider.tsx`** - Dark/light mode management
  - **`theme.ts`** - Custom theme configuration
- **`ContactForm/`** - Contact form container
- **`ContainerWrapper/`** - Generic container wrapper
- **`CTA/`** - Call-to-action sections
- **`Hero/`** - Hero section component
- **`JoinUs/`** - Join us section with description renderer
- **`Metrics/`** - Metrics display containers
- **`MetricsCirculatingSupply/`** - Supply metrics
- **`MetricsContainer/`** - Metrics wrapper
- **`MetricsPriceHistory/`** - Price history metrics
- **`PageData/`** - Page data management
- **`SlugProvider/`** - Slug state management

#### **`@types/` - TypeScript Type Definitions**
Custom TypeScript interfaces and type definitions:
- **`blog.ts`** - Blog-related type definitions

#### **`i18n/` - Internationalization**
Internationalization configuration and translations:
- **`index.ts`** - i18n setup and dictionary management
- **`en.json`** - English translations
- **`cn.json`** - Chinese translations

#### **`Image/` - Static Assets**
Static image assets:
- **`ETH.png`** - Ethereum logo
- **`MOR.png`** - Morpheus token logo

#### **`Renderer/` - Content Rendering**
- **`index.tsx`** - The Renderer is like a smart translator that takes content from Strapi and turns it into actual website pages. Think of it as a component factory, when Strapi sends a list of sections like "hero", "about", or "contact form", the Renderer automatically finds the right React components and builds the page. It uses a mapping system where each content type (like sections.hero) gets matched to the correct component file, loads them only when needed for better performance, and passes along all the content data as props. This means website editors can create new pages by just arranging different content blocks in Strapi, without needing developers to write new code every time. The system also handles multiple languages and makes sure everything loads quickly by splitting the code into smaller pieces.

#### **`utils/` - Utility Functions**
Helper functions and utilities:
- **`helper.ts`** - General utility functions
- **`strapi/`** - Strapi CMS integration
  - **`fetchContentTypes.ts`** - Content type fetching
  - **`index.ts`** - Strapi utilities

#### **`middleware.ts` - Next.js Middleware**
Custom middleware for:
- Locale detection and routing
- Bot detection and handling
- URL redirection logic

## Communication Tools

For any further discussion you can join the Morpheus Asia Telegram to discuss further any questions you have. https://t.me/morpheusAsia

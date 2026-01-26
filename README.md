# Tiffany Lin Portfolio

A modern, modular React portfolio website built with TypeScript and Vite.

## Overview

This portfolio site features a clean, elegant design with:
- A warm color palette (deep burgundy/maroon primary color)
- Playfair Display serif font for headings
- Light cream background for most pages
- Dark burgundy background for portfolio detail pages
- Illustrated landscape imagery throughout

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing

## Project Structure

```
src/
├── components/                     # Reusable UI components
│   ├── index.ts                    # Barrel export for all components
│   ├── Navbar/
│   │   ├── Navbar.tsx              # Top navigation bar
│   │   ├── Navbar.css              # Navbar styles (light/dark themes)
│   │   └── index.ts
│   ├── Layout/
│   │   ├── Layout.tsx              # Page layout wrapper with theme prop
│   │   ├── Layout.css              # Layout styles
│   │   └── index.ts
│   └── PortfolioCard/
│       ├── PortfolioCard.tsx       # Clickable card for portfolio categories
│       ├── PortfolioCard.css       # Card hover effects and styling
│       └── index.ts
│
├── pages/                          # Page components (routes)
│   ├── index.ts                    # Barrel export for all pages
│   ├── Home/
│   │   ├── Home.tsx                # Landing page - name, nav links, hero image
│   │   ├── Home.css
│   │   └── index.ts
│   ├── Portfolio/
│   │   ├── Portfolio.tsx           # Portfolio overview with 3 category cards
│   │   ├── Portfolio.css
│   │   └── index.ts
│   ├── PortfolioDetail/
│   │   ├── PortfolioDetail.tsx     # Individual portfolio viewer (PDF/EPUB)
│   │   ├── PortfolioDetail.css
│   │   └── index.ts
│   └── Connect/
│       ├── Connect.tsx             # Contact page with email and LinkedIn
│       ├── Connect.css
│       └── index.ts
│
├── assets/                         # Static assets (images, icons)
├── App.tsx                         # Main app with React Router setup
├── App.css                         # Global CSS variables and base styles
├── index.css                       # Font imports and root styles
└── main.tsx                        # React entry point
```

## Pages

### Home (`/`)
- Large "tiffany lin" title in serif font
- Vertical navigation links to Portfolio and Connect
- Decorative landscape illustration on the right
- Light cream background

### Portfolio (`/portfolio`)
- Three clickable category cards: Graduate, Undergrad, Professional
- Each card has an italic title and landscape illustration
- Cards link to their respective detail pages
- Brown "ground" bar at the bottom for visual grounding
- Light cream background

### Portfolio Detail (`/portfolio/:category`)
- Dark burgundy background
- Sidebar with rotated category name
- Large white content area for PDF/EPUB viewer
- Book-spread visual effect with center divider
- **Future:** Will integrate with Cloudflare R2 for PDF storage

### Connect (`/connect`)
- Landscape illustration on the left
- Name, email, and LinkedIn information on the right
- Light cream background

## Design Tokens (CSS Variables)

Located in `src/App.css`:

```css
:root {
  /* Colors */
  --primary-color: #7B1F1F;      /* Deep burgundy/maroon */
  --dark-bg: #2D1515;            /* Dark burgundy for detail pages */
  --light-bg: #FDF8F6;           /* Light cream background */
  --text-dark: #1A1A1A;          /* Near-black text */
  --text-light: #FFFFFF;         /* White text for dark backgrounds */
  
  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## Routing Structure

| Path | Component | Theme | Description |
|------|-----------|-------|-------------|
| `/` | Home | Light | Landing page |
| `/portfolio` | Portfolio | Light | Category selection |
| `/portfolio/graduate` | PortfolioDetail | Dark | Graduate work viewer |
| `/portfolio/undergrad` | PortfolioDetail | Dark | Undergrad work viewer |
| `/portfolio/professional` | PortfolioDetail | Dark | Professional work viewer |
| `/connect` | Connect | Light | Contact information |

## Component Details

### Navbar
- Horizontal navigation with HOME, PORTFOLIO, CONNECT links
- Active link styling (bold)
- Supports light and dark themes
- Centered layout with letter-spaced uppercase text

### Layout
- Wrapper component that provides consistent page structure
- Accepts `theme` prop: `'light'` or `'dark'`
- Renders Navbar and wraps page content via React Router's `<Outlet />`

### PortfolioCard
- Reusable card for portfolio categories
- Props: `title`, `image`, `link`
- Hover animation (lift effect)
- Italic serif title above image

## Future Plans: Cloudflare Integration

The `PortfolioDetail` component is designed to be extended with PDF/EPUB viewing capabilities:

1. **Cloudflare R2 Storage**
   - Store PDF/EPUB files in Cloudflare R2 bucket
   - Generate signed URLs for secure access
   - Easy to update content without code changes

2. **Viewer Options**
   - `react-pdf` for PDF rendering
   - `epub.js` for EPUB rendering
   - Or simple `<iframe>` for hosted PDFs

3. **Configuration**
   - Create a config file mapping categories to document URLs
   - Allow multiple documents per category if needed

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

npm install epubjs
```

## Customization

### Updating Contact Info
Edit `src/pages/Connect/Connect.tsx`:
```typescript
const contactInfo = {
  name: 'tiffany lin',
  email: 'your.email@example.com',
  linkedin: 'linkedin.com/in/yourprofile',
};
```

### Adding Portfolio Categories
Edit `src/pages/Portfolio/Portfolio.tsx`:
```typescript
const portfolioCategories = [
  { id: 'graduate', title: 'graduate', image: '...', link: '/portfolio/graduate' },
  // Add more categories here
];
```

Then add corresponding routes in `src/App.tsx`.

### Changing Colors
Update the CSS variables in `src/App.css` to change the color scheme site-wide.

### Replacing Placeholder Images
Replace the inline SVG placeholders with actual image imports:
```typescript
import heroImage from '../assets/hero.jpg';
// Then use: <img src={heroImage} ... />
```

## File Naming Conventions

- **Components:** PascalCase (`Navbar.tsx`, `PortfolioCard.tsx`)
- **Pages:** PascalCase (`Home.tsx`, `Portfolio.tsx`)
- **CSS:** Same name as component (`Navbar.css`, `Home.css`)
- **Barrel exports:** `index.ts` in each folder for clean imports

## Import Patterns

Components and pages use barrel exports for clean imports:

```typescript
// Instead of:
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';

// Use:
import { Navbar, Layout, PortfolioCard } from './components';
import { Home, Portfolio, Connect } from './pages';
```

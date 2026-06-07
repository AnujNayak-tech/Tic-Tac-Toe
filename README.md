# Tic-Tac-Toe Game

A modern, interactive Tic-Tac-Toe game built with React, TypeScript, and TanStack technologies.

## Features

- 🎮 Interactive Tic-Tac-Toe gameplay
- 📊 Score tracking and game statistics
- 🎨 Modern UI with Tailwind CSS and Shadcn components
- ⚡ Built with Vite for fast development and production builds
- 🚀 Server-side rendering with TanStack Start
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Routing**: TanStack Router
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn UI
- **Server**: Nitro (powered by TanStack Start)
- **Package Manager**: npm/Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or Bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AnujNayak-tech/Tic-Tac-Toe.git
cd Tic-Tac-Toe
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:8080` or `http://localhost:8081` (if port 8080 is in use).

## Available Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier

## Deployment to Vercel

This project is configured for easy deployment on Vercel. Follow these steps:

### Step 1: Push to GitHub

Ensure your code is pushed to GitHub (already done!):
```bash
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Select the `Tic-Tac-Toe` repository
5. Click "Import"
6. Vercel will automatically detect the settings from `vercel.json`
7. Click "Deploy"

### Step 3: Configure Environment (Optional)

If you need environment variables:
1. Go to your project settings on Vercel
2. Click "Environment Variables"
3. Add any required variables

### Automatic Deployments

Once connected, every push to the `main` branch will automatically trigger a new deployment.

## Build Configuration

The project is configured via `vercel.json`:
- **Build Command**: `npm run build`
- **Development Command**: `npm run dev`
- **Install Command**: `npm install --legacy-peer-deps`
- **Framework**: Vite
- **Output Directory**: `dist`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── GameBoard.tsx   # Main game board
│   ├── TicTacToeApp.tsx # App component
│   └── ...
├── routes/             # TanStack Router routes
├── lib/                # Utility functions and configurations
├── styles.css          # Global styles
├── server.ts           # Server configuration
└── router.tsx          # Router configuration
```

## Component Overview

- **TicTacToeApp**: Main application component
- **GameBoard**: Game board and cell management
- **LoginScreen**: Player login/name entry
- **Scoreboard**: Game statistics and scores
- **Celebration**: Win celebration animation

## Troubleshooting

### Port Already in Use
If port 8080 is in use, Vite will automatically try port 8081.

### Dependency Issues
If you encounter dependency conflicts during installation, use:
```bash
npm install --legacy-peer-deps
```

### Build Errors
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

## Performance Optimization

- ✅ Code splitting with Vite
- ✅ Server-side rendering for better SEO
- ✅ Tailwind CSS purging
- ✅ Image optimization
- ✅ Lazy loading of routes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues and questions, visit: https://github.com/AnujNayak-tech/Tic-Tac-Toe/issues

---

**Ready to deploy?** Just connect your GitHub repository to Vercel and you're good to go! 🚀

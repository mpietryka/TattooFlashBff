# TattooFlash BFF

A Backend-For-Frontend (BFF) application for TattooFlash, built with Node.js, Express, and TypeScript.

## Features

- TypeScript support
- Express.js framework
- Security middleware (Helmet, CORS, Rate Limiting)
- Logging with Winston
- Error handling
- Environment configuration
- Development hot-reloading

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your configuration

## Development

Start the development server:
```bash
npm run dev
```

## Building

Build the project:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
└── index.ts        # Application entry point
```

## API Endpoints

- `GET /health` - Health check endpoint

## License

ISC 
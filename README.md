# TattooFlash BFF

A Backend-For-Frontend (BFF) application for TattooFlash, built with Node.js, Express, and TypeScript.

## Features

- TypeScript support
- Express.js framework
- Logging with Winston
- Error handling
- Environment configuration
- Development hot-reloading
- Cloudinary integration for image management
- Unit testing with Jest

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Cloudinary account (for image management)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your configuration:
   ```
   PORT=3000
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## Development

Start the development server:
```bash
yarn dev
```

## Building

Build the project:
```bash
yarn build
```

## Production

Start the production server:
```bash
yarn start
```

## Testing

Run the test suite:
```bash
yarn test
```

The project uses Jest for testing. Tests are located in the `src/__tests__` directory and follow the same structure as the source code.

## Project Structure

```
src/
├── config/         # Configuration files
├── middleware/     # Express middleware
│   └── errorHandler.ts  # Global error handling
├── routes/         # API routes
├── services/       # Business logic
│   └── cloudinary.ts    # Cloudinary integration
├── types/          # TypeScript type definitions
│   └── cloudinary.ts    # Cloudinary types
├── utils/          # Utility functions
│   └── logger.ts        # Winston logger setup
└── index.ts        # Application entry point

src/tests/     # Test files
└── services/      # Service tests
    └── cloudinary.test.ts  # Cloudinary service tests
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/images/:folder` - Get images from a Cloudinary folder

## Error Handling

The application uses a custom error handling middleware that:
- Catches and formats operational errors
- Logs errors appropriately
- Returns consistent error responses to clients

## Logging

Logging is implemented using Winston with:
- Console transport for development
- File transport for production
- Different log levels based on environment

## License

ISC 
// Set test environment
process.env.NODE_ENV = 'test';
process.env.DATABASE_PORT = 5432;
process.env.BACKEND_HEATMAP_SERVICE_PORT = 3897;

// Global test timeout
jest.setTimeout(10000);

// Suppress console logs during tests
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn()
};
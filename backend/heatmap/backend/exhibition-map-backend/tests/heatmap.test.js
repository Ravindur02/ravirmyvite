const request = require('supertest');

// Create a fresh Express app for testing (don't use your main app)
const express = require('express');
const app = express();
app.use(express.json());

// Import and use your routes
const heatmapRouter = require('../routes/heatmap');
const sampleBuildingsRouter = require('../routes/sample_buildings');

app.use('/heatmap', heatmapRouter);
app.use('/api', sampleBuildingsRouter);
app.get('/', (req, res) => res.json({ msg: "Hello from backend!" }));

describe('Heatmap API Routes', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg', 'Hello from backend!');
  });

  test('GET /api/buildings should return sample buildings', async () => {
    const response = await request(app).get('/api/buildings');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('GET /heatmap/map-data should return heatmap data', async () => {
    const response = await request(app).get('/heatmap/map-data');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('source');
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
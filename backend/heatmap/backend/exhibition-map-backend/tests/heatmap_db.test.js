const pool = require('../heatmap_db');

describe('Database Connection and Queries', () => {
  // Close the pool after all tests
  afterAll(async () => {
    await pool.end();
  });

  test('should connect to database successfully', async () => {
    const client = await pool.connect();
    expect(client).toBeTruthy();
    client.release();
  });

  test('should fetch buildings from database', async () => {
    const result = await pool.query('SELECT * FROM buildings LIMIT 5');
    
    expect(Array.isArray(result.rows)).toBe(true);
    expect(result.rows.length).toBeGreaterThan(0);
    
    const building = result.rows[0];
    expect(building).toHaveProperty('building_id');
    expect(building).toHaveProperty('building_name');
    expect(building).toHaveProperty('building_capacity');
  });

  test('should fetch current_status from database', async () => {
    const result = await pool.query('SELECT * FROM current_status LIMIT 5');
    
    expect(Array.isArray(result.rows)).toBe(true);
    
    if (result.rows.length > 0) {
      const status = result.rows[0];
      expect(status).toHaveProperty('building_id');
      expect(status).toHaveProperty('current_crowd');
      expect(status).toHaveProperty('color');
    }
  });
});
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const handlebars = require('handlebars');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Minitom4!!',
  database: 'fintech_people',
};

(async () => {
  try {
    // Connect to database
    const connection = await mysql.createConnection(dbConfig);

    // Fetch all active job listings
    const [rows] = await connection.execute(`
      SELECT 
        id, title, location, job_type, description, requirements, salary_range, posted_at, updated_at, is_active
      FROM job_listings
      WHERE is_active = 1
    `);

    // Load Handlebars job template
    const templateSource = fs.readFileSync('../../templates/job-detail.hbs', 'utf8');
    const template = handlebars.compile(templateSource);

    // Loop through jobs and generate static pages
    for (const job of rows) {
      const html = template(job);
      const outputPath = path.join(__dirname, '../jobs', `${job.id}.html`);

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, html);
      console.log(`✅ Generated: ${outputPath}`);
    }

    await connection.end();
    console.log('🎉 All job pages generated.');
  } catch (err) {
    console.error('❌ Error generating job pages:', err);
  }
})();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('risegenix.db');

db.serialize(() => {
    // Create colleges table
    db.run(`CREATE TABLE IF NOT EXISTS colleges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        course TEXT NOT NULL,
        fee INTEGER NOT NULL,
        campusSize TEXT NOT NULL,
        features TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create cutoffs table
    db.run(`CREATE TABLE IF NOT EXISTS cutoffs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        college_id INTEGER,
        exam_type TEXT NOT NULL,
        category TEXT NOT NULL,
        cutoff_score REAL NOT NULL,
        year INTEGER NOT NULL,
        FOREIGN KEY (college_id) REFERENCES colleges(id)
    )`);

    // Insert sample data
    const sampleColleges = [
        {
            name: 'Nirma University',
            location: 'Ahmedabad',
            course: 'B.Tech Computer Science',
            fee: 250000,
            campusSize: '110 acres',
            features: JSON.stringify([
                'NAAC A+ Grade',
                'Modern Infrastructure',
                'Strong Industry Connections',
                'Research Focus'
            ])
        },
        {
            name: 'Dharmsinh Desai University',
            location: 'Nadiad',
            course: 'B.Tech Computer Science',
            fee: 180000,
            campusSize: '25 acres',
            features: JSON.stringify([
                'NAAC A Grade',
                'Industry Partnerships',
                'Innovation Center',
                'Placement Support'
            ])
        }
    ];

    const insertCollege = db.prepare(`
        INSERT INTO colleges (name, location, course, fee, campusSize, features)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    sampleColleges.forEach(college => {
        insertCollege.run(
            college.name,
            college.location,
            college.course,
            college.fee,
            college.campusSize,
            college.features
        );
    });

    // Insert sample cutoffs
    const sampleCutoffs = [
        {
            college_id: 1,
            exam_type: 'jee',
            category: 'general',
            cutoff_score: 85.5,
            year: 2023
        },
        {
            college_id: 1,
            exam_type: '12th',
            category: 'general',
            cutoff_score: 92.5,
            year: 2023
        },
        {
            college_id: 2,
            exam_type: 'jee',
            category: 'general',
            cutoff_score: 75.5,
            year: 2023
        }
    ];

    const insertCutoff = db.prepare(`
        INSERT INTO cutoffs (college_id, exam_type, category, cutoff_score, year)
        VALUES (?, ?, ?, ?, ?)
    `);

    sampleCutoffs.forEach(cutoff => {
        insertCutoff.run(
            cutoff.college_id,
            cutoff.exam_type,
            cutoff.category,
            cutoff.cutoff_score,
            cutoff.year
        );
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err);
    } else {
        console.log('Database initialized successfully');
    }
}); 
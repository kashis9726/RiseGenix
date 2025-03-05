# RiseGenix - College Recommendation System

RiseGenix is a web application that helps students find suitable colleges based on their academic performance in various entrance exams like JEE Main, 12th grade marks, or ACPC. The system provides detailed information about colleges including fee structure, campus details, and features.

## Features

- College recommendations based on exam scores
- Support for multiple exam types (JEE Main, 12th Grade, ACPC)
- Category-wise cutoff predictions
- Detailed college information including:
  - Fee structure
  - Campus size
  - Key features
  - Location
- ACPC rank predictor
- Modern and responsive UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd risegenix
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
node database/init.js
```

4. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Development

To run the application in development mode with auto-reload:
```bash
npm run dev
```

## Project Structure

```
risegenix/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Custom CSS styles
│   └── script.js       # Frontend JavaScript
├── database/
│   └── init.js         # Database initialization
├── server.js           # Express server
├── package.json        # Project dependencies
└── README.md          # This file
```

## API Endpoints

- `POST /api/recommend`: Get college recommendations based on exam scores
- `POST /api/predict-rank`: Predict ACPC rank based on marks and category

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
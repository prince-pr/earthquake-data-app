# Earthquake Data Dashboard

This is a responsive and interactive web application built with React and TypeScript to visualize earthquake data using charts and tables. It allows users to explore earthquake statistics from a CSV file with dynamic filtering and interaction features.

![screenshot of the project.](/assets/screenshot.png "This is a sample screenshot.")

## Features

- Scatter chart visualization with dynamic axis selection (Latitude, Longitude, Magnitude)
- Tabular data view with row filtering
- Adjustable number of rows displayed (10, 25, 50, 100, All)
- Highlighting and selecting data points directly on the chart
- Shared state between components using Zustand
- Loading spinner during data fetch
- Responsive layout suitable for desktop and mobile

## Project Structure


- src/components/ - Reusable components: ChartPanel, DataTable, Spinner
- src/services/ - Data fetching utilities
- src/store/ - Zustand store configuration
- src/App.tsx - Main application component
- src/main.tsx - Entry point
- tailwind.config.ts - Tailwind CSS configuration
- index.css - Tailwind base styles
- package.json

## External Dependencies

| Package              | Purpose                                           |
|----------------------|---------------------------------------------------|
| Recharts             | Used to render scatter chart visualizations       |
| zustand              | Lightweight state management across components    |
| Papaparse            | CSV file parsing into usable JavaScript objects   |
| Tailwindcss          | Utility-first CSS framework for styling           |

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/your-username/earthquake-data-app.git
cd earthquake-data-app
```

### 2. Install Dependencies
```
npm install
```

### 3. Run the Application Locally
```
npm run dev
```

## AI Tools Usage
AI tools were used to:
- Understand integration of Recharts and Zustand
- Help build components structure and layout logic
- Optimize performance and simplify code
- Generate boilerplate and refactor repetitive patterns
- Assist in writing and formatting this README
- All output from AI was reviewed and adjusted manually for accuracy and quality.

## Additional Features
- Spinner added to enhance the user experience during data load
- Dynamic chart axis selectors and row limits
- Highlighted dots for selected data points


## Author
Prince PR
- LinkedIn: https://www.linkedin.com/in/prince-pr/

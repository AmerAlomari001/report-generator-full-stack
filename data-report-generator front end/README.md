AI-Powered Data Report Generator

A full-stack web application that enables users to upload structured data files (CSV or Excel), analyze them with a local AI model, and generate meaningful reports.
The application supports viewing, chart visualization, and PDF export of generated reports — all running completely locally.

🚀 Project Overview

The AI-Powered Data Report Generator combines an Angular frontend with a Node.js backend to provide a seamless experience for:

Uploading and previewing CSV data

Sending custom text prompts to a local AI model

Generating analytical summaries and data insights

Displaying reports with charts

Exporting results as downloadable PDFs


🧩 Tech Stack
Layer	Technology
Frontend	Angular, TypeScript, HTML, SCSS, JavaScript
Backend	Node.js (Express)
Styling	Bootstrap
Charts	Chart.js
PDF Generation	jsPDF
Database  MySQL



⚙️ Features

🔐 Authentication: Login and Signup pages for user access

📤 Data Upload: Upload CSV or Excel files

👁️ CSV Preview: Preview uploaded dataset before processing

💬 Prompt Input: Enter text prompts to guide AI report generation

📈 Data Visualization: View charts and summaries using Chart.js

🧾 Report Page: Display AI-generated insights and summaries

💾 Report History: Review previously generated reports

📄 PDF Export: Save reports locally as PDF files




🧠 How It Connects to the Backend

The frontend sends uploaded files and text prompts via HTTP POST requests to the Node.js backend.

The backend parses the data, interacts with a local AI model, and returns the generated report as JSON.

The frontend then displays the report, visualizes data, and enables PDF export.

All communication happens through RESTful API endpoints (http://localhost:3000/api/report).




🖥️ Installation & Setup
1. Prerequisites

Make sure you have the following installed:

Node.js (v18+ recommended)
npm
Angular CLI.
2. Clone the Repository
git clone https://github.com/AmerAlomari001/report-generator-full-stack.git
cd Data-Report-Generator
3. Setup Backend

npm install
npm run dev
The backend will start at:
👉 http://localhost:3000
4. Setup Frontend

npm install
ng serve
The frontend will start at:
👉 http://localhost:4200

🔗 Environment Configuration
Angular uses environment files to define API endpoints:

src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
src/environments/environment.prod.ts

export const environment = {
  production: true,
  apiUrl: 'https://your-production-server.com'
};
All HTTP requests reference environment.apiUrl to connect with the backend.


🧾 Usage Guide

Login or Register
Create an account or log in to access the main dashboard.

Upload a CSV or Excel file
Choose your data file and preview its contents.

Enter a Prompt
Type a natural language request (e.g., “Summarize sales by region”).

Generate Report
The backend processes the file and prompt through the AI model.

View Report
See the AI-generated summary and charts in the report view.

Download PDF
Export your report using the “Download as PDF” button (via jsPDF).

Check History
Review previously generated reports in the “History” page.

📁 Project Structure

AI-Powered-Data-Report-Generator/
├── backend/                
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/               
│   ├── src/app/
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── upload/
│   │   │   ├── report/
│   │   │   ├── history/
│   │   │   └── chart/
│   └── src/environments/

🧰 Build and Deployment

To build the Angular app for production:
ng build --prod
This creates a dist/ folder that can be served by the backend or a static host.



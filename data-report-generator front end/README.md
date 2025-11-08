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

# AI-Powered Data Report Generator – Backend

This repository contains the backend service for a data-driven reporting application.  
The system allows authenticated users to upload CSV or Excel files, send a text prompt, and receive an AI-generated report that can be exported as a PDF.  
All reports and metadata are stored in a MySQL database.

---

## Features

- User authentication with JWT (login, protected routes)
- File upload support (CSV / XLSX)
- Automatic parsing of uploaded data
- AI-generated text report based on prompt + file contents
- PDF generation using PDFKit
- Report history per user
- Delete report (with PDF file cleanup)
- MySQL database integration
- Postman-friendly REST API

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (Express) |
| Database | MySQL (mysql2) |
| File Upload | Multer |
| AI Integration | Gemini 2.5 Flash (Axios request) |
| PDF Engine | PDFKit |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Parsing | csv-parser, xlsx |

---

## Installation & Setup

### 1. Clone the repository
```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd backend


2. Install dependencies
npm install

3.Create the .env file
Create a file named .env in the root of the backend folder:
PORT=5001
JWT_SECRET=your-secret-key
HOST=localhost
USER=root
PASSWORD=your_mysql_password
DATABASE=your_database_name
GEMINI_API_KEY=your_api_key

4. Import the database tables
Use MySQL Workbench or CLI to import the provided SQL dump, or create the tables manually:
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  prompt TEXT,
  report TEXT,
  file_path VARCHAR(255),
  pdf_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5. Start the server
npm start
Server runs at:http://localhost:5001








 Endpoints:

                      
 API
Method	             Route	                   Auth	                               Description
POST            	/api/user/register	        ❌	                        Register new user
POST	            /api/user/login	            ❌	                        Login, returns JWT token
POST            	/api/report/generate	    ✅	                        Upload file + prompt → returns report + PDF link
GET	               /api/report/history	        ✅	                        Get all reports for logged-in user
DELETE	           /api/report/:id          	✅	                        Delete report + PDF if owned by user







Example: Generate Report (Postman)
POST http://localhost:5001/api/report/generate

Headers:
Headers:Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:file: <choose CSV or XLSX>
prompt: "Summarize sales by region and recommend improvements"


Response:
{
  "id": 7,
  "pdfUrl": "/downloads/1730923837223-report.pdf"
}
`

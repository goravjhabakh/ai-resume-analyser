# AI Resume Analyser

AI Resume Analyser is a web application that evaluates resumes using Puter AI.  
Users can upload their resume, provide job details, and receive structured feedback, ATS scoring, suggestions, and a preview of the resume.  
The project is built with React, TypeScript, TailwindCSS, Zustand, and the full Puter platform (Auth, FS, AI, KV).

## Features

### Authentication (Puter Auth)

- Sign-in and sign-out handled through Puter Auth.
- Automatic session check on page load.
- Resume review pages are protected and require authentication.

### Resume Upload

- Users can upload a PDF resume through a drag-and-drop UI.
- File validation for size and format.
- Uploaded files are stored using Puter FS.

### PDF to Image Conversion

- The uploaded PDF is converted to a high-quality PNG for preview.
- Converted images are also stored on Puter FS.

### AI Resume Feedback

The system uses GPT-5.1 via Puter AI to analyse resumes.  
Feedback includes:

- A summary of the resume.
- ATS (Applicant Tracking System) score.
- Strengths and weaknesses.
- Job-specific suggestions.
- Structured JSON response shown in the UI.

### Persistent Storage (KV Database)

Each resume analysis is stored as an entry in the Puter KV database containing:

- Resume path  
- Image preview path  
- Company name  
- Job title  
- Job description  
- AI-generated feedback  
- A unique ID for retrieval  

### User Interface

- Responsive layout with TailwindCSS.
- Sticky resume preview.
- Detailed analysis components.
- Animated ATS score gauge.
- Clean, minimal design.

## Tech Stack

### Frontend

- React  
- TypeScript  
- React Router  
- TailwindCSS (v4)  
- tw-animate-css  
- Zustand State Management  

### Backend (via Puter)

- Puter Auth  
- Puter FS  
- Puter AI  
- Puter KV  

### Utilities

- pdfjs-dist for PDF → PNG conversion  
- UUID-based resume entry system  

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Load Puter.js

Add to index.html:

```html
<script src="https://js.puter.com/v2/"></script>
```

### 3. Run development server

```bash
npm run dev
```

## Usage Flow

1. User signs in with Puter Auth.  
2. User uploads a resume PDF.  
3. PDF is stored in Puter FS and converted into an image.  
4. Image is stored in Puter FS.  
5. Resume + job details are analysed by Puter AI.  
6. Feedback is stored in KV.  
7. Analysis page shows preview + structured feedback.  

## Future Improvements

- Support DOCX uploads  
- Resume templates  
- Exportable PDF report  
- Resume analysis history  
- Improved ATS breakdown  

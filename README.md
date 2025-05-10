# OCR Backend API

## Overview
Simple Node.js backend that accepts base64-encoded images and returns extracted text using Tesseract OCR.

## Prerequisites
- Node.js (v14+)
- npm

## Installation
1. Clone the repository
2. Run `npm install`
3. Start the server: `npm start`

## API Endpoint
- **POST** `/ocr`
  - Accepts base64-encoded image
  - Returns extracted text

### Example Request
```json
{
  "base64Image": "data:image/png;base64,..."
}
```

### Example Response
```json
{
  "extractedText": "Extracted text from image"
}
```

## Technologies
- Express.js
- Tesseract.js

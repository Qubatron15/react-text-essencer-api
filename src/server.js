const express = require('express');
const Tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// OCR Endpoint
app.post('/ocr', async (req, res) => {
  try {
    const { base64Image } = req.body;

    if (!base64Image) {
      return res.status(400).json({ error: 'No base64 image provided' });
    }

    // Remove data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Perform OCR
    const { data: { text } } = await Tesseract.recognize(
      Buffer.from(base64Data, 'base64'),
      'eng'
    );

    // Strip special characters and extra whitespace
    const cleanedText = text.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ');
    res.json({ extractedText: cleanedText });
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({ error: 'Text extraction failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`OCR Server running on port ${PORT}`);
});

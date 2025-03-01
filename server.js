import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Load the JSON dataset
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const datasetPath = path.join(__dirname, 'globetrotter_dataset.json');
const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Globetrotter API! Use /random to get a random landmark.');
});

// Endpoint to return a random object from the dataset
app.get('/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * dataset.length);
    const randomObject = dataset[randomIndex];
    res.json(randomObject);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
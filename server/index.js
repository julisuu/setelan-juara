import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

app.use(express.json());
app.use(cors({ 
    origin: 'http://localhost:5173', credentials: true 
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for users and results
const users = new Map(); // Store user information
const results = new Map(); // Store AI outputs
let quickSignupResult = null; // Variable to store the quick-signup output

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Sign up
app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, birthdate, email, password, country, city, job, jobType, education } = req.body;

    if (users.has(email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!job?.trim() || !jobType?.trim() || !education?.trim()) {
        return res.status(418).send({ error: 'Prompt is required' });
    }

    const prompt = `Give learning path to work ${jobType} as a ${job} with ${education}. Give me a learning steps and the link to the free courses in each steps. two lines only for each steps. format: one line for short title and course name, another line MUST be the link to the course. each steps must have a course with link. the last step is for interview preparation. output only the steps and the links without number order and your yapping. each steps MUST have a link to a course or video. plain text.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        const geminiResult = response.text;

        // Save user information and result in memory
        const user = {
            firstName,
            lastName,
            birthdate,
            email,
            password: hashedPassword,
            country,
            city,
            job,
            jobType,
            education,
            geminiResult
        };

        users.set(email, user);

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({ token });
    } catch (err) {
        console.error('Gemini or session error:', err);
        res.status(500).send({ error: 'Failed to generate content or save user' });
    }
});

// Alternative signup without user register
app.post('/api/quick-signup', async (req, res) => {
    const { country, city, job, jobType, education, birthdate } = req.body;

    if (!job?.trim() || !jobType?.trim() || !education?.trim() || !birthdate?.trim()) {
        return res.status(418).send({ error: 'All fields are required' });
    }

    const prompt = `Give learning path to work ${jobType} as a ${job} with ${education}. 
    Give me a learning steps and the link to the free courses in each steps. 
    Two lines only for each steps. 
    Format: one line for short title and course name, another line MUST be the link to the course. 
    Each steps must have a course with valid link. 
    The last step is for interview preparation. 
    Output only the steps and the links without number order and your yapping. 
    Each steps MUST have a link to a course or video. plain text.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        const geminiResult = response.text;

        // Store the result in the variable
        quickSignupResult = {
            country,
            city,
            job,
            jobType,
            education,
            birthdate,
            geminiResult,
        };

        res.json(quickSignupResult); // Send the result back to the client
    } catch (err) {
        console.error('Gemini or session error:', err);
        res.status(500).send({ error: 'Failed to generate content or save user' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.get(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ token });
});

// Middleware for authentication
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(401);

    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email;
        next();
    } catch {
        res.sendStatus(403);
    }
};

// Get user result
app.get('/api/result', authMiddleware, (req, res) => {
    const user = users.get(req.email);
    if (!user) return res.sendStatus(404);
    res.json({ result: user.geminiResult, job: user.job }); // Include job in the response
});

// Get the quick-signup result
app.get('/api/quick-signup-result', (req, res) => {
    if (!quickSignupResult) {
        return res.status(404).json({ error: 'No result found. Please complete the signup first.' });
    }
    res.json(quickSignupResult);
});

// Backend status
app.get('/', (_, res) => {
    res.send('Backend is running');
});

// POST a prompt and generate result
app.post('/result', async (req, res) => {
    const { job, jobType, education } = req.body;

    if (!job?.trim() || !jobType?.trim() || !education?.trim()) {
        return res.status(418).send({ error: 'Prompt is required' });
    }

    const prompt = `Give learning path to work ${jobType} as a ${job} with ${education}. Give me a learning steps and the link to the free courses in each steps. two lines only for each steps. format: one line for short title and course name, another line MUST be the link to the course. each steps must have a course with link. the last step is for interview preparation. output only the steps and the links without number order and your yapping. each steps MUST have a link to a course or video. plain text.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        const id = results.size + 1;
        results.set(id, { id, job, result: response.text });

        res.json({ result: response.text });
    } catch {
        return res.status(500).send({ error: 'Failed to generate content' });
    }
});

// GET result by ID
app.get('/result/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = results.get(id);

    if (result) {
        res.json(result);
    } else {
        res.status(404).send({ error: 'Result not found' });
    }
});

// GET result by job
app.get('/result/job/:job', (req, res) => {
    const job = req.params.job;
    const result = Array.from(results.values()).find(r => r.job === job);

    if (result) {
        res.json(result);
    } else {
        res.status(404).send({ error: 'Result not found' });
    }
});

// Error handling middleware
app.use((err, _, res, __) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start server
app.listen(PORT, () => console.log(`Server is live on http://localhost:${PORT}`));
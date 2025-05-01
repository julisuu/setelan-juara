import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

app.use(express.json());

const results = new Map(); // Store ai outputs

// Get backend status
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// POST a prompt and generate result
app.post('/result', async (req, res) => {
    const { job, jobType, education } = req.body;

    if (!job?.trim() || !jobType?.trim() || !education?.trim()) {
        return res.status(418).send({ error: 'Prompt is required'});
    }

    const prompt = `Give learning path to work ${jobType} as a ${job} with ${education}. Give me a learning steps and the link to the free courses in each steps. two lines only for each steps. format: one line for short title and course name, another line MUST be the link to the course. each steps must have a course with link. the last step is for interview preparation. output only the steps and the links without number order and your yapping. in plain text.`;
    const formattedJob = job.replace(/\s+/g, '');

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        res.json({ result: response.text});
        const id = results.size + 1;
        results.set(id, { id, job: formattedJob, result: response.text });
    } catch {
        return res.status(500).send({ error: 'Failed to generate content' });
    }
});

// GET result by ID
app.get('/result/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Parse the ID as an integer
    const result = results.get(id); // Use Map's get() method to retrieve the result

    if (result) {
        res.json(result); // Return the result if it exists
    } else {
        res.status(404).send({ error: 'Result not found' }); // Return 404 if not found
    }
});;

// GET result by job
app.get('/result/job/:job', (req, res) => {
    const job = req.params.job;
    const result = Array.from(results.values()).find(r => r.job === job);

    if (result) {
        res.json(result); // Return the result if it exists
    } else {
        res.status(404).send({ error: 'Result not found' }); // Return 404 if not found
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start server
app.listen(
    PORT,
    () => console.log(`Server is live on http://localhost:${PORT}`)
);
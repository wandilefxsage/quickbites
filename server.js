import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Initialize Supabase Client using the service_role key for admin access
// REPLACE these placeholder strings with your actual Supabase keys
const supabase = createClient(
  'https://qgvjrcqaavwascmdlasw.supabase.co', //  https://qgvjrcqaavwascmdlasw.supabase.co/rest/v1/
  'your-actual-service-role-key-here'        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndmpyY3FhYXZ3YXNjbWRsYXN3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDMyNDM5MywiZXhwIjoyMDk1OTAwMzkzfQ.u4aRXgn87qOlWNThBQAHlCVoxSTl7PhFNWJnk003cGY
);

// Sample Health Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend server is active and running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project:
   - Project name: `hireview_ai`
   - Database password: (save this securely)
   - Region: Choose closest to your users
4. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Credentials

1. Go to Project Settings → API
2. Copy these values to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key (keep this secret!)

## Step 3: Run Database Migrations

### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your_project_ref

# Run migrations
supabase db push
```

### Option B: Manual SQL Execution

1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run"

## Step 4: Enable Authentication

1. Go to Authentication → Providers
2. Enable Email/Password:
   - Toggle "Email" ON
   - Set "Confirm email" to OFF (for development)
3. Enable Google OAuth:
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

## Step 5: Configure Storage Buckets

1. Go to Storage → Buckets
2. Create bucket: `resumes`
   - Make it private
3. Create bucket: `videos`
   - Make it private
4. Create bucket: `avatars`
   - Make it public

## Step 6: Set Up Webhook for Stripe

1. Go to Database → Webhooks
2. Create new webhook:
   - Name: `stripe_payment_webhook`
   - Table: `payments`
   - Events: INSERT
   - HTTP method: POST
   - URL: `https://your-domain.com/api/stripe/webhook`

## Database Schema Overview

### Tables Created:
- **users** - User profiles (extends Supabase auth)
- **companies** - Company information and subscription tier
- **jobs** - Job postings
- **interview_questions** - Questions for each job
- **applications** - Candidate applications
- **interview_responses** - Video responses to questions
- **rankings** - AI scoring results
- **payments** - Stripe payment records

### Row Level Security (RLS)
All tables have RLS enabled with policies:
- Users can only see their own data
- Companies can only see their own jobs and applications
- Candidates can only see their own applications
- Published jobs are visible to everyone

## Testing the Setup

1. Create a test user:
   ```bash
   curl -X POST 'https://your-project.supabase.co/auth/v1/signup' \
     -H "apikey: your_anon_key" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. Check if user was created in Supabase Dashboard → Authentication

3. Verify tables exist in Supabase Dashboard → SQL Editor

## Troubleshooting

### "Permission denied" errors
- Check RLS policies are correctly set
- Verify user is authenticated
- Check user ID matches in policies

### "Table does not exist"
- Run migrations again
- Check SQL for syntax errors
- Verify you're in the correct project

### "Invalid API key"
- Copy the correct key from Project Settings → API
- Make sure you're using anon key for client-side
- Use service_role key only on server-side

## Next Steps

1. Update `.env.local` with your credentials
2. Test authentication in the app
3. Create login/signup pages
4. Build company and candidate dashboards


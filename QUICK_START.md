# Hire View AI - Quick Start Guide

## 🚀 Getting Started (5 minutes)

### 1. Install Dependencies
```bash
cd /home/tillguth/Documents/VScode/hireview_ai
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Then fill in `.env.local` with:
- Supabase URL and keys
- Stripe public and secret keys
- OpenAI API key
- YouTube API key
- Cloudinary credentials

### 3. Set Up Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy Project URL and API keys to `.env.local`
4. Run migrations:
   ```bash
   # Option A: Using Supabase CLI
   supabase link --project-ref your_project_ref
   supabase db push
   
   # Option B: Manual SQL
   # Copy supabase/migrations/001_initial_schema.sql
   # Paste into Supabase SQL Editor and run
   ```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the landing page.

## 📁 Project Structure

```
app/
├── (auth)/              # Authentication pages
│   ├── login/
│   ├── signup/
│   └── layout.tsx
├── (public)/            # Public pages
│   ├── pricing/
│   ├── how-it-works/
│   ├── faq/
│   ├── contact/
│   ├── terms/
│   ├── privacy/
│   └── layout.tsx
├── dashboard/           # Protected dashboards (TODO)
│   ├── company/
│   └── candidate/
├── api/                 # API routes (TODO)
│   ├── auth/
│   ├── jobs/
│   ├── stripe/
│   └── ai/
├── layout.tsx           # Root layout
└── page.tsx             # Landing page

lib/
├── supabase.ts          # Supabase client
├── services/
│   └── auth.ts          # Auth functions
├── hooks/
│   └── useAuth.ts       # Auth Zustand store
└── types/
    └── database.ts      # TypeScript types

supabase/
└── migrations/
    └── 001_initial_schema.sql
```

## 🔑 Key Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript
```

## 🎨 Styling

- **Framework:** Tailwind CSS v4
- **Primary Color:** `#1A56DB` (blue-600)
- **Secondary Color:** `#10B981` (emerald-600)
- **All pages are responsive** - mobile first approach

## 🔐 Authentication

### Using the Auth Hook
```typescript
import { useAuth } from "@/lib/hooks/useAuth";

export default function MyComponent() {
  const { user, profile, signIn, signOut, loading } = useAuth();
  
  // Use auth state and functions
}
```

### Sign Up
```typescript
await signUp(email, password, name, role);
// role: "company" | "candidate"
```

### Sign In
```typescript
await signIn(email, password);
```

### Sign Out
```typescript
await signOut();
```

## 📊 Database

### Tables
- `users` - User profiles
- `companies` - Company info
- `jobs` - Job postings
- `interview_questions` - Questions per job
- `applications` - Candidate applications
- `interview_responses` - Video responses
- `rankings` - AI scores
- `payments` - Stripe payments

### Querying Data
```typescript
import { supabase } from "@/lib/supabase";

// Get data
const { data, error } = await supabase
  .from("jobs")
  .select("*")
  .eq("company_id", companyId);

// Insert data
const { data, error } = await supabase
  .from("jobs")
  .insert({ title: "...", company_id: "..." });

// Update data
const { data, error } = await supabase
  .from("jobs")
  .update({ status: "published" })
  .eq("id", jobId);
```

## 🎯 Next Tasks

1. **Company Dashboard** - Job management interface
2. **Candidate Dashboard** - Application tracking
3. **Job Board** - Public job listings
4. **Video Recording** - MediaRecorder API
5. **AI Ranking** - OpenAI integration
6. **Stripe Payments** - Subscription checkout
7. **Video Compilation** - YouTube integration
8. **Admin Dashboard** - System management
9. **Testing & Deployment** - Production ready

## 🐛 Troubleshooting

### "Cannot find module" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Run `npm install` fresh

### TypeScript errors
- These are normal until dependencies are installed
- Run `npm install` to resolve

### Supabase connection errors
- Check `.env.local` has correct credentials
- Verify Supabase project is active
- Check network connectivity

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

## 📚 Documentation

- **SETUP.md** - Detailed setup instructions
- **SUPABASE_SETUP.md** - Supabase configuration guide
- **PROGRESS.md** - Development progress tracker
- **PROJECT_CONTEXT.md** - Architecture and design decisions

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [OpenAI Documentation](https://platform.openai.com/docs)

## 💬 Support

For questions or issues:
1. Check the FAQ page at `/faq`
2. Review documentation files
3. Check Supabase logs
4. Review browser console for errors

---

**Happy coding! 🚀**


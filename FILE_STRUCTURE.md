# Hire View AI - File Structure

## Project Directory Tree

```
hireview_ai/
├── app/                                    # Next.js App Router
│   ├── (auth)/                            # Authentication routes (grouped)
│   │   ├── login/
│   │   │   └── page.tsx                   # Login page
│   │   ├── signup/
│   │   │   └── page.tsx                   # Signup page with role selection
│   │   └── layout.tsx                     # Auth layout wrapper
│   │
│   ├── (public)/                          # Public routes (grouped)
│   │   ├── pricing/
│   │   │   └── page.tsx                   # Pricing page (3 tiers)
│   │   ├── how-it-works/
│   │   │   └── page.tsx                   # How it works guide
│   │   ├── faq/
│   │   │   └── page.tsx                   # FAQ with accordion
│   │   ├── contact/
│   │   │   └── page.tsx                   # Contact form
│   │   ├── terms/
│   │   │   └── page.tsx                   # Terms of Service
│   │   ├── privacy/
│   │   │   └── page.tsx                   # Privacy Policy
│   │   └── layout.tsx                     # Public layout wrapper
│   │
│   ├── dashboard/                         # Protected dashboards (TODO)
│   │   ├── company/
│   │   │   ├── jobs/
│   │   │   ├── applicants/
│   │   │   └── page.tsx
│   │   └── candidate/
│   │       ├── applications/
│   │       └── page.tsx
│   │
│   ├── api/                               # API routes (TODO)
│   │   ├── auth/
│   │   ├── jobs/
│   │   ├── applications/
│   │   ├── interviews/
│   │   ├── videos/
│   │   ├── analytics/
│   │   ├── stripe/
│   │   └── ai/
│   │
│   ├── layout.tsx                         # Root layout with metadata
│   ├── page.tsx                           # Landing page
│   ├── globals.css                        # Global styles
│   └── favicon.ico                        # Favicon
│
├── lib/                                   # Utility functions and services
│   ├── supabase.ts                        # Supabase client initialization
│   │
│   ├── services/
│   │   └── auth.ts                        # Authentication service functions
│   │
│   ├── hooks/
│   │   └── useAuth.ts                     # Zustand auth store hook
│   │
│   ├── types/
│   │   └── database.ts                    # TypeScript type definitions
│   │
│   ├── utils/                             # Utility functions (TODO)
│   └── constants/                         # Constants (TODO)
│
├── public/                                # Static assets
│   ├── next.svg
│   └── vercel.svg
│
├── supabase/                              # Supabase configuration
│   └── migrations/
│       └── 001_initial_schema.sql         # Database schema migration
│
├── .env.example                           # Environment variables template
├── .gitignore                             # Git ignore patterns
├── .eslintrc.json                         # ESLint configuration
├── next.config.ts                         # Next.js configuration
├── tsconfig.json                          # TypeScript configuration
├── tailwind.config.ts                     # Tailwind CSS configuration
├── package.json                           # Dependencies and scripts
├── package-lock.json                      # Dependency lock file
│
├── README.md                              # Project overview
├── SETUP.md                               # Setup instructions
├── SUPABASE_SETUP.md                      # Supabase configuration guide
├── QUICK_START.md                         # Quick reference guide
├── PROGRESS.md                            # Development progress tracker
├── PROJECT_CONTEXT.md                     # Architecture and design
├── COMPLETION_SUMMARY.md                  # Phase 1 completion summary
└── FILE_STRUCTURE.md                      # This file
```

## File Descriptions

### Core Application Files

#### `app/layout.tsx`
- Root layout component
- SEO metadata configuration
- Global providers setup
- Font configuration

#### `app/page.tsx`
- Landing page
- Hero section with CTA
- Features showcase
- Statistics
- Footer with links

### Authentication Pages

#### `app/(auth)/login/page.tsx`
- Email/password login form
- Google OAuth button
- Error handling
- Loading states
- Link to signup

#### `app/(auth)/signup/page.tsx`
- Role selection (company/candidate)
- Email/password signup form
- Google OAuth button
- Terms acceptance checkbox
- Form validation

### Public Pages

#### `app/(public)/pricing/page.tsx`
- 3 pricing tiers (Basic, Pro, Unlimited)
- Feature comparison
- FAQ section
- CTA buttons

#### `app/(public)/how-it-works/page.tsx`
- 6-step process visualization
- Company benefits section
- Candidate benefits section
- Key metrics
- CTA section

#### `app/(public)/faq/page.tsx`
- 5 categories of FAQs
- Accordion-style Q&A
- 20+ questions
- Contact support link

#### `app/(public)/contact/page.tsx`
- Contact form
- Contact information
- Office location
- Social media links

#### `app/(public)/terms/page.tsx`
- Terms of Service
- 10 sections
- Legal compliance

#### `app/(public)/privacy/page.tsx`
- Privacy Policy
- GDPR compliance
- CCPA compliance
- Data retention policy

### Library Files

#### `lib/supabase.ts`
- Supabase client initialization
- Client-side and server-side clients
- Environment variable validation

#### `lib/services/auth.ts`
- Sign up function
- Sign in function
- Google OAuth function
- Sign out function
- Password reset functions
- User profile functions

#### `lib/hooks/useAuth.ts`
- Zustand auth store
- Auth state management
- Auth actions
- Error handling
- Loading states

#### `lib/types/database.ts`
- User type definitions
- Company type definitions
- Job type definitions
- Application type definitions
- Interview response types
- Ranking types
- Payment types

### Configuration Files

#### `next.config.ts`
- Standalone output for Hostinger
- Image optimization
- Environment variables
- Remote image patterns

#### `tailwind.config.ts`
- Brand colors
- Custom theme
- Plugin configuration

#### `tsconfig.json`
- TypeScript compiler options
- Path aliases (@/*)
- Strict mode enabled

#### `package.json`
- All dependencies listed
- Scripts for dev, build, start
- Version information

### Database Files

#### `supabase/migrations/001_initial_schema.sql`
- 8 table definitions
- RLS policies
- Indexes for performance
- Foreign key relationships

### Documentation Files

#### `README.md`
- Project overview
- Tech stack
- Features
- Setup instructions

#### `SETUP.md`
- Detailed setup guide
- Directory structure
- Files created
- Next steps

#### `SUPABASE_SETUP.md`
- Supabase project creation
- Credentials setup
- Migration instructions
- Authentication setup
- Storage bucket setup

#### `QUICK_START.md`
- 5-minute quick start
- Key commands
- Project structure
- Styling guide
- Authentication examples
- Database queries
- Troubleshooting

#### `PROGRESS.md`
- Completed tasks
- Pending tasks
- Project statistics
- Next steps
- Tech stack summary

#### `PROJECT_CONTEXT.md`
- Project status
- Architecture overview
- Database schema
- API endpoints
- Implementation details

#### `COMPLETION_SUMMARY.md`
- Phase 1 completion
- Deliverables
- Statistics
- Completed tasks
- Ready for next phase

## Database Schema Files

### `supabase/migrations/001_initial_schema.sql`

Contains:
- `users` table - User profiles
- `companies` table - Company information
- `jobs` table - Job postings
- `interview_questions` table - Questions per job
- `applications` table - Candidate applications
- `interview_responses` table - Video responses
- `rankings` table - AI scoring results
- `payments` table - Stripe payments

Plus:
- Indexes for performance
- RLS policies for security
- Foreign key relationships

## Environment Files

### `.env.example`
Template for environment variables:
- Supabase credentials
- Stripe keys
- OpenAI API key
- YouTube API key
- Cloudinary credentials
- Application URL

### `.env.local` (not in repo)
Actual environment variables (create from .env.example)

## Static Assets

### `public/`
- `next.svg` - Next.js logo
- `vercel.svg` - Vercel logo
- (Ready for custom assets)

## Build Output

### `.next/` (generated)
- Compiled Next.js application
- Static exports
- Server functions

### `node_modules/` (generated)
- All npm dependencies
- ~500+ packages

## Key Statistics

| Category | Count |
|----------|-------|
| TypeScript Files | 5 |
| React Components | 9 |
| Pages | 9 |
| Layouts | 3 |
| Database Tables | 8 |
| Documentation Files | 7 |
| Configuration Files | 5 |
| Total Files | 40+ |

## File Organization Principles

1. **App Router Structure** - Using Next.js 13+ App Router
2. **Route Groups** - Using parentheses for logical grouping
3. **Colocation** - Related files kept together
4. **Separation of Concerns** - Services, hooks, types separated
5. **Documentation** - Comprehensive guides for each phase
6. **Type Safety** - TypeScript throughout
7. **Scalability** - Structure ready for growth

## Next Phase Files to Create

### Dashboards
- `app/dashboard/company/page.tsx`
- `app/dashboard/company/jobs/page.tsx`
- `app/dashboard/company/applicants/page.tsx`
- `app/dashboard/candidate/page.tsx`
- `app/dashboard/candidate/applications/page.tsx`

### API Routes
- `app/api/auth/[...auth].ts`
- `app/api/jobs/route.ts`
- `app/api/applications/route.ts`
- `app/api/stripe/webhook.ts`
- `app/api/ai/rank.ts`

### Services
- `lib/services/jobs.ts`
- `lib/services/applications.ts`
- `lib/services/videos.ts`
- `lib/services/ai.ts`
- `lib/services/stripe.ts`

### Hooks
- `lib/hooks/useJobs.ts`
- `lib/hooks/useApplications.ts`
- `lib/hooks/useVideos.ts`

---

**Last Updated:** {new Date().toLocaleDateString()}
**Status:** Phase 1 Complete - 40+ files created


# ResumeCraft

ResumeCraft is a full-stack AI-powered resume builder built with Next.js App Router, Clerk authentication, MongoDB, and OpenRouter.

🔗 **Live Demo:** [resume-craft-git-main-bramhagulavani-gmailcoms-projects.vercel.app](https://resume-craft-git-main-bramhagulavani-gmailcoms-projects.vercel.app)

## Features

- AI-assisted resume content generation
- AI-powered cover letter generator with tone selector
- ATS score checker against a job description
- Live resume preview while editing
- Three templates: Classic, Modern, Minimal
- Templates gallery with live previews
- PDF export from the builder
- Authenticated dashboard with full resume CRUD
- Toast notification system
- Dark/light theme support
- Fully mobile responsive with hamburger sidebar
- Phone and LinkedIn fields on every resume

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 + React 19 + TypeScript |
| Styling | Tailwind CSS |
| Authentication | Clerk v6 |
| Database | MongoDB Atlas + Mongoose |
| AI | OpenRouter (NVIDIA Nemotron) |
| PDF Export | html2pdf.js |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Clerk account
- OpenRouter API key

### Installation

```bash
git clone https://github.com/bramhagulavani/ResumeCraft.git
cd resumecraft
npm install
npm run dev
```

Open http://localhost:3000

### Environment Variables

Create `.env.local` in the project root:

```env
MONGODB_URI=mongodb+srv://...@cluster0.mongodb.net/resumecraft

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENROUTER_API_KEY=sk-or-v1-...
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Create production build
- `npm run start` — Run production server
- `npm run lint` — Run ESLint

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai` | Generate resume summary, skills, and experience |
| POST | `/api/ats` | Analyze resume vs job description, return ATS score |
| POST | `/api/cover-letter` | Generate tailored cover letter from resume + job description |
| GET | `/api/resume` | Get current user's resumes |
| POST | `/api/resume` | Create a new resume |
| GET | `/api/resume/[id]` | Get one resume by id (owner only) |
| PUT | `/api/resume/[id]` | Update one resume by id (owner only) |
| DELETE | `/api/resume/[id]` | Delete one resume by id (owner only) |

## Data Model

```ts
{
  userId: string;
  name: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  summary?: string;
  skills: string[];
  experience: { company?: string; role?: string; description?: string }[];
  education: { college?: string; degree?: string; year?: string }[];
  projects: { title?: string; description?: string; tech?: string }[];
  template: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Project Structure

```text
resumecraft/
|- app/
|  |- (dashboard)/
|  |  |- ats/page.tsx
|  |  |- builder/page.tsx
|  |  |- cover-letter/page.tsx
|  |  |- dashboard/page.tsx
|  |  |- resume/[id]/
|  |  |  |- page.tsx
|  |  |  |- ResumeDownloadButton.tsx
|  |  |- templates/page.tsx
|  |- api/
|  |  |- ai/route.ts
|  |  |- ats/route.ts
|  |  |- cover-letter/route.ts
|  |  |- resume/
|  |  |  |- route.ts
|  |  |  |- [id]/route.ts
|  |- sign-in/[[...sign-in]]/page.tsx
|  |- sign-up/[[...sign-up]]/page.tsx
|  |- globals.css
|  |- layout.tsx
|  |- page.tsx
|- components/
|  |- layout/
|  |  |- Sidebar.tsx
|  |  |- Topbar.tsx
|  |- resumeTemplates/
|  |  |- ClassicTemplate.tsx
|  |  |- MinimalTemplate.tsx
|  |  |- ModernTemplate.tsx
|  |  |- types.ts
|  |- ui/
|  |  |- Toast.tsx
|  |  |- ToastProvider.tsx
|  |- ThemeProvider.tsx
|- lib/mongodb.ts
|- models/Resume.ts
|- middleware.ts
|- package.json
```

## Notes

- Protected UI routes are handled via Clerk middleware.
- API routes validate authentication and user ownership where applicable.
- ATS Checker and Cover Letter Generator use NVIDIA Nemotron free model via OpenRouter.

## Author

**Bramha Vinayak Gulavani**
- GitHub: https://github.com/bramhagulavani
- LinkedIn: https://linkedin.com/in/bramhagulavani
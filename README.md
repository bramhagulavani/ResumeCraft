# ResumeCraft

An AI-powered resume builder built with Next.js, MongoDB, and Clerk authentication.

🔗 **Live Demo:** [resume-craft-git-main-bramhagulavani-gmailcoms-projects.vercel.app](https://resume-craft-git-main-bramhagulavani-gmailcoms-projects.vercel.app)

---

## ✨ Features

- 🤖 **AI Resume Generator** — Describe yourself and AI fills in your resume
- 👁️ **Live Preview** — Real-time dual-panel builder
- 🎨 **3 Templates** — Classic, Modern, and Minimal
- 📄 **PDF Export** — One-click download, no watermarks
- 🔐 **Authentication** — Secure sign-in/sign-up with Clerk
- 💾 **Full CRUD** — Create, edit, delete your resumes
- 🗄️ **MongoDB Atlas** — Cloud database with user ownership

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS |
| Auth | Clerk |
| Database | MongoDB Atlas + Mongoose |
| AI | OpenRouter (Llama 3.2) |
| PDF | html2pdf.js |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Clerk account (free)
- OpenRouter account (free)

### Installation

```bash
git clone https://github.com/bramhagulavani/ResumeCraft.git
cd resumecraft
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create `.env.local` in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/resumecraft

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENROUTER_API_KEY=sk-or-v1-...
```

---

## 🔧 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resume` | Get all user resumes |
| POST | `/api/resume` | Create new resume |
| GET | `/api/resume/[id]` | Get single resume |
| PUT | `/api/resume/[id]` | Update resume |
| DELETE | `/api/resume/[id]` | Delete resume |
| POST | `/api/ai` | Generate resume with AI |

---

## 💾 Data Model

```typescript
{
  userId: string,
  name: string,
  email: string,
  summary: string,
  skills: string[],
  experience: [{ company, role, description }],
  education: [{ college, degree, year }],
  projects: [{ title, description, tech }],
  template: "classic" | "modern" | "minimal",
  createdAt: Date
}
```

---

## 📦 Dependencies

**Production:** `next` · `react` · `@clerk/nextjs` · `mongoose` · `html2pdf.js`

**Dev:** `typescript` · `tailwindcss` · `eslint`



## 📁 Project Structure

```
resumecraft/
├── app/
│   ├── (dashboard)/                  # Protected routes (require authentication)
│   │   ├── layout.tsx                # Dashboard layout with Sidebar + Topbar
│   │   ├── builder/
│   │   │   └── page.tsx               # Resume builder with live preview
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Resume management dashboard
│   │   ├── resume/
│   │   │   └── [id]/
│   │   │       ├── page.tsx           # Resume display view
│   │   │       └── Resumedownloadbutton.tsx
│   │   └── templates/
│   │       └── page.tsx               # Templates showcase
│   ├── api/
│   │   ├── ai/
│   │   │   └── route.ts               # AI resume generation
│   │   └── resume/
│   │       ├── route.ts               # GET all & POST create
│   │       └── [id]/
│   │           └── route.ts           # GET single, PUT update, DELETE
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx               # Clerk sign-in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx               # Clerk sign-up page
│   ├── layout.tsx                    # Root layout with ClerkProvider
│   ├── page.tsx                      # Landing page (public)
│   └── globals.css                    # Global styles
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx                # Navigation sidebar
│   │   └── Topbar.tsx                 # Top navigation with UserButton
│   └── resumeTemplates/
│       ├── types.ts                   # TypeScript interfaces
│       ├── ClassicTemplate.tsx        # Classic resume template
│       ├── ModernTemplate.tsx         # Modern resume template
│       └── MinimalTemplate.tsx        # Minimal resume template
├── lib/
│   └── mongodb.ts                     # MongoDB connection utility
├── models/
│   └── Resume.ts                      # Resume Mongoose schema
├── middleware.ts                       # Route protection with Clerk
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
└── postcss.config.mjs                 # PostCSS config
```


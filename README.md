# ResumeCraft

A comprehensive Next.js resume builder with AI-powered generation, real-time live preview, multiple templates, PDF export, and secure user authentication.

## ✨ Features

- **AI Resume Generator** — Describe yourself and AI writes your summary, skills, and experience
- **Live Resume Builder** — Dual-panel form with real-time preview
- **3 Professional Templates** — Classic, Modern, and Minimal designs
- **PDF Export** — One-click download with no watermarks
- **User Authentication** — Secure sign-in/sign-up with Clerk
- **Full CRUD Operations** — Create, read, update, and delete resumes
- **MongoDB Storage** — Persistent data with user ownership

## 🛠 Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript
- **Tailwind CSS** — Utility-first styling
- **Clerk** — Authentication & user management
- **MongoDB + Mongoose** — Database & ODM
- **OpenRouter AI** — AI resume generation
- **html2pdf.js** — PDF export

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Clerk account (free) for authentication

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create `.env.local` in project root:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/resumecraft

# Clerk Authentication (get from clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# OpenRouter AI (optional, for AI features)
OPENROUTER_API_KEY=sk_or_...
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔐 Authentication Flow

1. **Sign Up** — Click "Get Started Free" → Create account → Redirected to Dashboard
2. **Sign In** — Click "Sign In" → Enter credentials → Redirected to Dashboard
3. **Protected Routes** — `/dashboard`, `/builder`, `/resume`, `/templates` require authentication

## 💾 Data Model

```typescript
{
  userId: string,              // Clerk user ID (required)
  name: string,                // Required
  email: string,
  summary: string,
  skills: string[],
  experience: [{ company, role, description }],
  education: [{ college, degree, year }],
  projects: [{ title, description, tech }],
  template: "classic" | "modern" | "minimal",
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Templates

1. **Classic** — Serif fonts, traditional professional look
2. **Modern** — Dark mode, vibrant accents, tech-forward
3. **Minimal** — Clean, elegant, minimalist design

## 🔧 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resume` | Get all user resumes |
| POST | `/api/resume` | Create new resume |
| GET | `/api/resume/[id]` | Get single resume |
| PUT | `/api/resume/[id]` | Update resume |
| DELETE | `/api/resume/[id]` | Delete resume |
| POST | `/api/ai` | Generate resume with AI |

All resume API routes verify user ownership before any operation.

## 🧪 Testing

1. **Authentication** — Sign up and verify redirect to `/dashboard`
2. **Create Resume** — Fill form, select template, save
3. **View Resume** — Click View button to see formatted resume
4. **Edit Resume** — Click Edit to modify existing resume
5. **Delete Resume** — Remove resume with confirmation
6. **PDF Export** — Download resume as PDF
7. **Security** — Verify users can only access their own resumes

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| Auth errors | Check Clerk keys in `.env.local` |
| Resume not saving | Verify MongoDB connection and required fields |
| PDF not downloading | Check browser console for errors |
| Empty dashboard | Ensure you're signed in |

## 📦 Dependencies

**Production:** `next`, `react`, `@clerk/nextjs`, `mongoose`, `html2pdf.js`

**Development:** `typescript`, `tailwindcss`, `eslint`, `postcss`


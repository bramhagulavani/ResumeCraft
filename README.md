# ResumeCraft

ResumeCraft is a comprehensive Next.js resume builder application with real-time live preview, multiple resume templates, full CRUD operations, PDF export functionality, and user authentication. It features an intuitive dual-panel builder, persistent MongoDB storage, secure dashboard management, and professional resume rendering.

## ✅ Status — What's Completed

### 1. **Core Project Structure**
- ✅ Project initialized with Next.js App Router and TypeScript
- ✅ Full type-safe development environment
- ✅ Tailwind CSS with PostCSS and ESLint configured
- ✅ Git version control initialized

### 2. **Authentication System (Clerk)**
- ✅ **Clerk Integration** — Complete authentication system with @clerk/nextjs
- ✅ **Sign In Page** (`app/sign-in/[[...sign-in]]/page.tsx`) — User login
- ✅ **Sign Up Page** (`app/sign-up/[[...sign-up]]/page.tsx`) — User registration
- ✅ **User Button** — Profile pic + logout in Topbar
- ✅ **Protected Routes** — Dashboard, Builder, Templates require authentication
- ✅ **Auth Guards** — API routes verify user identity
- ✅ **Sign Out** — AfterSignOutUrl to landing page

### 3. **Application Pages**

#### Public Pages
- ✅ **Landing Page** (`app/page.tsx`) — Full landing page with:
  - Professional dark-themed design
  - Navbar with Sign In / Get Started buttons
  - Hero section with call-to-action
  - Features showcase (6 features)
  - CTA section
  - Footer

#### Protected Pages (require sign-in)
- ✅ **Dashboard** (`app/(dashboard)/dashboard/page.tsx`) — Resume management with View/Edit/Delete
- ✅ **Resume Builder** (`app/(dashboard)/builder/page.tsx`) — Dual-panel form with live preview
- ✅ **Resume View Page** (`app/(dashboard)/resume/[id]/page.tsx`) — Professional resume display
- ✅ **Templates** (`app/(dashboard)/templates/page.tsx`) — Template showcase

#### Layout Components
- ✅ **Dashboard Layout** (`app/(dashboard)/layout.tsx`) — Sidebar + Topbar with auth
- ✅ **Root Layout** (`app/layout.tsx`) — ClerkProvider wrapper
- ✅ **Sidebar** (`components/layout/Sidebar.tsx`) — Navigation sidebar
- ✅ **Topbar** (`components/layout/Topbar.tsx`) — Top navigation with UserButton

### 4. **Resume Builder Features** (`app/(dashboard)/builder/page.tsx`)
Complete resume creation and editing with:
- ✅ **Dual-panel layout** — Form on left, live preview on right
- ✅ **Personal Information** — Name, email, professional summary with validation
- ✅ **Skills Management** — Add/remove multiple skills dynamically
- ✅ **Experience Management** — Add/remove work experience entries
- ✅ **Education Management** — Add/remove education entries with college, degree, year
- ✅ **Projects Showcase** — Add/remove projects with title, description, tech stack
- ✅ **Template Selection** — 3 professional templates (Classic, Modern, Minimal)
- ✅ **Edit Existing Resume** — Load and modify saved resumes via query parameter
- ✅ **PDF Download** — Export resume as PDF with html2pdf.js
- ✅ **Save/Update Logic** — Create new resumes (POST) or update existing (PUT)
- ✅ **Loading States** — User feedback while saving or loading data
- ✅ **Form Validation** — Required field checking (name & email)

### 5. **Dashboard Page** (`app/(dashboard)/dashboard/page.tsx`)
Full resume management interface with:
- ✅ **User-specific Resumes** — Only shows resumes for signed-in user
- ✅ **Resume Listing** — Display all saved resumes in card grid
- ✅ **Resume Cards** — Show name, email, summary preview, creation date
- ✅ **View Button** — Navigate to professional resume display page
- ✅ **Edit Button** — Open builder in edit mode for selected resume
- ✅ **Delete Button** — Remove resume with confirmation dialog
- ✅ **Delete State Management** — Show loading indicator while deleting
- ✅ **Optimistic Updates** — Remove item from list immediately after delete
- ✅ **Loading States** — Display loading message while fetching
- ✅ **Empty State** — Show message when no resumes exist
- ✅ **Error Handling** — Comprehensive error messages and logging

### 6. **Resume View/Display** (`app/(dashboard)/resume/[id]/page.tsx`)
Professional resume rendering with:
- ✅ **Server-Side Rendering** — Fast, SEO-friendly page load
- ✅ **Authorization Check** — Ensure user owns the resume
- ✅ **Three Templates**:
  - Classic: Serif font, traditional look, professional colors
  - Modern: Dark mode, tech-forward, vibrant accents
  - Minimal: Clean, elegant, minimal styling
- ✅ **Edit Link** — Quick access to edit mode from view page
- ✅ **PDF Download** — Export currently displayed resume as PDF
- ✅ **Template Info Display** — Show which template is in use
- ✅ **Error Handling** — Invalid ID and not found states

### 7. **Resume Templates** (`components/resumeTemplates/`)
- ✅ **ClassicTemplate.tsx** — Traditional serif-based design
- ✅ **ModernTemplate.tsx** — Dark mode with bold colors
- ✅ **MinimalTemplate.tsx** — Minimalist clean design
- ✅ **types.ts** — TypeScript interfaces for resume data
- ✅ **Styled sections** — Proper formatting for all resume sections
- ✅ **Responsive styling** — Works on all screen sizes

### 8. **MongoDB Integration**
- ✅ **Database Connection** (`lib/mongodb.ts`) — Mongoose with connection pooling
- ✅ **Resume Schema** (`models/Resume.ts`) — Comprehensive data model with all fields:
  - **userId** — Clerk user ID for ownership (required)
  - Personal info (name, email, summary)
  - Skills array
  - Education array (college, degree, year)
  - Experience array (company, role, description)
  - Projects array (title, description, tech)
  - Template selection (default: "classic")
  - Auto-generated timestamps
  - Full type safety with TypeScript

### 9. **API Routes - Complete CRUD with User Authorization**

#### **GET /api/resume**
- ✅ Fetch all resumes for signed-in user
- ✅ Filter by userId from Clerk
- ✅ Sort by creation date (newest first)
- ✅ Proper ObjectId to string conversion
- ✅ Error handling with 500 status

#### **POST /api/resume**
- ✅ Create new resume with userId from Clerk
- ✅ Validate required fields (name, email)
- ✅ Return created document with string ID
- ✅ Timestamps auto-generated
- ✅ Comprehensive error messages

#### **GET /api/resume/[id]**
- ✅ Fetch single resume by ID
- ✅ Verify user owns the resume
- ✅ Used to prefill builder for editing
- ✅ ObjectId validation
- ✅ Proper error handling (400, 401, 404, 500)

#### **PUT /api/resume/[id]**
- ✅ Update existing resume by ID
- ✅ Verify user owns the resume
- ✅ Replace all fields with new data
- ✅ ObjectId validation
- ✅ Return updated document
- ✅ Error handling for invalid/missing resumes

#### **DELETE /api/resume/[id]**
- ✅ Remove resume by ID
- ✅ Verify user owns the resume
- ✅ ID validation and trimming
- ✅ Proper HTTP status codes (200, 400, 401, 404, 500)
- ✅ Comprehensive error messages
- ✅ Debug logging for troubleshooting

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
├── public/                            # Static assets
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
├── eslint.config.mjs                  # ESLint config
└── postcss.config.mjs                 # PostCSS config
```

## 📦 Dependencies

**Production:**
- `next` 16.1.6 — React framework with App Router
- `react` 19.2.3 — UI library
- `react-dom` 19.2.3 — React DOM
- `@clerk/nextjs` ^7.0.1 — Authentication and user management
- `mongoose` ^9.2.3 — MongoDB ODM
- `html2pdf.js` ^0.14.0 — PDF export from HTML

**Development:**
- `typescript` ^5 — Type safety
- `tailwindcss` ^4 — Utility-first CSS
- `@tailwindcss/postcss` ^4 — PostCSS plugin
- `eslint` ^9 — Code linting
- `eslint-config-next` 16.1.6 — Next.js ESLint rules

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Clerk account (free) for authentication

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env.local` in project root:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/resumecraft
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumecraft?retryWrites=true&w=majority

# Clerk Authentication Keys (get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 3. Start Development Server
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication Flow

### Sign Up
1. Click "Get Started Free" or "Sign Up" on landing page
2. Enter email, username, and password (or use OAuth)
3. Verify email (if required)
4. Redirected to Dashboard

### Sign In
1. Click "Sign In" on landing page
2. Enter email and password (or use OAuth)
3. Redirected to Dashboard

### Protected Routes
- All routes under `/dashboard`, `/builder`, `/templates`, `/resume` require authentication
- Unauthenticated users are redirected to sign-in
- After sign-in, redirected to `/dashboard`

### User Resume Ownership
- Every resume is tied to a Clerk userId
- Users can only view, edit, and delete their own resumes
- API routes verify user ownership before any operation

## 📝 Available Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint code linting

## 🔄 How It Works

### User Registration & Authentication
1. Navigate to `/sign-up`
2. Create account with Clerk (email/password or OAuth)
3. Account created automatically
4. Redirected to `/dashboard`
5. User can now create resumes tied to their account

### Resume Creation Flow
1. Navigate to `/dashboard` (sign in if not already)
2. Click "+ New Resume" or go to `/builder`
3. Fill in personal info (name, email, summary)
4. Add skills, experience, education, and projects
5. Select a template (classic, modern, or minimal)
6. View live preview on the right panel
7. Click "Download PDF" to export as PDF (optional)
8. Click "Save Resume" to persist to MongoDB
9. Resume is saved with your userId
10. Form resets after successful save

### Resume Management Flow
1. Navigate to `/dashboard`
2. View all YOUR saved resumes in card grid (not others' resumes)
3. Click **View** to see professional formatted resume
4. Click **Edit** to modify resume data in builder
5. Click **Delete** to remove resume (with confirmation)
6. Dashboard updates automatically after changes

### Resume Viewing Flow
1. Dashboard or builder links to `/resume/{id}`
2. Server verifies you own this resume
3. Server-side renders the resume using selected template
4. Shows professional formatting with all sections
5. Displays template information and edit link
6. Can download as PDF from this view
7. Can navigate back to edit via "Edit Resume" button

### Edit Resume Flow
1. Dashboard: click "Edit" button, or
2. Resume view: click "✏️ Edit Resume", or
3. Direct link: `/builder?id={resumeId}`
4. Builder loads existing data automatically
5. Form shows "Edit Resume" header instead of "Resume Builder"
6. Clicking "Save" does PUT request to update
7. After update, redirects to resume view page

## 🎨 Template System

### Available Templates
1. **Classic Template**
   - Serif fonts (Georgia, Times New Roman)
   - Traditional professional look
   - White background with dark text
   - Clean dividers and spacing
   - Perfect for formal industries

2. **Modern Template**
   - Dark background with light text
   - System fonts (Helvetica, Arial)
   - Vibrant accent colors (indigo)
   - Contemporary tech-forward design
   - Great for tech/startup roles

3. **Minimal Template**
   - Clean, minimalist approach
   - Light background with gray text
   - Subtle styling with thin borders
   - Professional yet elegant
   - Ideal for creative professionals

## 💾 Data Model

```typescript
{
  _id: ObjectId,
  userId: string,              // Clerk user ID (required)
  name: string,                // Required
  email: string,
  summary: string,
  skills: string[],
  experience: [
    {
      company: string,
      role: string,
      description: string
    }
  ],
  education: [
    {
      college: string,
      degree: string,
      year: string
    }
  ],
  projects: [
    {
      title: string,
      description: string,
      tech: string
    }
  ],
  template: "classic" | "modern" | "minimal",
  createdAt: Date,
  updatedAt: Date
}
```

## 🏠 Landing Page Features

The landing page (`app/page.tsx`) includes:

- **Professional Dark Theme** — Sleek slate-950 background
- **Navigation Bar** — Logo, Sign In, Get Started buttons
- **Hero Section** — 
  - "AI-Powered Resume Builder" badge
  - Compelling headline
  - Subtitle text
  - Call-to-action buttons
- **Features Section** — 6 feature cards:
  1. Live Resume Builder
  2. Premium Templates
  3. One-Click PDF Export
  4. AI Resume Generator
  5. Secure & Private
  6. Fast & Modern
- **CTA Section** — "Ready to Build Your Resume?"
- **Footer** — Copyright and "Built with Next.js + MongoDB + AI"

## 🔧 Recent Changes & Improvements

### Latest Update: Authentication & User Ownership (March 2026)

#### Authentication System
- ✅ Added **Clerk** (@clerk/nextjs) for user authentication
- ✅ Sign-in and sign-up pages with Clerk components
- ✅ UserButton in Topbar with profile pic and logout
- ✅ Protected routes redirect to sign-in
- ✅ Auth state persists across sessions

#### User-Resume Association
- ✅ Added **userId** field to Resume schema
- ✅ All API routes verify user ownership
- ✅ Dashboard only shows user's own resumes
- ✅ View/Edit/Delete only works for owner
- ✅ Unauthorized access returns 401/404

#### Landing Page
- ✅ Complete redesign with dark theme
- ✅ Professional navbar with auth buttons
- ✅ Hero section with CTA
- ✅ Features showcase grid
- ✅ Footer with credits

#### Directory Cleanup
- ✅ Dashboard routes moved to `(dashboard)` route group
- ✅ Protected routes organized under one layout
- ✅ Auth pages (sign-in, sign-up) at root
- ✅ Clean separation of public/protected areas

### Previous Features (Still Active)
- Resume builder with live preview
- Three professional templates
- Full CRUD operations
- PDF export functionality
- MongoDB persistence
- TypeScript type safety

## 🧪 Testing the Application

### Test Authentication
1. Go to landing page `/`
2. Click "Get Started Free"
3. Sign up with email or OAuth
4. Verify redirected to `/dashboard`
5. Check UserButton shows in Topbar

### Test Resume Creation
1. Go to `/dashboard`
2. Click "+ New Resume"
3. Fill all sections with data
4. Select a template
5. Click "Download PDF" to test export
6. Click "Save Resume" to create
7. Verify success alert
8. Check MongoDB to confirm userId is set

### Test Resume Listing
1. Go to `/dashboard`
2. Verify all created resumes appear
3. Verify they only show YOUR resumes
4. Check dates are correct
5. See all buttons (View, Edit, Delete)

### Test View Functionality
1. From dashboard, click "View" button
2. Verify resume displays correctly
3. Check selected template is shown
4. Try different templates by editing
5. Test PDF download from view page

### Test Edit Functionality
1. From dashboard, click "Edit" button
2. Verify form pre-fills with existing data
3. Modify one or more fields
4. Click "Update Resume"
5. Verify redirect to updated resume view
6. Confirm changes persisted in MongoDB

### Test Delete Functionality
1. From dashboard, click "Delete" button
2. Confirm deletion in dialog
3. Verify resume removed from list
4. Check MongoDB to confirm deletion

### Test PDF Export
1. Go to builder with data
2. Click "⬇ Download PDF"
3. Verify PDF downloads correctly
4. Open PDF and check formatting
5. Try from resume view page

### Test Security
1. Create resume with User A
2. Sign out, create account with User B
3. Try to access User A's resume via URL
4. Should get "Unauthorized" or "Not Found"
5. Verify User B's dashboard is empty

## 🛠️ Next Steps (Suggested)

- [ ] Add **template customization**
  - Color theme selector
  - Font size adjustment
  - Spacing preferences

- [ ] Add **resume preview modes**
  - Page break visualization
  - Print preview
  - Real-time sync between builder and view

- [ ] Enhance **form validation**
  - Real-time field validation
  - Email format validation
  - URL validation for projects

- [ ] Add **more templates**
  - Executive template
  - Creative template
  - Academic template

- [ ] Implement **resume versioning**
  - Keep history of versions
  - Compare versions
  - Restore previous version

- [ ] Add **sharing features**
  - Public resume link
  - QR code generation
  - Email sharing

- [ ] Implement **analytics**
  - View count tracking
  - Download tracking
  - Usage statistics

- [ ] Add **additional fields**
  - Certifications
  - Languages
  - Volunteer work
  - Publications

- [ ] Create **AI assistant**
  - Content suggestions
  - Grammar checking
  - Section improvement tips

- [ ] Add **bulk operations**
  - Export multiple resumes
  - Archive resumes
  - Duplicate resume

## 📚 Key Technologies Used

- **Next.js 16** — Full-stack React framework with App Router
- **TypeScript** — Type-safe development environment
- **Tailwind CSS** — Utility-first styling framework
- **Clerk** — Authentication and user management
- **MongoDB** — NoSQL database for data persistence
- **Mongoose** — ODM with schema validation
- **html2pdf.js** — Client-side PDF generation
- **React Hooks** — useState, useEffect, useSearchParams, useRouter for state management

## 🐛 Troubleshooting

### Authentication Issues
- Check Clerk keys in `.env.local`
- Verify NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY starts with `pk_test_`
- Verify CLERK_SECRET_KEY starts with `sk_test_`
- Check Clerk dashboard for errors

### Edit Mode Not Loading Data
- Check browser console for errors
- Verify resume ID in URL: `/builder?id={resumeId}`
- Ensure resume exists in MongoDB
- Verify you're the owner of the resume

### Template Not Displaying Correctly
- Verify template name matches: "classic", "modern", or "minimal"
- Check browser dev tools for console errors
- Ensure MongoDB has template field populated

### PDF Download Not Working
- Check browser console for errors
- Verify html2pdf.js is installed: `npm install html2pdf.js`
- Ensure resume data is filled in
- Try in different browser

### Resume Not Saving
- Check that name and email are filled
- Verify MongoDB connection in env file
- Look for errors in terminal running `npm run dev`
- Check browser console for network errors
- Ensure you're signed in

### Delete Returns Error
- Verify MongoDB is running
- Check that resume ID is valid
- Look at network response in DevTools
- Check server terminal for detailed error logs

### Resumes Not Appearing on Dashboard
- Ensure you're signed in
- Verify MongoDB connection is working
- Check browser console for fetch errors
- Verify resumes were actually created
- Try refreshing the page

### Unauthorized Errors
- Sign in to your account
- Check Clerk session is valid
- Verify userId is set in MongoDB documents
- Try signing out and signing back in

## 📞 Support & Debugging

For issues, check:
- **Browser Console** (F12) — Client-side errors and logs
- **Clerk Dashboard** — Auth status and configuration
- **Terminal** (npm run dev output) — Server-side errors
- **Network Tab** (F12) — API requests and responses
- **MongoDB** — Database content and collections
- **DevTools** — Component state and props

### Debug Tips
1. Open browser console to see "Fetched resumes:" logs
2. Check terminal for API endpoint logs
3. Use MongoDB Compass to inspect data
4. Test API endpoints directly with curl/Postman
5. Add `console.log()` statements to track execution
6. Check Clerk session at `/api/auth/current-user`


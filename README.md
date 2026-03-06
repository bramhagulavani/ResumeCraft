# ResumeCraft

ResumeCraft is a comprehensive Next.js resume builder application with real-time live preview, multiple resume templates, full CRUD operations, and PDF export functionality. It features an intuitive dual-panel builder, persistent MongoDB storage, dashboard management, and professional resume rendering.

## ✅ Status — What's Completed

### 1. **Core Project Structure**
- ✅ Project initialized with Next.js App Router and TypeScript
- ✅ Full type-safe development environment
- ✅ Tailwind CSS with PostCSS and ESLint configured
- ✅ Git version control initialized

### 2. **Application Pages**
- ✅ **Resume Builder** (`app/builder/page.tsx`) — Dual-panel form with live preview
- ✅ **Dashboard** (`app/dashboard/page.tsx`) — Resume management with View/Edit/Delete
- ✅ **Resume View Page** (`app/resume/[id]/page.tsx`) — Professional resume display with templates
- ✅ **Templates Placeholder** (`app/templates/page.tsx`) 
- ✅ **Layout Components** — Sidebar and Topbar navigation
- ✅ **Home Page** (`app/page.tsx`)

### 3. **Resume Builder Features** (`app/builder/page.tsx`)
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

### 4. **Dashboard Page** (`app/dashboard/page.tsx`)
Full resume management interface with:
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

### 5. **Resume View/Display** (`app/resume/[id]/page.tsx`)
Professional resume rendering with:
- ✅ **Server-Side Rendering** — Fast, SEO-friendly page load
- ✅ **Three Templates**:
  - Classic: Serif font, traditional look, professional colors
  - Modern: Dark mode, tech-forward, vibrant accents
  - Minimal: Clean, elegant, minimal styling
- ✅ **Edit Link** — Quick access to edit mode from view page
- ✅ **PDF Download** — Export currently displayed resume as PDF
- ✅ **Template Info Display** — Show which template is in use
- ✅ **Error Handling** — Invalid ID and not found states

### 6. **Resume Templates** (`components/resumeTemplates/`)
- ✅ **ClassicTemplate.tsx** — Traditional serif-based design
- ✅ **ModernTemplate.tsx** — Dark mode with bold colors
- ✅ **MinimalTemplate.tsx** — Minimalist clean design
- ✅ **types.ts** — TypeScript interfaces for resume data
- ✅ **Styled sections** — Proper formatting for all resume sections
- ✅ **Responsive styling** — Works on all screen sizes

### 7. **MongoDB Integration**
- ✅ **Database Connection** (`lib/mongodb.ts`) — Mongoose with connection pooling
- ✅ **Resume Schema** (`models/Resume.ts`) — Comprehensive data model with all fields:
  - Personal info (name, email, summary)
  - Skills array
  - Education array (college, degree, year)
  - Experience array (company, role, description)
  - Projects array (title, description, tech)
  - Template selection (default: "classic")
  - Auto-generated timestamps
  - Full type safety with TypeScript

### 8. **API Routes - Complete CRUD**

#### **GET /api/resume**
- ✅ Fetch all resumes from database
- ✅ Sort by creation date (newest first)
- ✅ Proper ObjectId to string conversion
- ✅ Error handling with 500 status

#### **POST /api/resume**
- ✅ Create new resume with all fields
- ✅ Validate required fields
- ✅ Return created document with string ID
- ✅ Timestamps auto-generated
- ✅ Comprehensive error messages

#### **GET /api/resume/[id]**
- ✅ Fetch single resume by ID
- ✅ Used to prefill builder for editing
- ✅ ObjectId validation
- ✅ Proper error handling (400, 404, 500)

#### **PUT /api/resume/[id]**
- ✅ Update existing resume by ID
- ✅ Replace all fields with new data
- ✅ ObjectId validation
- ✅ Return updated document
- ✅ Error handling for invalid/missing resumes

#### **DELETE /api/resume/[id]**
- ✅ Remove resume by ID
- ✅ ID validation and trimming
- ✅ Proper HTTP status codes (200, 400, 404, 500)
- ✅ Comprehensive error messages
- ✅ Debug logging for troubleshooting

## 📁 Project Structure

```
resumecraft/
├── app/
│   ├── api/
│   │   └── resume/
│   │       ├── route.ts            # GET all & POST create
│   │       └── [id]/
│   │           └── route.ts        # GET single, PUT update, DELETE
│   ├── builder/
│   │   └── page.tsx                # Resume builder with templates
│   ├── dashboard/
│   │   └── page.tsx                # Resume management dashboard
│   ├── resume/
│   │   └── [id]/
│   │       ├── page.tsx            # Resume display view
│   │       └── ResumeDownloadButton.tsx  # PDF download component
│   ├── templates/
│   │   └── page.tsx                # Templates placeholder
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   └── Topbar.tsx              # Top navigation
│   └── resumeTemplates/
│       ├── types.ts                # TypeScript interfaces
│       ├── ClassicTemplate.tsx     # Classic resume template
│       ├── ModernTemplate.tsx      # Modern resume template
│       └── MinimalTemplate.tsx     # Minimal resume template
├── lib/
│   └── mongodb.ts                  # MongoDB connection utility
├── models/
│   └── Resume.ts                   # Resume Mongoose schema
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── eslint.config.mjs               # ESLint config
└── postcss.config.mjs              # PostCSS config
```

## 📦 Dependencies

**Production:**
- `next` 16.1.6 — React framework with App Router
- `react` 19.2.3 — UI library
- `react-dom` 19.2.3 — React DOM
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

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env.local` in project root:
```env
MONGODB_URI=mongodb://localhost:27017/resumecraft
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumecraft?retryWrites=true&w=majority
```

### 3. Start Development Server
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint code linting

## 🔄 How It Works

### Resume Creation Flow
1. Navigate to `/app/builder`
2. Fill in personal info (name, email, summary)
3. Add skills, experience, education, and projects
4. Select a template (classic, modern, or minimal)
5. View live preview on the right panel
6. Click "Download PDF" to export as PDF (optional)
7. Click "Save Resume" to persist to MongoDB
8. Form resets after successful save

### Resume Management Flow
1. Navigate to `/app/dashboard`
2. View all saved resumes in card grid
3. Click **View** to see professional formatted resume
4. Click **Edit** to modify resume data in builder
5. Click **Delete** to remove resume (with confirmation)
6. Dashboard updates automatically after changes

### Resume Viewing Flow
1. Dashboard or builder links to `/resume/{id}`
2. Server-side renders the resume using selected template
3. Shows professional formatting with all sections
4. Displays template information and edit link
5. Can download as PDF from this view
6. Can navigate back to edit via "Edit Resume" button

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
  name: string,
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

## 🔧 Recent Changes & Improvements (March 6, 2026)

### Major Features Added
1. **Resume View Page** — Server-side rendered individual resume display
2. **Multiple Templates** — Three professional template designs
3. **Full CRUD Operations** — Complete Create, Read, Update, Delete
4. **PDF Export** — Download resumes as PDF files
5. **Edit Mode** — Ability to load and modify existing resumes
6. **Extended Fields** — Skills, education, projects added to schema
7. **Template Selection** — Users can choose template style

### Dashboard Improvements
- Added Edit button for quick access to builder
- Better delete state management with loading indicator
- Optimistic UI updates when deleting
- Improved button styling and spacing
- Better error handling and user feedback

### Builder Enhancements
- Query parameter support for edit mode (`?id={resumeId}`)
- Auto-load existing resume data
- Multiple section management (skills, education, projects)
- Template preview integration
- PDF download button functionality
- Conditional save button text based on mode

### API Improvements
- Added GET endpoint for single resume fetch
- Added PUT endpoint for updates
- DELETE improved with better error handling
- All endpoints use async params (Next.js pattern)
- Consistent response serialization

### Database Schema Updates
- New fields: skills, education, projects
- Template preference field with default
- All with proper TypeScript types
- Maintains backward compatibility

### Code Quality
- Proper TypeScript interfaces for resume data
- Component composition with reusable parts
- Consistent error handling across API
- Loading states throughout the application
- Comprehensive console logging for debugging

## 🧪 Testing the Application

### Test Resume Creation
1. Go to `/builder`
2. Fill all sections with data
3. Select a template
4. Click "Download PDF" to test export
5. Click "Save Resume" to create
6. Verify success alert
7. Check MongoDB to confirm

### Test Resume Listing
1. Go to `/dashboard`
2. Verify all created resumes appear
3. Check dates are correct
4. See all buttons (View, Edit, Delete)

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
5. Try invalid scenarios

### Test PDF Export
1. Go to builder with data
2. Click "⬇ Download PDF"
3. Verify PDF downloads correctly
4. Open PDF and check formatting
5. Try from resume view page

## 🛠️ Next Steps (Suggested)

- [ ] Add **user authentication** system
  - User accounts and login
  - Privacy for resumes
  - Sharing capabilities

- [ ] Implement **template customization**
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
- **MongoDB** — NoSQL database for data persistence
- **Mongoose** — ODM with schema validation
- **html2pdf.js** — Client-side PDF generation
- **React Hooks** — useState, useEffect, useSearchParams, useRouter for state management

## 🐛 Troubleshooting

### Edit Mode Not Loading Data
- Check browser console for errors
- Verify resume ID in URL: `/builder?id={resumeId}`
- Ensure resume exists in MongoDB

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

### Delete Returns Error
- Verify MongoDB is running
- Check that resume ID is valid
- Look at network response in DevTools
- Check server terminal for detailed error logs

### Resumes Not Appearing on Dashboard
- Ensure MongoDB connection is working
- Check browser console for fetch errors
- Verify resumes were actually created
- Try refreshing the page

## 📞 Support & Debugging

For issues, check:
- **Browser Console** (F12) — Client-side errors and logs
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


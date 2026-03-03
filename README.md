# ResumeCraft

ResumeCraft is a Next.js application (App Router) for building a resume/CV builder with real-time preview and database persistence. It combines an intuitive form interface with a live preview section and MongoDB backend storage.

## ✅ Status — What's Completed

### 1. **Basic Project Structure**
- ✅ Project initialized with Next.js App Router and TypeScript
- ✅ Directory structure organized for scalability
- ✅ Global styling configured with Tailwind CSS and PostCSS
- ✅ TypeScript, ESLint, and Tailwind CSS configured

### 2. **Basic Application Pages**
- ✅ **Resume Builder Page** (`app/builder/page.tsx`) — Main form-based resume creation interface
- ✅ **Dashboard Page** (`app/dashboard/page.tsx`) — Dashboard placeholder
- ✅ **Templates Page** (`app/templates/page.tsx`) — Templates placeholder
- ✅ **Layout Components** — Sidebar and Topbar components in `components/layout/`

### 3. **Resume Builder Page (app/builder/page.tsx)**
Enhanced features include:
- ✅ **Dual-panel layout**: Form input on the left, live preview on the right
- ✅ **Personal Information Section**:
  - Full Name input
  - Email input
  - Professional Summary textarea
- ✅ **Experience Management**:
  - Dynamic experience entries with Company, Role, and Description fields
  - Add multiple experiences with "+ Add Experience" button
  - Remove experience entries when more than one exists
- ✅ **Live Preview Section**: Real-time display of resume content as user types
- ✅ **Save Resume Button**: Submits form data to backend API

### 4. **MongoDB Connection Setup**
- ✅ **Database Connection** (`lib/mongodb.ts`):
  - Mongoose connection with caching for performance
  - Automatic connection pooling
  - Environment variable configuration via `MONGODB_URI`
  - Connection error handling
  
- ✅ **Resume Data Model** (`models/Resume.ts`):
  - Schema with fields: `name`, `email`, `summary`, `experience` array
  - Experience sub-document with: `company`, `role`, `description`
  - Auto-generated `timestamps` for creation/update tracking
  - Uses Mongoose ODM for type safety

### 5. **API Integration - Resume Save Functionality**
- ✅ **Resume API Route** (`app/api/resume/route.ts`):
  - POST endpoint to save resume data to MongoDB
  - Connects to database before processing
  - Validates and stores resume data with experience array
  - Returns success response with saved data (status 201)
  - Comprehensive error handling with meaningful error messages
  - **Successfully saves resume files in MongoDB collection**

## 📁 Project Structure

```
resumecraft/
├── app/
│   ├── api/
│   │   └── resume/
│   │       └── route.ts          # Resume save API endpoint
│   ├── builder/
│   │   └── page.tsx              # Resume builder form + preview
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard page
│   ├── templates/
│   │   └── page.tsx              # Templates page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   └── layout/
│       ├── Sidebar.tsx           # Sidebar component
│       └── Topbar.tsx            # Top navigation component
├── lib/
│   └── mongodb.ts                # MongoDB connection utility
├── models/
│   └── Resume.ts                 # Resume Mongoose schema
├── public/                       # Static assets
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── eslint.config.mjs             # ESLint configuration
└── postcss.config.mjs            # PostCSS configuration
```

## 📦 Dependencies

**Production:**
- `next` 16.1.6 — React framework
- `react` 19.2.3 — UI library
- `react-dom` 19.2.3 — React DOM
- `mongoose` ^9.2.3 — MongoDB object modeling

**Development:**
- `typescript` ^5 — Type safety
- `tailwindcss` ^4 — Utility-first CSS
- `@tailwindcss/postcss` ^4 — Tailwind PostCSS plugin
- `eslint` ^9 — Code linting
- `eslint-config-next` 16.1.6 — Next.js ESLint config

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud Atlas)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env.local` in the project root:
```env
MONGODB_URI=mongodb://localhost:27017/resumecraft
# For MongoDB Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resumecraft
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

1. **Resume Builder**: Users fill in their resume information in the form (left panel)
2. **Live Preview**: Information updates in real-time in the preview panel (right side)
3. **Save to Database**: Click "Save Resume" button to persist data to MongoDB
4. **API Processing**: Backend validates data and stores in `resumes` collection with timestamps

## 🛠️ Next Steps (Suggested)

- [ ] Implement resume retrieval functionality (GET endpoint)
- [ ] Add resume editing capability
- [ ] Implement resume deletion
- [ ] Add authentication/user management
- [ ] Create resume template selection UI
- [ ] Add PDF export functionality
- [ ] Implement Dashboard with saved resumes list
- [ ] Add form validation and error messages
- [ ] Enhance styling and UX with animations
- [ ] Add more resume fields (education, skills, certifications, etc.)

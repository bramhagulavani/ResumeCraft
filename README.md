# ResumeCraft

ResumeCraft is a Next.js application (App Router) for building a resume/CV builder with real-time preview and database persistence. It combines an intuitive form interface with a live preview section, MongoDB backend storage, and a dashboard for managing saved resumes.

## ✅ Status — What's Completed

### 1. **Basic Project Structure**
- ✅ Project initialized with Next.js App Router and TypeScript
- ✅ Directory structure organized for scalability
- ✅ Global styling configured with Tailwind CSS and PostCSS
- ✅ TypeScript, ESLint, and Tailwind CSS configured

### 2. **Basic Application Pages**
- ✅ **Resume Builder Page** (`app/builder/page.tsx`) — Main form-based resume creation interface
- ✅ **Dashboard Page** (`app/dashboard/page.tsx`) — Displays all saved resumes with card layout
- ✅ **Templates Page** (`app/templates/page.tsx`) — Templates placeholder
- ✅ **Layout Components** — Sidebar and Topbar components in `components/layout/`

### 3. **Resume Builder Page** (`app/builder/page.tsx`)
Enhanced features include:
- ✅ **Dual-panel layout**: Form input on the left, live preview on the right
- ✅ **Personal Information Section**:
  - Full Name input with validation
  - Email input with validation
  - Professional Summary textarea
- ✅ **Experience Management**:
  - Dynamic experience entries with Company, Role, and Description fields
  - Add multiple experiences with "+ Add Experience" button
  - Remove experience entries when more than one exists
- ✅ **Live Preview Section**: Real-time display of resume content as user types
- ✅ **Save Resume Button**: 
  - Validates required fields (name & email)
  - Submits form data to backend API
  - Shows success/error alerts
  - Resets form after successful save
  - Trims whitespace from inputs

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

### 5. **API Integration - Resume Management**

#### **5.1 Resume Fetch Endpoint** (`app/api/resume/route.ts` - GET)
- ✅ Fetches all saved resumes from MongoDB
- ✅ Sorts resumes by creation date (newest first)
- ✅ Properly serializes MongoDB ObjectId to string format using `.lean()`
- ✅ Returns array of resumes with proper `_id` string conversion
- ✅ Comprehensive error handling (500 status for failures)
- ✅ Prevents ObjectId serialization issues on client side

#### **5.2 Resume Save Endpoint** (`app/api/resume/route.ts` - POST)
- ✅ POST endpoint to save resume data to MongoDB
- ✅ Connects to database before processing
- ✅ Validates and stores resume data with experience array
- ✅ Converts Mongoose ObjectId to string in response
- ✅ Returns success response with saved data (status 201)
- ✅ Comprehensive error handling with meaningful error messages
- ✅ Prevents circular reference issues with `.toObject()` + string conversion

#### **5.3 Resume Delete Endpoint** (`app/api/resume/[id]/route.ts` - DELETE)
- ✅ DELETE endpoint to remove a resume by ID
- ✅ Validates MongoDB ObjectId format before processing
- ✅ Trims whitespace from ID parameter
- ✅ Properly handles invalid IDs with 400 status
- ✅ Returns 404 if resume not found
- ✅ Returns 200 on successful deletion
- ✅ Debug logging for troubleshooting ID validation issues
- ✅ Comprehensive error handling with detailed error messages

### 6. **Dashboard Page** (`app/dashboard/page.tsx`)
New features implemented:
- ✅ **Fetch Resumes**: Automatically loads all saved resumes on page load
- ✅ **Resume Cards**: Display each resume in a styled card layout
  - Shows resume name, email, and summary preview
  - Displays creation date
  - 3-column responsive grid layout with Tailwind CSS
- ✅ **View Button**: 
  - Currently shows placeholder alert
  - Ready for future view/edit functionality
  - Attached `onClick` handler with resume ID
- ✅ **Delete Button**:
  - Confirmation dialog before deletion
  - Properly handles delete API response
  - Displays success alerts upon deletion
  - Automatically refreshes resume list after deletion
  - Shows detailed error messages if deletion fails
  - Converts ObjectId to string properly
- ✅ **Loading State**: Shows loading message while fetching resumes
- ✅ **Empty State**: Shows message when no resumes exist
- ✅ **Error Handling**: Logs and displays meaningful error messages

## 📁 Project Structure

```
resumecraft/
├── app/
│   ├── api/
│   │   ├── resume/
│   │   │   ├── route.ts          # GET (fetch all) & POST (save) endpoints
│   │   │   └── [id]/
│   │   │       └── route.ts      # DELETE endpoint for single resume
│   ├── builder/
│   │   └── page.tsx              # Resume builder form + preview
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard - list all resumes with delete
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

### Resume Creation Flow
1. **User opens Resume Builder** (`/app/builder`)
2. **Fills in resume information** with form inputs
3. **Views live preview** in real-time as they type
4. **Clicks "Save Resume"** button to persist data
5. **Form validates** required fields (name & email)
6. **API sends data to POST /api/resume**
7. **Backend saves to MongoDB** with timestamps
8. **Frontend receives confirmation** with success alert
9. **Form resets** automatically

### Resume Management Flow
1. **User opens Dashboard** (`/app/dashboard`)
2. **API fetches all resumes** from GET `/api/resume`
3. **Resumes display** in card grid layout
4. **User can View** (placeholder for future edit)
5. **User can Delete**:
   - Confirms deletion intent
   - Sends DELETE request to `/api/resume/{id}`
   - Server validates ObjectId format
   - Server deletes from MongoDB if found
   - Dashboard refreshes automatically on success
   - Shows error alert if deletion fails

## 🔧 Recent Changes & Improvements

### Bug Fixes
1. **ObjectId Serialization Issue** (FIXED)
   - Problem: MongoDB ObjectId objects weren't being serialized to strings
   - Solution: Used `.lean()` and explicit `.toString()` conversion
   - Impact: Delete button now receives proper string IDs

2. **Delete Endpoint Error Handling** (IMPROVED)
   - Added ObjectId validation before processing
   - Added ID trimming to handle whitespace
   - Detailed logging for debugging
   - Returns proper error messages with correct HTTP status codes

3. **Form Validation** (ADDED)
   - Name and email are now required
   - Input trimming to remove whitespace
   - Displayed error messages to user
   - Form resets after successful save

### Code Quality Improvements
1. **Error Response Parsing** - Frontend now properly checks `res.ok` before JSON parsing
2. **Console Logging** - Added detailed logging in delete endpoint for debugging
3. **Success Feedback** - Added success alerts and better error messages
4. **Code Formatting** - Fixed inconsistent indentation and spacing in components

## 🧪 Testing the Application

### Test Resume Creation
1. Go to `/app/builder`
2. Fill in Name, Email, and Summary
3. Add one or more experiences
4. Click "Save Resume"
5. Verify success alert appears
6. Check MongoDB to confirm document was created

### Test Resume Listing
1. Go to `/app/dashboard`
2. Verify all created resumes appear in card grid
3. Check that creation dates are displayed correctly

### Test Resume Deletion
1. On Dashboard, click "Delete" button for any resume
2. Confirm deletion in the popup dialog
3. Verify resume disappears from the list
4. Check MongoDB `resumes` collection to confirm deletion
5. Verify success alert appears

## 🛠️ Next Steps (Suggested)

- [ ] Implement **View/Edit Resume** functionality
  - Create route `/app/resume/[id]/page.tsx`
  - Load resume data from API
  - Allow editing of existing resume
  - Update existing record instead of creating new

- [ ] Add **resume template selection** UI
- [ ] Implement **PDF export** functionality
- [ ] Add **authentication** and **user management**
- [ ] Add form **field validation** with real-time feedback
- [ ] Implement **undo/redo** functionality
- [ ] Add **resume preview** before saving
- [ ] Enhance **styling and animations**
- [ ] Add more **resume fields**:
  - Education
  - Skills
  - Certifications
  - Languages
  - Projects

- [ ] Add **search and filter** for dashboard
- [ ] Implement **resume sharing** (via link or email)
- [ ] Add **version history** for resumes
- [ ] Implement **bulk delete** functionality

## 📚 Key Technologies Used

- **Next.js 16** - Full-stack React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling with schema validation
- **React Hooks** - useState, useEffect for component state management

## 🐛 Troubleshooting

### Delete Returns "Invalid resume ID format"
- Check that MongoDB is running and connected
- Verify the `_id` is being properly converted to string in the GET response
- Check browser console for the "Fetched resumes" log to inspect ID format
- Verify no extra whitespace or special characters in ID

### Resumes Not Appearing on Dashboard
- Ensure MongoDB URI is properly set in `.env.local`
- Check that resumes were actually saved to MongoDB using `mongosh`
- Verify the GET endpoint is returning data (check Network tab in DevTools)
- Look for error messages in browser console

### Save Resume Shows Error
- Verify name and email fields are filled
- Check that MongoDB is running
- Look for error message in the alert and console
- Ensure `MONGODB_URI` environment variable is set correctly

## 📞 Support

For issues or questions, check:
- Browser console (F12) for client-side errors
- Terminal output where `npm run dev` is running for server errors
- MongoDB logs or MongoDB Atlas UI for database issues
- Network tab (F12) to inspect API requests/responses


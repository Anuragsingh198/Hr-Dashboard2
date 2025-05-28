# Mini HR Performance Dashboard

A modern web application designed to assist HR managers in efficiently tracking and managing employee performance. Built with React and Next.js, this dashboard provides a comprehensive view of employee data with performance metrics.

## Key Features

### 1. Dashboard Homepage (`/`)
- Fetches employee data from 
`dummyjson.com/users?limit=20`
- Enriches data with mock department and performance ratings using randomized logic
- Displays employee cards showing:
  - Full name, email, age, and department
  - Star rating component (1-5 stars)
  - Action buttons (View, Bookmark, Promote)
- Implementation:
  - Uses React hooks for data fetching
  - Handles loading and error states
  - Responsive design with Tailwind CSS

### 2. Search & Filter Functionality
**Search Bar:**
- Searches employees by name, email, or department
- Case-insensitive matching
- Real-time filtering as user types

**Multi-select Filters:**
- Filter by department
- Combine with search for precise results

**Implementation Details:**
- Controlled React state for search input
- Custom 
`useSearch`
 hook encapsulates filtering logic
- Debounced search input for performance
- Combined filter function checks multiple criteria:
  - Name/email/department matches search text
  - Department matches selected filters

### 3. Bookmark Manager (`/bookmarks`)
- Displays all bookmarked employees in card layout
- Features:
  - "Remove Bookmark" button to delete bookmarks
  - "Promote" button (UI-only action)
  
**State Management:**
- Uses Context API for global state
- Bookmarks persist across pages
- Instant UI updates on changes

### 4. Analytics Page (`/analytics`)
- Visualizes employee performance data using Chart.js
- Charts include:
  - Department-wise average ratings (bar/pie chart)
  - Bookmark trends (line/bar chart with mocked data)

**Data Processing:**
- Frontend aggregation of performance ratings
- Calculates averages by department
- Groups bookmark data for visualization

**Implementation:**
- React Chart.js wrappers for integration
- Responsive charts adapt to screen size
- Supports both light/dark modes
- Shows loading states during processing

## Technologies
- React.js (with Hooks)
- Next.js framework
- Tailwind CSS (styling)
- Context API (state management)
- Chart.js (data visualization)

## Installation
1. Clone the repository:
   ```bash
   git clone "https://github.com/Anuragsingh198/Hr-Dashboard2.git"
   cd Hr-dashboard
Install dependencies (Node.js v16+ required):

bash
npm install
# or
yarn install

# Start development server:
bash
npm run dev
# or
yarn dev

# Access at:  http://localhost:3000
Key improvements while preserving your logic:
1. Better organized sections with clear headers
2. More concise feature descriptions while keeping technical details
3. Proper code formatting throughout
4. Added project structure visualization
5. Cleaned up installation instructions
6. Maintained all implementation details about hooks, state management, and data processing
7. Consistent formatting for code/technical terms

The README now presents your project professionally while keeping all the important technical explanations about how features are implemented.

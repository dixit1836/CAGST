# CAGST - GST Automation SaaS Platform

## Overview

CAGST is a comprehensive SaaS GST automation platform designed for e-commerce sellers, accountants, and businesses to automate GST return filing and reconciliation across multiple marketplaces (Amazon, Flipkart, Meesho, etc.).

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS 3
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts (lightweight SVG-based)
- **State**: React hooks (useState, useContext)

## Design System

### Color Palette
```
Primary Blue:    #2563eb (primary-600)
Primary Light:   #3b82f6 (primary-500)
Primary Dark:    #1d4ed8 (primary-700)
Success Green:   #10b981 (emerald-500)
Warning Amber:   #f59e0b (amber-500)
Error Red:       #ef4444 (red-500)
Dark BG:         #0f172a (dark-bg)
Dark Card:       #1e293b (dark-card)
Dark Border:     #334155 (dark-border)
```

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold/Extrabold
- Body: Regular/Medium
- Monospace: For GSTIN, amounts, codes

## Pages Structure

### 1. Landing Page (`/`)
**Hero Section**
- Headline: "Automate Your GST Filing & Reconciliation"
- Subtext: "Save time with smart GST tools"
- CTA: "Start Free Trial"
- Badge: "The #1 GST Automation tool for E-commerce Sellers"

**Features Grid**
- Upload Reports (Drag & Drop)
- Auto-Convert to JSON
- Smart Reconciliation
- GST Portal Sync

**Supported Platforms**
- Amazon, Flipkart, Meesho, Myntra, JioMart, Nykaa, Ajio

**How It Works**
1. Upload Reports (ZIP/Excel)
2. Auto-Convert (Parse & Structure)
3. Verify & Edit
4. Submit to Portal

**Testimonials**
- 3 user testimonials with avatars
- Star ratings

**Pricing Plans**
- Starter (Free): Manual uploads, 3 reports/month
- Professional (₹999/mo): API automation, unlimited marketplaces, Tally XML
- Enterprise (Custom): GSTR-2A reconciliation, dedicated support

**Footer**
- Company info
- Quick links
- Contact
- Social media

### 2. Login/Signup Page (`/login`)
**Features:**
- Email + Password login
- OTP-based login (Mobile)
- Toggle between Login/Signup
- Forgot password link
- Form validation

**States:**
- Default: Email/Password form
- OTP Mode: Mobile number + OTP input
- Signup: Name + Email + Password
- Loading state on submit
- Error messages

### 3. Dashboard (`/app/dashboard`)
**Overview Cards:**
- Total Reports Uploaded
- Pending Filings
- Errors Found
- Completed GST Returns
- Total Tax Assessed

**Charts:**
- Monthly GST Summary (Line chart)
- Platform Distribution (Pie chart)
- Filing Status (Bar chart)

**Quick Actions:**
- Upload Report
- Process Data
- View Reports

**Recent Activity Table:**
- Platform, File, Status, Time, Action

### 4. Upload Report Page (`/app/upload`)
**Features:**
- Drag & Drop zone
- File browser
- Platform selector (Amazon, Flipkart, Meesho)
- Month/Quarter selector
- File type support: .xlsx, .zip, .csv

**Processing States:**
- Idle: Upload zone visible
- Processing: Progress animation
- Success: Confirmation with record count
- Error: Error message with retry

**Quick Actions:**
- Amazon Monthly (MTR & B2B)
- Meesho Settlement
- Flipkart Sales

**Options Panel:**
- Auto-detect platform
- Strict validation toggle
- Custom field mapping

### 5. Reports Page (`/app/reports`)
**Features:**
- Search functionality
- Filter by platform, status, date
- Sortable columns
- Pagination
- Export list

**Report Status:**
- Pending Verification (amber)
- Approved & Filed (green)
- Data Error (red)

**Actions:**
- Download JSON
- View details
- Reprocess
- Delete

### 6. Verification Panel (`/app/verification`)
**Features:**
- Batch scan summary
- Detailed data grid
- Inline editing
- Error highlighting
- B2B/B2C toggle
- OTP approval for overrides

**Data Fields:**
- Order ID
- GSTIN
- Amount
- Tax Amount
- Match Status

**Actions:**
- Update/correct data
- Approve via OTP
- Reject record

### 7. Reconciliation Page (`/app/reconciliation`)
**Features:**
- GSTR-2A/2B toggle
- Books vs Portal comparison
- Auto-match functionality
- Missing invoice detection

**Summary Stats:**
- Matched (green)
- Mismatched (red)
- Missing in Portal (amber)
- Missing in Books (indigo)

**Actions:**
- Export reconciliation report
- Run auto-match
- Email vendors for missing data

### 8. GST Portal Sync (`/app/gst-portal`)
**Workflow:**
1. Login (GST Portal credentials)
2. Upload JSON
3. Email OTP verification
4. Success with ARN

**Features:**
- Progress stepper
- JSON preview
- OTP input (6 digits)
- Acknowledgement receipt
- Download receipt option

### 9. Additional Pages
- **API Sync** (`/app/integrations`): Connect marketplace APIs
- **Bank Statement AI** (`/app/bank-ai`): AI-powered bank statement parsing
- **Tally Export** (`/app/tally-export`): Export to Tally
- **Invoices** (`/app/invoices`): Invoice management
- **Clients** (`/app/clients`): Client management for accountants
- **Team** (`/app/team`): Team roles and permissions
- **Settings** (`/app/settings`): System configuration

## Core Features

### Multi-Platform Support
- Amazon India
- Flipkart
- Meesho
- Myntra
- JioMart
- Nykaa
- Ajio

### Data Processing
```javascript
// Extracted JSON format
{
  invoice_number: "",
  gstin: "",
  taxable_value: "",
  cgst: "",
  sgst: "",
  igst: "",
  date: "",
  platform: "",
  order_id: ""
}
```

### Smart Error Detection
- Invalid GSTIN format
- Missing GSTIN
- Tax amount mismatch
- Zero amount anomaly
- Duplicate invoices

### OTP Verification
- Mobile OTP for login
- Email OTP for sensitive actions
- 6-digit code format

### File Processing
- ZIP extraction
- Excel parsing
- JSON conversion
- Data validation

## UI Components

### Buttons
- `.btn-primary`: Blue gradient, shadow
- `.btn-secondary`: White/bordered
- States: hover, active, disabled, loading

### Cards
- `.card`: White background, rounded corners, shadow
- Dark mode support

### Forms
- `.input-field`: Full width, rounded, focus ring
- Select dropdowns
- Checkboxes
- Radio buttons

### Tables
- Hover effects
- Alternating row colors
- Sortable headers
- Pagination controls

### Modals
- Backdrop blur
- Centered content
- Close button
- Action buttons

### Status Badges
- Success (green)
- Warning (amber)
- Error (red)
- Info (blue)

### Progress Indicators
- Spinner animation
- Progress bar
- Stepper component

## Workflow Logic

```
Upload Report → Extract Data → Convert JSON → Reconcile → Verify → Generate GST → File → Download
```

1. **Upload**: Drag/drop or browse files
2. **Extract**: Parse ZIP/Excel files
3. **Convert**: Transform to standard JSON
4. **Reconcile**: Match with GST portal data
5. **Verify**: Manual review and corrections
6. **Generate**: Create GSTR-1 JSON
7. **File**: Upload to GST portal
8. **Download**: Export final reports

## Dark Mode

Full dark mode support with:
- CSS custom properties
- Tailwind dark: variant
- System preference detection
- Manual toggle

## Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Collapsible sidebar
- Responsive tables
- Touch-friendly interfaces

## Animations

- Framer Motion for page transitions
- CSS transitions for hover effects
- Loading spinners
- Progress bars
- Toast notifications

## Security

- Form validation
- XSS prevention (React)
- Secure password handling
- OTP verification
- Session management

## Performance

- Lazy loading routes
- Code splitting
- Image optimization
- Efficient re-renders
- Memoization where needed

## Future Enhancements

- Real API integration
- Multi-user roles (Admin, Accountant, Client)
- Bulk operations
- Advanced analytics
- Mobile app
- GST returns calculator
- Tax calendar
- Reminder notifications

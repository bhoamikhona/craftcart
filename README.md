# CraftCart

A full-stack e-commerce marketplace platform for handmade and craft products, built with Next.js, React, Tailwind CSS, and Supabase.

## Live Demo

[craftcart.vercel.app](https://craftcart.vercel.app)

## Features

**Marketplace**

- Browse 20+ craft products with dynamic filtering by category, price range, and availability
- Sort by price (low to high, high to low), popularity, and latest
- Paginated product listings with real-time filter updates

**Product Pages**

- Detailed product view with image gallery
- Related products and category browsing

**Shopping**

- Add to cart, update quantities, remove items
- Saved/wishlist functionality
- Authenticated checkout flow with order placement
- Order history with itemized order details

**Creator Studio**

- Tabbed video upload interface (Details, Products, Steps)
- Browser-based video and thumbnail upload to Supabase Storage with timeout handling
- Link marketplace products to tutorial videos
- Live preview of video before publishing

**Video Tutorials**

- Video player with creator profile, follower count, like/dislike, share, and save
- Step-by-step instructions displayed alongside the video
- View count tracking per video

**Authentication**

- Register, login, and logout with NextAuth.js
- JWT session handling with protected routes
- User profile and settings management

## Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| Framework     | Next.js 16 (App Router)           |
| Frontend      | React 19, Tailwind CSS 4          |
| Backend       | Next.js API Routes                |
| Database      | Supabase (PostgreSQL)             |
| Storage       | Supabase Storage                  |
| Auth          | NextAuth.js with bcrypt           |
| UI Components | Radix UI, Lucide React, Heroicons |
| Carousel      | Embla Carousel                    |
| Notifications | React Hot Toast                   |

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project

### Installation

```bash
git clone https://github.com/bhoamikhona/craftcart.git
cd craftcart
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, register, logout
│   └── (main)/          # Marketplace, shop, cart, checkout,
│                        # orders, studio, videos, profile, settings
├── components/
│   ├── layout/          # Container, navigation
│   ├── marketplace/     # ProductCard, SidebarFilter
│   ├── studio/          # Tabs, Preview, DetailsTab, ProductsTab, StepsTab
│   ├── video/           # VideoPlayer, Steps
│   └── ui/              # Shared UI components
├── data/                # Mock product and video data
└── lib/                 # Supabase client, auth config
```

## Author

Bhoami Khona — [bhoamikkhona.vercel.app](https://bhoamikkhona.vercel.app)

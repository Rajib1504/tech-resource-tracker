# DevVault 🚀

**The operating system for your tech resources.**

DevVault (Tech Resource Tracker) is a modern, developer-centric platform built to organize, store, and discover your code snippets, API documentation links, architecture diagrams, and tech articles. Stop losing links in Slack—save them in your vault.

![DevVault Hero](https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop)

## ✨ Features

- 🔐 **Secure Authentication:** JWT-based custom authentication system with hashed passwords.
- 🔗 **Rich Link Previews:** Automatically scrapes `og:image` and metadata from any URL you save using Cheerio.
- 💻 **Code Snippets:** Store and organize raw code snippets alongside your URLs.
- 📁 **Smart Categorization:** Organize your vault with custom, globally shared categories.
- 🌍 **Public Feed:** Share your knowledge with the community via the live public resource feed.
- 🎨 **Premium UI/UX:** Built with a stunning Neo-brutalist aesthetic using Tailwind CSS, Framer Motion, and Shadcn UI.
- 📱 **Fully Responsive:** Flawless experience across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & Base UI
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Web Scraping:** Cheerio (for rich link previews)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [Bun](https://bun.sh/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/tech-resource-tracker.git
cd tech-resource-tracker
```

### 2. Install dependencies
```bash
bun install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of your project and add the following keys:
```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
JWT_SECRET="your_super_secret_jwt_key_here"
```

### 4. Initialize the Database
Push the Prisma schema to your PostgreSQL database and generate the TypeScript client:
```bash
bunx prisma db push
bunx prisma generate
```

### 5. Start the Development Server
```bash
bun dev
```
Navigate to `http://localhost:3000` to see your app running!

## 📦 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).
The `package.json` includes a custom `postinstall: "prisma generate"` script to automatically generate your database client in Vercel's build environment.

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Add your `DATABASE_URL` and `JWT_SECRET` to the Vercel Environment Variables.
4. Click **Deploy**.

## 📄 License
This project is open-source and available under the MIT License.

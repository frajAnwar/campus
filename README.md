# 🎓 Campus

Campus is a unified student community platform that replaces the fragmented chaos of academic digital life. Instead of bouncing between WhatsApp for class groups, Google Classroom for assignments, GitHub for projects, LinkedIn for portfolios, Discord for community, and Google Forms for event registration — Campus integrates all of these into **one coherent, beautiful, and deeply integrated experience.**

The core idea is simple: **a student's entire academic identity lives in one place.** Classes, projects, forum contributions, club memberships, achievements, and portfolios are all connected and communicate with each other seamlessly.

---

## 🚀 Features

### 👥 Role-Based Architecture
Campus provides tailored experiences depending on user roles:
- **Students**: Access to classes, gamified progress, forums, projects, and clubs.
- **Educators**: Dedicated portals to create courses, manage students, grade submissions, and view class analytics.
- **Administrators**: Hardcore dashboards to monitor platform health, approve club/role requests, and moderate content.

### 🎮 Gamification Engine
Incentivize deep academic engagement:
- **XP & Levels**: Earn XP for attending classes, submitting assignments early, answering forum questions, and contributing to projects.
- **Ranks**: Progress through ranks (Novice, Scholar, Elite, Legend, etc.) with progressive unlocking of privileges.
- **Streaks**: Maintain study streaks with the built-in Pomodoro Study Timer.
- **Badges**: Unlock visual achievements for milestones like "First Pull Request" or "Top Answerer."

### 📚 Virtual Classrooms
- **Course Management**: Educators can create rich course pages, upload resources, and manage student enrollment.
- **Assignments**: Built-in assignment submissions, grading pipelines, and deadline tracking.
- **Live Class Chat**: Dedicated real-time discussion channels for every class.

### 💬 Integrated Academic Forum
- **AI Summaries**: Long discussion threads are automatically summarized by AI so students can catch up quickly.
- **Upvoting & Reputation**: StackOverflow-style upvoting for answers, rewarding helpful students with reputation points.
- **Smart Tags**: Auto-categorization of questions by course, technology, or topic.

### 🛠 Project Portfolios
- **Showcase**: Students can upload their projects, link GitHub repositories, and add tech-stack tags.
- **Peer Reviews**: Integrated code and project review system where students can critique each other's work for extra XP.
- **Discoverability**: Trending algorithm highlights top projects across the university ecosystem.

### 🏛 Club & Event Management
- **Official Clubs**: Students can request to create or join official university clubs.
- **Event Registrations**: Built-in RSVP system for club events, workshops, and hackathons.
- **Dedicated Hubs**: Each club gets a private feed, resource area, and member directory.

---

## 💻 Tech Stack

Campus is built with modern, cutting-edge web technologies:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Database**: [Neon PostgreSQL](https://neon.tech/) (Serverless Postgres)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js (v5)](https://authjs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🛠 Local Setup & Development

### 1. Clone the repository
```bash
git clone https://github.com/frajAnwar/campus.git
cd campus
```

### 2. Install dependencies
```bash
npm install
# or yarn install / pnpm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following variables:
```env
# Database
DATABASE_URL="postgresql://username:password@your-neon-host/dbname?sslmode=require"

# NextAuth
AUTH_SECRET="your-super-secret-auth-key-generate-with-openssl"
NEXTAUTH_URL="http://localhost:3000"

# (Optional) Third-Party Integrations
RESEND_API_KEY="your-resend-key"
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
```

### 4. Database Setup
Push the schema to your Neon PostgreSQL database and seed the demo accounts:
```bash
npx prisma db push
npx prisma db seed
```
*Note: The seed script will generate default Admin, Educator, and Student accounts.*

### 5. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to see the application running.

---

## 🔑 Demo Accounts

If you have seeded the database, you can log in immediately with the following demo credentials (all passwords are `password123`):

| Role | Email |
| :--- | :--- |
| **Admin** | `admin@campus.com` |
| **Educator** | `prof.smith@campus.com` |
| **Student** | `john.doe@campus.com` |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the platform, please fork the repository and create a pull request. Make sure your code adheres to the existing styling and ESLint rules.

---

**Campus — Your Academic Life, Unified.**

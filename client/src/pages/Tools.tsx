import { ToolLayout } from "@/components/tools/ToolLayout";

export function PRDGenerator() {
  return (
    <ToolLayout 
      title="Describe Your Product Idea"
      description="Share your rough product concept and let AI transform it into a structured PRD with user stories and acceptance criteria."
      placeholder="Describe your product idea in detail. What problem does it solve? Who is it for? What are the key features you're envisioning?"
      actionLabel="Generate PRD"
      apiEndpoint="/api/prds/generate"
      isPrd={true}
      inputLabel="Your Product Idea"
      templates={[
        { icon: "☁️", title: "SaaS Product", description: "A project management SaaS platform for small design agencies that helps them...", idea: "A project management SaaS platform for small design agencies that helps them track client projects, manage feedback rounds, and handle invoicing in one place" },
        { icon: "📱", title: "Mobile App", description: "A mobile fitness app that creates personalized workout plans based on...", idea: "A mobile fitness app that creates personalized workout plans based on user goals, available equipment, and time constraints, with progress tracking and social features" },
      ]}
      inspirations={[
        "A mobile app that helps remote teams stay connected through virtual coffee breaks",
        "An AI tool that analyzes customer support tickets to identify recurring issues",
        "A platform that connects freelance designers with startups for short-term projects",
      ]}
    />
  );
}

export function UserStories() {
  return (
    <ToolLayout 
      title="Generate User Stories"
      description="Convert feature lists into detailed user stories with acceptance criteria, ready for your backlog."
      placeholder="List the features you want to build (e.g., 'User authentication with social login, Photo upload with compression, GPS tracking for walks')..."
      actionLabel="Generate Stories"
      apiEndpoint="/api/tools/user-stories/generate"
      inputLabel="Your Feature List"
      templates={[
        { icon: "🛒", title: "E-commerce", description: "Shopping cart, checkout flow, product reviews, and wishlists...", idea: "Shopping cart with multi-item support, guest checkout, Stripe payments, product reviews with photos, and wishlist functionality" },
        { icon: "💬", title: "Chat App", description: "Real-time messaging, group chats, file sharing, and notifications...", idea: "Real-time messaging with read receipts, group chats up to 50 people, file and image sharing, push notifications, and message search" },
      ]}
      inspirations={[
        "User onboarding flow with email verification, profile setup, and tutorial walkthrough",
        "Dashboard with real-time analytics, custom date ranges, and exportable reports",
        "Multi-tenant system with role-based access control and team management",
      ]}
    />
  );
}

export function ProblemRefiner() {
  return (
    <ToolLayout 
      title="Refine Your Problem Statement"
      description="Turn messy problem descriptions into clear, actionable problem statements with defined scope."
      placeholder="Describe the problem you are solving (e.g., 'People have trouble remembering their passwords and keeping them secure')..."
      actionLabel="Refine Problem"
      apiEndpoint="/api/tools/refine-problem/generate"
      inputLabel="Your Problem Statement"
      templates={[
        { icon: "🏥", title: "Healthcare", description: "Patients struggle to manage appointments across multiple providers...", idea: "Patients with chronic conditions struggle to manage appointments, medications, and test results across multiple healthcare providers, leading to missed doses and conflicting treatments" },
        { icon: "🎓", title: "Education", description: "Online students feel isolated and lack engagement compared to...", idea: "Online university students feel isolated and lack the peer-to-peer engagement that in-person classes provide, leading to higher dropout rates and lower course satisfaction" },
      ]}
      inspirations={[
        "Small business owners spend too much time on bookkeeping and invoicing instead of growing their business",
        "Remote workers find it hard to maintain work-life balance without physical separation between office and home",
        "First-time homebuyers are overwhelmed by the mortgage process and often make uninformed decisions",
      ]}
    />
  );
}

export function FeaturePrioritizer() {
  return (
    <ToolLayout 
      title="Prioritize Your Features"
      description="Score and rank features using the RICE framework (Reach, Impact, Confidence, Effort) to decide what to build next."
      placeholder="List the features to prioritize (e.g., 'Dark mode, Push notifications, Social sharing, In-app payments, User profiles')..."
      actionLabel="Prioritize Features"
      apiEndpoint="/api/tools/prioritize-features/generate"
      inputLabel="Your Feature List"
      templates={[
        { icon: "📊", title: "Analytics Platform", description: "Custom dashboards, real-time alerts, data export, API access...", idea: "Custom dashboards, real-time email alerts, CSV/PDF data export, REST API access, team collaboration tools, white-label branding, SSO integration" },
        { icon: "🎯", title: "Marketing Tool", description: "Email campaigns, A/B testing, landing pages, CRM integration...", idea: "Email campaign builder, A/B testing for subject lines, drag-and-drop landing pages, CRM integration, social media scheduling, analytics dashboard" },
      ]}
      inspirations={[
        "Dark mode, push notifications, social sharing, in-app payments, user profiles, search functionality",
        "Two-factor auth, activity feed, file attachments, calendar integration, mobile app, offline mode",
        "Reporting dashboard, team workspaces, API webhooks, custom branding, audit logs, bulk import",
      ]}
    />
  );
}

export function SprintPlanner() {
  return (
    <ToolLayout 
      title="Plan Your Sprint"
      description="Generate a structured sprint plan with task breakdowns, story points, and risk assessments from your backlog."
      placeholder="Paste your backlog items here (e.g., 'Implement user login, Build dashboard, Set up CI/CD pipeline, Create API documentation')..."
      actionLabel="Plan Sprint"
      apiEndpoint="/api/tools/plan-sprint/generate"
      inputLabel="Your Backlog Items"
      templates={[
        { icon: "🚀", title: "MVP Launch", description: "Core features for first release: auth, main flow, basic admin...", idea: "User registration and login, core product workflow (create, edit, delete), basic admin panel, payment integration, email notifications, landing page" },
        { icon: "🔧", title: "Tech Debt Sprint", description: "Database optimization, test coverage, dependency updates...", idea: "Migrate database to new schema, increase test coverage to 80%, update all deprecated dependencies, refactor authentication module, set up monitoring and alerting" },
      ]}
      inspirations={[
        "Implement user login, build dashboard, set up CI/CD pipeline, create API documentation, add error monitoring",
        "Design system setup, component library, accessibility audit, performance optimization, documentation site",
        "Payment flow redesign, subscription management, invoice generation, refund handling, billing history",
      ]}
    />
  );
}

export function InterviewPrep() {
  return (
    <ToolLayout 
      title="Prepare for PM Interviews"
      description="Practice with AI-generated PM interview questions and structured model answers for your domain."
      placeholder="Enter the product domain or specific question you want to practice (e.g., 'E-commerce marketplace for handmade goods')..."
      actionLabel="Get Questions"
      apiEndpoint="/api/tools/interview-prep/generate"
      inputLabel="Product Domain or Topic"
      templates={[
        { icon: "🏦", title: "Fintech", description: "Mobile banking, payments, lending, and investment platforms...", idea: "Consumer fintech app for millennials that combines budgeting, investing, and peer-to-peer payments in one platform" },
        { icon: "🏠", title: "Marketplace", description: "Two-sided marketplaces, matching algorithms, trust and safety...", idea: "Two-sided marketplace for home services connecting homeowners with vetted local contractors for renovation projects" },
      ]}
      inspirations={[
        "B2B SaaS product for enterprise resource planning in manufacturing",
        "Consumer health and wellness app with wearable device integration",
        "Social media platform focused on professional networking for creative industries",
      ]}
    />
  );
}

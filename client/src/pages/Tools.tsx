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
        { icon: "🧠", title: "AI Assistant", description: "An AI-powered personal productivity assistant that learns your work habits and...", idea: "An AI-powered personal productivity assistant that learns your work habits, auto-prioritizes tasks, blocks distracting websites during focus time, and suggests optimal meeting schedules based on energy levels" },
        { icon: "🌱", title: "Sustainability Tracker", description: "A carbon footprint tracking app for households that gamifies eco-friendly...", idea: "A carbon footprint tracking app for households that gamifies eco-friendly choices, tracks energy usage from smart home devices, suggests greener alternatives for daily purchases, and lets neighborhoods compete on sustainability goals" },
      ]}
      inspirations={[
        "A peer-to-peer skill exchange platform where professionals trade expertise instead of paying for coaching",
        "An AI-powered meal planning app that generates grocery lists based on dietary restrictions, budget, and local store deals",
        "A neighborhood safety app that crowdsources real-time alerts about road closures, outages, and local incidents",
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
        { icon: "🎮", title: "Gaming Community", description: "Tournament brackets, live streaming integration, team formation, and leaderboards...", idea: "Tournament bracket creation with seeding, Twitch/YouTube live stream embedding, team formation with role matching, global and regional leaderboards, in-app voice chat during matches" },
        { icon: "🏋️", title: "Fitness Platform", description: "Workout builder, progress photos, trainer marketplace, wearable sync...", idea: "Custom workout builder with video demos, progress photo comparison timeline, trainer marketplace with booking and reviews, Apple Watch and Fitbit sync, social workout challenges" },
      ]}
      inspirations={[
        "AI-powered resume builder with job description matching, keyword optimization, and ATS score prediction",
        "Event ticketing system with seat selection, dynamic pricing, QR code entry, and post-event surveys",
        "Pet care platform with vet appointment booking, vaccination reminders, diet tracking, and lost pet alerts",
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
        { icon: "🚗", title: "Urban Mobility", description: "Commuters in mid-size cities lack reliable last-mile transit options connecting them...", idea: "Commuters in mid-size cities lack reliable last-mile transit options connecting suburban neighborhoods to public transit hubs, resulting in car dependency, traffic congestion, and inequitable access to employment" },
        { icon: "👵", title: "Elder Care", description: "Adult children of aging parents struggle to coordinate caregiving responsibilities...", idea: "Adult children of aging parents living in different cities struggle to coordinate caregiving responsibilities, track medications, monitor health changes, and communicate with multiple healthcare providers simultaneously" },
      ]}
      inspirations={[
        "Freelancers waste hours each week switching between invoicing, contracts, time tracking, and client communication tools",
        "College students moving to new cities struggle to find safe, affordable short-term housing without getting scammed",
        "Small restaurant owners can't compete with delivery apps that charge 30% commissions and own the customer relationship",
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
        { icon: "🎵", title: "Music Collaboration", description: "Real-time jam sessions, sample library, beat marketplace, lyrics wiki...", idea: "Real-time remote jam sessions with low-latency audio, shared sample library, beat and loop marketplace, collaborative lyrics editor, AI mastering, fan voting on unreleased tracks" },
        { icon: "📚", title: "Learning Platform", description: "Spaced repetition, peer tutoring, skill trees, portfolio builder...", idea: "Spaced repetition flashcards, peer tutoring video calls, visual skill trees with badges, portfolio builder from completed projects, employer partnership job board, group study rooms" },
      ]}
      inspirations={[
        "Voice commands, collaborative playlists, podcast transcripts, offline mode, social listening activity, concert alerts",
        "AI writing assistant, version control for documents, real-time co-editing, template marketplace, analytics dashboard",
        "Geofenced notifications, AR navigation, loyalty programs, reservation system, crowd density indicators, accessibility mode",
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
        { icon: "🔐", title: "Security Hardening", description: "OAuth2 implementation, rate limiting, input sanitization, audit logging...", idea: "Implement OAuth2 with PKCE flow, add rate limiting to all API endpoints, sanitize all user inputs against XSS/SQL injection, set up comprehensive audit logging, enable 2FA for admin accounts, configure CORS policies" },
        { icon: "🌍", title: "Internationalization", description: "Multi-language support, RTL layouts, currency conversion, timezone handling...", idea: "Add i18n framework with string extraction, implement RTL layout support for Arabic/Hebrew, integrate currency conversion API, add timezone-aware scheduling, localize email templates, set up translation management workflow" },
      ]}
      inspirations={[
        "Build recommendation engine, implement A/B testing framework, migrate to microservices, add GraphQL layer, set up feature flags",
        "Design system migration, accessibility WCAG 2.1 audit, performance budget enforcement, mobile responsive overhaul, dark mode support",
        "Real-time notifications via WebSocket, email digest system, in-app messaging, push notification service, notification preferences panel",
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
        { icon: "🤖", title: "AI/ML Products", description: "Conversational AI, recommendation systems, computer vision, and autonomous tech...", idea: "AI-powered customer service platform that uses NLP to handle support tickets, routes complex issues to humans, and continuously learns from resolved cases to improve accuracy" },
        { icon: "🏥", title: "Digital Health", description: "Telemedicine, patient engagement, clinical trials, mental wellness platforms...", idea: "Digital health platform that connects patients with specialists via video consultations, manages prescriptions, integrates with wearable health monitors, and provides AI-driven symptom assessment" },
      ]}
      inspirations={[
        "Autonomous vehicle ride-sharing service for suburban and rural communities",
        "Creator economy platform helping YouTubers monetize through courses, merch, and community memberships",
        "Climate tech startup building carbon credit verification using satellite imagery and blockchain",
      ]}
    />
  );
}

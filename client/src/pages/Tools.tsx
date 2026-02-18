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
      description="Practice with AI-generated PM interview questions, STAR-format answers, and real examples. Upload your resume or paste a job description to get tailored questions."
      placeholder="Enter a product domain, paste a job description, or describe the role you're preparing for. You can also upload your resume using the Upload Doc button to get personalized questions."
      actionLabel="Get Questions"
      apiEndpoint="/api/tools/interview-prep/generate"
      inputLabel="Product Domain, Job Description, or Resume"
      inspirations={[
        "Autonomous vehicle ride-sharing service for suburban and rural communities",
        "Creator economy platform helping YouTubers monetize through courses, merch, and community memberships",
        "Climate tech startup building carbon credit verification using satellite imagery and blockchain",
      ]}
    />
  );
}

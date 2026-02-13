import { ToolLayout } from "@/components/tools/ToolLayout";

export function PRDGenerator() {
  return (
    <ToolLayout 
      title="PRD Generator"
      description="Turn a rough product idea into a comprehensive Product Requirements Document."
      placeholder="Describe your product idea in at least 20 characters (e.g., 'A mobile app for dog walkers to track routes and share photos with owners')..."
      actionLabel="Generate PRD"
      apiEndpoint="/api/prds/generate"
      isPrd={true}
    />
  );
}

export function UserStories() {
  return (
    <ToolLayout 
      title="User Story Generator"
      description="Generate detailed user stories with acceptance criteria from a feature list."
      placeholder="List the features you want to build (e.g., 'User authentication with social login, Photo upload with compression, GPS tracking for walks')..."
      actionLabel="Generate Stories"
      apiEndpoint="/api/tools/user-stories/generate"
    />
  );
}

export function ProblemRefiner() {
  return (
    <ToolLayout 
      title="Problem Refiner"
      description="Refine vague problem statements into clear, actionable definitions."
      placeholder="Describe the problem you are solving (e.g., 'People have trouble remembering their passwords and keeping them secure')..."
      actionLabel="Refine Problem"
      apiEndpoint="/api/tools/refine-problem/generate"
    />
  );
}

export function FeaturePrioritizer() {
  return (
    <ToolLayout 
      title="Feature Prioritizer"
      description="Score and rank features using the RICE framework (Reach, Impact, Confidence, Effort)."
      placeholder="List the features to prioritize (e.g., 'Dark mode, Push notifications, Social sharing, In-app payments, User profiles')..."
      actionLabel="Prioritize"
      apiEndpoint="/api/tools/prioritize-features/generate"
    />
  );
}

export function SprintPlanner() {
  return (
    <ToolLayout 
      title="Sprint Planner"
      description="Create a structured sprint plan with risk assessment from your backlog."
      placeholder="Paste your backlog items here (e.g., 'Implement user login, Build dashboard, Set up CI/CD pipeline, Create API documentation')..."
      actionLabel="Plan Sprint"
      apiEndpoint="/api/tools/plan-sprint/generate"
    />
  );
}

export function InterviewPrep() {
  return (
    <ToolLayout 
      title="Interview Prep"
      description="Practice answering common PM interview questions for your specific product domain."
      placeholder="Enter the product domain or specific question you want to practice (e.g., 'E-commerce marketplace for handmade goods')..."
      actionLabel="Get Questions"
      apiEndpoint="/api/tools/interview-prep/generate"
    />
  );
}

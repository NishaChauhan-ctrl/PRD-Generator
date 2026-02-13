import { ToolLayout } from "@/components/tools/ToolLayout";

export function PRDGenerator() {
  return (
    <ToolLayout 
      title="PRD Generator"
      description="Turn a rough product idea into a comprehensive Product Requirements Document."
      placeholder="Describe your product idea (e.g., 'A mobile app for dog walkers to track routes and share photos with owners')..."
      actionLabel="Generate PRD"
    />
  );
}

export function UserStories() {
  return (
    <ToolLayout 
      title="User Story Generator"
      description="Generate detailed user stories with acceptance criteria from a feature list."
      placeholder="List the features you want to build (e.g., 'User authentication', 'Photo upload', 'GPS tracking')..."
      actionLabel="Generate Stories"
    />
  );
}

export function ProblemRefiner() {
  return (
    <ToolLayout 
      title="Problem Refiner"
      description="Refine vague problem statements into clear, actionable definitions."
      placeholder="Describe the problem you are solving (e.g., 'People have trouble remembering their passwords')..."
      actionLabel="Refine Problem"
    />
  );
}

export function FeaturePrioritizer() {
  return (
    <ToolLayout 
      title="Feature Prioritizer"
      description="Score and rank features using the RICE framework (Reach, Impact, Confidence, Effort)."
      placeholder="List the features to prioritize..."
      actionLabel="Prioritize"
    />
  );
}

export function SprintPlanner() {
  return (
    <ToolLayout 
      title="Sprint Planner"
      description="Create a structured sprint plan with risk assessment from your backlog."
      placeholder="Paste your backlog items here..."
      actionLabel="Plan Sprint"
    />
  );
}

export function InterviewPrep() {
  return (
    <ToolLayout 
      title="Interview Prep"
      description="Practice answering common PM interview questions for your specific product domain."
      placeholder="Enter the product domain or specific question you want to practice..."
      actionLabel="Get Questions"
    />
  );
}
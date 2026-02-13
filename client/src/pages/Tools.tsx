import { ToolLayout } from "@/components/tools/ToolLayout";

// --- Mock Generators ---

const generatePRD = async (input: string) => {
  return `
# Product Requirements Document (PRD)

## 1. Problem Statement
Users currently face difficulty with: "${input.substring(0, 50)}..." because existing solutions are fragmented and manual. This leads to inefficiency and frustration in the workflow.

## 2. Target Audience
- **Primary:** Product Managers and Engineering Leads.
- **Secondary:** UX Designers and Stakeholders.

## 3. Goals & Objectives
- Reduce time-to-value by 40%.
- Improve user retention by offering a seamless experience.
- Launch MVP within Q3.

## 4. Key Features
| Feature | Priority | Description |
| :--- | :--- | :--- |
| **Smart Ingestion** | P0 | Automatically parse input to structure data. |
| **Real-time Sync** | P1 | Ensure data consistency across devices. |
| **Analytics Dashboard** | P2 | Visual insights into usage patterns. |

## 5. Success Metrics (KPIs)
- **Activation Rate:** > 25% of signups complete onboarding.
- **DAU/MAU:** Target ratio of 0.3.
- **NPS:** Score of 50+.

## 6. Assumptions & Risks
- **Assumption:** Users have access to stable internet connection.
- **Risk:** Potential dependency on third-party APIs for parsing.
`;
};

const generateUserStories = async (input: string) => {
  return `
# User Stories

## Epic: Core Functionality

### Story 1: As a user, I want to...
...${input.split(' ').slice(0, 5).join(' ')} so that I can accomplish my main goal efficiently.

**Acceptance Criteria:**
- [ ] User can locate the feature on the main dashboard.
- [ ] System returns a success message under 200ms.
- [ ] Error state is handled gracefully if input is invalid.

### Story 2: As an admin, I want to...
...manage configuration settings so that the team works in a unified environment.

**Acceptance Criteria:**
- [ ] Settings page is accessible only to users with 'Admin' role.
- [ ] Changes are logged in the audit trail.
`;
};

const generateProblemRefinement = async (input: string) => {
  return `
# Problem Refinement

**Original Input:** "${input}"

## Root Cause Analysis (5 Whys)
1. Why is this a problem? -> It creates friction.
2. Why does it create friction? -> The manual steps are error-prone.
3. Why are there manual steps? -> Lack of automation integration.

## Refined Problem Statement
"The current manual process for [Task Context] is prone to a 15% error rate, causing [Specific Impact], which results in [Business Consequence]."

## Proposed Opportunity
Automate the ingestion layer to eliminate manual entry errors and reduce processing time by 50%.
`;
};

const generatePrioritization = async (input: string) => {
  return `
# RICE Scoring Matrix

| Feature | Reach (1-10) | Impact (1-5) | Confidence (%) | Effort (1-5) | **RICE Score** |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Feature A** | 800 | 3 | 80% | 4 | **480** |
| **Feature B** | 500 | 2 | 100% | 2 | **500** |
| **Feature C** | 200 | 5 | 50% | 8 | **62** |

## Recommendation
Based on the RICE scores, **Feature B** should be prioritized first due to high confidence and low effort, despite lower reach than Feature A.
`;
};

const generateSprintPlan = async (input: string) => {
  return `
# Sprint Plan: Sprint 24

## Goal
Deliver the MVP for the core ingestion workflow.

## Sprint Backlog
- [ ] **Ticket-101:** Implement file uploader (3 pts)
- [ ] **Ticket-102:** Set up database schema (5 pts)
- [ ] **Ticket-103:** Create basic auth flow (2 pts)

## Risk Assessment
- **High Risk:** Third-party API rate limits might slow down testing.
- **Mitigation:** Implement caching for development environment.

## Capacity
- **Total Points:** 10
- **Velocity:** 12 (Healthy buffer)
`;
};

const generateInterviewQuestions = async (input: string) => {
  return `
# Interview Prep: ${input}

## Behavioral Questions
1. Tell me about a time you had to make a trade-off between speed and quality for a similar product.
2. How would you handle a stakeholder who disagrees with the roadmap for ${input}?

## Product Design Questions
1. How would you improve the engagement for ${input}?
2. Who are the non-obvious competitors for this product?

## Analytical Questions
1. If metric X dropped by 10% overnight, how would you investigate?
2. Estimate the market size for this product in the APAC region.
`;
};

// --- Components ---

export function PRDGenerator() {
  return (
    <ToolLayout 
      title="PRD Generator"
      description="Turn a rough product idea into a comprehensive Product Requirements Document."
      placeholder="Describe your product idea (e.g., 'A mobile app for dog walkers to track routes and share photos with owners')..."
      actionLabel="Generate PRD"
      onGenerate={generatePRD}
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
      onGenerate={generateUserStories}
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
      onGenerate={generateProblemRefinement}
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
      onGenerate={generatePrioritization}
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
      onGenerate={generateSprintPlan}
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
      onGenerate={generateInterviewQuestions}
    />
  );
}
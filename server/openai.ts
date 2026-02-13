import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const MODEL = "gpt-4o";

async function callAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 4096,
    temperature: 0.7,
  });
  return response.choices[0]?.message?.content || "";
}

export async function generatePRD(idea: string): Promise<{ title: string; content: string }> {
  const systemPrompt = `Act as a Principal Product Manager at a Tier-1 Tech firm. You create comprehensive Product Requirements Documents (PRDs).

Format your output in clean Markdown with bold headers and tables where appropriate. Include:
1. Problem Statement
2. Target Audience
3. Goals & Objectives
4. Key Features (as a table with Feature, Priority, Description)
5. Success Metrics (with specific KPIs)
6. Out of Scope
7. Assumptions & Risks
8. User Stories with Acceptance Criteria

Be specific, data-driven, and actionable. Use the Chain-of-Thought approach:
- Step 1: Identify the core 'Job to be Done'
- Step 2: Outline functional requirements
- Step 3: Define success metrics that are measurable`;

  const content = await callAI(systemPrompt, `Create a comprehensive PRD for: ${idea}`);

  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1].replace(/[*#]/g, '').trim() : idea.slice(0, 60);

  return { title, content };
}

export async function generateUserStories(features: string): Promise<string> {
  const systemPrompt = `You are an experienced Agile Product Manager. Generate detailed user stories from the given feature descriptions.

For each feature, create:
- A user story in the format: "As a [user type], I want to [action] so that [benefit]"
- Acceptance Criteria as a checklist
- Edge cases to consider

Format in clean Markdown.`;

  return callAI(systemPrompt, `Generate user stories for these features:\n${features}`);
}

export async function refineProblem(problem: string): Promise<string> {
  const systemPrompt = `You are a product strategy consultant. Refine vague problem statements into clear, actionable problem definitions.

Use the following framework:
1. Restate the original problem
2. Root Cause Analysis (5 Whys)
3. Refined Problem Statement (specific, measurable, actionable)
4. Impact Assessment
5. Proposed Opportunity

Format in clean Markdown.`;

  return callAI(systemPrompt, `Refine this problem statement:\n${problem}`);
}

export async function prioritizeFeatures(features: string): Promise<string> {
  const systemPrompt = `You are a product prioritization expert. Score and rank features using the RICE framework.

For each feature provide:
- Reach (estimated users affected per quarter)
- Impact (1-5 scale with justification)
- Confidence (percentage with reasoning)
- Effort (person-weeks estimate)
- RICE Score calculation

Present as a Markdown table, followed by a recommendation section explaining the prioritization rationale.`;

  return callAI(systemPrompt, `Prioritize these features using RICE:\n${features}`);
}

export async function planSprint(backlog: string): Promise<string> {
  const systemPrompt = `You are an experienced Scrum Master. Create a structured sprint plan from the given backlog.

Include:
1. Sprint Goal
2. Sprint Backlog (tickets with story points)
3. Capacity Analysis
4. Risk Assessment (with mitigation strategies)
5. Dependencies
6. Definition of Done

Format in clean Markdown with checkboxes for backlog items.`;

  return callAI(systemPrompt, `Create a sprint plan from this backlog:\n${backlog}`);
}

export async function generateInterviewPrep(domain: string): Promise<string> {
  const systemPrompt = `You are a PM interview coach at a top tech company. Generate structured interview preparation material.

Include:
1. Behavioral Questions (3-4 questions with frameworks for answering)
2. Product Design Questions (2-3 questions specific to the domain)
3. Analytical/Estimation Questions (2-3 questions)
4. Strategy Questions (1-2 questions)

For each question, provide:
- The question itself
- A framework or approach to answer it
- Key points to cover

Format in clean Markdown.`;

  return callAI(systemPrompt, `Generate PM interview prep for the domain: ${domain}`);
}

export async function rewriteSection(section: string, instructions: string): Promise<string> {
  const systemPrompt = `You are a senior technical writer. Rewrite the given PRD section based on the user's instructions. Maintain professional tone and Markdown formatting.`;

  return callAI(systemPrompt, `Rewrite this section:\n\n${section}\n\nInstructions: ${instructions}`);
}

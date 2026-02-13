import { Sidebar } from "@/components/layout/Sidebar";
import { HomePage } from "@/pages/Home";
import { 
  PRDGenerator, 
  UserStories, 
  ProblemRefiner, 
  FeaturePrioritizer, 
  SprintPlanner, 
  InterviewPrep 
} from "@/pages/Tools";
import { Switch, Route } from "wouter";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/tools/prd" component={PRDGenerator} />
          <Route path="/tools/user-stories" component={UserStories} />
          <Route path="/tools/problem-refiner" component={ProblemRefiner} />
          <Route path="/tools/prioritizer" component={FeaturePrioritizer} />
          <Route path="/tools/sprint-planner" component={SprintPlanner} />
          <Route path="/tools/interview-prep" component={InterviewPrep} />
          <Route path="/:rest*" component={HomePage} />
        </Switch>
      </main>
    </div>
  );
}

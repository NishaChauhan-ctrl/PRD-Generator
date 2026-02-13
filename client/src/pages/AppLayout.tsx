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
import gridTexture from "@/assets/grid-texture.png";
import { Switch, Route } from "wouter";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20">
      {/* Background Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0 mix-blend-overlay"
        style={{ backgroundImage: `url(${gridTexture})`, backgroundSize: '100px 100px' }}
      />
      
      {/* Sidebar */}
      <div className="relative z-10 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 bg-background/50 backdrop-blur-sm overflow-auto">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/tools/prd" component={PRDGenerator} />
          <Route path="/tools/user-stories" component={UserStories} />
          <Route path="/tools/problem-refiner" component={ProblemRefiner} />
          <Route path="/tools/prioritizer" component={FeaturePrioritizer} />
          <Route path="/tools/sprint-planner" component={SprintPlanner} />
          <Route path="/tools/interview-prep" component={InterviewPrep} />
          
          {/* Fallback to Home for now */}
          <Route path="/:rest*" component={HomePage} />
        </Switch>
      </main>
    </div>
  );
}
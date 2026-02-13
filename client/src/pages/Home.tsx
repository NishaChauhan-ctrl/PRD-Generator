import { 
  FileText, 
  ListTodo, 
  Target, 
  ArrowUpRight, 
  Calendar, 
  MessageSquare,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function HomePage() {
  const tools = [
    { 
      title: "PRD Generator", 
      desc: "Transform rough ideas into structured Product Requirement Documents.",
      icon: FileText,
      href: "/tools/prd",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    { 
      title: "User Story Generator", 
      desc: "Convert feature lists into detailed user stories with acceptance criteria.",
      icon: ListTodo,
      href: "/tools/user-stories",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    { 
      title: "Problem Refiner", 
      desc: "Turn messy problem descriptions into clear, actionable statements.",
      icon: Target,
      href: "/tools/problem-refiner",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    { 
      title: "Feature Prioritizer", 
      desc: "Evaluate and rank features using the RICE scoring framework.",
      icon: ArrowUpRight,
      href: "/tools/prioritizer",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    { 
      title: "Sprint Planner", 
      desc: "Generate sprint plans with risk assessment from your backlog.",
      icon: Calendar,
      href: "/tools/sprint-planner",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20"
    },
    { 
      title: "Interview Prep", 
      desc: "Practice with AI-generated PM interview questions and feedback.",
      icon: MessageSquare,
      href: "/tools/interview-prep",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono mb-4">
          <Sparkles size={12} />
          <span>SCOPECREEP — FINALLY, AN AI THAT EMBRACES THE INEVITABLE</span>
        </div>
        <h1 className="text-4xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
          What would you like to build today?
        </h1>
        <p className="text-muted-foreground text-lg">
          Accelerate your product workflow with our suite of intelligent tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", tool.bg)} />
            
            <div className="relative z-10">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300", tool.bg, tool.color)}>
                <tool.icon size={24} />
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-2 flex items-center gap-2">
                {tool.title}
                <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

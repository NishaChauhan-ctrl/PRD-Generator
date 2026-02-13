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
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
    },
    { 
      title: "User Story Generator", 
      desc: "Convert feature lists into detailed user stories with acceptance criteria.",
      icon: ListTodo,
      href: "/tools/user-stories",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    { 
      title: "Problem Refiner", 
      desc: "Turn messy problem descriptions into clear, actionable statements.",
      icon: Target,
      href: "/tools/problem-refiner",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
    { 
      title: "Feature Prioritizer", 
      desc: "Evaluate and rank features using the RICE scoring framework.",
      icon: ArrowUpRight,
      href: "/tools/prioritizer",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    { 
      title: "Sprint Planner", 
      desc: "Generate sprint plans with risk assessment from your backlog.",
      icon: Calendar,
      href: "/tools/sprint-planner",
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-pink-50 dark:bg-pink-500/10",
    },
    { 
      title: "Interview Prep", 
      desc: "Practice with AI-generated PM interview questions and feedback.",
      icon: MessageSquare,
      href: "/tools/interview-prep",
      color: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
          <Sparkles size={12} />
          <span>SCOPECREEP — FINALLY, AN AI THAT EMBRACES THE INEVITABLE</span>
        </div>
        <h1 className="text-3xl font-heading font-bold mb-3">
          What would you like to build today?
        </h1>
        <p className="text-muted-foreground">
          Accelerate your product workflow with our suite of intelligent tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-lg transition-all duration-200">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", tool.bg, tool.color)}>
              <tool.icon size={20} />
            </div>
            
            <h3 className="font-heading font-semibold mb-1.5 flex items-center gap-2 text-sm">
              {tool.title}
              <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-muted-foreground" />
            </h3>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  ListTodo, 
  Target, 
  ArrowUpRight, 
  Calendar, 
  MessageSquare,
  Bot,
  Settings,
  Sun,
  Moon,
  ClipboardList,
  LayoutTemplate,
  Info,
  X,
  Sparkles,
  Users,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/ThemeProvider";
import { useQuery } from "@tanstack/react-query";

interface Stats {
  totalGenerations: number;
  toolCounts: Record<string, number>;
}

export function Sidebar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showInfo, setShowInfo] = useState(false);

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    enabled: showInfo,
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowInfo(false);
    };
    if (showInfo) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [showInfo]);

  const mainTools = [
    { icon: FileText, label: "PRD Generator", href: "/tools/prd" },
    { icon: ListTodo, label: "User Story Generator", href: "/tools/user-stories" },
    { icon: Target, label: "Problem Refiner", href: "/tools/problem-refiner" },
    { icon: ArrowUpRight, label: "Feature Prioritizer", href: "/tools/prioritizer" },
    { icon: Calendar, label: "Sprint Planner", href: "/tools/sprint-planner" },
    { icon: MessageSquare, label: "Interview Prep", href: "/tools/interview-prep" },
  ];

  const toolLabels: Record<string, string> = {
    "prd": "PRD Generator",
    "user-stories": "User Stories",
    "refine-problem": "Problem Refiner",
    "prioritize-features": "Feature Prioritizer",
    "plan-sprint": "Sprint Planner",
    "interview-prep": "Interview Prep",
  };

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar h-screen flex flex-col font-sans transition-all duration-300 relative">
      {showInfo && (
        <div className="absolute inset-0 z-50 bg-sidebar flex flex-col overflow-auto">
          <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
            <h2 className="font-heading font-bold text-sm text-sidebar-foreground">About ScopeCreep</h2>
            <button
              data-testid="button-close-info"
              onClick={() => setShowInfo(false)}
              className="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 p-4 space-y-5 overflow-auto text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bot size={16} className="text-primary" />
                <span className="font-heading font-bold text-sidebar-foreground">ScopeCreep</span>
              </div>
              <p className="text-sidebar-foreground/60 text-xs italic mb-2">"Finally, an AI that embraces the inevitable."</p>
              <p className="text-sidebar-foreground/70 text-xs leading-relaxed">
                An AI-powered Product Management toolkit that transforms rough ideas into structured PRDs, user stories, sprint plans, and more.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-primary" /> What It Does
              </h3>
              <ul className="space-y-1.5 text-xs text-sidebar-foreground/70">
                <li>Generate structured PRDs from rough ideas</li>
                <li>Create user stories with acceptance criteria</li>
                <li>Refine messy problem statements</li>
                <li>Prioritize features using RICE scoring</li>
                <li>Plan sprints with risk assessment</li>
                <li>Prepare for PM interviews with STAR framework</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-2 flex items-center gap-1.5">
                <Users size={14} className="text-primary" /> Who It's For
              </h3>
              <ul className="space-y-1.5 text-xs text-sidebar-foreground/70">
                <li>Product Managers & aspiring PMs</li>
                <li>Startup founders defining products</li>
                <li>Engineering leads scoping features</li>
                <li>Anyone preparing for PM interviews</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-2 flex items-center gap-1.5">
                <BarChart3 size={14} className="text-primary" /> Usage Stats
              </h3>
              {stats ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xs font-medium text-sidebar-foreground">Total Generations</span>
                    <span className="text-sm font-bold text-primary">{stats.totalGenerations}</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(stats.toolCounts).map(([key, count]) => (
                      <div key={key} className="flex items-center justify-between px-3 py-1.5 rounded-md bg-sidebar-accent/50">
                        <span className="text-xs text-sidebar-foreground/70">{toolLabels[key] || key}</span>
                        <span className="text-xs font-mono font-semibold text-sidebar-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-sidebar-foreground/50">Loading stats...</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
          <Bot size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-base tracking-tight text-sidebar-foreground">ScopeCreep</h1>
          <p className="text-[9px] text-sidebar-foreground/50 font-mono leading-tight truncate">PM Toolkit</p>
        </div>
        <button
          data-testid="button-info"
          onClick={() => setShowInfo(true)}
          className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
        >
          <Info size={16} />
        </button>
        <button
          data-testid="button-theme-toggle"
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="flex-1 py-4 px-3 space-y-5 overflow-y-auto">
        <div>
          <div className="px-2 mb-1.5">
            <span className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest">PM Toolkit</span>
          </div>
          <Link href="/" className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 font-medium",
            location === "/" 
              ? "bg-sidebar-accent text-sidebar-primary" 
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
        </div>

        <div>
          <div className="space-y-0.5">
            {mainTools.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                location === item.href 
                  ? "bg-sidebar-accent text-sidebar-primary font-medium" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}>
                <item.icon size={16} className={cn(
                  "transition-colors",
                  location === item.href ? "text-sidebar-primary" : "text-sidebar-foreground/40"
                )} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="space-y-0.5">
            <Link href="/library/results" className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              location === "/library/results" && "bg-sidebar-accent text-sidebar-primary font-medium"
            )}>
              <ClipboardList size={16} className="text-sidebar-foreground/40" />
              <span>Tool Results</span>
            </Link>
            <Link href="/library/templates" className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              location === "/library/templates" && "bg-sidebar-accent text-sidebar-primary font-medium"
            )}>
              <LayoutTemplate size={16} className="text-sidebar-foreground/40" />
              <span>Templates</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

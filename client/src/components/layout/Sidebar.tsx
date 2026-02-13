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
  LayoutTemplate
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/ThemeProvider";

export function Sidebar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const mainTools = [
    { icon: FileText, label: "PRD Generator", href: "/tools/prd" },
    { icon: ListTodo, label: "User Story Generator", href: "/tools/user-stories" },
    { icon: Target, label: "Problem Refiner", href: "/tools/problem-refiner" },
    { icon: ArrowUpRight, label: "Feature Prioritizer", href: "/tools/prioritizer" },
    { icon: Calendar, label: "Sprint Planner", href: "/tools/sprint-planner" },
    { icon: MessageSquare, label: "Interview Prep", href: "/tools/interview-prep" },
  ];

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar h-screen flex flex-col font-sans transition-all duration-300">
      <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
          <Bot size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-base tracking-tight text-sidebar-foreground">ScopeCreep</h1>
          <p className="text-[9px] text-sidebar-foreground/50 font-mono leading-tight truncate">PM Toolkit</p>
        </div>
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

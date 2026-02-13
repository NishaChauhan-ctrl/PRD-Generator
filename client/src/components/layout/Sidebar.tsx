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
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

export function Sidebar() {
  const [location] = useLocation();

  const mainTools = [
    { icon: FileText, label: "PRD Generator", href: "/tools/prd" },
    { icon: ListTodo, label: "User Stories", href: "/tools/user-stories" },
    { icon: Target, label: "Problem Refiner", href: "/tools/problem-refiner" },
    { icon: ArrowUpRight, label: "Feature Prioritizer", href: "/tools/prioritizer" },
    { icon: Calendar, label: "Sprint Planner", href: "/tools/sprint-planner" },
    { icon: MessageSquare, label: "Interview Prep", href: "/tools/interview-prep" },
  ];

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar h-screen flex flex-col font-sans transition-all duration-300">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
          <Bot size={18} />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg tracking-tight text-sidebar-foreground">ScopeCreep</h1>
          <p className="text-[10px] text-sidebar-foreground/50 font-mono tracking-wider leading-tight">Finally, an AI that embraces the inevitable</p>
        </div>
      </div>

      <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto">
        <div className="px-3">
          <Link href="/" className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group font-medium",
            location === "/" 
              ? "bg-sidebar-accent text-primary border-l-2 border-primary" 
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Link>
        </div>

        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-xs font-mono text-sidebar-foreground/40 uppercase tracking-widest">AI Tools</span>
          </div>
          <div className="space-y-1">
            {mainTools.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group",
                location === item.href 
                  ? "bg-sidebar-accent text-primary border-l-2 border-primary" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}>
                <item.icon size={16} className={cn(
                  "transition-colors",
                  location === item.href ? "text-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-xs font-mono text-sidebar-foreground/40 uppercase tracking-widest">Library</span>
            <button className="text-sidebar-foreground/40 hover:text-primary transition-colors">
              <Plus size={12} />
            </button>
          </div>
          <div className="space-y-1">
            <Link href="/library/prds" className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              location === "/library/prds" && "bg-sidebar-accent text-primary"
            )}>
              <FileText size={16} className="opacity-50" />
              <span>Saved PRDs</span>
            </Link>
            <Link href="/library/templates" className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              location === "/library/templates" && "bg-sidebar-accent text-primary"
            )}>
              <Settings size={16} className="opacity-50" />
              <span>Templates</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Product Lead</p>
            <p className="text-[10px] text-sidebar-foreground/50 truncate">workspace@replit.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

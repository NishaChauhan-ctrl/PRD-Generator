import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Database, 
  Bot, 
  ChevronRight,
  ShieldCheck,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Command Center", href: "/" },
    { icon: Database, label: "Knowledge Base", href: "/knowledge" },
    { icon: FileText, label: "Draftboard", href: "/drafts" },
    { icon: Bot, label: "AI Agents", href: "/agents" },
    { icon: Settings, label: "Configuration", href: "/settings" },
  ];

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar h-screen flex flex-col font-sans">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border/50">
        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
          <Command size={18} />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg tracking-tight text-sidebar-foreground">PROD.INTEL</h1>
          <p className="text-[10px] text-sidebar-foreground/50 font-mono tracking-wider">V.2.0.26</p>
        </div>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-mono text-sidebar-foreground/40 uppercase tracking-widest">Workspace</div>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a className={cn(
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
              {location === item.href && (
                <ChevronRight size={14} className="ml-auto opacity-50" />
              )}
            </a>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className="bg-sidebar-accent/30 rounded-lg p-3 border border-sidebar-border/50">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-xs font-mono text-sidebar-foreground/80">SYSTEM STATUS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-sidebar-foreground/50">Context Engine: ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
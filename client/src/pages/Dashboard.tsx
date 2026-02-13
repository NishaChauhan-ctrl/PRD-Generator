import { Sidebar } from "@/components/layout/Sidebar";
import { KnowledgeBase } from "@/components/dashboard/KnowledgeBase";
import { Draftboard } from "@/components/dashboard/Draftboard";
import gridTexture from "@/assets/grid-texture.png";

export default function Dashboard() {
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
      <main className="relative z-10 flex-1 flex flex-col min-w-0 bg-background/50 backdrop-blur-sm">
        {/* Top Bar */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium">
              PROJECT: 2026_REWRITE
            </div>
            <div className="h-4 w-[1px] bg-border" />
            <span className="text-sm text-muted-foreground font-mono">Template: Lean PRD</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground text-right hidden md:block">
              <div className="font-mono text-foreground">API CONNECTED</div>
              <div className="text-[10px] opacity-70">Latency: 42ms</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent border border-white/10 shadow-lg shadow-primary/20" />
          </div>
        </header>

        {/* Workspace Grid */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="grid grid-cols-12 gap-6 h-full max-w-[1600px] mx-auto">
            {/* Left Col: Knowledge Base */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3 h-full">
              <KnowledgeBase />
            </div>

            {/* Right Col: Editor */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-9 h-full glass-panel rounded-lg p-6 border-t border-white/5">
              <Draftboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
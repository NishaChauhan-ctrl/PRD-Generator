import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EditorSection } from "./EditorSection";
import { Button } from "@/components/ui/button";
import { Play, Share2, Save } from "lucide-react";

export function Draftboard() {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Draftboard</h2>
          <p className="text-sm text-muted-foreground">Modular Intelligence Workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2 bg-transparent border-border hover:bg-muted text-muted-foreground">
            <Save size={14} />
            <span className="text-xs">Auto-saved</span>
          </Button>
          <Button size="sm" className="h-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Share2 size={14} />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="draft" className="flex-1 flex flex-col">
        <div className="flex items-center justify-between border-b border-border/50 mb-4">
          <TabsList className="bg-transparent h-auto p-0 gap-6">
            <TabsTrigger 
              value="draft" 
              className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none px-1 py-3 font-medium text-muted-foreground hover:text-foreground/80 transition-colors"
            >
              Current Draft
            </TabsTrigger>
            <TabsTrigger 
              value="critique" 
              className="bg-transparent border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:text-foreground data-[state=active]:shadow-none rounded-none px-1 py-3 font-medium text-muted-foreground hover:text-foreground/80 transition-colors"
            >
              AI Critique
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="draft" className="flex-1 overflow-auto pr-2 pb-10 space-y-6 mt-0">
          <EditorSection 
            title="1. Job to be Done" 
            placeholder="Define the core user problem..." 
          />
          <EditorSection 
            title="2. Functional Requirements" 
            placeholder="List the key capabilities required..." 
          />
          <EditorSection 
            title="3. Success Metrics (KPIs)" 
            placeholder="Define measurable success criteria..." 
          />
          <div className="flex justify-center pt-8">
            <Button variant="outline" className="gap-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/50">
               + Add Custom Section
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="critique" className="mt-0 h-full flex items-center justify-center text-muted-foreground">
           <div className="text-center space-y-2">
             <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
               <BotIcon className="opacity-50" />
             </div>
             <p>Critique Agent is awaiting draft completion...</p>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
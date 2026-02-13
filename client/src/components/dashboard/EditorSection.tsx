import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RefreshCw, Sparkles, AlertTriangle, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SectionProps {
  title: string;
  placeholder: string;
}

export function EditorSection({ title, placeholder }: SectionProps) {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mock generation delay
    setTimeout(() => {
      setContent("The user requires a seamless way to ingest PDF documentation. By 2026 standards, manual copy-pasting is obsolete. We will implement a high-fidelity parsing engine (Marker) that preserves tables and headers.");
      setIsGenerating(false);
      setShowValidation(true);
    }, 1500);
  };

  return (
    <div className="border border-border/50 bg-card/50 rounded-lg overflow-hidden group hover:border-border transition-colors">
      <div className="flex items-center justify-between p-3 border-b border-border/50 bg-muted/20">
        <h3 className="font-mono text-sm font-medium text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          {showValidation && (
             <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
               <span className="text-[10px] font-medium text-emerald-500">Validated</span>
             </div>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="min-h-[120px] bg-transparent border-0 resize-none focus-visible:ring-0 rounded-none p-4 font-sans text-sm leading-relaxed"
        />
        
        {isGenerating && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center">
            <div className="flex items-center gap-2 text-primary font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Synthesizing Context...
            </div>
          </div>
        )}
      </div>

      {showValidation && title.includes("Metrics") && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="bg-accent/5 border-t border-accent/20 p-3"
        >
           <div className="flex items-start gap-3">
             <div className="mt-0.5 text-accent"><Sparkles size={14} /></div>
             <div className="space-y-1">
               <p className="text-xs font-semibold text-accent-foreground">Confidence Score: 92/100</p>
               <p className="text-xs text-muted-foreground leading-snug">
                 Metrics follow SMART criteria. "High-fidelity parsing" is specific, but consider defining a quantitative accuracy threshold (e.g., &gt;95% character match).
               </p>
             </div>
           </div>
        </motion.div>
      )}
    </div>
  );
}
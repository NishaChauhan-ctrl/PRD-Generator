import { Upload, FileType, CheckCircle2, X, ArrowRight, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function KnowledgeBase() {
  const [files, setFiles] = useState([
    { name: "Q4_Meeting_Transcripts.pdf", size: "2.4 MB", status: "processed" },
    { name: "Competitor_Analysis_2025.docx", size: "1.1 MB", status: "processing" }
  ]);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mock upload
    setFiles(prev => [...prev, { name: "New_Upload_v1.pdf", size: "0.5 MB", status: "processing" }]);
  };

  return (
    <div className="glass-panel rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-foreground">Ingestion Layer</h2>
          <p className="text-sm text-muted-foreground">Upload MRDs, Transcripts, and Raw Context</p>
        </div>
        <div className="h-2 w-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
      </div>

      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-all duration-300 bg-muted/20",
          isDragging ? "border-primary bg-primary/5 scale-[0.99]" : "border-border hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
          <Upload size={24} />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">Drag & Drop Context Files</p>
        <p className="text-xs text-muted-foreground">PDF, DOCX, TXT (Max 50MB)</p>
      </div>

      <div className="mt-6 flex-1 overflow-auto space-y-3">
        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Active Context Context</h3>
        <AnimatePresence>
          {files.map((file, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex items-center gap-3 p-3 rounded bg-card border border-border hover:border-accent/30 transition-colors"
            >
              <div className="h-8 w-8 rounded bg-background flex items-center justify-center text-muted-foreground group-hover:text-foreground">
                <FileType size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">{file.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground font-mono">{file.size}</span>
                  {file.status === 'processing' && (
                    <span className="text-[10px] text-accent animate-pulse">Parsing...</span>
                  )}
                </div>
              </div>
              {file.status === 'processed' ? (
                <CheckCircle2 size={16} className="text-emerald-500" />
              ) : (
                <div className="h-4 w-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-6 border-t border-border/50">
        <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
          <BrainCircuit size={16} />
          <span>Synthesize & Create Draft</span>
          <ArrowRight size={16} className="ml-auto opacity-70" />
        </Button>
      </div>
    </div>
  );
}
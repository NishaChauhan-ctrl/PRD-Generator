import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2, Copy, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function ToolLayout({ 
  title, 
  description, 
  placeholder,
  actionLabel = "Generate",
  apiEndpoint,
  isPrd = false,
}: { 
  title: string; 
  description: string;
  placeholder: string;
  actionLabel?: string;
  apiEndpoint: string;
  isPrd?: boolean;
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setError("");
    setResult("");
    
    try {
      const body = isPrd ? { idea: input } : { input };
      const res = await apiRequest("POST", apiEndpoint, body);
      const data = await res.json();
      
      if (isPrd) {
        setResult(data.content);
      } else {
        setResult(data.output);
      }
      
      toast({ title: "Generated successfully" });
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="flex flex-col gap-4">
          <Card className="flex-1 p-6 bg-card/50 border-border/50 backdrop-blur-sm flex flex-col">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">1</span>
              Define your input
            </h3>
            <Textarea 
              data-testid="input-tool-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-background/50 resize-none border-border/50 focus:border-primary/50 font-mono text-sm"
            />
            {error && (
              <div className="mt-3 p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <Button 
                data-testid="button-generate"
                onClick={handleGenerate} 
                disabled={isGenerating || !input.trim()}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {isGenerating ? "Generating..." : actionLabel}
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4 h-full min-h-[400px]">
          <Card className="flex-1 p-6 bg-card/50 border-border/50 backdrop-blur-sm flex flex-col relative overflow-hidden">
            <h3 className="font-semibold mb-4 flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs border border-accent/20">2</span>
                <span>AI Result</span>
              </div>
              {result && (
                <Button data-testid="button-copy" variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0">
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </Button>
              )}
            </h3>

            <div className="flex-1 overflow-auto rounded-md bg-background/50 p-4 border border-border/30 relative">
              {result ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-invert prose-sm max-w-none font-mono whitespace-pre-wrap"
                  data-testid="text-result"
                >
                  {result}
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
                  {isGenerating ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                      <p className="text-xs font-mono">Synthesizing intelligence...</p>
                      <p className="text-[10px] font-mono mt-1 opacity-60">This may take 10-15 seconds</p>
                    </motion.div>
                  ) : (
                    <>
                      <Sparkles className="w-12 h-12 mb-2 opacity-20" />
                      <p className="text-sm">Ready to generate</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

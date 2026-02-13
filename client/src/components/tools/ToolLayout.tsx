import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Sparkles, Loader2, Copy, Check, AlertCircle, Upload, Lightbulb,
  FileDown, Pencil, Link2, LayoutTemplate, CheckCircle2, ArrowRight, FileText, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Template {
  icon: string;
  title: string;
  description: string;
  idea: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  placeholder: string;
  actionLabel?: string;
  apiEndpoint: string;
  isPrd?: boolean;
  inputLabel?: string;
  templates?: Template[];
  inspirations?: string[];
  resultsLabel?: string;
  resultsHref?: string;
  resultsCountEndpoint?: string;
}

export function ToolLayout({ 
  title, 
  description, 
  placeholder,
  actionLabel = "Generate",
  apiEndpoint,
  isPrd = false,
  inputLabel = "Your Input",
  templates = [],
  inspirations = [],
  resultsLabel,
  resultsHref,
  resultsCountEndpoint,
}: ToolLayoutProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: resultsCount } = useQuery<any[]>({
    queryKey: [resultsCountEndpoint || (isPrd ? "/api/prds" : "/api/tool-results")],
    enabled: true,
  });

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "docx" || ext === "doc") {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload/extract-text", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) {
          toast({ title: data.error || "Failed to read document", variant: "destructive" });
          return;
        }
        setInput((prev) => prev ? prev + "\n\n" + data.text : data.text);
        setUploadedFile(file.name);
        toast({ title: `Loaded "${file.name}"` });
      } catch {
        toast({ title: "Failed to upload document", variant: "destructive" });
      }
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setInput((prev) => prev ? prev + "\n\n" + text : text);
        setUploadedFile(file.name);
        toast({ title: `Loaded "${file.name}"` });
      };
      reader.readAsText(file);
    }
  };

  const clearUpload = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const features = [
    { icon: FileDown, label: "Export as PDF or Markdown" },
    { icon: Pencil, label: "Inline editing with version history" },
    { icon: Link2, label: "Shareable links" },
    { icon: LayoutTemplate, label: "Custom templates" },
  ];

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold">{title} Result</h1>
          <div className="flex items-center gap-2">
            <Button
              data-testid="button-copy"
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              data-testid="button-new"
              variant="outline"
              size="sm"
              onClick={() => { setResult(""); setInput(""); setUploadedFile(null); }}
              className="gap-2"
            >
              <Sparkles size={14} />
              New
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-mono text-sm leading-relaxed" data-testid="text-result">
            {result}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 overflow-auto">
      {templates.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold mb-4 text-center">Start with a Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((tpl, i) => (
              <button
                key={i}
                data-testid={`button-template-${i}`}
                onClick={() => setInput(tpl.idea)}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all text-left group"
              >
                <span className="text-2xl mt-0.5">{tpl.icon}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm">{tpl.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{tpl.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
            <Lightbulb size={16} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-primary">{inputLabel}</label>
            <div className="flex items-center gap-2">
              {uploadedFile && (
                <span className="text-xs text-muted-foreground flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                  <FileText size={12} />
                  {uploadedFile}
                  <button data-testid="button-clear-upload" onClick={clearUpload} className="ml-1 hover:text-foreground"><X size={12} /></button>
                </span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.csv,.json,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                data-testid="button-upload"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Upload size={14} />
                Upload Doc
              </Button>
            </div>
          </div>
          <Textarea 
            data-testid="input-tool-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[140px] bg-card resize-none border-border focus:border-primary/50 text-sm"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button 
          data-testid="button-generate"
          onClick={handleGenerate} 
          disabled={isGenerating || !input.trim()}
          className="w-full gap-2 h-12 text-base font-semibold rounded-xl"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          {isGenerating ? "Generating..." : actionLabel}
        </Button>

        <AnimatePresence>
          {isGenerating && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary" />
              <p className="text-sm text-muted-foreground">Generating your content...</p>
              <p className="text-xs text-muted-foreground/60 mt-1">This may take 10–15 seconds</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {inspirations.length > 0 && !isGenerating && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">Need inspiration? Try one of these:</p>
          <div className="space-y-2">
            {inspirations.map((idea, i) => (
              <button
                key={i}
                data-testid={`button-inspiration-${i}`}
                onClick={() => setInput(idea)}
                className="w-full text-left p-3 rounded-lg border border-border bg-card/50 hover:border-primary/40 hover:bg-card transition-all text-sm text-muted-foreground hover:text-foreground"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Link
          href={resultsHref || (isPrd ? "/library/prds" : "/library/results")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:border-primary/40 transition-all text-sm font-medium"
          data-testid="link-view-results"
        >
          <FileText size={16} />
          {resultsLabel || (isPrd ? "View Your PRDs" : "View Tool Results")}
          {resultsCount && resultsCount.length > 0 && (
            <span className="text-muted-foreground">({resultsCount.length})</span>
          )}
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="border-t border-border pt-8 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-heading font-bold">What You Can Do</h3>
          <p className="text-sm text-muted-foreground mt-1">Recently shipped features</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <feat.icon size={16} />
              </div>
              <span className="text-sm font-medium flex-1">{feat.label}</span>
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

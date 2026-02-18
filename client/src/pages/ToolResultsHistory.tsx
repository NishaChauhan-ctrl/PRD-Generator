import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ToolResult } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Eye,
  Trash2,
  FileText,
  Users,
  Target,
  BarChart3,
  CalendarDays,
  MessageSquare,
  Inbox,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const TOOL_TYPE_MAP: Record<string, { label: string; icon: typeof FileText }> = {
  "user-stories": { label: "User Stories", icon: Users },
  "refine-problem": { label: "Refine Problem", icon: Target },
  "prioritize-features": { label: "Prioritize Features", icon: BarChart3 },
  "plan-sprint": { label: "Sprint Planner", icon: CalendarDays },
  "interview-prep": { label: "Interview Prep", icon: MessageSquare },
};

function formatToolType(toolType: string) {
  return TOOL_TYPE_MAP[toolType]?.label ?? toolType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getToolIcon(toolType: string) {
  return TOOL_TYPE_MAP[toolType]?.icon ?? FileText;
}

function formatDate(date: string | Date | null | undefined) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ToolResultsHistory() {
  const [selectedResult, setSelectedResult] = useState<ToolResult | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: results = [], isLoading } = useQuery<ToolResult[]>({
    queryKey: ["/api/tool-results"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/tool-results/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tool-results"] });
      toast({ title: "Result deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete result", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" data-testid="button-back" className="rounded-full">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Tool Results History</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {results.length} {results.length === 1 ? "result" : "results"} saved
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="empty-state">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Inbox size={28} className="text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">No results yet</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Generate content using any of the AI tools and your results will appear here.
          </p>
          <Link href="/">
            <Button variant="outline" className="mt-6 gap-2" data-testid="button-go-to-tools">
              <FileText size={16} />
              Go to Tools
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((result) => {
            const Icon = getToolIcon(result.toolType);
            return (
              <Card key={result.id} data-testid={`card-result-${result.id}`} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground" data-testid={`text-tool-type-${result.id}`}>
                          {formatToolType(result.toolType)}
                        </p>
                        {result.createdAt && (
                          <p className="text-xs text-muted-foreground mt-0.5" data-testid={`text-date-${result.id}`}>
                            {formatDate(result.createdAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-preview-${result.id}`}>
                    {result.input.length > 100 ? result.input.slice(0, 100) + "…" : result.input}
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    data-testid={`button-view-${result.id}`}
                    onClick={() => setSelectedResult(result)}
                  >
                    <Eye size={14} />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                    data-testid={`button-delete-${result.id}`}
                    onClick={() => deleteMutation.mutate(result.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedResult} onOpenChange={(open) => !open && setSelectedResult(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2" data-testid="text-modal-title">
              {selectedResult && (() => {
                const Icon = getToolIcon(selectedResult.toolType);
                return <Icon size={18} className="text-primary" />;
              })()}
              {selectedResult ? formatToolType(selectedResult.toolType) : ""}
            </DialogTitle>
            {selectedResult?.createdAt && (
              <p className="text-xs text-muted-foreground">
                {formatDate(selectedResult.createdAt)}
              </p>
            )}
          </DialogHeader>
          <div className="overflow-y-auto flex-1 pr-2">
            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Input</p>
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-foreground whitespace-pre-wrap" data-testid="text-modal-input">
                {selectedResult?.input}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Output</p>
              <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed" data-testid="text-modal-output">
                {selectedResult?.output}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

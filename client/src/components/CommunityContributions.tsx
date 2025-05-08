import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { insertCodeSnippetSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { Loader2, Code, ThumbsUp, MessageSquare, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const codeSnippetSchema = insertCodeSnippetSchema.extend({
  userId: z.number().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  language: z.string().min(1, "Please select a programming language"),
  code: z.string().min(10, "Code must be at least 10 characters"),
});

type CodeSnippetFormValues = z.infer<typeof codeSnippetSchema>;

export default function CommunityContributions() {
  const [activeTab, setActiveTab] = useState("browse");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: codeSnippets = [], isLoading } = useQuery({
    queryKey: ['/api/code-snippets'],
    select: (data: any) => data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  });
  
  const form = useForm<CodeSnippetFormValues>({
    resolver: zodResolver(codeSnippetSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "",
      code: "",
    },
  });
  
  const submitMutation = useMutation({
    mutationFn: (values: CodeSnippetFormValues) => {
      return apiRequest("/api/code-snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      } as RequestInit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/code-snippets'] });
      form.reset();
      toast({
        title: "Contribution Submitted",
        description: "Your code snippet has been submitted for review.",
      });
      setActiveTab("browse");
    },
    onError: (error) => {
      toast({
        title: "Failed to submit",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: CodeSnippetFormValues) {
    submitMutation.mutate(values);
  }
  
  return (
    <section id="community" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Community Contributions</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Share your code snippets, solutions, and ideas with the community. Browse through contributions
            from others or submit your own snippets to help fellow learners.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Snippets</TabsTrigger>
            <TabsTrigger value="contribute">Contribute</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : codeSnippets.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No snippets yet</CardTitle>
                  <CardDescription>Be the first to contribute a code snippet!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-6 text-gray-500">
                    Click on the "Contribute" tab to submit your first code snippet.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={() => setActiveTab("contribute")}>
                    Contribute Now
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {codeSnippets.map((snippet: any) => (
                  <Card key={snippet.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{snippet.title}</CardTitle>
                          <CardDescription className="mt-1">
                            <div className="flex items-center gap-2">
                              <User size={14} /> 
                              <span>{snippet.username || "Anonymous"}</span>
                              <span className="text-gray-400">•</span> 
                              <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge variant={snippet.approved ? "default" : "outline"}>
                          {snippet.approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{snippet.description}</p>
                      <div className="relative">
                        <Badge className="absolute top-2 right-2" variant="secondary">
                          {snippet.language}
                        </Badge>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                          <code className="text-sm">{snippet.code}</code>
                        </pre>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50 flex justify-between">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <ThumbsUp size={16} />
                          <span>{Math.floor(Math.random() * 20)}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          <span>{Math.floor(Math.random() * 5)}</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Code size={16} />
                        Try in CodeLab
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="contribute">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Code Snippet</CardTitle>
                <CardDescription>
                  Share your code with the community. All submissions will be reviewed before being published.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Quick Sort Implementation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Briefly describe what your code does and why it's useful..." 
                              {...field} 
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Programming Language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="java">Java</SelectItem>
                              <SelectItem value="c++">C++</SelectItem>
                              <SelectItem value="sql">SQL</SelectItem>
                              <SelectItem value="r">R</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code Snippet</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Paste your code here..." 
                              {...field} 
                              className="font-mono text-sm"
                              rows={10}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={submitMutation.isPending}
                        className="gap-2"
                      >
                        {submitMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        Submit Contribution
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Trophy, Clock, BarChart3, CheckCircle, XCircle, Code2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type TestResult = {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  message?: string;
};

export default function CodeChallenge() {
  const [code, setCode] = useState("");
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ['/api/code-challenges'],
  }) as { data: any[]; isLoading: boolean };
  
  const { data: leaderboard = [] } = useQuery({
    queryKey: ['/api/code-challenges/leaderboard'],
  }) as { data: any[]; isLoading: boolean };
  
  const runMutation = useMutation({
    mutationFn: async (payload: { challengeId: number; code: string }) => {
      setIsRunning(true);
      setTestResults([]);
      setExecutionTime(null);
      
      const response = await apiRequest(`/api/code-challenges/${payload.challengeId}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: payload.code })
      } as RequestInit);
      
      return response;
    },
    onSuccess: (data: any) => {
      setTestResults(data.testResults || []);
      setExecutionTime(data.executionTime || null);
      
      const allPassed = data.testResults?.every((result: TestResult) => result.passed) || false;
      if (allPassed) {
        toast({
          title: "Challenge Completed!",
          description: "Congratulations! You've successfully solved the challenge.",
        });
        
        // After a successful run, refresh the leaderboard
        queryClient.invalidateQueries({ queryKey: ['/api/code-challenges/leaderboard'] });
      }
    },
    onError: (error) => {
      toast({
        title: "Error Running Code",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsRunning(false);
    }
  });
  
  // This function would be called when a challenge is selected
  const selectChallenge = (challenge: any) => {
    setActiveChallenge(challenge.id);
    setCode(challenge.startCode || '');
    setTestResults([]);
    setExecutionTime(null);
  };
  
  // This would be called to run the code against the active challenge
  const runCode = () => {
    if (activeChallenge === null) {
      toast({
        title: "No Challenge Selected",
        description: "Please select a challenge first",
        variant: "destructive",
      });
      return;
    }
    
    runMutation.mutate({ challengeId: activeChallenge, code });
  };

  // For now, we'll use a placeholder challenge until we implement the backend
  const mockChallenge = {
    id: 1,
    title: "Find Maximum Subarray Sum",
    description: `
    Given an array of integers, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
    
    Example:
    Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    Output: 6
    Explanation: [4, -1, 2, 1] has the largest sum = 6.
    
    Constraints:
    - The array will have at least one element.
    - The array length will not exceed x10^4.
    `,
    difficulty: "Medium",
    startCode: `def max_subarray(nums):
    # Your code here
    pass

# Example test case
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = max_subarray(nums)
print(result)  # Should print 6
`,
    language: "python",
  };

  // Mock test results in case the backend is not implemented
  const mockTestResults = [
    {
      passed: true,
      input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      expected: "6",
      actual: "6",
    },
    {
      passed: true,
      input: "[1]",
      expected: "1",
      actual: "1",
    },
    {
      passed: false,
      input: "[-1]",
      expected: "-1",
      actual: "0",
      message: "When the array contains only negative numbers, your function should return the largest number (least negative).",
    },
  ];

  // Use the actual data if available, otherwise fallback to mock data
  const currentChallenge = activeChallenge !== null && challenges.length > 0
    ? challenges.find((c: any) => c.id === activeChallenge)
    : mockChallenge;

  const displayTestResults = testResults.length > 0 
    ? testResults 
    : isRunning ? [] : mockTestResults;

  return (
    <section id="code-challenge" className="py-16 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjOUM5MkFDIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDBoMjB2MjBIMHoiLz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Code2 className="h-8 w-8 text-primary" />
            Code Challenge of the Week
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            Test your coding skills with our weekly challenges. Solve the problem, 
            run your code against our test cases, and see how you rank on the leaderboard!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{currentChallenge.title}</CardTitle>
                    <CardDescription className="mt-2 text-white/60">
                      <Badge variant={
                        currentChallenge.difficulty === "Easy" ? "outline" : 
                        currentChallenge.difficulty === "Medium" ? "default" : 
                        "destructive"
                      }>
                        {currentChallenge.difficulty}
                      </Badge>
                      <span className="ml-2 text-white/80">{currentChallenge.language}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2 text-white">Problem Description</h3>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-md border border-white/20 text-sm whitespace-pre-line text-white/90">
                    {currentChallenge.description}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-md font-semibold mb-2 text-white">Your Solution ({currentChallenge.language})</h3>
                  <Textarea
                    className="font-mono text-sm h-[350px] bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
                    placeholder="Write your solution here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/20 bg-white/5 flex justify-between">
                <div className="text-sm text-white/60 flex items-center">
                  {executionTime !== null && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Execution time: {executionTime}ms
                    </span>
                  )}
                </div>
                <Button onClick={runCode} disabled={isRunning} className="gap-2">
                  {isRunning && <Loader2 className="h-4 w-4 animate-spin" />}
                  Run Code
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="results" className="h-full flex flex-col">
              <TabsList className="grid grid-cols-2 bg-white/10 backdrop-blur-sm border-white/20">
                <TabsTrigger value="results" className="text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/20">Test Results</TabsTrigger>
                <TabsTrigger value="leaderboard" className="text-white/80 data-[state=active]:text-white data-[state=active]:bg-white/20">Leaderboard</TabsTrigger>
              </TabsList>
              <div className="flex-grow overflow-hidden">
                <TabsContent value="results" className="mt-0 h-full">
                  <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Test Results</CardTitle>
                      {displayTestResults.length > 0 && (
                        <div className="mt-2">
                          <Progress 
                            value={
                              (displayTestResults.filter(r => r.passed).length / displayTestResults.length) * 100
                            } 
                            className="h-2"
                          />
                          <div className="mt-2 text-sm flex justify-between">
                            <span className="text-white/80">
                              Passed: {displayTestResults.filter(r => r.passed).length}/{displayTestResults.length}
                            </span>
                            <span className={
                              displayTestResults.every(r => r.passed)
                                ? "text-green-400"
                                : "text-amber-400"
                            }>
                              {displayTestResults.every(r => r.passed)
                                ? "All tests passed!"
                                : "Some tests failed"
                              }
                            </span>
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="overflow-auto" style={{ maxHeight: "500px" }}>
                      {isRunning ? (
                        <div className="flex justify-center items-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : displayTestResults.length === 0 ? (
                        <div className="text-center py-8 text-white/60">
                          <p>Run your code to see the test results</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {displayTestResults.map((result, idx) => (
                            <div 
                              key={idx} 
                              className={`border rounded-md p-4 ${
                                result.passed ? 'bg-green-400/20 border-green-400/30' : 'bg-red-400/20 border-red-400/30'
                              }`}
                            >
                              <div className="flex items-center mb-2">
                                {result.passed ? (
                                  <CheckCircle className="text-green-500 mr-2" size={16} />
                                ) : (
                                  <XCircle className="text-red-500 mr-2" size={16} />
                                )}
                                <h4 className={`font-medium ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                                  Test {idx + 1}: {result.passed ? 'Passed' : 'Failed'}
                                </h4>
                              </div>
                              
                              <div className="text-sm space-y-1 text-white/90">
                                <p><span className="font-medium">Input:</span> {result.input}</p>
                                <p><span className="font-medium">Expected:</span> {result.expected}</p>
                                <p><span className="font-medium">Actual:</span> {result.actual}</p>
                                {result.message && (
                                  <p className="mt-2 text-red-400">{result.message}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="leaderboard" className="mt-0 h-full">
                  <Card className="glassmorphism border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Leaderboard</CardTitle>
                      <CardDescription className="text-white/60">
                        Top performers for this week's challenge
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : leaderboard.length === 0 ? (
                        <div className="text-center py-8 text-white/60">
                          <p>Be the first to solve this challenge!</p>
                        </div>
                      ) : (
                        <div className="overflow-hidden rounded-md border border-white/20">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white/10">
                                <th className="py-2 px-4 text-left font-medium text-white/80">Rank</th>
                                <th className="py-2 px-4 text-left font-medium text-white/80">User</th>
                                <th className="py-2 px-4 text-left font-medium text-white/80">Time (ms)</th>
                                <th className="py-2 px-4 text-center font-medium text-white/80">Score</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Mock leaderboard data for now */}
                              {[
                                { rank: 1, username: "data_wizard", time: 42, score: 100 },
                                { rank: 2, username: "codingpro", time: 56, score: 95 },
                                { rank: 3, username: "pythonista", time: 73, score: 90 },
                                { rank: 4, username: "algomasterx", time: 89, score: 85 },
                                { rank: 5, username: "devsupreme", time: 102, score: 80 },
                              ].map((entry) => (
                                <tr key={entry.rank} className="border-t border-white/10 hover:bg-white/10 text-white/90">
                                  <td className="py-2 px-4">
                                    {entry.rank === 1 ? (
                                      <div className="flex items-center">
                                        <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                                        <span>{entry.rank}</span>
                                      </div>
                                    ) : entry.rank}
                                  </td>
                                  <td className="py-2 px-4">{entry.username}</td>
                                  <td className="py-2 px-4">{entry.time}</td>
                                  <td className="py-2 px-4 text-center font-medium">{entry.score}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/80">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">New challenges posted every Monday - Start coding now!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
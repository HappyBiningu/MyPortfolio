import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Trophy, Clock, BarChart3, CheckCircle, XCircle } from "lucide-react";
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
  });
  
  const { data: leaderboard = [] } = useQuery({
    queryKey: ['/api/code-challenges/leaderboard'],
  });
  
  const runMutation = useMutation({
    mutationFn: async (payload: { challengeId: number; code: string }) => {
      setIsRunning(true);
      setTestResults([]);
      setExecutionTime(null);
      
      const response = await apiRequest(`/api/code-challenges/${payload.challengeId}/run`, {
        method: "POST",
        body: JSON.stringify({ code: payload.code }),
      });
      
      return response;
    },
    onSuccess: (data) => {
      setTestResults(data.testResults);
      setExecutionTime(data.executionTime);
      
      const allPassed = data.testResults.every((result: TestResult) => result.passed);
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
    <section id="code-challenge" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Code Challenge of the Week</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Test your coding skills with our weekly challenges. Solve the problem, 
            run your code against our test cases, and see how you rank on the leaderboard!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{currentChallenge.title}</CardTitle>
                    <CardDescription className="mt-2">
                      <Badge variant={
                        currentChallenge.difficulty === "Easy" ? "outline" : 
                        currentChallenge.difficulty === "Medium" ? "default" : 
                        "destructive"
                      }>
                        {currentChallenge.difficulty}
                      </Badge>
                      <span className="ml-2">{currentChallenge.language}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2">Problem Description</h3>
                  <div className="bg-white p-4 rounded-md border text-sm whitespace-pre-line">
                    {currentChallenge.description}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-md font-semibold mb-2">Your Solution ({currentChallenge.language})</h3>
                  <Textarea
                    className="font-mono text-sm h-[350px]"
                    placeholder="Write your solution here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 flex justify-between">
                <div className="text-sm text-gray-500 flex items-center">
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
          </div>
          
          <div>
            <Tabs defaultValue="results" className="h-full flex flex-col">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="results">Test Results</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
              <div className="flex-grow overflow-hidden">
                <TabsContent value="results" className="mt-0 h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Test Results</CardTitle>
                      {displayTestResults.length > 0 && (
                        <div className="mt-2">
                          <Progress 
                            value={
                              (displayTestResults.filter(r => r.passed).length / displayTestResults.length) * 100
                            } 
                            className="h-2"
                          />
                          <div className="mt-2 text-sm flex justify-between">
                            <span>
                              Passed: {displayTestResults.filter(r => r.passed).length}/{displayTestResults.length}
                            </span>
                            <span className={
                              displayTestResults.every(r => r.passed)
                                ? "text-green-500"
                                : "text-amber-500"
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
                        <div className="text-center py-8 text-gray-500">
                          <p>Run your code to see the test results</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {displayTestResults.map((result, idx) => (
                            <div 
                              key={idx} 
                              className={`border rounded-md p-4 ${
                                result.passed ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                              }`}
                            >
                              <div className="flex items-center mb-2">
                                {result.passed ? (
                                  <CheckCircle className="text-green-500 mr-2" size={16} />
                                ) : (
                                  <XCircle className="text-red-500 mr-2" size={16} />
                                )}
                                <h4 className={`font-medium ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
                                  Test {idx + 1}: {result.passed ? 'Passed' : 'Failed'}
                                </h4>
                              </div>
                              
                              <div className="text-sm space-y-1">
                                <p><span className="font-medium">Input:</span> {result.input}</p>
                                <p><span className="font-medium">Expected:</span> {result.expected}</p>
                                <p><span className="font-medium">Actual:</span> {result.actual}</p>
                                {result.message && (
                                  <p className="mt-2 text-red-600">{result.message}</p>
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
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Leaderboard</CardTitle>
                      <CardDescription>
                        Top performers for this week's challenge
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : leaderboard.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>Be the first to solve this challenge!</p>
                        </div>
                      ) : (
                        <div className="overflow-hidden rounded-md border">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/50">
                                <th className="py-2 px-4 text-left font-medium">Rank</th>
                                <th className="py-2 px-4 text-left font-medium">User</th>
                                <th className="py-2 px-4 text-left font-medium">Time (ms)</th>
                                <th className="py-2 px-4 text-center font-medium">Score</th>
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
                                <tr key={entry.rank} className="border-t hover:bg-muted/50">
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
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          New challenges are posted every Monday. Complete them to earn points and improve your coding skills!
        </div>
      </div>
    </section>
  );
}
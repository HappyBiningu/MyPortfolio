import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Trophy, Clock, BarChart3, CheckCircle, XCircle, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TestResult = {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  message?: string;
};

type Challenge = {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  startCode: string;
  language: string;
};

type LeaderboardEntry = {
  rank: number;
  username: string;
  time: number;
  score: number;
};

// Static challenge data
const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    description: `Given an array of integers, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:
Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: [4, -1, 2, 1] has the largest sum = 6.

Constraints:
- The array will have at least one element
- The array length will not exceed 10^4
- Elements can be negative, zero, or positive`,
    difficulty: "Medium",
    startCode: `def max_subarray(nums):
    # Your code here
    # Hint: Use Kadane's algorithm for optimal O(n) solution
    pass

# Example test case
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = max_subarray(nums)
print(result)  # Should print 6`,
    language: "python",
  },
  {
    id: 2,
    title: "Two Sum Problem",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- Only one valid answer exists`,
    difficulty: "Easy",
    startCode: `def two_sum(nums, target):
    # Your code here
    # Hint: Use a hash map for O(n) solution
    pass

# Example test case
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(result)  # Should print [0, 1]`,
    language: "python",
  },
  {
    id: 3,
    title: "Binary Tree Level Order Traversal",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

TreeNode structure:
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

Constraints:
- The number of nodes in the tree is in the range [0, 2000]
- -1000 <= Node.val <= 1000`,
    difficulty: "Medium",
    startCode: `def level_order(root):
    # Your code here
    # Hint: Use BFS with a queue
    if not root:
        return []
    
    result = []
    # Add your implementation here
    
    return result

# Example usage (you don't need to implement TreeNode)
# The test system will create the tree structure for you`,
    language: "python",
  }
];

// Static leaderboard data
const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: "data_wizard", time: 42, score: 100 },
  { rank: 2, username: "pythonista_dev", time: 58, score: 98 },
  { rank: 3, username: "algo_master", time: 73, score: 95 },
  { rank: 4, username: "code_ninja", time: 89, score: 92 },
  { rank: 5, username: "dev_supreme", time: 102, score: 88 },
  { rank: 6, username: "binary_beast", time: 127, score: 85 },
  { rank: 7, username: "logic_lord", time: 156, score: 82 }
];

export default function CodeChallenge() {
  const [code, setCode] = useState("");
  const [activeChallenge, setActiveChallenge] = useState<number>(1); // Default to first challenge
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  // Mock test results for different challenges
  const getMockTestResults = (challengeId: number, userCode: string): TestResult[] => {
    const hasAttempt = userCode.trim().length > 50; // Basic check for actual code attempt
    
    switch (challengeId) {
      case 1: // Maximum Subarray
        return [
          {
            passed: hasAttempt,
            input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
            expected: "6",
            actual: hasAttempt ? "6" : "0",
          },
          {
            passed: hasAttempt,
            input: "[1]",
            expected: "1",
            actual: hasAttempt ? "1" : "0",
          },
          {
            passed: hasAttempt,
            input: "[-1]",
            expected: "-1",
            actual: hasAttempt ? "-1" : "0",
            message: hasAttempt ? undefined : "Remember to handle arrays with only negative numbers correctly.",
          },
          {
            passed: hasAttempt,
            input: "[5, 4, -1, 7, 8]",
            expected: "23",
            actual: hasAttempt ? "23" : "0",
          },
        ];
      case 2: // Two Sum
        return [
          {
            passed: hasAttempt,
            input: "nums=[2,7,11,15], target=9",
            expected: "[0, 1]",
            actual: hasAttempt ? "[0, 1]" : "[]",
          },
          {
            passed: hasAttempt,
            input: "nums=[3,2,4], target=6",
            expected: "[1, 2]",
            actual: hasAttempt ? "[1, 2]" : "[]",
          },
          {
            passed: hasAttempt,
            input: "nums=[3,3], target=6",
            expected: "[0, 1]",
            actual: hasAttempt ? "[0, 1]" : "[]",
          },
        ];
      case 3: // Level Order Traversal
        return [
          {
            passed: hasAttempt,
            input: "root = [3,9,20,null,null,15,7]",
            expected: "[[3],[9,20],[15,7]]",
            actual: hasAttempt ? "[[3],[9,20],[15,7]]" : "[[]]",
          },
          {
            passed: hasAttempt,
            input: "root = [1]",
            expected: "[[1]]",
            actual: hasAttempt ? "[[1]]" : "[[]]",
          },
          {
            passed: hasAttempt,
            input: "root = []",
            expected: "[]",
            actual: hasAttempt ? "[]" : "[[]]",
            message: hasAttempt ? undefined : "Don't forget to handle the empty tree case.",
          },
        ];
      default:
        return [];
    }
  };
  
  // This function is called when a challenge is selected
  const selectChallenge = (challengeId: number) => {
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (challenge) {
      setActiveChallenge(challengeId);
      setCode(challenge.startCode || '');
      setTestResults([]);
      setExecutionTime(null);
    }
  };
  
  // This simulates running the code against test cases
  const runCode = () => {
    if (!code.trim()) {
      toast({
        title: "No Code Provided",
        description: "Please write some code before running tests",
        variant: "destructive",
      });
      return;
    }
    
    setIsRunning(true);
    setTestResults([]);
    setExecutionTime(null);
    
    // Simulate API delay
    setTimeout(() => {
      const mockResults = getMockTestResults(activeChallenge, code);
      const mockExecutionTime = Math.floor(Math.random() * 150) + 25; // 25-175ms
      
      setTestResults(mockResults);
      setExecutionTime(mockExecutionTime);
      setIsRunning(false);
      
      const allPassed = mockResults.every((result: TestResult) => result.passed);
      if (allPassed && code.trim().length > 50) {
        toast({
          title: "Challenge Completed!",
          description: "Congratulations! You've successfully solved the challenge.",
        });
      } else if (!allPassed) {
        toast({
          title: "Some Tests Failed",
          description: "Keep working on your solution. You can do it!",
          variant: "destructive",
        });
      }
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  // Get the current challenge from static data
  const currentChallenge = CHALLENGES.find(c => c.id === activeChallenge) || CHALLENGES[0];
  
  // Initialize code with the current challenge's starter code if needed
  useEffect(() => {
    if (!code && currentChallenge) {
      setCode(currentChallenge.startCode);
    }
  }, [activeChallenge, currentChallenge.startCode, code]);

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
                      {testResults.length > 0 && (
                        <div className="mt-2">
                          <Progress 
                            value={
                              (testResults.filter(r => r.passed).length / testResults.length) * 100
                            } 
                            className="h-2"
                          />
                          <div className="mt-2 text-sm flex justify-between">
                            <span className="text-white/80">
                              Passed: {testResults.filter(r => r.passed).length}/{testResults.length}
                            </span>
                            <span className={
                              testResults.every(r => r.passed)
                                ? "text-green-400"
                                : "text-amber-400"
                            }>
                              {testResults.every(r => r.passed)
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
                      ) : testResults.length === 0 ? (
                        <div className="text-center py-8 text-white/60">
                          <p>Run your code to see the test results</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {testResults.map((result, idx) => (
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
                            {LEADERBOARD.map((entry) => (
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
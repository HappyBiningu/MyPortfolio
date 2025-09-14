import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Code, ThumbsUp, MessageSquare, User, Calendar, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define form schema without dependency on shared schema
const codeSnippetSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  language: z.string().min(1, "Please select a programming language"),
  code: z.string().min(10, "Code must be at least 10 characters"),
});

type CodeSnippetFormValues = z.infer<typeof codeSnippetSchema>;

type CodeSnippet = {
  id: number;
  title: string;
  description: string;
  language: string;
  code: string;
  username: string;
  createdAt: string;
  approved: boolean;
  likes: number;
  comments: number;
};

// Static code snippet data
const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 1,
    title: "Efficient Data Cleaning Pipeline",
    description: "A comprehensive data cleaning function that handles missing values, outliers, and data type conversions for pandas DataFrames.",
    language: "python",
    code: `import pandas as pd
import numpy as np
from scipy import stats

def clean_dataframe(df, remove_outliers=True, outlier_method='iqr'):
    """
    Comprehensive data cleaning pipeline for pandas DataFrames.
    
    Args:
        df: Input DataFrame
        remove_outliers: Whether to remove outliers
        outlier_method: Method for outlier detection ('iqr' or 'zscore')
    
    Returns:
        Cleaned DataFrame
    """
    df_clean = df.copy()
    
    # Handle missing values
    for col in df_clean.columns:
        if df_clean[col].dtype in ['int64', 'float64']:
            df_clean[col].fillna(df_clean[col].median(), inplace=True)
        else:
            df_clean[col].fillna(df_clean[col].mode().iloc[0], inplace=True)
    
    # Remove outliers
    if remove_outliers:
        numeric_cols = df_clean.select_dtypes(include=[np.number]).columns
        
        for col in numeric_cols:
            if outlier_method == 'iqr':
                Q1 = df_clean[col].quantile(0.25)
                Q3 = df_clean[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                df_clean = df_clean[(df_clean[col] >= lower_bound) & (df_clean[col] <= upper_bound)]
            elif outlier_method == 'zscore':
                z_scores = np.abs(stats.zscore(df_clean[col]))
                df_clean = df_clean[z_scores < 3]
    
    return df_clean

# Example usage
# df_cleaned = clean_dataframe(your_dataframe)`,
    username: "data_scientist_pro",
    createdAt: "2024-09-10T14:30:00Z",
    approved: true,
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "Quick Feature Engineering Helper",
    description: "Utility functions for common feature engineering tasks including encoding categorical variables and creating polynomial features.",
    language: "python", 
    code: `from sklearn.preprocessing import LabelEncoder, OneHotEncoder, PolynomialFeatures
import pandas as pd
import numpy as np

def engineer_features(df, categorical_cols=None, polynomial_degree=2, target_col=None):
    """
    Feature engineering helper for machine learning preprocessing.
    
    Args:
        df: Input DataFrame
        categorical_cols: List of categorical columns to encode
        polynomial_degree: Degree for polynomial features
        target_col: Target column name (excluded from polynomial features)
    
    Returns:
        DataFrame with engineered features
    """
    df_features = df.copy()
    
    # Handle categorical variables
    if categorical_cols:
        for col in categorical_cols:
            if df_features[col].nunique() <= 10:
                # One-hot encoding for low cardinality
                dummies = pd.get_dummies(df_features[col], prefix=col)
                df_features = pd.concat([df_features, dummies], axis=1)
                df_features.drop(col, axis=1, inplace=True)
            else:
                # Label encoding for high cardinality
                le = LabelEncoder()
                df_features[f'{col}_encoded'] = le.fit_transform(df_features[col].astype(str))
                df_features.drop(col, axis=1, inplace=True)
    
    # Create polynomial features for numeric columns
    numeric_cols = df_features.select_dtypes(include=[np.number]).columns
    if target_col and target_col in numeric_cols:
        numeric_cols = numeric_cols.drop(target_col)
    
    if len(numeric_cols) > 1:
        poly = PolynomialFeatures(degree=polynomial_degree, include_bias=False)
        poly_features = poly.fit_transform(df_features[numeric_cols])
        feature_names = poly.get_feature_names_out(numeric_cols)
        
        # Add polynomial features
        poly_df = pd.DataFrame(poly_features, columns=feature_names, index=df_features.index)
        df_features = pd.concat([df_features, poly_df], axis=1)
        
        # Remove original features to avoid duplication
        df_features.drop(numeric_cols, axis=1, inplace=True)
    
    return df_features`,
    username: "ml_engineer_x",
    createdAt: "2024-09-08T09:15:00Z", 
    approved: true,
    likes: 18,
    comments: 5,
  },
  {
    id: 3,
    title: "SQL Query Performance Optimizer",
    description: "A set of SQL query patterns and optimizations for better database performance, especially useful for large datasets.",
    language: "sql",
    code: `-- Optimized query patterns for better performance

-- 1. Use indexed columns in WHERE clauses
-- GOOD:
SELECT customer_id, order_date, total_amount 
FROM orders 
WHERE customer_id = 12345 
  AND order_date >= '2024-01-01'
ORDER BY order_date DESC;

-- 2. Avoid functions in WHERE clauses on large tables
-- BAD:
SELECT * FROM orders WHERE YEAR(order_date) = 2024;
-- GOOD:
SELECT * FROM orders 
WHERE order_date >= '2024-01-01' 
  AND order_date < '2025-01-01';

-- 3. Use EXISTS instead of IN for large subqueries
-- GOOD:
SELECT DISTINCT c.customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1 
    FROM orders o 
    WHERE o.customer_id = c.customer_id 
      AND o.order_date >= '2024-01-01'
);

-- 4. Optimize aggregations with proper GROUP BY
-- Efficient monthly sales summary
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') as month,
    COUNT(*) as order_count,
    SUM(total_amount) as monthly_revenue,
    AVG(total_amount) as avg_order_value
FROM orders 
WHERE order_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month DESC;

-- 5. Window functions for ranking and analytics
SELECT 
    customer_id,
    order_date,
    total_amount,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) as order_rank,
    LAG(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) as prev_order_amount
FROM orders;`,
    username: "sql_optimizer",
    createdAt: "2024-09-05T16:45:00Z",
    approved: true,
    likes: 31,
    comments: 12,
  },
  {
    id: 4,
    title: "React Custom Hook for API State Management",
    description: "A reusable custom hook that handles loading states, errors, and caching for API calls in React applications.",
    language: "javascript",
    code: `import { useState, useEffect, useRef } from 'react';

function useApi(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cache = useRef({});
    
    const {
        method = 'GET',
        body = null,
        headers = {},
        dependencies = [],
        cacheTime = 5 * 60 * 1000, // 5 minutes
        retry = 3
    } = options;
    
    const fetchData = async (retryCount = 0) => {
        const cacheKey = JSON.stringify({ url, method, body });
        
        // Check cache first
        if (method === 'GET' && cache.current[cacheKey]) {
            const cachedData = cache.current[cacheKey];
            if (Date.now() - cachedData.timestamp < cacheTime) {
                setData(cachedData.data);
                setLoading(false);
                return;
            }
        }
        
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: body ? JSON.stringify(body) : null
            });
            
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            
            const result = await response.json();
            
            // Cache GET requests
            if (method === 'GET') {
                cache.current[cacheKey] = {
                    data: result,
                    timestamp: Date.now()
                };
            }
            
            setData(result);
        } catch (err) {
            if (retryCount < retry) {
                setTimeout(() => fetchData(retryCount + 1), 1000 * Math.pow(2, retryCount));
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [url, method, JSON.stringify(body), ...dependencies]);
    
    const refetch = () => fetchData();
    
    return { data, loading, error, refetch };
}

// Usage example:
// const { data: users, loading, error, refetch } = useApi('/api/users');
// const { data: posts } = useApi('/api/posts', { dependencies: [userId] });

export default useApi;`,
    username: "react_dev_guru",
    createdAt: "2024-09-03T11:20:00Z",
    approved: true,
    likes: 27,
    comments: 9,
  },
  {
    id: 5,
    title: "Advanced Git Workflow Scripts", 
    description: "Bash scripts for streamlining common Git workflows including automated branch cleanup and smart commit messages.",
    language: "bash",
    code: `#!/bin/bash

# Advanced Git workflow automation scripts

# Function: Smart commit with auto-generated message based on changes
smart_commit() {
    if [ -z "$(git status --porcelain)" ]; then
        echo "No changes to commit"
        return 1
    fi
    
    # Analyze changes to generate smart commit message
    added_files=$(git diff --cached --name-only --diff-filter=A | wc -l)
    modified_files=$(git diff --cached --name-only --diff-filter=M | wc -l)
    deleted_files=$(git diff --cached --name-only --diff-filter=D | wc -l)
    
    message="Auto: "
    
    if [ $added_files -gt 0 ]; then
        message+="Add $added_files file(s) "
    fi
    
    if [ $modified_files -gt 0 ]; then
        message+="Modify $modified_files file(s) "
    fi
    
    if [ $deleted_files -gt 0 ]; then
        message+="Delete $deleted_files file(s) "
    fi
    
    # Add file types for context
    file_types=$(git diff --cached --name-only | sed 's/.*\\.//' | sort | uniq | head -3 | tr '\\n' ',' | sed 's/,$//')
    if [ ! -z "$file_types" ]; then
        message+="($file_types)"
    fi
    
    git commit -m "$message"
    echo "Committed with message: $message"
}

# Function: Clean up merged branches
cleanup_branches() {
    echo "Cleaning up merged branches..."
    
    # Switch to main/master
    git checkout main 2>/dev/null || git checkout master 2>/dev/null
    
    # Update main branch
    git pull origin main 2>/dev/null || git pull origin master 2>/dev/null
    
    # Get merged branches (excluding main/master and current branch)
    merged_branches=$(git branch --merged | grep -v "\\*\\|main\\|master" | tr -d ' ')
    
    if [ ! -z "$merged_branches" ]; then
        echo "Found merged branches to clean up:"
        echo "$merged_branches"
        
        read -p "Delete these branches? (y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            echo "$merged_branches" | xargs git branch -d
            echo "Branches cleaned up successfully"
        fi
    else
        echo "No merged branches to clean up"
    fi
}

# Function: Interactive rebase helper
interactive_rebase() {
    local commit_count=\${1:-5}
    echo "Starting interactive rebase for last \$commit_count commits..."
    git rebase -i HEAD~\$commit_count
}

# Function: Show comprehensive status
git_status_plus() {
    echo "=== Git Status Plus ==="
    echo ""
    
    echo "Current branch:"
    git branch --show-current
    echo ""
    
    echo "Status:"
    git status --short
    echo ""
    
    echo "Recent commits:"
    git log --oneline -5
    echo ""
    
    echo "Unpushed commits:"
    git log @{u}..HEAD --oneline 2>/dev/null || echo "No upstream set"
}

# Usage examples:
# smart_commit          # Auto-commit with generated message
# cleanup_branches      # Clean merged branches
# interactive_rebase 3  # Interactive rebase last 3 commits
# git_status_plus      # Comprehensive status`,
    username: "git_workflow_master",
    createdAt: "2024-08-28T13:10:00Z",
    approved: true,
    likes: 19,
    comments: 6,
  }
];

export default function CommunityContributions() {
  const [activeTab, setActiveTab] = useState("browse");
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>(CODE_SNIPPETS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<CodeSnippetFormValues>({
    resolver: zodResolver(codeSnippetSchema),
    defaultValues: {
      title: "",
      description: "",
      language: "",
      code: "",
    },
  });
  
  function onSubmit(values: CodeSnippetFormValues) {
    setIsSubmitting(true);
    
    // Simulate API submission delay
    setTimeout(() => {
      // Create new snippet with current timestamp
      const newSnippet: CodeSnippet = {
        id: Math.max(...codeSnippets.map(s => s.id)) + 1,
        title: values.title,
        description: values.description,
        language: values.language,
        code: values.code,
        username: "you",
        createdAt: new Date().toISOString(),
        approved: false, // New submissions start as pending
        likes: 0,
        comments: 0,
      };
      
      // Add to the beginning of the list (most recent first)
      setCodeSnippets([newSnippet, ...codeSnippets]);
      
      form.reset();
      setIsSubmitting(false);
      
      toast({
        title: "Contribution Submitted!",
        description: "Your code snippet has been submitted for review. It will appear in the list once approved.",
      });
      
      setActiveTab("browse");
    }, 1500); // 1.5 second delay to simulate API call
  }
  
  return (
    <section id="community" className="py-16 bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Community Contributions</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Share code snippets, solutions, and ideas with the developer community
          </p>
        </motion.div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Snippets</TabsTrigger>
            <TabsTrigger value="contribute">Contribute</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            {codeSnippets.length === 0 ? (
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
                        disabled={isSubmitting}
                        className="gap-2"
                        data-testid="button-submit"
                      >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
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
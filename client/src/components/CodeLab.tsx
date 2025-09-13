import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Download, Save, RotateCcw, Copy, Code, Database, PanelTop } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pythonExamples = [
  {
    name: "Hello World",
    code: "# Simple Hello World program\nprint('Hello, World!')",
  },
  {
    name: "Data Analysis",
    code: `# Basic data analysis example
import pandas as pd
import numpy as np

# Create a simple dataset
data = {
    'Name': ['John', 'Anna', 'Peter', 'Linda'],
    'Age': [28, 34, 29, 42],
    'Salary': [65000, 85000, 69000, 92000]
}

# Create DataFrame
df = pd.DataFrame(data)

# Display data
print("Dataset:")
print(df)

# Basic statistics
print("\\nStatistics:")
print(df.describe())

# Mean salary by age group
df['Age_Group'] = pd.cut(df['Age'], bins=[25, 30, 40, 50], labels=['25-30', '31-40', '41-50'])
print("\\nMean salary by age group:")
print(df.groupby('Age_Group')['Salary'].mean())
`,
  },
  {
    name: "Machine Learning",
    code: `# Simple machine learning example
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, predictions)
print(f"Model accuracy: {accuracy:.2f}")

# Feature importance
feature_importance = list(zip(iris.feature_names, model.feature_importances_))
print("\\nFeature importance:")
for feature, importance in sorted(feature_importance, key=lambda x: x[1], reverse=True):
    print(f"{feature}: {importance:.4f}")
`,
  },
];

const javascriptExamples = [
  {
    name: "Hello World",
    code: "// Simple Hello World program\nconsole.log('Hello, World!');",
  },
  {
    name: "DOM Manipulation",
    code: `// DOM Manipulation Example
// This code demonstrates adding, modifying, and removing elements

// Create a new paragraph element
const paragraph = document.createElement('p');
paragraph.textContent = 'This paragraph was created with JavaScript';
paragraph.style.color = 'blue';
paragraph.className = 'dynamic-content';

// Add it to the DOM (would work in a browser environment)
console.log('Created element:', paragraph);

// Simulating an array of data
const items = ['Apple', 'Banana', 'Orange', 'Mango'];

// Loop through items and create list
console.log('Items list:');
items.forEach((item, index) => {
  console.log(\`\${index + 1}. \${item}\`);
});

// Using array methods
const filteredItems = items.filter(item => item.length > 5);
console.log('\\nFiltered items (length > 5):', filteredItems);

const itemsUpperCase = items.map(item => item.toUpperCase());
console.log('Items in uppercase:', itemsUpperCase);
`,
  },
  {
    name: "Data Processing",
    code: `// Data processing example
const data = [
  { id: 1, name: 'John Doe', age: 28, department: 'Engineering' },
  { id: 2, name: 'Jane Smith', age: 32, department: 'Marketing' },
  { id: 3, name: 'Robert Johnson', age: 45, department: 'Management' },
  { id: 4, name: 'Emily Davis', age: 25, department: 'Engineering' },
  { id: 5, name: 'Michael Wilson', age: 37, department: 'Marketing' }
];

// Display the data
console.log('Employee Data:');
console.table(data);

// Group by department
const groupByDepartment = data.reduce((acc, employee) => {
  const { department } = employee;
  if (!acc[department]) {
    acc[department] = [];
  }
  acc[department].push(employee);
  return acc;
}, {});

console.log('\\nEmployees grouped by department:');
console.log(groupByDepartment);

// Calculate average age
const totalAge = data.reduce((sum, employee) => sum + employee.age, 0);
const averageAge = totalAge / data.length;

console.log(\`\\nAverage employee age: \${averageAge.toFixed(2)}\`);

// Find employees older than 30
const olderEmployees = data.filter(employee => employee.age > 30);
console.log('\\nEmployees older than 30:');
console.table(olderEmployees);
`,
  },
];

const sqlExamples = [
  {
    name: "Basic Queries",
    code: `-- Basic SQL queries example
-- Create a table
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(100),
  salary DECIMAL(10, 2),
  hire_date DATE
);

-- Insert some data
INSERT INTO employees VALUES (1, 'John Smith', 'Engineering', 85000, '2018-06-12');
INSERT INTO employees VALUES (2, 'Mary Johnson', 'Marketing', 78000, '2019-03-05');
INSERT INTO employees VALUES (3, 'James Brown', 'Engineering', 92000, '2017-11-20');
INSERT INTO employees VALUES (4, 'Patricia Davis', 'HR', 67000, '2020-01-15');
INSERT INTO employees VALUES (5, 'Robert Wilson', 'Marketing', 73000, '2019-08-30');

-- Basic SELECT query
SELECT * FROM employees;

-- Filtering with WHERE
SELECT name, department, salary 
FROM employees 
WHERE department = 'Engineering';

-- Ordering results
SELECT name, salary 
FROM employees 
ORDER BY salary DESC;

-- Aggregation
SELECT department, COUNT(*) as num_employees, AVG(salary) as avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;`,
  },
  {
    name: "Data Analysis",
    code: `-- SQL Data Analysis Example
-- Create tables
CREATE TABLE products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100),
  category VARCHAR(50),
  price DECIMAL(10, 2)
);

CREATE TABLE sales (
  sale_id INT PRIMARY KEY,
  product_id INT,
  sale_date DATE,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert sample data
INSERT INTO products VALUES 
  (1, 'Laptop', 'Electronics', 1200.00),
  (2, 'Smartphone', 'Electronics', 800.00),
  (3, 'Headphones', 'Accessories', 150.00),
  (4, 'Monitor', 'Electronics', 300.00),
  (5, 'Keyboard', 'Accessories', 80.00);

INSERT INTO sales VALUES
  (101, 1, '2023-01-15', 3),
  (102, 2, '2023-01-16', 5),
  (103, 3, '2023-01-18', 10),
  (104, 1, '2023-01-20', 2),
  (105, 4, '2023-01-22', 4),
  (106, 2, '2023-01-25', 3),
  (107, 5, '2023-01-27', 8),
  (108, 3, '2023-01-30', 6);

-- Sales analysis
-- Total sales by product
SELECT 
  p.product_name,
  SUM(s.quantity) as total_units_sold,
  SUM(p.price * s.quantity) as total_revenue
FROM 
  products p
JOIN 
  sales s ON p.product_id = s.product_id
GROUP BY 
  p.product_id, p.product_name
ORDER BY 
  total_revenue DESC;

-- Sales by category
SELECT 
  p.category,
  COUNT(s.sale_id) as num_sales,
  SUM(s.quantity) as total_units,
  SUM(p.price * s.quantity) as total_revenue
FROM 
  products p
JOIN 
  sales s ON p.product_id = s.product_id
GROUP BY 
  p.category
ORDER BY 
  total_revenue DESC;`,
  },
];

export default function CodeLab() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(pythonExamples[0].code);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  // Update code when language changes
  useEffect(() => {
    if (language === "python") {
      setCode(pythonExamples[0].code);
    } else if (language === "javascript") {
      setCode(javascriptExamples[0].code);
    } else if (language === "sql") {
      setCode(sqlExamples[0].code);
    }
    setOutput("");
  }, [language]);

  // Simulated code execution (in a real app, this would call a backend service)
  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    
    // Simulate backend processing delay
    setTimeout(() => {
      let result = "";
      
      try {
        if (language === "python") {
          // Simulate Python output
          if (code.includes("print('Hello, World!')")) {
            result = "Hello, World!";
          } else if (code.includes("pandas") && code.includes("numpy")) {
            result = `Dataset:
   Name  Age  Salary Age_Group
0  John   28   65000     25-30
1  Anna   34   85000     31-40
2  Peter  29   69000     25-30
3  Linda  42   92000     41-50

Statistics:
               Age        Salary
count    4.000000      4.000000
mean    33.250000  77750.000000
std      6.397651  12945.356527
min     28.000000  65000.000000
25%     28.750000  68000.000000
50%     31.500000  77000.000000
75%     36.500000  86750.000000
max     42.000000  92000.000000

Mean salary by age group:
Age_Group
25-30    67000.0
31-40    85000.0
41-50    92000.0
Name: Salary, dtype: float64`;
          } else if (code.includes("sklearn")) {
            result = `Model accuracy: 0.96

Feature importance:
petal length (cm): 0.4444
petal width (cm): 0.3991
sepal length (cm): 0.0970
sepal width (cm): 0.0595`;
          } else {
            result = "Running your Python code...";
          }
        } else if (language === "javascript") {
          // Simulate JavaScript output
          if (code.includes("console.log('Hello, World!')")) {
            result = "Hello, World!";
          } else if (code.includes("DOM Manipulation")) {
            result = `Created element: <p class="dynamic-content" style="color: blue;">This paragraph was created with JavaScript</p>

Items list:
1. Apple
2. Banana
3. Orange
4. Mango

Filtered items (length > 5): [ 'Banana', 'Orange' ]
Items in uppercase: [ 'APPLE', 'BANANA', 'ORANGE', 'MANGO' ]`;
          } else if (code.includes("data processing")) {
            result = `Employee Data:
┌─────────┬────┬──────────────────┬─────┬─────────────┐
│ (index) │ id │       name       │ age │ department  │
├─────────┼────┼──────────────────┼─────┼─────────────┤
│    0    │ 1  │    'John Doe'    │ 28  │ 'Engineering' │
│    1    │ 2  │   'Jane Smith'   │ 32  │ 'Marketing' │
│    2    │ 3  │ 'Robert Johnson' │ 45  │ 'Management' │
│    3    │ 4  │  'Emily Davis'   │ 25  │ 'Engineering' │
│    4    │ 5  │ 'Michael Wilson' │ 37  │ 'Marketing' │
└─────────┴────┴──────────────────┴─────┴─────────────┘

Employees grouped by department:
{
  Engineering: [
    { id: 1, name: 'John Doe', age: 28, department: 'Engineering' },
    { id: 4, name: 'Emily Davis', age: 25, department: 'Engineering' }
  ],
  Marketing: [
    { id: 2, name: 'Jane Smith', age: 32, department: 'Marketing' },
    { id: 5, name: 'Michael Wilson', age: 37, department: 'Marketing' }
  ],
  Management: [
    { id: 3, name: 'Robert Johnson', age: 45, department: 'Management' }
  ]
}

Average employee age: 33.40

Employees older than 30:
┌─────────┬────┬──────────────────┬─────┬─────────────┐
│ (index) │ id │       name       │ age │ department  │
├─────────┼────┼──────────────────┼─────┼─────────────┤
│    0    │ 2  │   'Jane Smith'   │ 32  │ 'Marketing' │
│    1    │ 3  │ 'Robert Johnson' │ 45  │ 'Management' │
│    2    │ 5  │ 'Michael Wilson' │ 37  │ 'Marketing' │
└─────────┴────┴──────────────────┴─────┴─────────────┘`;
          } else {
            result = "Running your JavaScript code...";
          }
        } else if (language === "sql") {
          // Simulate SQL output
          if (code.includes("CREATE TABLE employees")) {
            result = `-- Table 'employees' created successfully
-- 5 rows inserted

id | name           | department  | salary  | hire_date
---+----------------+-------------+---------+------------
1  | John Smith     | Engineering | 85000.00| 2018-06-12
2  | Mary Johnson   | Marketing   | 78000.00| 2019-03-05
3  | James Brown    | Engineering | 92000.00| 2017-11-20
4  | Patricia Davis | HR          | 67000.00| 2020-01-15
5  | Robert Wilson  | Marketing   | 73000.00| 2019-08-30

-- Filter results where department = 'Engineering'
name        | department  | salary
------------+-------------+---------
John Smith  | Engineering | 85000.00
James Brown | Engineering | 92000.00

-- Results ordered by salary
name           | salary
---------------+---------
James Brown    | 92000.00
John Smith     | 85000.00
Mary Johnson   | 78000.00
Robert Wilson  | 73000.00
Patricia Davis | 67000.00

-- Aggregation results
department  | num_employees | avg_salary
------------+---------------+-----------
Engineering | 2             | 88500.00
Marketing   | 2             | 75500.00
HR          | 1             | 67000.00`;
          } else if (code.includes("CREATE TABLE products")) {
            result = `-- Tables 'products' and 'sales' created successfully
-- 5 product rows inserted
-- 8 sales rows inserted

-- Total sales by product
product_name | total_units_sold | total_revenue
-------------+-----------------+---------------
Laptop       | 5               | 6000.00
Smartphone   | 8               | 6400.00
Headphones   | 16              | 2400.00
Monitor      | 4               | 1200.00
Keyboard     | 8               | 640.00

-- Sales by category
category     | num_sales | total_units | total_revenue
-------------+-----------+-------------+---------------
Electronics  | 5         | 17          | 13600.00
Accessories  | 3         | 24          | 3040.00`;
          } else {
            result = "Running your SQL code...";
          }
        }
      } catch (error: any) {
        result = `Error: ${error.message || 'Unknown error occurred'}`;
      }
      
      setOutput(result);
      setIsRunning(false);
    }, 1500);
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it elsewhere",
    });
  };

  const handleExampleChange = (exampleName: string) => {
    if (language === "python") {
      const example = pythonExamples.find(e => e.name === exampleName);
      if (example) setCode(example.code);
    } else if (language === "javascript") {
      const example = javascriptExamples.find(e => e.name === exampleName);
      if (example) setCode(example.code);
    } else if (language === "sql") {
      const example = sqlExamples.find(e => e.name === exampleName);
      if (example) setCode(example.code);
    }
    setOutput("");
  };

  return (
    <section id="codelab" className="py-16 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
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
          <h2 className="text-3xl font-heading font-bold mb-4 text-white">
            Interactive Code Laboratory
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Experiment with data science code, run live examples, and build your own solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glassmorphism border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <PanelTop className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-lg font-semibold text-white">Code Editor</h3>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-grow">
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">
                            <div className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              Python
                            </div>
                          </SelectItem>
                          <SelectItem value="javascript">
                            <div className="flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              JavaScript
                            </div>
                          </SelectItem>
                          <SelectItem value="sql">
                            <div className="flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              SQL
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select 
                        onValueChange={handleExampleChange}
                        value={
                          language === "python" 
                            ? pythonExamples.find(e => e.code === code)?.name || "" 
                            : language === "javascript" 
                            ? javascriptExamples.find(e => e.code === code)?.name || ""
                            : sqlExamples.find(e => e.code === code)?.name || ""
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Example" />
                        </SelectTrigger>
                        <SelectContent>
                          {language === "python" && 
                            pythonExamples.map((example) => (
                              <SelectItem key={example.name} value={example.name}>
                                {example.name}
                              </SelectItem>
                            ))
                          }
                          {language === "javascript" && 
                            javascriptExamples.map((example) => (
                              <SelectItem key={example.name} value={example.name}>
                                {example.name}
                              </SelectItem>
                            ))
                          }
                          {language === "sql" && 
                            sqlExamples.map((example) => (
                              <SelectItem key={example.name} value={example.name}>
                                {example.name}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={clearCode}>
                    <RotateCcw className="h-4 w-4 mr-1" /> Clear
                  </Button>
                  <Button variant="secondary" size="sm" onClick={copyCode}>
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="mb-2 grid w-full grid-cols-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
                <TabsContent value="editor" className="border rounded-md p-1">
                  <Textarea
                    className="font-mono bg-gray-950 text-gray-100 min-h-[300px] p-4"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                  />
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        toast({
                          title: "Save function",
                          description: "Code saving functionality would be implemented here.",
                        });
                      }}
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button 
                      onClick={runCode} 
                      disabled={isRunning}
                      size="sm"
                    >
                      {isRunning ? (
                        <>Running...</>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" /> Run
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="output">
                  <div className="border rounded-md p-4 bg-black text-green-400 font-mono min-h-[300px] whitespace-pre-wrap">
                    {output || "Code output will appear here..."}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        if (output) {
                          navigator.clipboard.writeText(output);
                          toast({
                            title: "Output copied to clipboard",
                          });
                        }
                      }}
                      disabled={!output}
                    >
                      <Download className="h-4 w-4 mr-1" /> Export Result
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Learning Resources</h3>
            <p className="mb-4">
              Enhance your coding skills with these recommended resources for data science and software development:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://www.datacamp.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-primary">DataCamp</h4>
                <p className="text-sm text-gray-600">Interactive data science courses and tutorials</p>
              </a>
              <a 
                href="https://www.kaggle.com/learn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-primary">Kaggle</h4>
                <p className="text-sm text-gray-600">Data science competitions and micro-courses</p>
              </a>
              <a 
                href="https://colab.research.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-primary">Google Colab</h4>
                <p className="text-sm text-gray-600">Free Jupyter notebook environment for data science</p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
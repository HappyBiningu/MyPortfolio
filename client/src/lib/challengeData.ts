import type { Challenge, Achievement, LeaderboardEntry } from './types';

export const challenges: Challenge[] = [
  // Data Science Category
  {
    id: "ds-001",
    title: "Customer Segmentation Analysis",
    description: `Analyze customer data to identify distinct customer segments for targeted marketing.

Given a dataset with customer demographics and purchase behavior, you need to:
1. Clean and preprocess the data
2. Perform exploratory data analysis
3. Implement customer segmentation using clustering
4. Interpret and explain the segments

Dataset includes: customer_id, age, income, spending_score, purchase_frequency

Expected Output: Customer segments with clear characteristics and business insights.

Business Context: This is a common data science task in retail and e-commerce for improving marketing strategies.`,
    category: "Data Science",
    difficulty: "Medium",
    tags: ["pandas", "clustering", "data-analysis", "marketing"],
    estimatedTime: 45,
    language: "python",
    startCode: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns

def analyze_customer_segments(df):
    """
    Perform customer segmentation analysis
    
    Args:
        df: DataFrame with columns ['customer_id', 'age', 'income', 'spending_score', 'purchase_frequency']
    
    Returns:
        dict: {
            'segments': DataFrame with segment assignments,
            'insights': list of key insights,
            'centroids': cluster centroids
        }
    """
    # TODO: Implement customer segmentation
    # 1. Data preprocessing and cleaning
    # 2. Feature scaling if needed
    # 3. Apply K-means clustering
    # 4. Analyze segment characteristics
    # 5. Generate business insights
    
    pass

# Sample data for testing
sample_data = {
    'customer_id': range(1, 101),
    'age': np.random.normal(35, 10, 100),
    'income': np.random.normal(50000, 15000, 100),
    'spending_score': np.random.randint(1, 101, 100),
    'purchase_frequency': np.random.poisson(5, 100)
}

df = pd.DataFrame(sample_data)
result = analyze_customer_segments(df)
print("Customer Segmentation Complete!")`,
    testCases: [
      {
        id: "ds-001-test-1",
        input: "DataFrame with 100 customers, 5 features",
        expected: "3-4 distinct customer segments identified",
        explanation: "Should identify logical customer segments like 'High Value', 'Budget Conscious', 'Frequent Buyers'"
      },
      {
        id: "ds-001-test-2", 
        input: "Small dataset with 20 customers",
        expected: "2-3 segments with clear characteristics",
        explanation: "Should handle smaller datasets and provide meaningful segmentation"
      },
      {
        id: "ds-001-test-3",
        input: "Dataset with missing values",
        expected: "Properly handles NaN values, segments remain valid",
        explanation: "Should implement proper data cleaning and handle missing data"
      }
    ],
    hints: [
      {
        id: "ds-001-hint-1",
        title: "Start with EDA",
        content: "Begin by exploring the data distribution, correlations, and outliers. This will inform your clustering approach.",
        unlockCondition: "always"
      },
      {
        id: "ds-001-hint-2", 
        title: "Feature Scaling",
        content: "Consider standardizing features since income and age have different scales. Use StandardScaler or MinMaxScaler.",
        unlockCondition: "failure"
      },
      {
        id: "ds-001-hint-3",
        title: "Elbow Method",
        content: "Use the elbow method or silhouette analysis to determine optimal number of clusters.",
        unlockCondition: "failure"
      }
    ],
    sampleSolution: {
      language: "python",
      code: `def analyze_customer_segments(df):
    from sklearn.preprocessing import StandardScaler
    from sklearn.metrics import silhouette_score
    
    # Data preprocessing
    df_clean = df.dropna()
    features = ['age', 'income', 'spending_score', 'purchase_frequency']
    X = df_clean[features]
    
    # Feature scaling
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Find optimal clusters using elbow method
    inertias = []
    K_range = range(2, 8)
    for k in K_range:
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(X_scaled)
        inertias.append(kmeans.inertia_)
    
    # Apply K-means with optimal clusters (assume 4)
    optimal_k = 4
    kmeans = KMeans(n_clusters=optimal_k, random_state=42)
    clusters = kmeans.fit_predict(X_scaled)
    
    # Add cluster assignments
    df_segments = df_clean.copy()
    df_segments['segment'] = clusters
    
    # Analyze segment characteristics
    segment_summary = df_segments.groupby('segment')[features].mean()
    
    # Generate insights
    insights = [
        "Segment 0: High-income, low-frequency buyers (Premium customers)",
        "Segment 1: Young, budget-conscious, frequent buyers", 
        "Segment 2: Middle-aged, moderate spending (Core customers)",
        "Segment 3: Low-income, occasional buyers (Price-sensitive)"
    ]
    
    return {
        'segments': df_segments,
        'insights': insights,
        'centroids': segment_summary
    }`,
      explanation: "This solution implements a complete customer segmentation pipeline using K-means clustering with proper data preprocessing, feature scaling, and business interpretation.",
      timeComplexity: "O(n*k*i) where n=samples, k=clusters, i=iterations",
      spaceComplexity: "O(n*f) where f=features"
    },
    points: 150
  },

  // Machine Learning Category
  {
    id: "ml-001",
    title: "Predictive Model for Churn Prevention",
    description: `Build a machine learning model to predict customer churn and identify key factors.

You need to:
1. Engineer features from raw customer data
2. Handle class imbalance in the dataset
3. Train and evaluate multiple models
4. Provide feature importance insights
5. Suggest actionable retention strategies

Features available: tenure, monthly_charges, total_charges, contract_type, payment_method, services_used

Success Metrics: Precision, Recall, F1-Score, AUC-ROC

Business Impact: Identify at-risk customers before they churn to implement retention strategies.`,
    category: "Machine Learning",
    difficulty: "Hard",
    tags: ["classification", "feature-engineering", "imbalanced-data", "model-evaluation"],
    estimatedTime: 60,
    language: "python",
    startCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.preprocessing import LabelEncoder, StandardScaler

def build_churn_model(df):
    """
    Build a customer churn prediction model
    
    Args:
        df: DataFrame with customer features and 'churn' target variable
    
    Returns:
        dict: {
            'model': trained model,
            'metrics': evaluation metrics,
            'feature_importance': feature importance scores,
            'recommendations': business recommendations
        }
    """
    # TODO: Implement churn prediction model
    # 1. Feature engineering and preprocessing
    # 2. Handle categorical variables
    # 3. Address class imbalance
    # 4. Train multiple models and compare
    # 5. Evaluate model performance
    # 6. Extract feature importance
    # 7. Generate business insights
    
    pass

# Sample churn dataset
sample_data = {
    'customer_id': range(1, 1001),
    'tenure': np.random.randint(1, 73, 1000),
    'monthly_charges': np.random.normal(65, 25, 1000),
    'total_charges': np.random.normal(2300, 1200, 1000),
    'contract_type': np.random.choice(['Monthly', 'One year', 'Two year'], 1000),
    'payment_method': np.random.choice(['Electronic check', 'Mailed check', 'Bank transfer', 'Credit card'], 1000),
    'services_used': np.random.randint(1, 8, 1000),
    'churn': np.random.choice([0, 1], 1000, p=[0.73, 0.27])  # Imbalanced dataset
}

df = pd.DataFrame(sample_data)
result = build_churn_model(df)
print("Churn Model Training Complete!")`,
    testCases: [
      {
        id: "ml-001-test-1",
        input: "Balanced dataset with clear patterns",
        expected: "F1-Score > 0.80, AUC-ROC > 0.85",
        explanation: "Should achieve good performance on balanced data with clear churn indicators"
      },
      {
        id: "ml-001-test-2",
        input: "Imbalanced dataset (73% non-churn, 27% churn)",
        expected: "Precision > 0.70, Recall > 0.65 for churn class",
        explanation: "Should handle class imbalance and provide balanced precision/recall"
      },
      {
        id: "ml-001-test-3",
        input: "Dataset with missing values and outliers",
        expected: "Robust preprocessing, model still performs well",
        explanation: "Should implement proper data cleaning and outlier handling"
      }
    ],
    hints: [
      {
        id: "ml-001-hint-1",
        title: "Feature Engineering",
        content: "Create derived features like 'charges_per_month', 'tenure_groups', and interaction terms between services.",
        unlockCondition: "always"
      },
      {
        id: "ml-001-hint-2",
        title: "Class Imbalance",
        content: "Use techniques like SMOTE, class weights, or stratified sampling to handle imbalanced data.",
        unlockCondition: "failure"
      },
      {
        id: "ml-001-hint-3",
        title: "Model Selection",
        content: "Compare Random Forest, Gradient Boosting, and Logistic Regression. Use cross-validation for reliable evaluation.",
        unlockCondition: "failure"
      }
    ],
    sampleSolution: {
      language: "python",
      code: `def build_churn_model(df):
    from sklearn.ensemble import GradientBoostingClassifier
    from sklearn.model_selection import cross_val_score
    from imblearn.over_sampling import SMOTE
    
    # Feature engineering
    df['charges_per_month'] = df['total_charges'] / (df['tenure'] + 1)
    df['tenure_group'] = pd.cut(df['tenure'], bins=[0, 12, 24, 48, 72], labels=['New', 'Medium', 'Long', 'Loyal'])
    
    # Preprocessing
    le = LabelEncoder()
    categorical_cols = ['contract_type', 'payment_method', 'tenure_group']
    for col in categorical_cols:
        df[col + '_encoded'] = le.fit_transform(df[col])
    
    # Feature selection
    features = ['tenure', 'monthly_charges', 'charges_per_month', 'services_used'] + [col + '_encoded' for col in categorical_cols]
    X = df[features]
    y = df['churn']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
    
    # Handle class imbalance with SMOTE
    smote = SMOTE(random_state=42)
    X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)
    
    # Train model
    model = GradientBoostingClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_balanced, y_train_balanced)
    
    # Evaluate
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    metrics = {
        'auc_roc': roc_auc_score(y_test, y_pred_proba),
        'classification_report': classification_report(y_test, y_pred, output_dict=True)
    }
    
    # Feature importance
    feature_importance = dict(zip(features, model.feature_importances_))
    
    # Business recommendations
    recommendations = [
        "Focus retention efforts on customers with high monthly charges and low tenure",
        "Offer incentives for long-term contracts to reduce churn risk",
        "Monitor customers with electronic check payments - higher churn risk",
        "Implement early intervention for customers in first 12 months"
    ]
    
    return {
        'model': model,
        'metrics': metrics,
        'feature_importance': feature_importance,
        'recommendations': recommendations
    }`,
      explanation: "This solution implements a complete churn prediction pipeline with feature engineering, class imbalance handling, and business insights generation.",
      timeComplexity: "O(n*log(n)*trees) for Gradient Boosting training",
      spaceComplexity: "O(n*features) for data storage and model"
    },
    points: 200
  },

  // Algorithms Category
  {
    id: "algo-001",
    title: "Dynamic Programming: Optimal Investment Strategy",
    description: `Solve the optimal investment allocation problem using dynamic programming.

Given:
- Available investment amount
- List of investment opportunities with expected returns and risk scores
- Maximum risk tolerance
- Investment periods

Find the optimal allocation strategy that maximizes returns while staying within risk limits.

This is a variation of the knapsack problem with additional constraints.

Real-world application: Portfolio optimization, resource allocation, budget planning.`,
    category: "Algorithms",
    difficulty: "Hard",
    tags: ["dynamic-programming", "optimization", "finance", "knapsack"],
    estimatedTime: 50,
    language: "python",
    startCode: `def optimal_investment_strategy(budget, investments, max_risk, periods):
    """
    Find optimal investment allocation using dynamic programming
    
    Args:
        budget: Available investment amount
        investments: List of dicts with 'amount', 'return', 'risk', 'name'
        max_risk: Maximum acceptable risk score
        periods: Number of investment periods
    
    Returns:
        dict: {
            'total_return': maximum achievable return,
            'selected_investments': list of selected investments,
            'risk_used': total risk score used,
            'allocation_table': DP table for analysis
        }
    """
    # TODO: Implement dynamic programming solution
    # 1. Define state: dp[i][budget][risk] = max return using first i investments
    # 2. Handle multiple constraints (budget and risk)
    # 3. Optimize for space complexity
    # 4. Track selected investments for reconstruction
    # 5. Consider investment periods for compound returns
    
    pass

# Sample investment opportunities
sample_investments = [
    {'name': 'Tech Stocks', 'amount': 1000, 'return': 0.15, 'risk': 8},
    {'name': 'Government Bonds', 'amount': 500, 'return': 0.04, 'risk': 1},
    {'name': 'Real Estate', 'amount': 2000, 'return': 0.12, 'risk': 5},
    {'name': 'Cryptocurrency', 'amount': 800, 'return': 0.25, 'risk': 10},
    {'name': 'Index Funds', 'amount': 1200, 'return': 0.08, 'risk': 3},
    {'name': 'Commodities', 'amount': 600, 'return': 0.10, 'risk': 6}
]

result = optimal_investment_strategy(
    budget=5000, 
    investments=sample_investments, 
    max_risk=20, 
    periods=1
)
print(f"Optimal Strategy: {result}")`,
    testCases: [
      {
        id: "algo-001-test-1",
        input: "Budget: 5000, Max Risk: 20, 6 investment options",
        expected: "Optimal selection maximizing return within constraints",
        explanation: "Should select investments that maximize return while staying within risk limit"
      },
      {
        id: "algo-001-test-2",
        input: "Low risk tolerance (max_risk = 10)",
        expected: "Conservative portfolio with lower returns but acceptable risk",
        explanation: "Should prioritize low-risk investments when risk tolerance is limited"
      },
      {
        id: "algo-001-test-3",
        input: "Multiple periods with compound growth",
        expected: "Accounts for compound returns over multiple periods",
        explanation: "Should calculate returns considering compound growth over time"
      }
    ],
    hints: [
      {
        id: "algo-001-hint-1",
        title: "State Definition",
        content: "Define your DP state as dp[i][w][r] where i=investment index, w=remaining budget, r=remaining risk capacity.",
        unlockCondition: "always"
      },
      {
        id: "algo-001-hint-2",
        title: "Space Optimization",
        content: "Use 2D DP instead of 3D by processing investments one at a time and using rolling arrays.",
        unlockCondition: "failure"
      },
      {
        id: "algo-001-hint-3",
        title: "Backtracking",
        content: "Keep track of choices made to reconstruct the optimal investment selection.",
        unlockCondition: "failure"
      }
    ],
    sampleSolution: {
      language: "python",
      code: `def optimal_investment_strategy(budget, investments, max_risk, periods):
    n = len(investments)
    
    # Initialize DP table: dp[budget][risk] = max_return
    dp = [[0 for _ in range(max_risk + 1)] for _ in range(budget + 1)]
    selected = [[[] for _ in range(max_risk + 1)] for _ in range(budget + 1)]
    
    # Fill DP table
    for i, inv in enumerate(investments):
        amount, return_rate, risk = inv['amount'], inv['return'], inv['risk']
        
        # Process in reverse to avoid using same investment multiple times
        for w in range(budget, amount - 1, -1):
            for r in range(max_risk, risk - 1, -1):
                # Calculate compound return over periods
                compound_return = amount * ((1 + return_rate) ** periods - 1)
                
                if dp[w - amount][r - risk] + compound_return > dp[w][r]:
                    dp[w][r] = dp[w - amount][r - risk] + compound_return
                    selected[w][r] = selected[w - amount][r - risk] + [inv]
    
    # Find optimal solution
    max_return = dp[budget][max_risk]
    optimal_investments = selected[budget][max_risk]
    
    # Calculate actual risk and budget used
    total_risk = sum(inv['risk'] for inv in optimal_investments)
    total_amount = sum(inv['amount'] for inv in optimal_investments)
    
    return {
        'total_return': max_return,
        'selected_investments': [inv['name'] for inv in optimal_investments],
        'risk_used': total_risk,
        'budget_used': total_amount,
        'allocation_table': dp
    }`,
      explanation: "This solution uses 2D DP to solve the multi-constraint knapsack problem, optimizing for both budget and risk constraints while considering compound returns.",
      timeComplexity: "O(n * budget * max_risk)",
      spaceComplexity: "O(budget * max_risk)"
    },
    points: 250
  },

  // Web Development Category
  {
    id: "web-001",
    title: "Build a Real-time Data Dashboard API",
    description: `Create a RESTful API for a real-time analytics dashboard with the following requirements:

1. **Data Endpoints**: Create endpoints for user metrics, sales data, and system health
2. **Real-time Updates**: Implement WebSocket connections for live data streaming
3. **Data Aggregation**: Provide endpoints for time-series data aggregation
4. **Caching Strategy**: Implement Redis-like caching for frequently accessed data
5. **Rate Limiting**: Add rate limiting to prevent API abuse
6. **Error Handling**: Comprehensive error handling with appropriate HTTP status codes

API Endpoints needed:
- GET /api/metrics/users - User activity metrics
- GET /api/metrics/sales - Sales performance data  
- POST /api/metrics/events - Log custom events
- WebSocket /ws/live-data - Real-time data stream

Technical Requirements: Express.js, middleware implementation, data validation, performance optimization.`,
    category: "Web Development",
    difficulty: "Medium",
    tags: ["api", "express", "websockets", "caching", "performance"],
    estimatedTime: 55,
    language: "javascript",
    startCode: `const express = require('express');
const http = require('http');
const WebSocket = require('ws');

class DataDashboardAPI {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });
        this.cache = new Map(); // Simple cache implementation
        this.rateLimitMap = new Map(); // Rate limiting tracker
        
        this.setupMiddleware();
        this.setupRoutes();
        this.setupWebSockets();
    }
    
    setupMiddleware() {
        // TODO: Implement middleware for:
        // - JSON parsing
        // - CORS handling  
        // - Rate limiting
        // - Error handling
        // - Request logging
    }
    
    setupRoutes() {
        // TODO: Implement API routes:
        // - GET /api/metrics/users
        // - GET /api/metrics/sales
        // - POST /api/metrics/events
        // - GET /api/health
    }
    
    setupWebSockets() {
        // TODO: Implement WebSocket handling for real-time data
    }
    
    // Cache management
    getCachedData(key) {
        // TODO: Implement cache retrieval with TTL
    }
    
    setCachedData(key, data, ttl = 300) {
        // TODO: Implement cache storage with expiration
    }
    
    // Rate limiting
    isRateLimited(clientId, limit = 100, window = 3600) {
        // TODO: Implement rate limiting logic
    }
    
    // Data aggregation
    aggregateTimeSeriesData(data, interval = 'hour') {
        // TODO: Implement time-series data aggregation
    }
    
    start(port = 3000) {
        this.server.listen(port, () => {
            console.log(\`Dashboard API running on port \${port}\`);
        });
    }
}

// Sample usage
const dashboard = new DataDashboardAPI();
dashboard.start();

module.exports = DataDashboardAPI;`,
    testCases: [
      {
        id: "web-001-test-1",
        input: "GET request to /api/metrics/users",
        expected: "JSON response with user metrics and 200 status",
        explanation: "Should return properly formatted user activity data"
      },
      {
        id: "web-001-test-2",
        input: "Rapid successive API calls (rate limiting test)",
        expected: "429 status after rate limit exceeded",
        explanation: "Should enforce rate limiting and return appropriate error"
      },
      {
        id: "web-001-test-3",
        input: "WebSocket connection for real-time data",
        expected: "Successful connection and periodic data updates",
        explanation: "Should establish WebSocket connection and stream live data"
      }
    ],
    hints: [
      {
        id: "web-001-hint-1",
        title: "Middleware Setup",
        content: "Use express.json() for body parsing, implement custom rate limiting middleware, and add proper CORS headers.",
        unlockCondition: "always"
      },
      {
        id: "web-001-hint-2",
        title: "Error Handling",
        content: "Create a centralized error handler middleware that catches all errors and returns consistent JSON responses.",
        unlockCondition: "failure"
      },
      {
        id: "web-001-hint-3",
        title: "WebSocket Management",
        content: "Track connected clients, implement heartbeat mechanism, and broadcast data efficiently to all connected clients.",
        unlockCondition: "failure"
      }
    ],
    sampleSolution: {
      language: "javascript",
      code: `class DataDashboardAPI {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });
        this.cache = new Map();
        this.rateLimitMap = new Map();
        this.clients = new Set();
        
        this.setupMiddleware();
        this.setupRoutes();
        this.setupWebSockets();
        this.startDataStream();
    }
    
    setupMiddleware() {
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
            next();
        });
        
        // Rate limiting middleware
        this.app.use((req, res, next) => {
            const clientIP = req.ip;
            if (this.isRateLimited(clientIP)) {
                return res.status(429).json({ error: 'Rate limit exceeded' });
            }
            next();
        });
    }
    
    setupRoutes() {
        this.app.get('/api/metrics/users', (req, res) => {
            const cached = this.getCachedData('user_metrics');
            if (cached) return res.json(cached);
            
            const data = {
                active_users: Math.floor(Math.random() * 1000) + 500,
                new_signups: Math.floor(Math.random() * 50) + 10,
                retention_rate: (Math.random() * 20 + 80).toFixed(2),
                timestamp: new Date().toISOString()
            };
            
            this.setCachedData('user_metrics', data, 60);
            res.json(data);
        });
        
        this.app.get('/api/metrics/sales', (req, res) => {
            const data = {
                total_revenue: Math.floor(Math.random() * 100000) + 50000,
                orders_count: Math.floor(Math.random() * 200) + 100,
                conversion_rate: (Math.random() * 5 + 2).toFixed(2),
                timestamp: new Date().toISOString()
            };
            res.json(data);
        });
        
        this.app.post('/api/metrics/events', (req, res) => {
            const { event_type, data } = req.body;
            if (!event_type) {
                return res.status(400).json({ error: 'event_type is required' });
            }
            
            // Broadcast to WebSocket clients
            this.broadcast({ type: 'custom_event', event_type, data });
            res.status(201).json({ message: 'Event logged successfully' });
        });
    }
    
    setupWebSockets() {
        this.wss.on('connection', (ws) => {
            this.clients.add(ws);
            
            ws.on('close', () => {
                this.clients.delete(ws);
            });
            
            // Send initial data
            ws.send(JSON.stringify({
                type: 'connected',
                message: 'Real-time data stream connected'
            }));
        });
    }
    
    getCachedData(key) {
        const item = this.cache.get(key);
        if (item && Date.now() < item.expiry) {
            return item.data;
        }
        this.cache.delete(key);
        return null;
    }
    
    setCachedData(key, data, ttl = 300) {
        this.cache.set(key, {
            data,
            expiry: Date.now() + (ttl * 1000)
        });
    }
    
    isRateLimited(clientId, limit = 100, window = 3600) {
        const now = Date.now();
        const windowStart = now - (window * 1000);
        
        if (!this.rateLimitMap.has(clientId)) {
            this.rateLimitMap.set(clientId, []);
        }
        
        const requests = this.rateLimitMap.get(clientId);
        const validRequests = requests.filter(time => time > windowStart);
        
        if (validRequests.length >= limit) {
            return true;
        }
        
        validRequests.push(now);
        this.rateLimitMap.set(clientId, validRequests);
        return false;
    }
    
    broadcast(data) {
        const message = JSON.stringify(data);
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
    
    startDataStream() {
        setInterval(() => {
            const liveData = {
                type: 'metrics_update',
                data: {
                    cpu_usage: (Math.random() * 100).toFixed(2),
                    memory_usage: (Math.random() * 100).toFixed(2),
                    active_connections: this.clients.size,
                    timestamp: new Date().toISOString()
                }
            };
            this.broadcast(liveData);
        }, 5000);
    }
}`,
      explanation: "This solution implements a complete real-time dashboard API with caching, rate limiting, WebSocket support, and proper error handling using Express.js patterns.",
      timeComplexity: "O(1) for most operations, O(n) for broadcasts where n=connected clients",
      spaceComplexity: "O(m + c) where m=cached items, c=connected clients"
    },
    points: 180
  }
];

export const achievements: Achievement[] = [
  {
    id: "first_solve",
    title: "Problem Solver",
    description: "Solved your first coding challenge",
    icon: "🏆",
    condition: "Complete any challenge"
  },
  {
    id: "data_scientist",
    title: "Data Scientist",
    description: "Completed all Data Science challenges",
    icon: "📊",
    condition: "Complete all challenges in Data Science category"
  },
  {
    id: "ml_engineer", 
    title: "ML Engineer",
    description: "Mastered Machine Learning challenges",
    icon: "🤖",
    condition: "Complete all challenges in Machine Learning category"
  },
  {
    id: "algorithm_master",
    title: "Algorithm Master", 
    description: "Conquered all Algorithm challenges",
    icon: "⚡",
    condition: "Complete all challenges in Algorithms category"
  },
  {
    id: "fullstack_dev",
    title: "Full Stack Developer",
    description: "Completed all Web Development challenges", 
    icon: "💻",
    condition: "Complete all challenges in Web Development category"
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Solved a challenge in under 10 minutes",
    icon: "🚀",
    condition: "Complete any challenge under 10 minutes"
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Achieved 100% test case pass rate on first try",
    icon: "💯",
    condition: "Pass all test cases on first submission"
  },
  {
    id: "streak_master",
    title: "Streak Master",
    description: "Maintained a 7-day solving streak",
    icon: "🔥",
    condition: "Solve challenges for 7 consecutive days"
  },
  {
    id: "point_collector",
    title: "Point Collector",
    description: "Earned 1000 total points",
    icon: "💎",
    condition: "Accumulate 1000 points across all challenges"
  },
  {
    id: "mentor",
    title: "Code Mentor",
    description: "Helped improve 5 sample solutions",
    icon: "🎓",
    condition: "Contribute to community solutions"
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "DataWizard2024",
    totalPoints: 1250,
    challengesCompleted: 8,
    currentStreak: 12,
    averageTime: 32,
    achievements: 7,
    isCurrentUser: false
  },
  {
    rank: 2, 
    username: "MLMaster_Pro",
    totalPoints: 1180,
    challengesCompleted: 7,
    currentStreak: 8,
    averageTime: 28,
    achievements: 6,
    isCurrentUser: false
  },
  {
    rank: 3,
    username: "CodeNinja_X",
    totalPoints: 1050,
    challengesCompleted: 6,
    currentStreak: 15,
    averageTime: 41,
    achievements: 5,
    isCurrentUser: false
  },
  {
    rank: 4,
    username: "TinotendaH",
    totalPoints: 980,
    challengesCompleted: 5,
    currentStreak: 5,
    averageTime: 38,
    achievements: 4,
    isCurrentUser: true
  },
  {
    rank: 5,
    username: "AlgoExpert_99",
    totalPoints: 920,
    challengesCompleted: 5,
    currentStreak: 3,
    averageTime: 45,
    achievements: 4,
    isCurrentUser: false
  },
  {
    rank: 6,
    username: "PythonGuru",
    totalPoints: 875,
    challengesCompleted: 4,
    currentStreak: 7,
    averageTime: 35,
    achievements: 3,
    isCurrentUser: false
  },
  {
    rank: 7,
    username: "DevOps_Legend", 
    totalPoints: 820,
    challengesCompleted: 4,
    currentStreak: 2,
    averageTime: 52,
    achievements: 3,
    isCurrentUser: false
  },
  {
    rank: 8,
    username: "StartupCTO",
    totalPoints: 780,
    challengesCompleted: 3,
    currentStreak: 4,
    averageTime: 48,
    achievements: 2,
    isCurrentUser: false
  }
];
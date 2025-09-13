import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ZAxis, Cell, PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';
import { Brain, PlayCircle, RefreshCw, Database, Loader2, PenTool } from "lucide-react";

// Define types for our models
type LinearRegressionDemo = {
  // Input parameters
  slope: number;
  intercept: number;
  noise: number;
  // Generated data
  dataPoints: Array<{x: number, y: number}>;
  prediction: Array<{x: number, y: number}>;
  metrics: {
    r2: number;
    mse: number;
  };
};

type ClassificationDemo = {
  // Input parameters
  decisionBoundary: number;
  complexity: number;
  // Generated data
  dataPoints: Array<{x: number, y: number, category: number}>;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
  };
};

type ClusteringDemo = {
  // Input parameters
  clusters: number;
  separation: number;
  // Generated data
  dataPoints: Array<{x: number, y: number, cluster: number}>;
  centroids: Array<{x: number, y: number, cluster: number}>;
  metrics: {
    silhouette: number;
    inertia: number;
  };
};

export default function MLDemo() {
  const [activeTab, setActiveTab] = useState("regression");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // State for Linear Regression model
  const [regression, setRegression] = useState<LinearRegressionDemo>({
    slope: 2,
    intercept: 5,
    noise: 3,
    dataPoints: Array.from({ length: 50 }, (_, i) => {
      const x = i / 5;
      // y = mx + b + noise
      const noise = (Math.random() - 0.5) * 3;
      return {
        x,
        y: 2 * x + 5 + noise,
      };
    }),
    prediction: Array.from({ length: 50 }, (_, i) => {
      const x = i / 5;
      return {
        x,
        y: 2 * x + 5,
      };
    }),
    metrics: {
      r2: 0.94,
      mse: 0.78,
    },
  });
  
  // State for Classification model
  const [classification, setClassification] = useState<ClassificationDemo>({
    decisionBoundary: 0,
    complexity: 5,
    dataPoints: Array.from({ length: 100 }, () => {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      // Simple decision boundary: y > 0
      const category = y > 0 ? 1 : 0;
      return { x, y, category };
    }),
    metrics: {
      accuracy: 0.85,
      precision: 0.87,
      recall: 0.82,
    },
  });
  
  // State for Clustering model
  const [clustering, setClustering] = useState<ClusteringDemo>({
    clusters: 3,
    separation: 7,
    dataPoints: [
      // Generate 3 clusters
      ...Array.from({ length: 30 }, () => ({
        x: Math.random() * 4 - 8,
        y: Math.random() * 4 - 8,
        cluster: 0,
      })),
      ...Array.from({ length: 30 }, () => ({
        x: Math.random() * 4 + 4,
        y: Math.random() * 4 - 8,
        cluster: 1,
      })),
      ...Array.from({ length: 30 }, () => ({
        x: Math.random() * 4 - 2,
        y: Math.random() * 4 + 4,
        cluster: 2,
      })),
    ],
    centroids: [
      { x: -6, y: -6, cluster: 0 },
      { x: 6, y: -6, cluster: 1 },
      { x: 0, y: 6, cluster: 2 },
    ],
    metrics: {
      silhouette: 0.72,
      inertia: 245.3,
    },
  });
  
  // Generate new data based on parameters
  const regenerateRegressionData = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Generate new data points with the current parameters
      const newDataPoints = Array.from({ length: 50 }, (_, i) => {
        const x = i / 5;
        const noise = (Math.random() - 0.5) * regression.noise * 2;
        return {
          x,
          y: regression.slope * x + regression.intercept + noise,
        };
      });
      
      const newPrediction = Array.from({ length: 50 }, (_, i) => {
        const x = i / 5;
        return {
          x,
          y: regression.slope * x + regression.intercept,
        };
      });
      
      // Calculate new metrics (simplified)
      const r2 = Math.max(0, 1 - (regression.noise / 10) * Math.random());
      const mse = regression.noise * (0.5 + Math.random() * 0.5);
      
      setRegression({
        ...regression,
        dataPoints: newDataPoints,
        prediction: newPrediction,
        metrics: {
          r2,
          mse,
        },
      });
      
      setIsProcessing(false);
    }, 1000);
  };
  
  const regenerateClassificationData = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Generate new data with the current complexity and decision boundary
      const boundaryOffset = classification.decisionBoundary * 5; // Scale for better visualization
      const complexity = classification.complexity;
      
      const newDataPoints = Array.from({ length: 100 }, () => {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        
        // More complex decision boundary based on parameters
        let category;
        if (complexity <= 3) {
          // Linear boundary
          category = y > boundaryOffset ? 1 : 0;
        } else if (complexity <= 7) {
          // Curved boundary
          category = y > Math.sin(x) + boundaryOffset ? 1 : 0;
        } else {
          // More complex boundary
          category = y > Math.sin(x * 2) + boundaryOffset ? 1 : 0;
        }
        
        // Add some noise/errors
        if (Math.random() < 0.1) {
          category = 1 - category; // Flip 10% of labels for realism
        }
        
        return { x, y, category };
      });
      
      // Calculate new metrics
      const accuracy = 0.9 - (complexity / 20) - Math.abs(boundaryOffset / 20);
      const precision = accuracy - 0.05 + Math.random() * 0.1;
      const recall = accuracy - 0.05 + Math.random() * 0.1;
      
      setClassification({
        ...classification,
        dataPoints: newDataPoints,
        metrics: {
          accuracy: Math.max(0.5, accuracy),
          precision: Math.max(0.5, precision),
          recall: Math.max(0.5, recall),
        },
      });
      
      setIsProcessing(false);
    }, 1000);
  };
  
  const regenerateClusteringData = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Generate new centroids based on separation parameter
      const separation = clustering.separation;
      const k = Math.max(2, Math.min(5, clustering.clusters)); // Limit to 2-5 clusters
      
      const angles = Array.from({ length: k }, (_, i) => (2 * Math.PI * i) / k);
      const newCentroids = angles.map((angle, i) => ({
        x: Math.cos(angle) * separation,
        y: Math.sin(angle) * separation,
        cluster: i,
      }));
      
      // Generate data points around the centroids
      const pointsPerCluster = Math.floor(100 / k);
      const newDataPoints = newCentroids.flatMap((centroid, clusterIndex) => 
        Array.from({ length: pointsPerCluster }, () => {
          const scatter = separation / 5 + Math.random() * 2;
          return {
            x: centroid.x + (Math.random() - 0.5) * scatter,
            y: centroid.y + (Math.random() - 0.5) * scatter,
            cluster: clusterIndex,
          };
        })
      );
      
      // Calculate metrics
      const silhouette = 0.9 - (0.2 / separation) - (k * 0.05);
      const inertia = newDataPoints.length * (1 / separation) * 100 * k;
      
      setClustering({
        ...clustering,
        dataPoints: newDataPoints,
        centroids: newCentroids,
        metrics: {
          silhouette: Math.max(0, Math.min(1, silhouette)),
          inertia: Math.max(10, inertia),
        },
      });
      
      setIsProcessing(false);
    }, 1000);
  };
  
  const renderRegressionDemo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Linear Regression Model</CardTitle>
          <CardDescription>
            Adjust parameters to see how a linear regression model fits data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label>Slope (m)</Label>
              <span className="text-sm font-mono">{regression.slope.toFixed(1)}</span>
            </div>
            <Slider
              value={[regression.slope]}
              min={-5}
              max={5}
              step={0.1}
              onValueChange={(value) => setRegression({ ...regression, slope: value[0] })}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label>Intercept (b)</Label>
              <span className="text-sm font-mono">{regression.intercept.toFixed(1)}</span>
            </div>
            <Slider
              value={[regression.intercept]}
              min={-10}
              max={10}
              step={0.1}
              onValueChange={(value) => setRegression({ ...regression, intercept: value[0] })}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label>Noise Level</Label>
              <span className="text-sm font-mono">{regression.noise.toFixed(1)}</span>
            </div>
            <Slider
              value={[regression.noise]}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(value) => setRegression({ ...regression, noise: value[0] })}
            />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={regenerateRegressionData} 
              className="w-full gap-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PlayCircle size={16} />
              )}
              Generate Data & Fit Model
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 flex-col items-start">
          <h4 className="font-medium text-sm mb-2">Performance Metrics:</h4>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <div className="text-xs text-gray-500 mb-1">R² Score</div>
              <div className="flex items-center justify-between">
                <Progress value={regression.metrics.r2 * 100} className="w-[60%]" />
                <Badge variant="outline" className="ml-2">
                  {regression.metrics.r2.toFixed(2)}
                </Badge>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">MSE</div>
              <div className="flex items-center justify-between">
                <Progress 
                  value={Math.max(0, 100 - regression.metrics.mse * 10)} 
                  className="w-[60%]" 
                />
                <Badge variant="outline" className="ml-2">
                  {regression.metrics.mse.toFixed(2)}
                </Badge>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Model Visualization</CardTitle>
          <CardDescription>
            Scatter plot showing data points and regression line: y = {regression.slope.toFixed(1)}x + {regression.intercept.toFixed(1)}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="X" 
                label={{ value: 'X', position: 'bottom' }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Y" 
                label={{ value: 'Y', angle: -90, position: 'left' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Data Points" data={regression.dataPoints} fill="#8884d8" />
              <Line
                type="monotone"
                dataKey="y"
                data={regression.prediction}
                stroke="#ff7300"
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="border-t bg-gray-50">
          <div className="text-xs text-gray-500 w-full">
            <p>This demonstrates how a linear regression model finds the best fit line through data points.</p>
            <p className="mt-1">The equation of this line is: <span className="font-mono">y = {regression.slope.toFixed(1)}x + {regression.intercept.toFixed(1)}</span></p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
  
  const renderClassificationDemo = () => {
    // Create color array for classification visualization
    const COLORS = ['#0088FE', '#FF8042'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Classification Model</CardTitle>
            <CardDescription>
              Adjust parameters to see how a classifier separates data points
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Decision Boundary Position</Label>
                <span className="text-sm font-mono">{classification.decisionBoundary.toFixed(1)}</span>
              </div>
              <Slider
                value={[classification.decisionBoundary]}
                min={-2}
                max={2}
                step={0.1}
                onValueChange={(value) => setClassification({ ...classification, decisionBoundary: value[0] })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label>Model Complexity</Label>
                <span className="text-sm font-mono">{classification.complexity.toFixed(1)}</span>
              </div>
              <Slider
                value={[classification.complexity]}
                min={1}
                max={10}
                step={0.1}
                onValueChange={(value) => setClassification({ ...classification, complexity: value[0] })}
              />
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={regenerateClassificationData} 
                className="w-full gap-2"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <PlayCircle size={16} />
                )}
                Generate Data & Classify
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 flex-col items-start">
            <h4 className="font-medium text-sm mb-2">Performance Metrics:</h4>
            <div className="grid grid-cols-3 gap-2 w-full">
              <div>
                <div className="text-xs text-gray-500 mb-1">Accuracy</div>
                <div className="flex items-center justify-between">
                  <Progress value={classification.metrics.accuracy * 100} className="w-[60%]" />
                  <Badge variant="outline" className="ml-1 text-xs">
                    {(classification.metrics.accuracy * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Precision</div>
                <div className="flex items-center justify-between">
                  <Progress value={classification.metrics.precision * 100} className="w-[60%]" />
                  <Badge variant="outline" className="ml-1 text-xs">
                    {(classification.metrics.precision * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Recall</div>
                <div className="flex items-center justify-between">
                  <Progress value={classification.metrics.recall * 100} className="w-[60%]" />
                  <Badge variant="outline" className="ml-1 text-xs">
                    {(classification.metrics.recall * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Model Visualization</CardTitle>
            <CardDescription>
              Scatter plot showing classified data points
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="X" 
                  domain={[-5, 5]}
                  label={{ value: 'Feature 1', position: 'bottom' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Y" 
                  domain={[-5, 5]}
                  label={{ value: 'Feature 2', angle: -90, position: 'left' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value: any, name: string) => [value, name === 'category' ? 'Class' : name]}
                  labelFormatter={() => 'Data Point'}
                />
                <Scatter name="Classes" data={classification.dataPoints}>
                  {classification.dataPoints.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.category]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="border-t bg-gray-50">
            <div className="text-xs text-gray-500 w-full">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#0088FE] rounded-full mr-1"></div>
                  <span>Class 0</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#FF8042] rounded-full mr-1"></div>
                  <span>Class 1</span>
                </div>
              </div>
              <p className="mt-2">
                The model tries to find a boundary that separates the two classes. Higher complexity models can create more intricate boundaries.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  const renderClusteringDemo = () => {
    // Define colors for clusters
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9C27B0'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Clustering Model</CardTitle>
            <CardDescription>
              Adjust parameters to see how a clustering algorithm groups data points
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Number of Clusters (K)</Label>
                <span className="text-sm font-mono">{Math.round(clustering.clusters)}</span>
              </div>
              <Slider
                value={[clustering.clusters]}
                min={2}
                max={5}
                step={1}
                onValueChange={(value) => setClustering({ ...clustering, clusters: value[0] })}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label>Cluster Separation</Label>
                <span className="text-sm font-mono">{clustering.separation.toFixed(1)}</span>
              </div>
              <Slider
                value={[clustering.separation]}
                min={2}
                max={10}
                step={0.5}
                onValueChange={(value) => setClustering({ ...clustering, separation: value[0] })}
              />
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={regenerateClusteringData} 
                className="w-full gap-2"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <PlayCircle size={16} />
                )}
                Generate Data & Cluster
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 flex-col items-start">
            <h4 className="font-medium text-sm mb-2">Performance Metrics:</h4>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <div className="text-xs text-gray-500 mb-1">Silhouette Score</div>
                <div className="flex items-center justify-between">
                  <Progress value={clustering.metrics.silhouette * 100} className="w-[60%]" />
                  <Badge variant="outline" className="ml-2">
                    {clustering.metrics.silhouette.toFixed(2)}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Inertia</div>
                <div className="flex items-center justify-between">
                  <Progress 
                    value={Math.max(0, 100 - (clustering.metrics.inertia / 10))} 
                    className="w-[60%]" 
                  />
                  <Badge variant="outline" className="ml-2">
                    {clustering.metrics.inertia.toFixed(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Model Visualization</CardTitle>
            <CardDescription>
              Scatter plot showing clustered data points with centroids
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="X" 
                  domain={[-15, 15]}
                  label={{ value: 'Feature 1', position: 'bottom' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Y" 
                  domain={[-15, 15]}
                  label={{ value: 'Feature 2', angle: -90, position: 'left' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value: any, name: string) => [value, name === 'cluster' ? 'Cluster' : name]}
                />
                <Scatter name="Clusters" data={clustering.dataPoints}>
                  {clustering.dataPoints.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.cluster % COLORS.length]} 
                    />
                  ))}
                </Scatter>
                <Scatter 
                  name="Centroids" 
                  data={clustering.centroids} 
                  shape="star" 
                  dataKey="cluster" 
                >
                  {clustering.centroids.map((entry, index) => (
                    <Cell 
                      key={`centroid-${index}`} 
                      fill={COLORS[entry.cluster % COLORS.length]}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter className="border-t bg-gray-50">
            <div className="text-xs text-gray-500 w-full">
              <div className="flex flex-wrap gap-2 mb-2">
                {Array.from({ length: Math.round(clustering.clusters) }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-1" 
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    ></div>
                    <span>Cluster {i}</span>
                  </div>
                ))}
              </div>
              <p>
                Stars represent cluster centroids. The algorithm tries to group similar points together 
                while keeping different clusters separate.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };
    
  return (
    <section id="ml-demo" className="py-16 bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
          <h2 className="text-3xl font-bold mb-4 text-white">Interactive ML Models</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Explore machine learning concepts through interactive visualizations and real-time model training
          </p>
        </motion.div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="regression" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Regression</span>
            </TabsTrigger>
            <TabsTrigger value="classification" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              <span className="hidden sm:inline">Classification</span>
            </TabsTrigger>
            <TabsTrigger value="clustering" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Clustering</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="regression">
            {renderRegressionDemo()}
          </TabsContent>
          
          <TabsContent value="classification">
            {renderClassificationDemo()}
          </TabsContent>
          
          <TabsContent value="clustering">
            {renderClusteringDemo()}
          </TabsContent>
        </Tabs>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center text-sm text-blue-700 mt-8">
          <p>
            These interactive models demonstrate the core concepts of machine learning without requiring any background 
            in data science. The visualizations use simplified algorithms to showcase how models learn patterns from data.
          </p>
        </div>
      </div>
    </section>
  );
}
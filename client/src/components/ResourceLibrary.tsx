import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Database, FileSpreadsheet, FileText, Download, BookOpen, Search, Loader2, Code } from "lucide-react";

// Define types for resources
type ResourceType = "dataset" | "starter_code" | "tutorial";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  createdAt: string;
  tags?: string[];
  size?: string;
  format?: string;
  author?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export default function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ResourceType | "all">("all");
  
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['/api/resources'],
    select: (data) => data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  });
  
  // Filter resources based on search query and selected tab
  const filteredResources = (resources as Resource[]).filter((resource) => {
    const matchesSearch = 
      searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesTab = activeTab === "all" || resource.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  // Mock datasets for now
  const mockResources: Resource[] = [
    {
      id: 1,
      title: "COVID-19 Case Data",
      description: "A comprehensive dataset of COVID-19 cases, deaths, and recoveries by country and date.",
      type: "dataset",
      url: "https://example.com/covid19-dataset.csv",
      createdAt: "2023-01-15T10:00:00Z",
      tags: ["COVID-19", "health", "timeseries"],
      size: "24.5 MB",
      format: "CSV",
    },
    {
      id: 2,
      title: "Stock Market Prediction Starter Code",
      description: "A Python notebook with pre-built functions for preprocessing financial data and implementing basic prediction models.",
      type: "starter_code",
      url: "https://example.com/stock-prediction.ipynb",
      createdAt: "2023-02-20T14:30:00Z",
      tags: ["finance", "prediction", "timeseries"],
      author: "Tinotenda Biningu",
      difficulty: "intermediate",
    },
    {
      id: 3,
      title: "Introduction to Data Visualization with Python",
      description: "A comprehensive tutorial on creating effective data visualizations using Matplotlib and Seaborn.",
      type: "tutorial",
      url: "https://example.com/data-viz-tutorial",
      createdAt: "2023-03-10T09:15:00Z",
      tags: ["visualization", "matplotlib", "seaborn"],
      author: "Tinotenda Biningu",
      difficulty: "beginner",
    },
    {
      id: 4,
      title: "US Housing Prices Dataset",
      description: "Historical housing price data for major US metropolitan areas from 1970 to present.",
      type: "dataset",
      url: "https://example.com/housing-dataset.csv",
      createdAt: "2023-04-05T11:45:00Z",
      tags: ["housing", "economics", "timeseries"],
      size: "156 MB",
      format: "CSV, JSON",
    },
    {
      id: 5,
      title: "Natural Language Processing Toolkit",
      description: "Starter code for text classification, sentiment analysis, and entity recognition tasks.",
      type: "starter_code",
      url: "https://example.com/nlp-toolkit.zip",
      createdAt: "2023-05-12T16:20:00Z",
      tags: ["NLP", "machine learning", "text processing"],
      author: "Tinotenda Biningu",
      difficulty: "advanced",
    },
    {
      id: 6,
      title: "Building Your First Machine Learning Pipeline",
      description: "Step-by-step tutorial on creating an end-to-end ML pipeline with data preprocessing, model training, and evaluation.",
      type: "tutorial",
      url: "https://example.com/ml-pipeline-tutorial",
      createdAt: "2023-06-22T08:30:00Z",
      tags: ["machine learning", "pipeline", "scikit-learn"],
      author: "Tinotenda Biningu",
      difficulty: "intermediate",
    },
    {
      id: 7,
      title: "Global Climate Change Indicators",
      description: "Comprehensive dataset of temperature, CO2 levels, sea levels, and other climate change indicators.",
      type: "dataset",
      url: "https://example.com/climate-dataset.zip",
      createdAt: "2023-07-18T13:10:00Z",
      tags: ["climate", "environment", "global"],
      size: "78.2 MB",
      format: "CSV, NetCDF",
    },
    {
      id: 8,
      title: "Data Cleaning and Preprocessing Templates",
      description: "Ready-to-use code templates for handling missing values, outliers, and feature engineering.",
      type: "starter_code",
      url: "https://example.com/data-cleaning-templates.py",
      createdAt: "2023-08-30T15:45:00Z",
      tags: ["data cleaning", "preprocessing", "pandas"],
      author: "Tinotenda Biningu",
      difficulty: "beginner",
    }
  ];
  
  // If we don't have real data yet, use the mock data
  const displayResources = filteredResources.length > 0 ? filteredResources : mockResources.filter((resource) => {
    const matchesSearch = 
      searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesTab = activeTab === "all" || resource.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  // Icons for resource types
  const resourceTypeIcons = {
    dataset: <Database className="h-5 w-5" />,
    starter_code: <Code className="h-5 w-5" />,
    tutorial: <BookOpen className="h-5 w-5" />,
  };
  
  // Colors for resource types
  const resourceTypeBadgeVariants = {
    dataset: "default",
    starter_code: "secondary",
    tutorial: "outline",
  } as const;
  
  // Format resource type for display
  const formatResourceType = (type: ResourceType) => {
    return {
      dataset: "Dataset",
      starter_code: "Starter Code",
      tutorial: "Tutorial",
    }[type];
  };
  
  // Function to render a resource card
  const renderResourceCard = (resource: Resource) => (
    <Card key={resource.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Badge variant={resourceTypeBadgeVariants[resource.type] || "default"} className="flex items-center gap-1">
            {resourceTypeIcons[resource.type]}
            {formatResourceType(resource.type)}
          </Badge>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mt-1">
          {resource.tags && resource.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {resource.size && (
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-gray-500" />
              <span>Size: {resource.size}</span>
            </div>
          )}
          
          {resource.format && (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span>Format: {resource.format}</span>
            </div>
          )}
          
          {resource.author && (
            <div className="flex items-center gap-2 col-span-2">
              <span>Author: {resource.author}</span>
            </div>
          )}
          
          {resource.difficulty && (
            <div className="flex items-center gap-2">
              <Badge variant={
                resource.difficulty === "beginner" ? "outline" : 
                resource.difficulty === "intermediate" ? "default" : 
                "secondary"
              } className="text-xs">
                {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Added {new Date(resource.createdAt).toLocaleDateString()}
        </span>
        <Button variant="default" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <section id="resources" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Resource Library</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Access a curated collection of datasets, starter code, and tutorials to 
            accelerate your data science and machine learning projects.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search resources..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ResourceType | "all")} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="dataset">Datasets</TabsTrigger>
              <TabsTrigger value="starter_code">Starter Code</TabsTrigger>
              <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : displayResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayResources.map(renderResourceCard)}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Can't find what you're looking for? Contact me to request specific resources or suggest additions.
          </p>
          <Button variant="outline" className="gap-2">
            <Database className="h-4 w-4" />
            Browse All Resources
          </Button>
        </div>
      </div>
    </section>
  );
}
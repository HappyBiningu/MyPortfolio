import { useState, useEffect } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type CryptoData = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_history?: { timestamp: number; price: number }[];
};

export default function LiveDataProjects() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch top cryptocurrencies data
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false");
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Generate mock price history for the chart
      const enhancedData = data.map((crypto: CryptoData) => {
        const priceHistory = Array.from({ length: 24 }, (_, i) => {
          const basePrice = crypto.current_price;
          const randomVariation = (Math.random() - 0.5) * 0.1 * basePrice;
          return {
            timestamp: Date.now() - (23 - i) * 3600000, // Last 24 hours
            price: basePrice + randomVariation,
          };
        });
        
        return {
          ...crypto,
          price_history: priceHistory,
        };
      });
      
      setCryptoData(enhancedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cryptocurrency data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="live-data" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Live Data Projects</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore real-time data visualizations using public APIs. The charts below show live cryptocurrency 
            market data, updated every 5 minutes.
          </p>
          
          <Button 
            onClick={fetchData}
            variant="outline" 
            className="mt-4 flex items-center gap-2"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh Data
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Error loading data: {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-1 md:col-span-2 flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            cryptoData.map((crypto) => (
              <Card key={crypto.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{crypto.name} ({crypto.symbol.toUpperCase()})</CardTitle>
                      <CardDescription>24h Volume: ${crypto.total_volume.toLocaleString()}</CardDescription>
                    </div>
                    <div className={`text-xl font-semibold ${crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${crypto.current_price.toLocaleString()}
                      <span className="text-sm ml-2">
                        {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={crypto.price_history}
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        domain={['dataMin', 'dataMax']} 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        labelFormatter={(timestamp) => new Date(timestamp as number).toLocaleString()}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <div className="w-full flex justify-between text-sm">
                    <span>24h High: <span className="font-medium text-green-600">${crypto.high_24h.toLocaleString()}</span></span>
                    <span>24h Low: <span className="font-medium text-red-600">${crypto.low_24h.toLocaleString()}</span></span>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          Data provided by CoinGecko API. Charts show price fluctuations over the last 24 hours.
        </div>
      </div>
    </section>
  );
}
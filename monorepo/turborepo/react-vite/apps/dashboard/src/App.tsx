import { useState, useEffect } from 'react'
import { ofetch } from 'ofetch'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { ChartContainer, SimpleStat } from '@repo/ui/chart'
import { navigateTo } from '@repo/utilities'
import { 
  TrendingUp, 
  Users, 
  Activity, 
  DollarSign, 
  ArrowLeft,
  RefreshCw
} from 'lucide-react'
import './App.css'

interface DashboardData {
  revenue: { month: string; value: number }[];
  users: number;
  activeSessions: number;
}

function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const response = await ofetch<DashboardData>('http://localhost:5005/api/dashboard', {
        signal
      });
      setData(response);
      setError(null);
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="dashboard-mfe p-6 min-h-screen bg-gray-50 text-deep-space">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-deep-space">Operational Overview</h1>
          <p className="text-blue-green">Real-time performance metrics</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => fetchData()} className="flex items-center gap-2 bg-blue-green">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </Button>
          <Button onClick={() => navigateTo('/')} className="flex items-center gap-2 bg-tiger-orange border-none">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
          <Activity size={20} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:ring-2 hover:ring-sky-blue transition-all">
          <SimpleStat 
            label="Total Users" 
            value={data?.users || '---'} 
            trend="+12% from last month" 
            trendType="up" 
          />
          <div className="mt-4 p-2 bg-sky-blue/10 rounded-full w-fit">
            <Users className="text-blue-green" size={24} />
          </div>
        </Card>
        
        <Card className="hover:ring-2 hover:ring-amber-flame transition-all">
          <SimpleStat 
            label="Active Sessions" 
            value={data?.activeSessions || '---'} 
            trend="Stable" 
            trendType="neutral" 
          />
          <div className="mt-4 p-2 bg-amber-flame/10 rounded-full w-fit">
            <Activity className="text-tiger-orange" size={24} />
          </div>
        </Card>

        <Card className="hover:ring-2 hover:ring-blue-green transition-all">
          <SimpleStat 
            label="Est. Monthly Revenue" 
            value={`$${data?.revenue.reduce((acc, curr) => acc + curr.value, 0).toLocaleString() || '---'}`} 
            trend="+5.4% week over week" 
            trendType="up" 
          />
          <div className="mt-4 p-2 bg-blue-green/10 rounded-full w-fit">
            <DollarSign className="text-deep-space" size={24} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card header="Revenue Trends" className="h-full">
          <ChartContainer title="Revenue per Month (Dummy Data)">
            <div className="flex items-end gap-3 w-full px-4 h-40">
              {data?.revenue.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-blue-green rounded-t-sm transition-all hover:bg-tiger-orange" 
                    style={{ height: `${(item.value / 4000) * 100}%` }}
                  ></div>
                  <span className="text-[10px] text-gray-400 font-medium rotate-45">{item.month}</span>
                </div>
              ))}
              {!data && <div className="text-gray-400 italic">No data available</div>}
            </div>
          </ChartContainer>
        </Card>

        <Card header="System Health" footer="All systems operational">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">API Response Time</span>
              <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">24ms</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-green h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded">42%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-amber-flame h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-sm text-blue-green">
                <TrendingUp size={16} />
                <span>Overall Performance</span>
              </div>
              <span className="font-bold text-deep-space">High</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App

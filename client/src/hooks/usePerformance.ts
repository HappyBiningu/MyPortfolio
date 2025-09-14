
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const paintEntries = entries.filter(entry => entry.entryType === 'paint');
      const lcpEntries = entries.filter(entry => entry.entryType === 'largest-contentful-paint');
      
      setMetrics(prev => ({
        ...prev,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || null,
        largestContentfulPaint: lcpEntries[lcpEntries.length - 1]?.startTime || null,
      }));
    });

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      setMetrics(prev => ({
        ...prev,
        pageLoadTime: navigation.loadEventEnd - navigation.navigationStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      }));
    }

    return () => observer.disconnect();
  }, []);

  return metrics;
}

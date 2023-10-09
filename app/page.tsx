'use client'

import CoinChart from './coinChart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div style={{ overflowX: 'auto' }}>
          <CoinChart />
        </div>
      </QueryClientProvider>
    </div>
  )
}

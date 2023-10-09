'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  maintainAspectRatio: true, // Disable aspect ratio
  responsive: true, // Disable responsiveness
  scales: {
    x: {
      beginAtZero: false, // You can customize this as needed
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 90, // Rotate x-axis labels to 0 degrees
        minRotation: 90,
      },
    },
    y: {
      // Add y-axis configuration if needed
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Top 100',
    },
  },
}

function adapt(labels?: any[], data?: any[]) {
  const colors = data?.map((d) => (d > 0 ? 'green' : 'red'))
  return {
    labels,
    datasets: [
      {
        label: 'Top 100',
        data: data,
        backgroundColor: colors,
      },
    ],
  }
}

async function FetchData() {
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/api'
  // const url = 'http://localhost:3000' + '/api'
  console.log(process.env)
  const response = await axios.post(url)
  const coinData = response.data
  // Log the histogram data
  return coinData
}

export default function App() {
  const { data: res } = useQuery(['coin'], FetchData, {
    refetchInterval: 20000,
    cacheTime: 0,
  })
  const labels = res?.labels
  const changes = res?.changes
  return <Bar options={options} data={adapt(labels, changes)} />
}

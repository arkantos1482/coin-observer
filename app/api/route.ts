import axios from 'axios'
import { NextResponse } from 'next/server'

const apiUrl =
  'https://coin360.com/site-api/coins?currency=USD&period=1h&ranking=top100'

interface Coin360 {
  c: string
  ch: number
  em: number
  mc: number
  mcr: number
  n: string
  p: number
  pb: number
  pr: string
  s: string
  sl: string
  st: string
  v: number
}

async function FetchData() {
  const response = await axios.get(apiUrl)
  const coinData = response.data.data

  const sorted = coinData.sort((a: Coin360, b: Coin360) => a.ch - b.ch)
  const labels = sorted.map((coin: Coin360) => coin.s)
  const changes = sorted.map((coin: Coin360) => coin.ch)

  // Log the histogram data
  return { labels, changes }
}

export async function GET() {
  const res = await FetchData()
  return NextResponse.json(res)
}

import axios from 'axios'

const apiUrl =
  'https://coin360.com/site-api/coins?currency=USD&period=1h&ranking=top100'

export interface Coin360 {
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

export async function FetchData() {
  const response = await axios.get(apiUrl)
  const coinData = response.data.data

  const sorted = coinData.sort((a: Coin360, b: Coin360) => a.ch - b.ch)
  const labels = sorted.map((coin: Coin360) => coin.s)
  const changes = sorted.map((coin: Coin360) => coin.ch)

  // Log the histogram data
  return { labels, changes }
}

export async function GET(request: Request) {
  const { labels, changes } = await FetchData()
  return new Response(JSON.stringify({ labels, changes }), {
    headers: { 'content-type': 'application/json' },
  })
}

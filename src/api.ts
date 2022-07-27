import 'dotenv/config'
import fetch from 'node-fetch'
import { FullMarket, LiteMarket } from './types'

const yourKey = process.env.MANIFOLD_API_KEY

const API_URL = 'https://manifold.markets/api/v0'

const getFullMarket = async (id: string) => {
  const market: FullMarket = await fetch(`${API_URL}/market/${id}`).then(
    (res) => res.json()
  )
  return market
}

export const getBets = async (marketId: string) => {
  const { bets } = await getFullMarket(marketId)
  return bets
}

export const getMarkets = async () => {
  const markets: LiteMarket[] = await fetch(
    `${API_URL}/markets?limit=100`
  ).then((res) => res.json())
  return markets
}

export const getFullMarkets = async () => {
  const markets = await getMarkets()
  return await Promise.all(markets.map((market) => getFullMarket(market.id)))
}

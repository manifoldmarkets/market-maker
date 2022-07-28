import 'dotenv/config'
import fetch from 'node-fetch'
import { Bet, FullMarket, LiteMarket } from './types'

const yourKey = process.env.MANIFOLD_API_KEY

const API_URL = 'https://manifold.markets/api/v0'

export const getFullMarket = async (id: string) => {
  const market: FullMarket = await fetch(`${API_URL}/market/${id}`).then(
    (res) => res.json()
  )
  return market
}

const getMarkets = async (limit = 1000, before?: string) => {
  const markets: LiteMarket[] = await fetch(
    before
      ? `${API_URL}/markets?limit=${limit}&before=${before}`
      : `${API_URL}/markets?limit=${limit}`
  ).then((res) => res.json())

  return markets
}

export const getAllMarkets = async () => {
  const allMarkets = []
  let before: string | undefined = undefined

  while (true) {
    const markets: LiteMarket[] = await getMarkets(1000, before)

    allMarkets.push(...markets)
    before = markets[markets.length - 1].id
    console.log('Loaded', allMarkets.length, 'markets', 'before', before)

    if (markets.length < 1000) break
  }

  return allMarkets
}

export const getMarketBySlug = async (slug: string) => {
  const market: FullMarket = await fetch(`${API_URL}/slug/${slug}`).then(
    (res) => res.json()
  )
  return market
}

const getBets = async (
  username: string,
  limit = 1000,
  before: string | undefined = undefined
) => {
  const bets: Bet[] = await fetch(
    before
      ? `${API_URL}/bets?username=${username}&limit=${limit}&before=${before}`
      : `${API_URL}/bets?username=${username}&limit=${limit}`
  ).then((res) => res.json())
  return bets
}

export const getAllBets = async (username: string) => {
  const allBets: Bet[] = []
  let before: string | undefined = undefined

  while (true) {
    const bets: Bet[] = await getBets(username, 1000, before)

    allBets.push(...bets)
    before = bets[bets.length - 1].id
    console.log('Loaded', allBets.length, 'bets', 'before', before)

    if (bets.length < 1000) break
  }

  return allBets
}

export const placeBet = (bet: {
  contractId: string
  outcome: 'YES' | 'NO'
  amount: number
  limitProb?: number
}) => {
  return fetch(`${API_URL}/bet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${yourKey}`,
    },
    body: JSON.stringify(bet),
  }).then((res) => res.json())
}

export const cancelBet = (betId: string) => {
  return fetch(`${API_URL}/bet/cancel/${betId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${yourKey}`,
    },
  }).then((res) => res.json())
}

export const batchedWaitAll = async <T>(
  createPromises: (() => Promise<T>)[],
  batchSize = 10
) => {
  const numBatches = Math.ceil(createPromises.length / batchSize)
  const result: T[] = []
  for (let batchIndex = 0; batchIndex < numBatches; batchIndex++) {
    const from = batchIndex * batchSize
    const to = from + batchSize

    const promises = createPromises.slice(from, to).map((f) => f())

    const batch = await Promise.all(promises)
    result.push(...batch)
  }

  return result
}

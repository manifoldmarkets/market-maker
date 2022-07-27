import { getFullMarkets } from './api'

const main = async () => {
  const markets = await getFullMarkets()
  console.log('Loaded', markets.length, 'markets')
}

console.log('hello world!')
main()

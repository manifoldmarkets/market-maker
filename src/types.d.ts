// Information about a market, but without bets or comments
export type LiteMarket = {
  // Unique identifer for this market
  id: string

  // Attributes about the creator
  creatorUsername: string
  creatorName: string
  createdTime: number // milliseconds since epoch
  creatorAvatarUrl?: string

  // Market attributes. All times are in milliseconds since epoch
  closeTime?: number // Min of creator's chosen date, and resolutionTime
  question: string
  description: string

  // A list of tags on each market. Any user can add tags to any market.
  // This list also includes the predefined categories shown as filters on the home page.
  tags: string[]

  // Note: This url always points to https://manifold.markets, regardless of what instance the api is running on.
  // This url includes the creator's username, but this doesn't need to be correct when constructing valid URLs.
  //   i.e. https://manifold.markets/Austin/test-market is the same as https://manifold.markets/foo/test-market
  url: string

  outcomeType: string // BINARY, FREE_RESPONSE, or NUMERIC
  mechanism: string // dpm-2 or cpmm-1

  probability: number
  pool: { outcome: number } // For CPMM markets, the number of shares in the liquidity pool. For DPM markets, the amount of mana invested in each answer.
  p?: number // CPMM markets only, probability constant in y^p * n^(1-p) = k
  totalLiquidity?: number // CPMM markets only, the amount of mana deposited into the liquidity pool

  volume: number
  volume7Days: number
  volume24Hours: number

  isResolved: boolean
  resolutionTime?: number
  resolution?: string
  resolutionProbability?: number // Used for BINARY markets resolved to MKT
}

// A complete market, along with bets, comments, and answers (for free response markets)
export type FullMarket = LiteMarket & {
  bets: Bet[]
}

export type Bet = {
  id: string
  userId: string
  contractId: string
  createdTime: number

  amount: number // bet size; negative if SELL bet
  loanAmount?: number
  outcome: string
  shares: number // dynamic parimutuel pool weight or fixed ; negative if SELL bet

  probBefore: number
  probAfter: number

  sale?: {
    amount: number // amount user makes from sale
    betId: string // id of bet being sold
    // TODO: add sale time?
  }

  fees: Fees

  isSold?: boolean // true if this BUY bet has been sold
  isAnte?: boolean
  isLiquidityProvision?: boolean
  isRedemption?: boolean
} & Partial<LimitProps>

export type NumericBet = Bet & {
  value: number
  allOutcomeShares: { [outcome: string]: number }
  allBetAmounts: { [outcome: string]: number }
}

// Binary market limit order.
export type LimitBet = Bet & LimitProps

type LimitProps = {
  orderAmount: number // Amount of limit order.
  limitProb: number // [0, 1]. Bet to this probability.
  isFilled: boolean // Whether all of the bet amount has been filled.
  isCancelled: boolean // Whether to prevent any further fills.
  // A record of each transaction that partially (or fully) fills the orderAmount.
  // I.e. A limit order could be filled by partially matching with several bets.
  // Non-limit orders can also be filled by matching with multiple limit orders.
  fills: fill[]
}

export type fill = {
  // The id the bet matched against, or null if the bet was matched by the pool.
  matchedBetId: string | null
  amount: number
  shares: number
  timestamp: number
  // If the fill is a sale, it means the matching bet has shares of the same outcome.
  // I.e. -fill.shares === matchedBet.shares
  isSale?: boolean
}

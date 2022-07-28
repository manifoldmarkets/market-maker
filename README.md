# A market-making bot for Manifold

Create limit orders via the Manifold API to provide liquidity, and potentially make a profit!

The bot works by first computing an exponential moving average and exponential moving variance of the probability. Then it creates limit orders above and below the current market price using these stats.

If there's volatility in the market, it will fill the pair of limit orders above and below, which will earn you profit (buy low, sell high!).

In any case, creating open limit orders increases the liquidity in the markets, which is a service to traders.


# Run this bot!

1. Clone the repository
2. Locate your Manifold API Key. You can find it in Your profile => Edit => Api key.
3. Create a `.env` file in the root directory with your api key, replacing the `xxx`'s, and your username.

   ```
   MANIFOLD_API_KEY=xxxxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   MANIFOLD_USERNAME=YourUsername
   ```

4. Install npm packages with `yarn`
5. Run `yarn start`

(Be careful! This bot will be placing limit orders with your mana.)

Feel free to fork and extend this bot with more advanced strategies!

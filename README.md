# A market-making bot for Manifold

Create limit orders via the Manifold API to provide liquidity, and potentially make a profit!

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

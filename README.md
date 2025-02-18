# CryptoPulse

CryptoPulse is a DeFi application built with Next.js and TypeScript. It features Ethereum wallet connectivity, real-time cryptocurrency price charts, and ERC-20 token swapping. Utilizing Web3 modal libraries, cryptocurrency APIs, and decentralized exchange protocols, CryptoPulse offers a seamless DeFi experience.

## Features

- **Ethereum Wallet Connectivity**: Easily connect your Ethereum wallet.
- **Real-Time Price Charts**: View up-to-date cryptocurrency prices.
- **ERC-20 Token Swapping**: Swap ERC-20 tokens directly within the application.

## Demo

Check out the live demo: [CryptoPulse](https://crypto-pulse-mocha.vercel.app/)



## SnapShots
![image](https://github.com/Divyanshu11011/CryptoPulse/assets/93030810/75ba5503-a7b5-42f4-b7d5-3b85f3849814)
![Screenshot 2024-06-15 003804](https://github.com/Divyanshu11011/CryptoPulse/assets/93030810/4c0fb2de-0697-4057-9246-2f02841321bb)


## Web-Socket Demo


https://github.com/Divyanshu11011/CryptoPulse/assets/93030810/bf08d0ea-0b5a-4812-90c7-dc6a8293e8cb





## Installation

To get started with CryptoPulse, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/jaspreet2003/cruxx.git
    cd CryptoPulse
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Setup Environment Variables:**
    Create a `.env.local` file in the root directory and add the following environment variables with your API keys:

    ```bash
    NEXT_PUBLIC_ALCHEMY_ID=your-alchemy-id
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
    NEXT_PUBLIC_0X_API_KEY_PRICE=your-0x-price-api-key
    NEXT_PUBLIC_0X_API_KEY_QUOTE=your-0x-quote-api-key
    NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY=bc25881190ee00511635f4df10e0182f366453e201978f93d9bdab5c48663abd
    ```

    - `NEXT_PUBLIC_ALCHEMY_ID`: Alchemy API key (create one [here](https://www.alchemy.com/)).
    - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect's SDK to help with connecting wallets (create one [here](https://walletconnect.com/)).
    - `NEXT_PUBLIC_0X_API_KEY_PRICE`: 0x API key for price (create one [here](https://0x.org/)).
    - `NEXT_PUBLIC_0X_API_KEY_QUOTE`: 0x API key for quote (create one [here](https://0x.org/)).
    - `NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY`: CryptoCompare API key (already provided).

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Technologies Used

- **Next.js**: A React framework for building web applications.
- **TypeScript**: A statically typed superset of JavaScript.
- **Web3 Modal**: A library to connect wallets.
- **Cryptocurrency APIs**: For fetching real-time data.
- **Tailwind CSS**: For styling.

## Contributing

We welcome contributions to CryptoPulse! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure your code follows the project's coding standards and includes relevant tests.

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

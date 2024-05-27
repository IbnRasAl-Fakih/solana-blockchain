import { FC, useMemo } from "react"
import { BlogProvider } from "src/context/Blog"
import { Router } from "src/router"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import "./App.css"


export const App = () => {
  const endpoint = "https://sly-thrilling-brook.solana-devnet.quiknode.pro/5234b5c13bed66d9ac5454a89fdd43a0e329985e/"
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []

  )
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <BlogProvider>
          <Router />
        </BlogProvider>
      </WalletProvider>
    </ConnectionProvider>

  )
}
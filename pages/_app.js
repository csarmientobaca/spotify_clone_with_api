import LeftNav from '@/components/LeftNav'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {/* <LeftNav /> */}
      <Component {...pageProps} />
    </SessionProvider>
  )
}
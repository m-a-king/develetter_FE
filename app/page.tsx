import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MainScreen } from "@/components/MainScreen"
import { OAuthProvider } from "@/components/OAuthProvider"

export default function HomePage() {
  return (
    <OAuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <MainScreen />
        <Footer />
      </div>
    </OAuthProvider>
  )
}
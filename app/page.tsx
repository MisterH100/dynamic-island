
import Navbar from './components/NavBar'
import { Section } from './components/Sections'

export default function Home() {


  return (
    <main className="w-full flex min-h-screen items-center justify-center">
      <Navbar/>
      <div className="w-full">
        <Section/>
      </div>
    </main>
  )
}

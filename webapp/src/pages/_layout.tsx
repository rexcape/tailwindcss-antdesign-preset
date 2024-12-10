import { Outlet } from 'react-router'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <main className="md:flex-grow md:flex-shrink-0 min-h-[600px]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default PageLayout

import { Outlet } from 'react-router'

import { Navbar } from '@/components/navbar'

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex-shrink-0">
        <Outlet />
      </main>
    </>
  )
}

export default PageLayout

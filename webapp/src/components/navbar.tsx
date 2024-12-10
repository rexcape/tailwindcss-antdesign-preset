import { NavLink as RouterLink, NavLinkProps } from 'react-router'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { IconBrandGithub } from '@tabler/icons-react'

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ className, ...props }, ref) => (
  <RouterLink
    {...props}
    ref={ref}
    className={({ isActive }) =>
      cn(
        'border-b-2 border-transparent inline-flex items-center px-1 pt-1 text-lg font-medium',
        !isActive && 'border-transparent text-gray-7 hover:border-gray-3 hover:text-gray-9',
        isActive && 'border-primary-6 text-gray-9'
      )
    }
  />
))

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg flex-none sticky top-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <h3 className="text-h3 font-medium select-none">TailwindCSS Ant Design</h3>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <NavLink to="/">Generator</NavLink>
              <NavLink to="/preview">Preview</NavLink>
              <NavLink to="/docs">Docs</NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a
              href="https://github.com/rexcape/tailwindcss-antdesign-preset"
              target="_blank"
              className="relative flex flex-row items-center rounded-lg bg-white p-1 text-gray-7 hover:text-gray-10 focus:outline-none"
            >
              <IconBrandGithub className="size-6" />
              <span className="ml-2">View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.displayName = 'navbar'

export { Navbar }

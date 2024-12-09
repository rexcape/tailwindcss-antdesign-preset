import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const Badge = ({
  children,
  type,
  className,
}: {
  children?: ReactNode
  type: 'override' | 'extend'
  className?: string
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-sm font-medium',
        'ring-1 ring-inset',
        'bg-gray-1 text-gray-6 ring-gray-7/10',
        type === 'extend' && 'bg-blue-1 text-blue-6 ring-blue-7/10',
        type === 'override' && 'bg-orange-1 text-orange-6 ring-orange-7/10',
        className
      )}
    >
      {children}
    </span>
  )
}

export { Badge }

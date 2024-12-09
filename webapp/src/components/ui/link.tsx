import { cn } from '@/lib/utils'
import { IconExternalLink } from '@tabler/icons-react'
import { AnchorHTMLAttributes, forwardRef } from 'react'

const Link = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, children, ...rest }, ref) => (
    <a
      ref={ref}
      target="_blank"
      className={cn(
        'inline-flex items-center',
        'text-antd-link transition-colors',
        'hover:text-antd-link-hover',
        'active:text-antd-link-active',
        className
      )}
      {...rest}
    >
      {children}
      <IconExternalLink className="size-3 ml-0.5" />
    </a>
  )
)

export { Link }

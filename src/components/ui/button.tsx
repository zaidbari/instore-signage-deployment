import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import React from 'react'

export const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 duration-300 ease-in-out',
	{
		variants: {
			variant: {
				default:
					'bg-orange-500 text-gray-50 hover:bg-orange-500/90 dark:bg-orange-500 dark:text-gray-50 dark:hover:bg-orange-500/80',
				destructive:
					'bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90',
				outline:
					'border border-orange-200 bg-white hover:bg-gray-100 hover:text-orange-500 dark:border-orange-800 dark:bg-gray-950 dark:hover:bg-orange-500 dark:hover:text-gray-50 dark:text-orange-500',
				secondary:
					'bg-gray-100 text-orange-500 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80',
				ghost: 'hover:bg-gray-100 hover:text-orange-500 dark:hover:bg-gray-800 dark:hover:text-gray-50',
				link: 'text-orange-500 underline-offset-4 hover:underline dark:text-orange-500'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
	}
)
Button.displayName = 'Button'

export { Button }

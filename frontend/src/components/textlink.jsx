// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva } from "class-variance-authority";

// import { cn } from "@/lib/utils"
// import { text } from "stream/consumers";

// const textLinkVariants = cva (
//       "inline-flex items-center justify-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//         {
//             variants: {
//                 variant: {
//                     default: "text-primary hover:underline",
//                     muted: "text-muted-foreground hover:text-foreground",
//                     destructive: "text-destructive hover:underline",
//                 },
//                 size: {
//                     sm: "text-sm",
//                     md: "text-base",
//                     lg: "text-lg",
//                 },
//             },
//             defaultVariants: {
//                 variant: "default",
//                 size: "md",
//             },
//         }
// )

// export interface TextLinkProps
//   extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
//     VariantProps<typeof textLinkVariants> {}

// const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
//   ({ className, variant, size, ...props }, ref) => (
//     <a
//       ref={ref}
//       className={cn(textLinkVariants({ variant, size, className }))}
//       {...props}
//     />
//   )
// )
// TextLink.displayName = "TextLink"

// export { TextLink, textLinkVariants }
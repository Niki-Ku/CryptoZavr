'use client'

import CustomButton from "./components/ui/CustomButton/CustomButton"
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="w-full h-[100svh] text-text-primary bg-background-main flex">
        <div className="m-auto border border-background-border text-center p-4 rounded-xl">
          <h2 className="text-2xl">Something went wrong!</h2>
          <p>{error.message}</p>
          <CustomButton className="mt-4" onClick={() => reset()}>Try again</CustomButton>
        </div>
      </body>
    </html>
  )
}
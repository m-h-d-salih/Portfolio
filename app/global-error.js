'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#222324] text-white flex flex-col items-center justify-center px-4 text-center">
        <p className="text-yellow-400 text-sm tracking-[0.3em] mb-3">SOMETHING WENT WRONG</p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          The page ran into an unexpected error.
        </h1>
        <button
          onClick={() => reset()}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-full transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  )
}

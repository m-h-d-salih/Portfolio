'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#222324] text-white flex flex-col items-center justify-center px-4 text-center rounded-lg">
      <p className="text-yellow-400 text-sm tracking-[0.3em] mb-3">SOMETHING WENT WRONG</p>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        This section hit a snag while loading.
      </h1>
      <button
        onClick={() => reset()}
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-full transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

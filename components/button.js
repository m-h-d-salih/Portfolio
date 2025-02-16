import React from 'react'

const Button = () => {
  return (
    <div>
      <button className='bg-blue-600 p-3 text-white  group relative inline-flex items-center justify-start overflow-hidden rounded-full px-5 py-3 font-bold'>
      <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-black opacity-[3%]"></span>
    <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-black opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Contact Now!</span>
    <span className="absolute inset-0 rounded-full  "></span>
    
      </button>
      {/* <button class="group relative inline-flex items-center justify-start overflow-hidden rounded-full px-5 py-3 font-bold">
    <span class="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-black opacity-[3%]"></span>
    <span class="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-black opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
    <span class="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">Button Text</span>
    <span class="absolute inset-0 rounded-full border-2 border-black"></span>
</button> */}
    </div>
  )
}

export default Button

import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }
  const onClear = () => {
    setInput('')
    inputRef.current.value = '';
  }
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      {/* Top badge */}
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5
          mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="star icon" className="w-2.5" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-6xl font-semibold leading-10 sm:leading-[4rem] text-gray-700">
          Your own <span className=' text-primary'>blogging</span> <br />platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-xl mx-auto text-center text-gray-500 max-sm:text-xs leading-relaxed">
          This is your space to think out loud, to share what matters, and to write without filters. <br />
          Whether it's one word or a thousand, your story starts right here.
        </p>

        {/* Searchbar */}
        <form onSubmit={onSubmitHandler} className=' flex justify-between max-w-2xl w-full h-12 mx-auto border border-gray-800 bg-white 
        rounded-full overflow-hidden'>
          <input ref={inputRef} type="text" required placeholder='Search for blog' className=' w-full pl-4 outline-none' />
          <button type='submit' className=' bg-primary text-white px-8 py-2 m-1.5 rounded-full
                 hover:scale-105 transition-all cursor-pointer'>Search</button>
        </form>

      </div>
      {/* clear search button  */}
      <div className=' text-center'>
        {
          input && <button onClick={onClear} className=' border font-light text-xs py-1 px-3 rounded-sm 
            shadow-custom-sm cursor-pointer'>Clear Search</button>
        }
      </div>

      {/* Background image */}
      <img
        src={assets.gradientBackground}
        alt="gradient background"
        className="absolute -top-[50px] -z-10 opacity-50"
      />
    </div>
  )
}

export default Header

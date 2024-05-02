import Image from 'next/image'

const Card = () => {
  return(
      <div className='flex bg-blue-200 p-3 rounded gap-8'>
        <div>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/doctor.png"
            alt="Next.js Logo"
            width={250}
            height={250}
            priority
          />  
        </div>
        <div>
          <h2 className='text-blue-600 font-bold'>
            Get Our App
          </h2>
          <p className='text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum eget lectus nec imperdiet. Etiam volutpat turpis est, non aliquet purus dapibus a.
          </p>
          <button 
            className='border border-blue-400 text-blue-500 rounded-2xl p-2 px-8 mt-4 font-bold hover:bg-blue-600 hover:text-white'>
            Learn more
          </button>
        </div>
      </div>
  )
}

export { Card }
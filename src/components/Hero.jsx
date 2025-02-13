import {assets} from "../assets/frontend_assets/assets"

const Hero = () => {
  return (
    <div className='flex flex-col border border-gray-400 sm:flex-row'>
        {/* hero left side */}

        <div className='flex items-center justify-center w-full py-10 sm:py-0 sm:w-1/2'>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'/>
            <p className='text-sm font-medium md:text-base'>
            OUR BESTSELLERS
            </p>
            </div>

            <h1 className='text-3xl leading-relaxed sm:py-3 lg:text-5xl prata-regular'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
                <p className='text-sm font-semibold md:text-base'>SHOP NOW</p>
                <p className="w-8 md:w-11 bg-[#414141] h-[1px]"/>
            </div>
        </div>
        </div>

        <div className="w-full sm:w-1/2">
            <img src={assets.hero_img} alt="hero-image" className="w-full"/>
        </div>
    </div>
  )
}

export default Hero
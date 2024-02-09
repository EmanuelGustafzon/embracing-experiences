import React from 'react'
import NavBar from '../components/NavBar'
import Image from 'next/image'

const About: React.FC = () => {

  return (
    <div>
        <NavBar/>
        <div className='flex justify-center '>
        <h2 className='mb-5 mt-5 text-3xl font-bold'>
            About Us
        </h2>
        </div>
        <div className='container mx-auto px-10 mb-3 mt-3'>
            <p className='leading-loose'>
            Welcome! Our names are Emanuel and Karen, and we are a cross-cultural couple living in Sweden. I am Swedish, and my wife Karen is Chilliean. We met during a volunteer adventure in 2018, serving on a ship, sharing knowledge, help, and hope sailing through Latin America and the Caribbean. 
            2020 We moved back to our home countries and could finally be united as a married couple one and a half years later.
            We love to travel and do outdoor activities. We want to embrace life in the big and small things, making life an adventure and appreciating the beauty of everything around us. We have traveled around 20 countries and we also like to do small weekend trips to get some adventure into daily life. We enjoy hiking mountains, car trips, trying new activities, and photography.
            We want to share our stories and experiences and we hope that can be valuable, educative, and encouraging for others.
            </p>
        </div>
        <div className="carousel rounded-box">
            <div className="carousel-item">
                <Image src="/images/trolltunga.jpg" width={400} height={300} alt="trolltunga hike" />
            </div> 
            <div className="carousel-item">
                <Image src="/images/prag.jpg" width={400} height={300} alt="view point prag" />
            </div> 
            <div className="carousel-item">
                <Image src="/images/lubeck.jpg" width={400} height={300} alt="lubeck city" />
            </div> 
            <div className="carousel-item">
                <Image src="/images/hike-switzerland.jpg" width={400} height={300} alt="Hike switerland" />
            </div> 
            <div className="carousel-item">
                <Image src="/images/cozy-house-switzerland.jpg" width={400} height={300} alt="cozy house switzerland" />        
            </div> 
            <div className="carousel-item">
                <Image src="/images/channel-venice.jpg" width={400} height={300} alt="Venice italy" />        
            </div> 
            <div className="carousel-item">
                <Image src="/images/street-verona.jpg" width={400} height={300} alt="street in Verona." />        
            </div>
        </div>
    </div>
  )
}

export default About
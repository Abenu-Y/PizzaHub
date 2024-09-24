import { Link} from 'react-router-dom'
import facebookIcon from '../../assets/icon/fbIcon.png'
import LinknkedinIcon from '../../assets/icon/LnIcon.png'
import twitterIcon from '../../assets/icon/twIcon.png'
import youtubeIcon from '../../assets/icon/ytIcon.png'
import FooterNavigationBar from './FooterNavigationBar'


const Footer = () => {
  return (
 <>

 <FooterNavigationBar />

<div className="bg-[#000000] text-white">
         <div className="p-8 flex flex-col justify-center items-center gap-8 md:flex-row  md:justify-between  text-sm">
              <div className="flex flex-col items-center md:flex-row gap-6">
                     <span>@{new Date().getFullYear()} Pizza All Rights Reserved.</span>
                     <a href="">Terms &amp; Conditions</a>
              </div>

              <div className='flex gap-6'>
                  
                      <Link to='/fb'><img src={facebookIcon} className='rounded-lg bg-[#141414]' alt="facebook-icon" /></Link>
                      <Link to="/Ln"><img src={LinknkedinIcon} alt="Linknkedin-icon" /></Link>
                      <Link to="/tw"><img src={twitterIcon} alt="twitter-icon" /></Link>
                      <Link to="/yt"><img src={youtubeIcon} alt="youtube-icon" /></Link>
                   
              </div>
         </div>
    </div>
 </>
  )
}

export default Footer
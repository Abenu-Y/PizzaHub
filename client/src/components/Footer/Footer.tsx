import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/icon/fbIcon.png';
import LinknkedinIcon from '../../assets/icon/LnIcon.png';
import twitterIcon from '../../assets/icon/twIcon.png';
import youtubeIcon from '../../assets/icon/ytIcon.png';
import FooterNavigationBar from './FooterNavigationBar';

const Footer = () => {
  return (
    <>
      <FooterNavigationBar />

      <div className="bg-[#000000] text-white">
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-sm md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <span>@{new Date().getFullYear()} Pizza All Rights Reserved.</span>
            <a href="">Terms &amp; Conditions</a>
          </div>

          <div className='flex gap-6'>
            <Link to='/fb'>
              <img src={facebookIcon} className='rounded-lg bg-[#141414]' alt="Facebook Icon" />
            </Link>
            <Link to="/Ln">
              <img src={LinknkedinIcon} alt="LinkedIn Icon" />
            </Link>
            <Link to="/tw">
              <img src={twitterIcon} alt="Twitter Icon" />
            </Link>
            <Link to="/yt">
              <img src={youtubeIcon} alt="YouTube Icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

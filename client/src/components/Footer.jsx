import { assets } from "../assets/assets";


const Footer = () => {
    return (
        <div className='text-gray-500 px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm '>
            <div className='flex flex-wrap justify-between items-start gap-8 pb-6 border-bordercolor  border-b'>
                <div >
                    <img src={assets.logo} alt="logo" className=' h-8 md:h-9' />
                    <p className='max-w-80 mt-3'>
                        Premium car rental service with a wide selection of
luxury and everyday vehicles for all your driving
needs.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                       <a href="#" > <img className="h-5 w-5" src={assets.facebook_logo} alt="" /></a>
                       <a href="#" > <img className="h-5 w-5" src={assets.instagram_logo} alt="" /></a>
                       <a href="#" > <img className="h-5 w-5" src={assets.twitter_logo} alt="" /></a>
                       <a href="#" > <img className="h-5 w-5" src={assets.gmail_logo} alt="" /></a>
                        
                    </div>
                </div>

                <div>
                    <h2 className='text-base text-gray-800 font-medium uppercase'>Quick links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List your Car</a></li>
                        <li><a href="#">About Us</a></li>
                        </ul>
                </div>
                <div>
                    <h2 className='text-base text-gray-800 font-medium uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Insurance</a></li>
                        </ul>
                </div>
                <div>
                    <h2 className='text-base text-gray-800 font-medium uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5'>
                       <li>1234 Luxury Drive</li>
                       <li> SAn Fransico, CA 143522</li>
                       <li>+124512000</li>
                       <li>info@habib.com</li>
                        </ul>
                </div>

            </div>
            
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
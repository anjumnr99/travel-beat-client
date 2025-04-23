// import logo from '../assets/WebLogo.png';
import LOGO from '../assets/logo.png';
import { MdPhonelinkRing, MdLocationPin } from 'react-icons/md';
import { GoMail } from 'react-icons/go';
import { AiFillFacebook } from 'react-icons/ai';
import { FaSquareTwitter, FaGooglePlusG, FaFlickr, FaSquareYoutube, FaInstagram } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="px-4  py-8 border-t mt-20 divide-y dark:dark:bg-gray-800 dark:dark:text-gray-100">
                <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                    <div className="lg:w-1/3">
                        {/* <img src={logo} alt="" /> */}
                        <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
                            <div className="flex items-center justify-center w-56 rounded-full dark:dark:bg-violet-400">
                                <img src={LOGO} alt="" />
                            </div>
                            {/* <span className="self-center text-2xl font-semibold">Grow Barter</span> */}
                        </a>
                    </div>
                    <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                        <div className="space-y-3">
                            <h3 className="tracki uppercase dark:dark:text-gray-50">Product</h3>
                            <ul className="space-y-1">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Features</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Integrations</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Pricing</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">FAQ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="tracki uppercase dark:dark:text-gray-50">Company</h3>
                            <ul className="space-y-1">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Privacy</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="uppercase dark:dark:text-gray-50">Developers</h3>
                            <ul className="space-y-1">
                                <li>
                                    <a rel="noopener noreferrer" href="#">Public API</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Documentation</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="#">Guides</a>
                                </li>
                            </ul>
                        </div>


                        <div className={`text-start  space-y-2 justify-start `}>
                            <h1 className="text-sm uppercase dark:dark:text-gray-50 font-semibold mb-3 ">Social Media</h1>
                            <p className="  text-gray-600 text-md font-semibold">You can also contact with us on our <br /> social media platform </p>

                            <div className="flex  justify-start items-center">
                                <Link><AiFillFacebook className='text-xl  text-blue-900'></AiFillFacebook></Link>
                                <Link><FaSquareTwitter className='text-xl text-blue-600 '></FaSquareTwitter></Link>
                                <Link><FaGooglePlusG className='text-xl text-orange-600'> </FaGooglePlusG></Link>
                                <Link><FaFlickr className='text-xl text-gray-900'></FaFlickr></Link>
                                <Link><FaSquareYoutube className='text-xl text-red-600'></FaSquareYoutube></Link>
                                <Link><FaInstagram className='text-xl text-red-900'></FaInstagram></Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div className=" my-8">
                    <h4 className="font-semibold text-center text-2xl mt-4 text-gray-700">Stay up to date</h4>

                    <form>
                        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-transparent rounded-lg p-2 dark:bg-gray-800">
                            <div className="w-full">
                                <label htmlFor="hero-input" className="sr-only">Search</label>
                                <input type="text" id="hero-input" name="hero-input" className="py-3 px-4 block w-full border-blue-500 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter your email" />
                            </div>
                            <button className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >
                                Subscribe
                            </button>
                        </div>

                    </form>
                </div>
                <div className="py-6 text-sm text-center dark:dark:text-gray-400">© 1968 Company Co. All rights reserved.</div>
            </footer>
        </div>
    );
};

export default Footer;
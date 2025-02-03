import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="dark:bg-[#212121]">
      <div className="h-80 w-full bg-primary/50 footer-triangle"></div>
      <div className="bg-primary/50">
        <div className="px-5 space-y-5">
          <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-3 ">
            <div className="flex items-center">
              <Link className="" to="/">
                <img
                  className="w-20 mr-2"
                  src="https://i.postimg.cc/XJNGprHM/logo.png"
                  alt=""
                />
              </Link>
              <p className="text-white font-bold">
                Crafting timeless treasures <br /> from jute and wood.
              </p>
            </div>
            <div className="mx-auto text-white">
              <h2 className="text-center text-white font-bold mb-2">
                Contact Us
              </h2>
              <p >
                Email:{" "}
                <a className="hover:text-primary" href="mailto:example@example.com">
                  shohagmdhossain@gmail.com
                </a>
              </p>
              <p className="">
                Phone: <a className="hover:text-primary" href="tel:+8801974379786">+8801974379786</a>
              </p>
            </div>
            <div className="mt-5">
                <h2 className="text-center md:text-right text-white font-bold">Social Media</h2>
              <div className="flex gap-2 text-3xl md:justify-end justify-center mt-5">
                <Link to={"#"}>
                  <FaFacebook className="text-[#007CF7]" />
                </Link>
                <Link to={"#"}>
                  <FaTwitter className="text-blue-500" />
                </Link>
                <Link to={"#"}>
                  <FaInstagram className="text-[#F7085F]" />
                </Link>
                <Link to={"#"}>
                  <FaGithub className="text-[#]" />
                </Link>
                <Link to={"#"}>
                  <FaYoutube className="text-[#F60000]" />
                </Link>
              </div>
            </div>
          </div>
          <div className="text-white lg:container mx-auto  md:flex md:justify-between text-center border-t py-5">
            <div>
              © {new Date().getFullYear()} <Link to='/' className="font-bold text-primary">Jute and Wooden Crafts.</Link> All Rights
              Reserved.
            </div>
            <div>Designed By <span className="text-primary font-bold">M H Shohag</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

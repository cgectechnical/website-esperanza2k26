import logo from "../../assets/logo.png";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { sedgwick, roboto } from "@/utils/fonts";
import Link from "next/link";

const Footer = () => {
  const locationInfo =
    "https://www.google.com/maps/place/Cooch+Behar+Government+Engineering+College/data=!4m2!3m1!1s0x0:0xe4952b5891bb2389?sa=X&ved=1t:2428&ictx=111";

  return (
    <footer className="text-[#DEDEDE] m-[30px] p-[30px] py-2 px-2 sm:py-3 sm:px-3 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 sm:gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src={logo}
              alt="Esperanza Logo"
              width={70}
              height={70}
              className="object-contain w-14 sm:w-18"
            />
            <div className="text-center md:text-left">
              <div
                style={{
                  fontFamily: sedgwick.style.fontFamily,
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  lineHeight: "1.2",
                }}
              >
                ESPERANZA'26
              </div>
              <div
                style={{
                  fontFamily: sedgwick.style.fontFamily,
                  fontWeight: 300,
                  fontSize: "0.9375rem",
                  lineHeight: "1.2",
                  color: "#DEDEDE"
                }}
              >
                © Esperanza CGEC
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3
              style={{
                fontFamily: sedgwick.style.fontFamily,
                fontWeight: 300,
                fontSize: "1.25rem",
                lineHeight: "1.2",
                marginBottom: "0.75rem",
                color: "#FF6B6B"
              }}
            >
              ABOUT US
            </h3>
            <ul className="space-y-0.5">
              <Link
                href={"/terms-condition/t&c.pdf"}
                className="cursor-pointer hover:text-red-400 transition-colors"
                style={{ fontFamily: sedgwick.style.fontFamily, fontWeight: 300, fontSize: "0.9375rem", color: "#DEDEDE" }}
              >
                Terms & Conditions
              </Link>
              <br />
              <Link
                href={"/developers"}
                className="text-yellow-400 animate-pulse cursor-pointer hover:text-yellow-300 transition-colors"
                style={{ fontFamily: sedgwick.style.fontFamily, fontWeight: 300, fontSize: "0.9375rem" }}
              >
                Meet Our Developers
              </Link>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3
              style={{
                fontFamily: sedgwick.style.fontFamily,
                fontWeight: 300,
                fontSize: "1.25rem",
                lineHeight: "1.2",
                marginBottom: "0.75rem",
                color: "#4ECDC4"
              }}
            >
              ADDRESS
            </h3>
            <address
              style={{ fontFamily: sedgwick.style.fontFamily, fontWeight: 300, fontSize: "0.9375rem", fontStyle: "normal", color: "#DEDEDE" }}
            >
              <a
                href={locationInfo}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-red-400 transition-colors hover:underline"
              >
                Cooch Behar Government Engineering College
                <br /> Vill-Harinchowrah, P.O- Ghughumari
                <br /> Dist-Cooch Behar, West Bengal, PIN-736170
              </a>
            </address>
          </div>

          <div className="text-center md:text-left">
            <h3
              style={{
                fontFamily: sedgwick.style.fontFamily,
                fontWeight: 300,
                fontSize: "1.25rem",
                lineHeight: "1.2",
                marginBottom: "0.75rem",
                color: "#FFE66D"
              }}
            >
              SOCIAL
            </h3>
            <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
              <a
                href="https://www.facebook.com/cgecesperanza"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.instagram.com/cgec_esperanza_/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/esperanza-cgec/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ fontFamily: sedgwick.style.fontFamily, fontWeight: 300, fontSize: "0.9375rem", color: "#DEDEDE" }} className="flex justify-center items-center flex-col gap-1 py-2">
        <div>
          Made With {" "}
          <span className="text-red-500">&#x2764;</span>
          {" "} for CGEC
        </div>
        <div>
          Esperanza 2k26 | All Right Reserved 
        </div>
      </div>
    </footer>
  );
};

export default Footer;

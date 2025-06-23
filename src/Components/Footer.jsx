import {
  FaDiscord,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitch,
  FaGift,
  FaNewspaper,
  FaGlobe,
  FaLanguage,
  FaEuroSign
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-yellow-500 text-black py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 border-b border-gray-700 pb-8">
        {/* Trustpilot */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500 text-xl">★</span>
            <span className="font-semibold">Trustpilot</span>
          </div>
          <div className="flex gap-1 mb-1">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="bg-green-500 text-white rounded px-2 py-1 text-lg">★</span>
            ))}
            <span className="bg-gray-300 text-white rounded px-2 py-1 text-lg">★</span>
          </div>
          <div className="text-xs text-black">TrustScore 4.7 | 63,136 reviews</div>
        </div>
        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="hover:text-white font-medium">Terms of Use</a>
          <a href="#" className="hover:text-white font-medium">Privacy policy</a>
          <a href="#" className="hover:text-white font-medium">Affiliation Program</a>
          <a href="#" className="hover:text-white font-medium">Contact us</a>
          <div className="flex items-center gap-2 mt-2 font-medium hover:text-white cursor-pointer">
            <FaDiscord className="text-blue-600" />
            <span>Our Discord Bot</span>
          </div>
          <div className="flex items-center gap-2 font-medium hover:text-white cursor-pointer">
            <FaGift className="text-red-600" />
            <span>Redeem a Gift Card</span>
          </div>
          <div className="flex items-center gap-2 font-medium hover:text-white cursor-pointer">
            <FaNewspaper className="text-white" />
            <span>Find the latest video game news</span>
          </div>
        </div>
        {/* Social */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4 text-2xl">
            <FaDiscord className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
            <FaTwitch className="hover:text-white cursor-pointer" />
          </div>
          <div className="flex gap-2 mt-4">
            <a
              href="https://apps.apple.com/app/apple-store/id375380948"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10"
                style={{ cursor: "pointer" }}
              />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 text-xs text-black gap-4">
        <div>Copyright © 2025 Boolean Gaming - All rights reserved</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 font-medium text-black">
            <FaGlobe />
            <span>Italy</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-black">
            <FaLanguage />
            <span>English</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-black">
            <FaEuroSign />
            <span>EUR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
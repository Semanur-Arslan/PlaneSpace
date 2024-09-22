import { IoIosAirplane } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { PiNewspaperClippingThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

// Menüdeki elemanları için bir veri seti hazırladım.
const menuItems = [
    { href: "/", label: "Deals", icon: <MdOutlineDiscount size={20} color="#5b21b6" /> },
    { href: "/", label: "Discover", icon: <TbWorld size={20} color="#5b21b6" /> },
    { href: "/my-flights", label: "Rezervations", icon: <PiNewspaperClippingThin size={20} color="#5b21b6"/> },
];

// Props olarak menü durumunu ve menü durmunu güncelleyebileceğim state'i aldım.
export default function Header({ onMenuToggle, isMenuOpen }) {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    };

    // Mobilde menünün açılıp kapanması için fonksiyonu yazdım.
    const handleMenuToggle = () => onMenuToggle(!isMenuOpen);

    return (
        <div className="relative">
            {/* Menü */}
            <header className="flex justify-between items-center py-4">
                <div onClick={handleNavigate} className="flex items-center space-x-2 cursor-pointer">
                    <div className="bg-primary rounded-full py-1 pe-2 text-2xl md:text-3xl ">
                        <IoIosAirplane
                            color='white'
                        />
                    </div>
                    <h1 className="font-semibold">
                        PLANE SPACE
                    </h1>
                </div>
                <div className="hidden lg:flex lg:space-x-6">
                    {menuItems.map(({ href, label, icon }) => (
                        <a key={href} href={href} className="flex items-center">
                            {icon}
                            <p className="ml-2">{label}</p>
                        </a>
                    ))}
                    <div className="flex items-center">
                        <p>
                            Joane Smith
                        </p>
                    </div>
                </div>
                {/* Telefon ekranlarında menüyü açmak için icon ekledim */}
                <button className="lg:hidden p-2 text-primary" onClick={handleMenuToggle}>
                    <HiMenu size={24} />
                </button>
            </header>

            {/* Mobile Menü */}
            <div className={`z-10 rounded-l-3xl fixed top-0 right-0 h-full w-64 bg-white transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end p-4 mt-4">
                    <button onClick={handleMenuToggle}>
                        <IoMdClose size={24} />
                    </button>
                </div>
                <nav className="flex flex-col p-4 space-y-4">
                    <div className="flex items-center">
                        <p>
                            Joane Smith
                        </p>
                    </div>
                    {menuItems.map(({ href, label, icon }) => (
                        <a key={href} href={href} className="flex items-center space-x-2">
                            {icon}
                            <p>{label}</p>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}

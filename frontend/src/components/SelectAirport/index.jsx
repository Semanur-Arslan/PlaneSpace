import { useState, useEffect, useRef } from "react";

export default function Index({ icon: Icon, options, selectedOption, onOptionClick, rounded, fetchMore }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state
    const dropdownRef = useRef(null);

    let roundedClass = 'rounded-3xl';
    if (rounded === 'left') {
        roundedClass = 'rounded-l-3xl';
    } else if (rounded === 'right') {
        roundedClass = 'rounded-r-3xl';
    }

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            fetchMore();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Arama terimiyle filtreleme
    const filteredOptions = options.filter(option =>
        option?.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option?.publicName?.english?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <div
                className={`flex items-center border ${roundedClass} md:py-2 md:px-4 p-2 cursor-pointer bg-white`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Icon className="text-secondary mr-2" size={24} color="#5b21b6" />
                <span className="flex-1 text-darkGray overflow-hidden whitespace-nowrap">
                    {selectedOption}
                </span>
            </div>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute max-h-60 overflow-y-auto top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10"
                    onScroll={handleScroll}
                >
                    {/* Arama alanı */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border-b"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {filteredOptions.length === 0 ? (
                        <div className="p-2 text-center text-mediumGray">
                            No options available
                        </div>
                    ) : (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-secondary cursor-pointer"
                                onClick={() => {
                                    onOptionClick(option);
                                    setIsOpen(false);
                                    setSearchTerm(""); // Seçim sonrası arama terimini sıfırla
                                }}
                            >
                                {option.country} - {option.publicName.english}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

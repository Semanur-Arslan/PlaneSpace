// Rezervasyon kartı içerisindeki extra kutular için oluşturduğum component
export default function FlightBox({ price, label }) {
    return (
        <div className="border border-mediumGray bg-gray-100 rounded-lg h-full flex flex-col items-center justify-center py-2 overflow-hidden">
            <p className="font-semibold text-sm md:text-base">{price}</p>
            <p className="pt-2 md:pt-4 text-darkGray text-xs">{label}</p>
        </div>
    )
}

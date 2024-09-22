
export default function Index({ src, alt, overlayColor, Icon, text }) {
    return (
        <div className="relative h-64">
            <img src={src} alt={alt} className="w-full h-full object-cover rounded-3xl" />
            <div className={`absolute inset-0 ${overlayColor} bg-opacity-50 flex flex-col justify-end p-2 rounded-3xl`}>
                <Icon size={24} color='white' />
                <p className="text-white">
                    {text}
                </p>
            </div>
        </div>

    );
}

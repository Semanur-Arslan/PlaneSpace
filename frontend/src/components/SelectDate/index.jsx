// Tarih seçimi için oluşturduğum select component
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";

export default function Index({ icon: Icon = MdDateRange, selectedDate, onDateChange, rounded }) {

    const [isOpen, setIsOpen] = useState(false);

    // Input'un köşe yuvarlama değerlerini belirleyen değişken
    let roundedClass = 'rounded-3xl';
    if (rounded === 'left') {
        roundedClass = 'rounded-l-3xl';
    } else if (rounded === 'right') {
        roundedClass = 'rounded-r-3xl';
    }

    return (
        <div className="relative">
            <DatePicker
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date) => {
                    onDateChange(date);
                    setIsOpen(false);
                }}
                dateFormat="dd/MM/yyyy"
                className={`flex items-center border ${roundedClass} py-2 pe-2 ps-10 cursor-pointer bg-white`}
                open={isOpen}
                onClick={() => setIsOpen(true)}
                onCalendarClose={() => setIsOpen(false)}
                onClickOutside={() => setIsOpen(false)}
            />
            <div
                className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(prev => !prev);
                }}
            >
                <Icon size={20} color="#5b21b6" />
            </div>
            <div
                className="absolute inset-0"
                onClick={() => setIsOpen(true)}
            />
        </div>
    );
}

//Saat verilerini 12 saat formatına dönüştüren , tüm uygulama genelinde kullanabildiğim fonksiyon
export default function formatTime(timeString) {

    if (!timeString) {
        return 'Not determined'; 
    }
    const date = new Date(timeString);
    let hours = date.getHours(); 
    const minutes = date.getMinutes(); 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${hours}:${minutesString} ${ampm}`;
}

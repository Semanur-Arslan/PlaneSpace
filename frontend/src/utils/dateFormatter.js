//Tarih verilerini yyyy-mm-dd veya dd-mm-yyyy formatına dönüştüren fonksiyon , tüm uygulama genelinde kullanabiliyorum
export default function formatDate(dateString, format = 'yyyy-mm-dd') {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    if (format === 'dd-mm-yyyy') {
        return `${day}-${month}-${year}`;
    }
    
    // Varsayılan format
    return `${year}-${month}-${day}`;
}
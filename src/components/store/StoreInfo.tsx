import { Phone, MapPin } from "lucide-react";
export const StoreInfo = ({
  id,
  name,
  address,
  phone,
  hours,
  rating,
  isOpen,
}: any) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">{rating} / 5.0</span>
        </div>
        <span className={`text-sm font-medium ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
        <span>
          <MapPin className="inline h-4 w-4 mr-1" />
          {address}
        </span>
        <span>
          <Phone className="inline h-4 w-4 mr-1" />
          <a href={`tel:${phone}`} className="text-primary underline">{phone}</a>
        </span>
      </div>
      <div className="flex gap-2 mt-3">
        <a 
          href={`https://wa.me/${phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(name)}%2C%20I%20have%20an%20enquiry`} 
          target="_blank" rel="noopener noreferrer"
          className="bg-green-100 rounded-full px-3 py-1 text-xs text-green-700 flex items-center hover:bg-green-200"
          aria-label="Chat with retailer on WhatsApp"
        >
          <svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18" className="mr-1"> {/* simple WhatsApp icon */}
            <circle cx="16" cy="16" r="16" fill="#25D366"/>
            <path d="M23 17.5c-.35 0-.69-.18-.96-.48l-1.5-1.7c-.23-.27-.34-.64-.29-1.01.06-.36.27-.68.56-.9l.69-.47c.39-.27.62-.75.59-1.24A9.04 9.04 0 0016.07 7C12.09 7 8.7 10.5 8.7 15c0 1.32.31 2.61.9 3.77l-1.19 3.83 3.96-1.01A8.26 8.26 0 0016 23c4 0 7.29-3.5 7.29-8 0-2.47-1.07-4.75-2.87-6.48-.36-.32-.87-.42-1.31-.2-.44.21-.71.64-.69 1.12.04 1.02.53 1.95 1.36 2.59.32.25.53.64.52 1.09a1.31 1.31 0 01-.93 1.26z" fill="#fff"/>
          </svg>
          WhatsApp Retailer
        </a>
      </div>
    </div>
  );
};

import { FaWhatsapp } from 'react-icons/fa';
import { useSettings } from '../context/SettingsContext';

export default function WhatsAppButton() {
  const { settings } = useSettings();
  if (!settings.whatsapp) return null;

  return (
    <a
      className="whatsapp"
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

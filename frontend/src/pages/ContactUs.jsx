import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button"; // atau sesuaikan path Button kamu

export default function ContactDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown kalau klik di luar area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Tombol Contact Us */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="!bg-transparent !text-white hover:underline"
      >
        Contact Us
      </Button>

      {/* Dropdown muncul pas diklik */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[350px] bg-white border rounded-lg shadow-lg z-50">
          <ul className="py-2 text-center">
            <li>
              <a
                href="https://instagram.com/bingkizz.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-pink-100 text-pink-600"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/085295369674"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-green-100 text-green-600"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:bingkizz.in@gmail.com"
                className="block px-4 py-2 hover:bg-blue-100 text-blue-600"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

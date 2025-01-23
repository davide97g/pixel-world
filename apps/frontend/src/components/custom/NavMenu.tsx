import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="font-bold text-xl">HueVault</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="/"
                className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/colors"
                className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Colors
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/"
            className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="/colors"
            className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
          >
            Colors
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;

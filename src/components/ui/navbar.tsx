"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Contact", href: "#contact" },
  { label: "What", href: "#What" },
  { label: "How", href: "#How" },
  { label: "Why", href: "#Why" },
];

const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const isScrolledPast80Percent =
        scrollY > (documentHeight - windowHeight) * 0.8;
      setIsExpanded(isScrolledPast80Percent);
      setIsHighlighted(isScrolledPast80Percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsExpanded(!isExpanded);

  const renderNavItem = (item: NavItem, index: number) => {
    const isContact = index === 0;
    const itemClass = cn(
      "px-4 py-2 rounded-full transition-all duration-300 ease-in-out",
      isContact
        ? "bg-neutral-200/50 hover:bg-red-600 hover:text-white"
        : "hover:text-red-500",
      isContact && isHighlighted && "bg-red-600 text-white",
      isExpanded
        ? ""
        : ""
    );

    return (
      <li
        key={item.label}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isExpanded ? "max-w-fit opacity-100 translate-x-0 max-h-auto" : "max-w-0 overflow-hidden opacity-0 translate-x-[20px] max-h-0" 
        )}
      >
        {isContact ? (
          <button className={itemClass}>{item.label}</button>
        ) : (
          <Link href={item.href} className={itemClass}>
            {item.label}
          </Link>
        )}
      </li>
    );
  };

  return (
    <nav
      className={cn(
        "p-1 backdrop-blur-md rounded-full outline outline-1 outline-neutral-100 -outline-offset-1 fixed bottom-4 ml-4 right-2",
        className
      )}
    >
      <ul
        className={
          (cn("transition-all duration-500 ease-in-out"),
          isExpanded ? "flex items-center gap-0.5" : "block")
        }
      >
        {navItems.map(renderNavItem)}
        <li>
          <button
            onClick={toggleMenu}
            className="bg-neutral-200/50 hover:bg-neutral-900 text-neutral-800 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full"
          >
            Menu
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

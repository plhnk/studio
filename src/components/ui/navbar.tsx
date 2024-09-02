"use client";
import { useState, useEffect } from "react";
import { cn, onPageNav, isScrolledPast } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { MoveUp } from "lucide-react";

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
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(isScrolledPast(93));
      setIsHighlighted(isScrolledPast(99));
      setShowScrollButton(isScrolledPast(40));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsExpanded(!isExpanded);

  const renderNavItem = (item: NavItem, index: number) => {
    const isContact = index === 0;
    const itemClass = cn(
      "transition-all duration-300 ease-in-out",
      isContact
        ? "bg-neutral-200/50 hover:bg-red-600 hover:text-white px-4 py-2 rounded-full mr-3"
        : "hover:text-red-500 px-2.5",
      isContact && isHighlighted && "bg-red-600 text-white",
      isExpanded ? "" : ""
    );

    return (
      <li
        key={item.label}
        className={cn(
          "transition-all duration-300 ease-in-out",
          isExpanded
            ? "max-w-fit opacity-100 translate-x-0 max-h-auto"
            : "max-w-0 overflow-hidden opacity-0 translate-x-[20px] max-h-0"
        )}
      >
        {isContact ? (
          <button className={itemClass}>{item.label}</button>
        ) : (
          <Link
            onClick={onPageNav(item.href, 200)}
            href={item.href}
            className={itemClass}
          >
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
          isExpanded ? "flex items-center" : "block")
        }
      >
        {navItems.map(renderNavItem)}
        <li>
          <button
            onClick={toggleMenu}
            className="bg-neutral-200/50 hover:bg-neutral-900 active:bg-neutral-400 text-neutral-800 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full"
          >
            Menu
          </button>
        </li>
        <li
          className={cn(
            "absolute backdrop-blur-md -left-14 top-0 bottom-0 flex items-center justify-center outline outline-1 -outline-offset-1 outline-neutral-100 rounded-full p-1 transition-opacity duration-300 ease-in-out",
            showScrollButton ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={onPageNav("#Welcome", 0)}
            className="group rounded-full p-2 bg-neutral-200/50 hover:bg-neutral-900"
          >
            <MoveUp className="text-neutral-800 group-hover:text-white transition-all duration-200 ease-in-out" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

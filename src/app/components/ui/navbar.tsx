import { cn } from "@/lib/utils";
import Link from "next/link";

import React from "react";

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  const sections = [
    { id: "What" },
    { id: "How" },
    { id: "Why" },
    { id: "Who" },
  ];

  const categoryRefs = sections.reduce((refs, section) => {
    refs[section.id] = React.createRef();
    return refs;
  }, {} as Record<string, React.RefObject<HTMLDivElement>>);

  return (
    <nav className={cn("p-1 backdrop-blur-md rounded-full outline outline-1 outline-neutral-100 -outline-offset-1", className)}>
      <ul className="flex items-center justify-between">
        <li>
          <button className="bg-neutral-200/50 hover:bg-red-600 hover:text-white transition-colors duration-200 px-4 py-2 rounded-full">Contact</button>
        </li>
        <li>
          <Link href="#What" className="px-4 py-2 hover:text-red-500">
            What
          </Link>
        </li>
        <li>
          <Link href="#How" className="px-4 py-2 hover:text-red-500">
            How
          </Link>
        </li>
        <li>
          <Link href="#Why" className="px-4 py-2 hover:text-red-500">
            Why
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
// TODO
// have navbar hidden initially, then appear shortly after scrolling
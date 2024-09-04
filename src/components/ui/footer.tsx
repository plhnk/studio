import { cn } from "@/lib/utils";
import { getDateInfo } from "@/lib/utils";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

const year = getDateInfo().year;

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(`my-32 md:mb-1 text-neutral-600`, className)}>
      <p className="">
        Designed &amp; Built in the PNW{" "}
        <span className="text-neutral-300">|</span>{" "}
        <Link href="https://paul.hanaoka.co">plhnk</Link> ©️ {year}
      </p>
    </footer>
  );
};

export default Footer;

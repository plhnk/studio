import { cn } from "@/lib/utils";
import ProgressiveBlur from "@/lib/utilities/progressive-blur";
import AnimatedLogo from "../logo";
import Grid from "../grid";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(`isolate`, className)}>
      <ProgressiveBlur
        direction="top"
        className="absolute inset-0 h-[120%] z-0"
      />
      <AnimatedLogo className="w-[8ch] h-[6em] relative" />
    </header>
  );
};

export default Header;

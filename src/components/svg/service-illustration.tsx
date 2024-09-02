import { cn } from "@/lib/utils";

type ServiceIllustrationProps = {
  name: string;
  className?: string;
};

const ServiceIllustration: React.FC<ServiceIllustrationProps> = ({
  name,
  className,
}) => {
  return (
    <svg
      className={cn("text-neutral-900", className)}
      viewBox="0 0 246 337"
      aria-labelledby={`illustration of ${name}`}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default ServiceIllustration;

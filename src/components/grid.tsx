import { cn } from "@/lib/utils";

const Grid = ({ className }: { className?: string }) => {
  const baseBorder = `border-l border-r border-neutral-200 h-full w-full`;
  const mdBorders = `hidden md:block ${baseBorder}`;
  const lgBorders = `hidden lg:block ${baseBorder}`;
  const xlBorders = `hidden xl:block ${baseBorder}`;
  return (
    <>
      <div
        className={cn(
          "main-grid fixed pointer-events-none top-0 left-0 right-0 bottom-0 inset-0 -z-10",
          className
        )}
      >
        <div className={baseBorder} />
        <div className={baseBorder} />
        <div className={baseBorder} />

        <div className={mdBorders} />
        <div className={mdBorders} />
        <div className={mdBorders} />

        <div className={lgBorders} />
        <div className={lgBorders} />

        <div className={xlBorders} />
        <div className={xlBorders} />
        <div className={xlBorders} />
        <div className={xlBorders} />
      </div>
    </>
  );
};

export default Grid;

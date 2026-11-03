const STEPS = [
  { color: "bg-blue-950", width: "w-full" },
  { color: "bg-blue-900", width: "w-5/6" },
  { color: "bg-blue-700", width: "w-4/6" },
  { color: "bg-blue-500", width: "w-1/2" },
  { color: "bg-blue-300", width: "w-1/3" },
  { color: "bg-amber-400", width: "w-1/6" },
];

// A long navy bar stepping down to a short amber one: the long link becoming a short link.
const StepBand = ({
  align = "left",
  animated = false,
  scrub = false,
}: {
  align?: "left" | "right";
  animated?: boolean;
  scrub?: boolean;
}) => {
  return (
    <div
      aria-hidden
      data-scrub-band={scrub ? align : undefined}
      className={`flex flex-col w-full ${align === "right" ? "items-end" : "items-start"}`}
    >
      {STEPS.map((step, index) => (
        <div
          key={step.color}
          className={`h-4 sm:h-6 ${step.color} ${step.width} ${animated ? "step-shorten" : ""}`}
          style={animated ? { animationDelay: `${index * 70}ms` } : undefined}
        />
      ))}
    </div>
  );
};

export default StepBand;

// Sizes and offsets are in blocks, where one block is the distance from the page edge to the rail.
const BLOCKS = [
  { side: "left", column: 0, row: 0, size: 1, color: "bg-blue-500" },
  { side: "left", column: 0, row: 1, size: 1, color: "bg-amber-400" },
  { side: "left", column: 1, row: 0, size: 1, color: "bg-blue-300", morph: true },
  { side: "left", column: 2, row: 0, size: 0.5, color: "bg-amber-200" },
  { side: "right", column: 0, row: 0, size: 1, color: "bg-blue-700" },
  { side: "right", column: 0, row: 1, size: 1, color: "bg-amber-400" },
  { side: "right", column: 0, row: 2, size: 1, color: "bg-blue-300", morph: true },
  { side: "right", column: 1, row: 0, size: 1, color: "bg-blue-500", morph: true },
];

const HeroBlocks = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [--block:max(6vw,2.5rem)]"
    >
      <div
        data-rail
        className="absolute inset-y-0 left-(--block) w-px origin-top bg-white/10"
      />
      <div
        data-rail
        className="absolute inset-y-0 right-(--block) w-px origin-top bg-white/10"
      />
      {BLOCKS.map((block) => (
        <div
          key={`${block.side}-${block.column}-${block.row}`}
          data-block
          data-morph={block.morph ? "" : undefined}
          className={`hero-block absolute ${block.color}`}
          style={{
            [block.side]: `calc(var(--block) * ${block.column})`,
            bottom: `calc(var(--block) * ${block.row})`,
            width: `calc(var(--block) * ${block.size})`,
            height: `calc(var(--block) * ${block.size})`,
          }}
        />
      ))}
    </div>
  );
};

export default HeroBlocks;

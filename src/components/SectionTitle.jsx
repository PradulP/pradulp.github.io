export default function SectionTitle({ children, id }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2"
    >
      <span className="w-1.5 h-6 bg-sky-400 rounded" />
      {children}
    </h2>
  );
}

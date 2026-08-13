// Renders a variant's `specifications` object as a semantic technical table
// — same key/value content as before, presented as a strong-rhythm grid
// where the value reads larger than the label (label is the caption, value
// is the fact) instead of five equal-weight compressed cards.
export default function SpecificationGrid({ specifications }) {
  const entries = Object.entries(specifications);
  if (entries.length === 0) return null;

  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">Product specifications</caption>
      <tbody className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {entries.map(([key, value]) => (
          <tr key={key} className="flex flex-col gap-1.5 border-t border-surface-200/70 pt-4">
            <th scope="row" className="text-left font-body text-[11.5px] font-semibold uppercase tracking-wider text-surface-400 m-0 p-0">
              {key}
            </th>
            <td className="font-heading font-bold text-[18px] text-heading leading-snug p-0">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

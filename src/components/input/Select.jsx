export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="p-2 border-2 bg-slate-50 block w-full cursor-pointer rounded-sm">
      {children}
    </select>
  );
}

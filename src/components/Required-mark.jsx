export default function RequiredMark({ ...props }) {
  return (
    <span className="text-red-400" {...props}>
      *
    </span>
  );
}

export default function Textarea({ children, ...props }) {
  return (
    <textarea
      {...props}
      className="bg-gray-50 border-2 p-1 focus:outline-none focus:border-gray-500 block w-full text-lg text-gray-900"></textarea>
  );
}

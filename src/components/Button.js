export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="h-12 w-full rounded-sm bg-primary text-white mukta flex justify-center items-center"
    >
      {children}
    </button>
  );
}

import Loader from "./Loader";

export default function Loading() {
  return (
    <div className="fixed z-30 top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-50 bg-black">
      <Loader className="w-10 h-10 text-white" />
    </div>
  );
}

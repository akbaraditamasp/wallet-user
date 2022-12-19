import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Heading({
  left: Left,
  transparent,
  className,
  back,
  children,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={
        "sticky top-0 left-0 " +
        (transparent ? "bg-transparent" : "bg-white") +
        " h-16 flex items-center border-b z-20 " +
        className
      }
    >
      <div className="flex-1">
        {Left ? (
          <Left />
        ) : back ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-3 pl-5 mx-5 ml-0 flex-shrink-0 flex justify-center items-center"
          >
            <GoChevronLeft size={20} />
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="font-bold mukta text-gray-800 text-lg w-1/2 text-center">
        {children}
      </div>
      <div className="flex-1"></div>
    </div>
  );
}

import { forwardRef } from "react";

const TextInput = forwardRef(
  ({ containerClassName, className, label, left: Left, ...props }, ref) => {
    return (
      <div className={containerClassName || ""}>
        {label && <label className="mb-2 block">{label}</label>}
        <div className="relative border rounded-sm">
          {Left && (
            <div className="w-12 h-full absolute top-0 left-0 flex justify-center items-center">
              <Left className="text-gray-500" />
            </div>
          )}
          <input
            className={`h-12 w-full px-3 ${Left ? "pl-12" : ""} ${className}`}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);

export default TextInput;

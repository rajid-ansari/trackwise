import React from "react";

const Button = React.forwardRef(
    ({ children, className = "", type="button", ...props }, ref) => {
        return (
            <button ref={ref} type={type} className={`py-1 px-3 bg-blue-600 ${className}`} {...props}>
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };

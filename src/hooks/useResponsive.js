import { useState, useEffect } from "react";

const useResponsive = (breakpoint = 800) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= breakpoint);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= breakpoint);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isDesktop;
};

export default useResponsive;

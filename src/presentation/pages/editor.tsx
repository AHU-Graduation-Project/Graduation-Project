import { useState, useEffect } from 'react';
import RoadmapEditor from "../components/editor/RoadmapEditor";
import ScreenSizeWarning from "../components/common/ScreenSizeWarning";

export default function Editor() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            {isSmallScreen && <ScreenSizeWarning />}
            <RoadmapEditor />
        </>
    );
}
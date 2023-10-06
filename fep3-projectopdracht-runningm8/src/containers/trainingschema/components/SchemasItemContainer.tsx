import React, {useRef} from "react";

export function SchemasItemContainer({children}: {children: React.ReactNode}) {

    // @ts-ignore
    const onWheel = e => {
        // e.preventDefault();
        const container = scrollRef.current;
        // @ts-ignore - ignoring because container is NOT null :-)
        const containerScrollPosition = scrollRef.current.scrollLeft;
        // @ts-ignore - ignoring because container is NOT null :-)
        container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY,
            behaviour: "smooth"
        });
    };

    const scrollRef = useRef(null);
    return (
                <div ref={scrollRef} onWheel={onWheel} className={'screenHZContainer'}>
                    {children}
                </div>

    );
}

import { RefObject, useEffect } from "react";

export const useAnimationOnIntersection = ({
    ref,
    className,
}: {
    ref: RefObject<HTMLElement | null>;
    className: string
}) => {
    useEffect(() => {
        const currentRef = ref.current;

        const observer = new IntersectionObserver(
            (entry) => {
                if (entry[0].isIntersecting) {
                    entry[0].target.classList.add(className);
                    entry[0].target.classList.remove("offscreen");
                } else {
                    entry[0].target.classList.remove(className);
                    entry[0].target.classList.add("offscreen");
                }
            },
            { threshold: 0.75 },
        );

        if (currentRef) {
            observer.observe(currentRef);
        }
    }, [ref, className]);

    return {};
};
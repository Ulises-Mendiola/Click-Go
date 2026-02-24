import { useEffect, useRef } from 'react';

/**
 * Bidirectional scroll-reveal hook.
 * Adds 'visible' class when element enters viewport → CSS animates IN.
 * Removes 'visible' class when element leaves viewport → CSS transitions animate OUT.
 *
 * @param {object} options
 * @param {number}  options.threshold   - 0–1 portion of element visible to trigger (default 0.15)
 * @param {string}  options.rootMargin  - IntersectionObserver rootMargin (default '-5% 0px -5% 0px')
 * @param {boolean} options.once        - If true, only animate in once, never remove class (default false)
 * @param {number}  options.delay       - Extra delay before adding visible class (ms, default 0)
 */
const useScrollReveal = ({
    threshold = 0.15,
    rootMargin = '-5% 0px -5% 0px',
    once = false,
    delay = 0,
} = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (delay) {
                        setTimeout(() => el.classList.add('visible'), delay);
                    } else {
                        el.classList.add('visible');
                    }
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    el.classList.remove('visible');
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once, delay]);

    return ref;
};

export default useScrollReveal;

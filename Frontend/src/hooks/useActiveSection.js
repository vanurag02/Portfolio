import { useEffect, useState } from "react";

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.4, // section must be 40% visible to become active
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return activeSection;
}

export default useActiveSection;

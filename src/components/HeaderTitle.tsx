// HeaderTitle.tsx
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function HeaderTitle() {
  const el = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const typed = new Typed(el.current, {
      strings: ['Ramiro García', '&lt;RamiroGarcia/&gt;', './Ramiro-portfolio', 'RG.'],
      typeSpeed: 120,
      backSpeed: 70,
      backDelay: 15000,
      loop: true,
      smartBackspace: true,
    });

    return () => typed.destroy();
  }, []);

  return <span ref={el} className="header-title inline-block" />;
}

import React from 'react';
import type { EventProps } from '../types';

const Event = React.memo<EventProps>(({ icon, iconLabel, title, subtitle, slim, onSize }) => {
  const ref = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (ref.current && onSize) {
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      onSize({ width, height });
    }
  }, [onSize]);

  return (
    <li ref={ref} className={`event${slim ? ' event_slim' : ''}`}>
      <button className="event__button">
        <span 
          className={`event__icon event__icon_${icon}`} 
          role="img" 
          aria-label={iconLabel}
        />
        <h4 className="event__title">{title}</h4>
        {subtitle && (
          <span className="event__subtitle">{subtitle}</span>
        )}
      </button>
    </li>
  );
});

Event.displayName = 'Event';

export default Event; 
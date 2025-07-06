import React from 'react';
import Event from './Event';
import { TABS, TABS_KEYS } from '../data/tabs';
import type { Size } from '../types';

const Main = React.memo(() => {
  const ref = React.useRef<HTMLDivElement>(null);
  const initedRef = React.useRef(false);
  const [activeTab, setActiveTab] = React.useState('');
  const [hasRightScroll, setHasRightScroll] = React.useState(false);
  const [sizes, setSizes] = React.useState<Size[]>([]);

  React.useEffect(() => {
    if (!activeTab && !initedRef.current) {
      initedRef.current = true;
      setActiveTab(new URLSearchParams(location.search).get('tab') || 'all');
    }
  }, [activeTab]);

  const onSelectInput = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveTab(event.target.value);
  }, []);

  const onSize = React.useCallback((size: Size) => {
    setSizes(prevSizes => [...prevSizes, size]);
  }, []);

  React.useEffect(() => {
    if (sizes.length > 0) {
      const sumWidth = sizes.reduce((acc, item) => acc + item.width, 0);
      
      if (ref.current) {
        const newHasRightScroll = sumWidth > ref.current.offsetWidth;
        if (newHasRightScroll !== hasRightScroll) {
          setHasRightScroll(newHasRightScroll);
        }
      }
    }
  }, [sizes, hasRightScroll]);

  const onArrowClick = React.useCallback(() => {
    if (ref.current) {
      const scroller = ref.current.querySelector('.section__panel:not(.section__panel_hidden)') as HTMLElement;
      if (scroller) {
        scroller.scrollTo({
          left: scroller.scrollLeft + 400,
          behavior: 'smooth'
        });
      }
    }
  }, []);

  const handleTabClick = React.useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  return (
    <main className="main">
      <section className="section main__general">
        <h2 className="section__title section__title-header section__main-title">Главное</h2>
        <div className="hero-dashboard">
          <div className="hero-dashboard__primary">
            <h3 className="hero-dashboard__title">Привет, Геннадий!</h3>
            <p className="hero-dashboard__subtitle">Двери и окна закрыты, сигнализация включена.</p>
            <ul className="hero-dashboard__info">
              <li className="hero-dashboard__item">
                <div className="hero-dashboard__item-title">Дома</div>
                <div className="hero-dashboard__item-details">
                  +23
                  <span className="a11y-hidden">°</span>
                </div>
              </li>
              <li className="hero-dashboard__item">
                <div className="hero-dashboard__item-title">За окном</div>
                <div className="hero-dashboard__item-details">
                  +19
                  <span className="a11y-hidden">°</span>
                  <div
                    className="hero-dashboard__icon hero-dashboard__icon_rain"
                    role="img"
                    aria-label="Дождь"
                  />
                </div>
              </li>
            </ul>
          </div>
          <ul className="hero-dashboard__schedule">
            <Event
              icon="temp"
              iconLabel="Температура"
              title="Philips Cooler"
              subtitle="Начнет охлаждать в 16:30"
            />
            <Event
              icon="light"
              iconLabel="Освещение"
              title="Xiaomi Yeelight LED Smart Bulb"
              subtitle="Включится в 17:00"
            />
            <Event
              icon="light"
              iconLabel="Освещение"
              title="Xiaomi Yeelight LED Smart Bulb"
              subtitle="Включится в 17:00"
            />
          </ul>
        </div>
      </section>

      <section className="section main__scripts">
        <h2 className="section__title section__title-header">Избранные сценарии</h2>
        <ul className="event-grid">
          <Event
            slim={true}
            icon="light2"
            iconLabel="Освещение"
            title="Выключить весь свет в доме и во дворе"
          />
          <Event
            slim={true}
            icon="schedule"
            iconLabel="Расписание"
            title="Я ухожу"
          />
          <Event
            slim={true}
            icon="light2"
            iconLabel="Освещение"
            title="Включить свет в коридоре"
          />
          <Event
            slim={true}
            icon="temp2"
            iconLabel="Температура"
            title="Набрать горячую ванну"
            subtitle="Начнётся в 18:00"
          />
          <Event
            slim={true}
            icon="temp2"
            iconLabel="Температура"
            title="Сделать пол тёплым во всей квартире"
          />
        </ul>
      </section>

      <section className="section main__devices">
        <div className="section__title">
          <h2 className="section__title-header">Избранные устройства</h2>

          <select className="section__select" defaultValue="all" onChange={onSelectInput}>
            {TABS_KEYS.map(key => (
              <option key={key} value={key}>
                {TABS[key].title}
              </option>
            ))}
          </select>

          <ul role="tablist" className="section__tabs">
            {TABS_KEYS.map(key => (
              <li
                key={key}
                role="tab"
                aria-selected={key === activeTab ? 'true' : 'false'}
                tabIndex={key === activeTab ? 0 : undefined}
                className={`section__tab${key === activeTab ? ' section__tab_active' : ''}`}
                id={`tab_${key}`}
                aria-controls={`panel_${key}`}
                onClick={() => handleTabClick(key)}
              >
                {TABS[key].title}
              </li>
            ))}
          </ul>
        </div>

        <div className="section__panel-wrapper" ref={ref}>
          {TABS_KEYS.map(key => (
            <div
              key={key}
              role="tabpanel"
              className={`section__panel${key === activeTab ? '' : ' section__panel_hidden'}`}
              aria-hidden={key === activeTab ? 'false' : 'true'}
              id={`panel_${key}`}
              aria-labelledby={`tab_${key}`}
            >
              <ul className="section__panel-list">
                {TABS[key].items.map((item, index) => (
                  <Event
                    key={index}
                    {...item}
                    onSize={onSize}
                  />
                ))}
              </ul>
            </div>
          ))}
          {hasRightScroll && (
            <div className="section__arrow" onClick={onArrowClick} />
          )}
        </div>
      </section>
    </main>
  );
});

Main.displayName = 'Main';

export default Main; 
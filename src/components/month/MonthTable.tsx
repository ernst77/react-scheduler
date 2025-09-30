import { memo, useCallback, useMemo } from 'react';
import { Typography } from '@mui/material';
import { TableGrid } from '@/theme/css.ts';
import useStore from '../../hooks/useStore.ts';
import { dayjs } from '@/config/dayjs.ts';
import useSyncScroll from '../../hooks/useSyncScroll.ts';
import { DefaultResource, WeekDays } from '@/types.ts';
import { getResourcedEvents, sortEventsByTheEarliest } from '../../helpers/generals.tsx';
import { MonthEvents } from '@/components/events/MonthEvents.tsx';

interface Props {
  // daysList: Date[];
  resource?: DefaultResource;
  eachWeekStart: Date[];
}

const MonthTable = ({resource, eachWeekStart }: Props) => {
  const {
    selectedDate,
    events,
    handleGotoDay,
    resourceFields,
    fields,
    stickyNavigation,
    onClickMore,
    month
  } = useStore();

  const dayCount = month?.weekDays.length ?? 7;
  const weekDays = month?.weekDays ?? [0, 1, 2, 3, 4, 5, 6];

  const { headersRef, bodyRef } = useSyncScroll();
  const selectedDayjs = dayjs(selectedDate);
  const monthStart = selectedDayjs.startOf('month');
  const monthEnd = selectedDayjs.endOf('month');

  const resourcedEvents = useMemo(() => {
    let filteredEvents = sortEventsByTheEarliest(events);
    if (resource) {
      filteredEvents = getResourcedEvents(events, resource, resourceFields, fields);
    }
    return filteredEvents;
  }, [events, resource, resourceFields, fields]);

  const getEventsForDate = useCallback(
    (date: Date) => {
      const dateDayjs = dayjs(date);
      return resourcedEvents.filter((event) => {
        const eventStart = dayjs(event.start);
        const eventEnd = dayjs(event.end);
        return dateDayjs.isBetween(eventStart, eventEnd, 'day', '[]');
      });
    },
    [resourcedEvents]
  );

  const renderWeek = useCallback(
    (weekStart: Date, weekDays: WeekDays[]) => {
      const days = weekDays.map((day) => dayjs(weekStart).add(-1 + day, 'day').toDate());

      return days.map((date) => {
        const dateDayjs = dayjs(date);
        const isOutsideMonth = !dateDayjs.isBetween(monthStart, monthEnd, 'month', '[]');
        const events = getEventsForDate(date);

        return (
          <MonthEvents
            key={dateDayjs.valueOf()}
            date={date}
            events={events}
            isOutsideMonth={isOutsideMonth}
            onEventClick={() => {
              // Handle event click
            }}
            onMoreClick={() => {
              if (typeof onClickMore === 'function') {
                onClickMore(date, handleGotoDay);
              } else {
                handleGotoDay(date);
              }
            }}
          />
        );
      });
    },
    [monthStart, monthEnd, getEventsForDate, onClickMore, handleGotoDay]
  );
  console.log('startof', dayjs().startOf('week').format('YYYY-MM-DD'));
  console.log('weekDays', weekDays);

  return (
    <>
      <TableGrid
        days={dayCount}
        ref={headersRef}
        indent="0"
        sticky="1"
        stickyNavigation={stickyNavigation}
      >
        {weekDays.map((day, i) => (
          <Typography
            key={i}
            className="rs__cell rs__header rs__header__center"
            align="center"
            variant="body2"
          >
            {dayjs().startOf('week').add(-1 + day, 'day').format('dd').toUpperCase()}
          </Typography>
        ))}
      </TableGrid>

      <TableGrid days={dayCount} ref={bodyRef} indent="0">
        {eachWeekStart.map((weekStart) => (
          <div key={dayjs(weekStart).valueOf()} style={{ display: 'contents' }}>
            {renderWeek(weekStart, weekDays)}
          </div>
        ))}
      </TableGrid>
    </>
  );
};

export default memo(MonthTable);

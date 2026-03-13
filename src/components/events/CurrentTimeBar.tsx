import { useEffect, useState, useCallback } from 'react';
import { getTimeZonedDate } from '../../helpers/generals.tsx';
import { TimeIndicatorBar } from '@/theme/css.ts';
import { dayjs } from '@/config/dayjs.ts';

interface Props {
  startHour: number;
  step: number;
  minuteHeight: number;
  timeZone?: string;
  zIndex?: number;
}

const calculateTop = ({ startHour, minuteHeight, timeZone }: Props): number => {
  const now = getTimeZonedDate(new Date(), timeZone);
  const nowDayjs = dayjs(now);
  const currentTimeIndicatorHeight = 10; // 10px

  const startTime = nowDayjs.clone().hour(startHour).minute(0).second(0);
  const minutesFromTop = nowDayjs.diff(startTime, 'minute');

  const topSpace = minutesFromTop * minuteHeight;
  return topSpace - (currentTimeIndicatorHeight/2);
};

const CurrentTimeBar = ({ startHour, step, minuteHeight, timeZone, zIndex }: Props) => {
  const [top, setTop] = useState<number>(() =>
    calculateTop({ startHour, step, minuteHeight, timeZone })
  );

  const updatePosition = useCallback(() => {
    const newTop = calculateTop({
      startHour,
      step,
      minuteHeight,
      timeZone,
    });
    setTop(newTop);
  }, [startHour, step, minuteHeight, timeZone]);

  useEffect(() => {
    updatePosition();

    const interval = setInterval(updatePosition, 60 * 1000); // Update every minute

    return () => clearInterval(interval);
  }, [updatePosition]);

  // Prevent showing bar on top of days/header
  if (top < 0) return null;

  return (
    <TimeIndicatorBar style={{ top, zIndex }}>
      <div />
      <div />
    </TimeIndicatorBar>
  );
};

export default CurrentTimeBar;

import React, { ReactNode } from 'react';

import { cn } from 'utils/cn';

// Vertical pixels per hour of the day; the single source of truth for the
// time grid and for translating an event's start/end into a pixel offset.
export const HOUR_HEIGHT = 64;
// Height reserved at the top of each day column for its header label.
const HEADER_HEIGHT = 24;
// Width of the left gutter that holds the hour labels.
const TIME_WIDTH = 64;

export type CalendarEventVariant = 'lecture' | 'lab' | 'tutorial' | 'exam';

// `preview` events are rendered ghosted (dashed + blurred) so a caller can
// show a proposed change — e.g. a section swap — layered over the real ones.
export type CalendarEventState = 'default' | 'preview';

export type CalendarEvent = {
  /** Stable identity, used as the React key. */
  id: string;
  /** Column the event belongs to, indexing into `dayLabels`. */
  dayIndex: number;
  /** Minutes since midnight. */
  startMinutes: number;
  endMinutes: number;
  variant?: CalendarEventVariant;
  state?: CalendarEventState;
  /**
   * Side to occupy when sharing a slot with another event. Left unset, the
   * calendar derives this automatically for overlapping `default` events.
   */
  truncate?: 'left' | 'right';
  title?: ReactNode;
  subtitle?: ReactNode;
  timeLabel?: ReactNode;
  location?: ReactNode;
  onClick?: () => void;
};

export type CalendarProps = {
  /** One label per displayed day, left to right. */
  dayLabels: ReactNode[];
  events: CalendarEvent[];
  /** Inclusive hour bounds of the visible grid. */
  minHour: number;
  maxHour: number;
  /**
   * When false the grid is purely presentational: no hover affordances, no
   * pointer cursor and no click handlers fire. Useful for read-only previews.
   */
  interactive?: boolean;
  /** Optional toolbar rendered above the grid (week nav, term tabs, ...). */
  header?: ReactNode;
  className?: string;
};

// Faithful to legacy: a soft grid line and a dotted half-hour line.
const GRID_LINE = 'border-[#dfe1e5]';

const VARIANT_BORDER: Record<CalendarEventVariant, string> = {
  lecture: 'border-section-lecture',
  lab: 'border-section-lab',
  tutorial: 'border-section-tutorial',
  exam: 'border-section-exam',
};

const formatHour = (hour: number) => {
  if (hour === 0) return '12 am';
  if (hour === 12) return '12 pm';
  return hour < 12 ? `${hour} am` : `${hour - 12} pm`;
};

// Derive left/right placement for overlapping `default` events within each
// column. `preview` events are skipped so they layer cleanly on top, and any
// caller-provided `truncate` is left untouched.
const deriveTruncation = (events: CalendarEvent[]) => {
  const sides: Record<string, 'left' | 'right'> = {};
  const byColumn = new Map<number, CalendarEvent[]>();

  events.forEach((event) => {
    if (event.state === 'preview') return;
    const column = byColumn.get(event.dayIndex) ?? [];
    column.push(event);
    byColumn.set(event.dayIndex, column);
  });

  byColumn.forEach((column) => {
    const ordered = [...column].sort((a, b) => a.startMinutes - b.startMinutes);
    for (let i = 1; i < ordered.length; i += 1) {
      const prev = ordered[i - 1];
      const curr = ordered[i];
      if (prev.endMinutes > curr.startMinutes) {
        const prevSide = sides[prev.id] ?? (sides[prev.id] = 'left');
        sides[curr.id] = prevSide === 'left' ? 'right' : 'left';
      }
    }
  });

  return sides;
};

const Calendar = ({
  dayLabels,
  events,
  minHour,
  maxHour,
  interactive = true,
  header,
  className,
}: CalendarProps) => {
  const derivedSides = deriveTruncation(events);

  const hours: number[] = [];
  for (let hour = minHour; hour <= maxHour; hour += 1) hours.push(hour);

  const renderEvent = (event: CalendarEvent) => {
    const variant = event.variant ?? 'lecture';
    const truncate = event.truncate ?? derivedSides[event.id];
    const isPreview = event.state === 'preview';
    const clickable = interactive && Boolean(event.onClick);

    const top =
      ((event.startMinutes - minHour * 60) / 60) * HOUR_HEIGHT + HEADER_HEIGHT;
    const height =
      ((event.endMinutes - event.startMinutes) / 60) * HOUR_HEIGHT - 2;

    return (
      <div
        key={event.id}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? event.onClick : undefined}
        style={{ top, height }}
        className={cn(
          'absolute z-10 box-border overflow-hidden rounded border border-l-4 border-solid bg-[#f4f5f7] px-1 py-0.5 text-[11px] leading-tight text-[#172b4d]',
          VARIANT_BORDER[variant],
          truncate === 'left' && 'left-0 w-[calc(50%-4px)]',
          truncate === 'right' && 'right-1 w-[calc(50%-4px)]',
          !truncate && 'w-[calc(100%-4px)]',
          isPreview &&
            'pointer-events-none border-dashed opacity-70 blur-[1px]',
          interactive && 'transition-all',
          clickable && 'cursor-pointer',
          // Lift a stacked event clear of its neighbour on hover.
          interactive && truncate && 'hover:z-20 hover:w-[calc(100%-4px)]',
        )}
      >
        {(event.title || event.subtitle) && (
          <div className="font-semibold">
            {event.title}
            {event.title && event.subtitle ? (
              <span className="font-normal"> - </span>
            ) : null}
            {event.subtitle}
          </div>
        )}
        {event.timeLabel && <div>{event.timeLabel}</div>}
        {event.location && <div>{event.location}</div>}
      </div>
    );
  };

  return (
    <div className={cn('relative bg-card', className)}>
      {header}
      <div className="relative">
        {/* Background hour grid; defines the overall height. */}
        <div>
          <div style={{ height: HEADER_HEIGHT }} />
          {hours.map((hour) => (
            <div
              key={hour}
              style={{ height: HOUR_HEIGHT }}
              className={cn(
                'relative border-0 border-t border-solid px-4',
                GRID_LINE,
                "after:absolute after:left-16 after:right-0 after:top-1/2 after:-mt-px after:border-t after:border-dotted after:border-[#ebecf0] after:content-['']",
              )}
            >
              <div className="mt-1 text-[11px] text-muted-foreground">
                {formatHour(hour)}
              </div>
            </div>
          ))}
        </div>
        {/* Day columns + positioned events, overlaid on the hour grid. */}
        <div
          style={{ left: TIME_WIDTH }}
          className={cn(
            // overflow-auto lets the columns scroll horizontally on narrow
            // viewports rather than being clipped.
            'absolute bottom-0 right-0 top-0 flex overflow-auto border-0 border-l border-solid',
            GRID_LINE,
          )}
        >
          {dayLabels.map((label, column) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={column}
              className={cn(
                'relative h-full min-w-[136px] flex-1 border-0 border-r border-solid last:border-r-0',
                GRID_LINE,
              )}
            >
              <div className="absolute inset-x-0 top-0 flex h-6 items-center justify-center text-[11px] font-semibold">
                {label}
              </div>
              {events
                .filter((event) => event.dayIndex === column)
                .map(renderEvent)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

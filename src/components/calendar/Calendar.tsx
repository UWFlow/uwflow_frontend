import React, { ReactNode } from 'react';

import { cn } from 'lib/utils';

// Vertical pixels per hour of the day; the single source of truth for the
// time grid and for translating an event's start/end into a pixel offset.
export const HOUR_HEIGHT = 64;
// Height reserved at the top of each day column for its header label.
const HEADER_HEIGHT = 24;
// Width of the left gutter that holds the hour labels.
const TIME_WIDTH = 64;

/** Section-type colour of an event block. */
export type CalendarEventVariant = 'lecture' | 'lab' | 'tutorial' | 'other';

/**
 * Visual state of an event block:
 * - `default`  — a normal block.
 * - `selected` — emphasised with a ring in the variant colour.
 * - `dimmed`   — faded, e.g. existing events while a preview is shown.
 * - `preview`  — a translucent, dashed, slightly blurred "ghost" laid on top;
 *                non-interactive so it never intercepts clicks.
 */
export type CalendarEventState = 'default' | 'selected' | 'dimmed' | 'preview';

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
   * calendar derives this automatically for overlapping non-preview events.
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

// Soft grid line, faithful to the legacy calendar. (The dotted half-hour line
// is written inline below so Tailwind's JIT scanner can see the full class.)
const GRID_LINE = 'border-light3';

// Per-variant accent classes. `default`/`dimmed` blocks border in the accent;
// `selected` rings in it; `preview` borders + tints in it. Backed entirely by
// existing Tailwind tokens (see tailwind.config.js) — no arbitrary hex.
const VARIANT_BORDER: Record<CalendarEventVariant, string> = {
  lecture: 'border-lecture',
  lab: 'border-lab',
  tutorial: 'border-tutorial',
  other: 'border-dark3',
};

const VARIANT_RING: Record<CalendarEventVariant, string> = {
  lecture: 'ring-lecture',
  lab: 'ring-lab',
  tutorial: 'ring-tutorial',
  other: 'ring-dark3',
};

// Translucent fill for the preview ghost, in the variant colour.
const VARIANT_PREVIEW_FILL: Record<CalendarEventVariant, string> = {
  lecture: 'bg-lecture/20',
  lab: 'bg-lab/20',
  tutorial: 'bg-tutorial/20',
  other: 'bg-dark3/20',
};

// State -> extra block classes, layered on top of the base block + variant.
const STATE_CLASS: Record<CalendarEventState, string> = {
  default: '',
  selected: 'z-20 ring-2 ring-offset-1',
  dimmed: 'opacity-[0.38]',
  // Ghost: dashed, blurred and lifted above real events; never clickable.
  preview: 'z-30 border-dashed blur-[1px] pointer-events-none',
};

const formatHour = (hour: number) => {
  if (hour === 0) return '12 am';
  if (hour === 12) return '12 pm';
  return hour < 12 ? `${hour} am` : `${hour - 12} pm`;
};

// Derive left/right placement for overlapping non-preview events within each
// column. Preview ghosts are skipped so they layer cleanly on top, and any
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

/**
 * A purely presentational week-grid calendar. It knows nothing about Moment,
 * Apollo or the schedule shape — callers map their domain onto `CalendarEvent`s
 * and supply `dayLabels` and the visible hour range.
 *
 * The section-swap page reuses this directly:
 * - enrolled classes are `default` events;
 * - the class being swapped is `selected` (variant ring);
 * - while a candidate section is previewed, the enrolled blocks it would
 *   replace become `dimmed`, and the candidate is a `preview` ghost
 *   (translucent + dashed + `blur-[1px]`, non-interactive);
 * - a read-only summary can pass `interactive={false}` to drop all hover and
 *   click affordances.
 */
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
    const state = event.state ?? 'default';
    const isPreview = state === 'preview';
    // Preview ghosts overlay full-width and ignore overlap truncation.
    const truncate = isPreview
      ? undefined
      : event.truncate ?? derivedSides[event.id];
    const clickable = interactive && !isPreview && Boolean(event.onClick);

    // Map minutes-since-midnight to a pixel offset within the hour grid.
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
          // Base block: rounded, colour-bordered with a thick left rail.
          'absolute z-10 box-border overflow-hidden rounded border border-l-4 border-solid px-1 py-0.5 text-[11px] leading-tight text-dark1',
          // Preview ghosts tint in the variant colour; real blocks sit on light1.
          isPreview ? VARIANT_PREVIEW_FILL[variant] : 'bg-light1',
          VARIANT_BORDER[variant],
          state === 'selected' && VARIANT_RING[variant],
          STATE_CLASS[state],
          // Width / side when sharing a slot with an overlapping event.
          truncate === 'left' && 'left-0 w-[calc(50%-4px)]',
          truncate === 'right' && 'right-1 w-[calc(50%-4px)]',
          !truncate && 'w-[calc(100%-4px)]',
          interactive && !isPreview && 'transition-all',
          clickable && 'cursor-pointer',
          // Lift a stacked event clear of its neighbour on hover.
          interactive &&
            !isPreview &&
            truncate &&
            'hover:z-20 hover:w-[calc(100%-4px)]',
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
    <div className={cn('relative bg-white', className)}>
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
                // Dotted line halfway down each hour row.
                "after:absolute after:left-16 after:right-0 after:top-1/2 after:-mt-px after:border-t after:border-dotted after:border-light2 after:content-['']",
              )}
            >
              <div className="mt-1 text-[11px] text-dark3">
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

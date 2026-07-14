import React from 'react';
import { CheckCircle, CheckSquare, Circle } from 'react-feather';
import { Link } from 'react-router-dom';
import { getCoursePageRoute } from 'Routes';

import { Card, CardHeader } from 'components/ui/card';
import { PlannerDataQuery } from 'graphql/queries/planner/Planner';
import { cn } from 'lib/utils';
import { formatCourseCode } from 'utils/Misc';

import { evaluateChecklist } from './planner';
import RemoveButton from './RemoveButton';

type Checklist = PlannerDataQuery['checklist'][number];

type ChecklistCardProps = {
  checklist: Checklist;
  haveCodes: Set<string>;
  onRemove: (id: number) => void;
};

const ChecklistCard = ({
  checklist,
  haveCodes,
  onRemove,
}: ChecklistCardProps) => {
  const categories = evaluateChecklist(checklist.requirements, haveCodes);
  const total = categories.reduce((sum, c) => sum + c.items.length, 0);
  const met = categories.reduce((sum, c) => sum + c.metCount, 0);

  return (
    <Card>
      <CardHeader>
        <CheckSquare size={16} />
        <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {checklist.name}
        </span>
        <RemoveButton
          label={`Remove ${checklist.name}`}
          onClick={() => onRemove(checklist.id)}
        />
      </CardHeader>

      <div className="text-2xl font-semibold text-dark1">
        {met} / {total} <span className="text-sm font-regular">met</span>
      </div>
      <div className="mb-md mt-sm h-[8px] w-full rounded-full bg-light2">
        <div
          className="h-full rounded-full bg-professors transition-[width] duration-500"
          style={{ width: `${total > 0 ? (met / total) * 100 : 0}%` }}
        />
      </div>

      {categories.map((category) => (
        <div key={category.category} className="mb-md last:mb-0">
          <div className="mb-sm flex items-baseline justify-between">
            <span className="text-sm font-semibold text-dark1">
              {category.category}
            </span>
            <span
              className={cn(
                'text-xs font-semibold',
                category.metCount === category.items.length
                  ? 'text-professors'
                  : 'text-dark3',
              )}
            >
              {category.metCount}/{category.items.length}
            </span>
          </div>
          <div className="flex flex-col gap-xs">
            {category.items.map((item) => {
              const displayCode = item.matched ?? item.alternatives[0];
              const label = item.matched
                ? formatCourseCode(item.matched)
                : item.alternatives.map(formatCourseCode).join(' / ');
              return (
                <div
                  key={item.alternatives.join('-')}
                  className="flex items-center gap-sm"
                >
                  {item.matched ? (
                    <CheckCircle
                      size={14}
                      className="shrink-0 text-professors"
                    />
                  ) : (
                    <Circle size={14} className="shrink-0 text-light4" />
                  )}
                  <Link
                    to={getCoursePageRoute(displayCode)}
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold text-courses no-underline hover:underline"
                  >
                    {label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </Card>
  );
};

type ChecklistSidebarProps = {
  checklists: Checklist[];
  selectedIds: number[];
  haveCodes: Set<string>;
  onSelect: (ids: number[]) => void;
};

const ChecklistSidebar = ({
  checklists,
  selectedIds,
  haveCodes,
  onSelect,
}: ChecklistSidebarProps) => {
  const selected = selectedIds
    .map((id) => checklists.find((checklist) => checklist.id === id))
    .filter((checklist): checklist is Checklist => checklist !== undefined);
  const available = checklists.filter(
    (checklist) => !selectedIds.includes(checklist.id),
  );

  return (
    <>
      {selected.map((checklist) => (
        <ChecklistCard
          key={checklist.id}
          checklist={checklist}
          haveCodes={haveCodes}
          onRemove={(id) => onSelect(selectedIds.filter((s) => s !== id))}
        />
      ))}
      {available.length > 0 && (
        <select
          className="w-full cursor-pointer rounded-card border border-solid border-light3 bg-white p-sm font-inter text-sm text-dark2"
          value=""
          onChange={(e) => {
            const id = Number(e.target.value);
            if (id) onSelect([...selectedIds, id]);
          }}
        >
          <option value="">
            {selected.length > 0
              ? 'Import another checklist…'
              : 'Import a degree checklist…'}
          </option>
          {available.map((checklist) => (
            <option key={checklist.id} value={checklist.id}>
              {checklist.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default ChecklistSidebar;

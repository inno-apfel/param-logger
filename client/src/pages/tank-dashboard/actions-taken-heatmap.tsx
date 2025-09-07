import { 
  addDays, 
  differenceInCalendarWeeks, 
  getDay, 
  getMonth, 
  startOfYear 
} from "date-fns";
import * as d3 from "d3";
import { useState, useCallback, useMemo } from "react";

import { useParameters } from "@/hooks/useParameters";
import { 
  type Observation, 
  type ObservationWithParameter 
} from "@/types/prisma-models";

export type ContributionDay = {
  date: string;
  count: number;
  dayOfWeek: number;
  month: number;
  weekOfYear: number;
};

const MARGIN = { top: 10, right: 0, bottom: 0, left: 25, general: 10 };
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const colors = ["#e5e7eb", "#bfdbfe", "#60a5fa", "#2563eb", "#1e3a8a"];

// date: YYYY-MM-DD
// count: num
// dayOfWeek: [1,7] [sun, sat]
// month: [1,12] [jan, dec]
// weekOfYear: [1,53]
export function generateContributionData(observations: Observation[]): ContributionDay[] {
  // count # of activities completed per day
  const countsMap = new Map<string, number>();
  observations.forEach(obs => {
    const dateStr = obs.recorded_at.slice(0, 10); // YYYY-MM-DD
    countsMap.set(dateStr, (countsMap.get(dateStr) || 0) + 1);
  });
  const DAYS_IN_YEAR = 365;
  const JAN_FIRST = new Date(new Date().getFullYear(), 0, 1)
  // fill in everything
  const start = startOfYear(JAN_FIRST);
  const activityData: ContributionDay[] = [];
  for (let i = 0; i < DAYS_IN_YEAR; i++) {
    const currentDate = addDays(start, i);
    const dateStr = currentDate.toISOString().slice(0, 10);
    const count = countsMap.get(dateStr) || 
    // Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 20) + 1;
    0;
    const dayOfWeek = getDay(currentDate) + 1; // 1 (Sun) - 7 (Sat)
    const weekOfYear = differenceInCalendarWeeks(currentDate, startOfYear(currentDate), {
      weekStartsOn: 0
    }) + 1;
    const month = getMonth(currentDate) + 1;
    activityData.push({
      date: dateStr,
      count,
      dayOfWeek,
      month,
      weekOfYear,
    });
  }
  return activityData;
}

export function ActionsTakenHeatmap() {

  // ADJUST SVG SIZE BASED ON PARENT DIV
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const divRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const rect = node.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    }
  }, []);

  // GENERATE DATA
  const { parameters } = useParameters();
  const observationsWithParam: ObservationWithParameter[] = parameters.flatMap(
    (param) =>
      param.observations.map((obs) => ({
        ...obs,
        parameter_name: param.name,
        unit_of_measure: param.unit_of_measure,
      }))
  );
  const data = generateContributionData(observationsWithParam);
  const contributionCount = d3.rollup(observationsWithParam, (D) => D.length, (d)=>{d.recorded_at});

  // CALCULATE VARIABLE
  const [min, max] = d3.extent(data.map((d) => d.count));
  if (min === undefined || max === undefined) return null;
  
  const axesDaysOfWeek = [2, 4, 6]; // mon wed fri
  const includedDaysOfWeek = [1,2,3,4,5,6,7];
  const includedWeeksOfYear = useMemo(() => {
    const lastWeekOfYear = Math.max(...data.map(d => d.weekOfYear));
    return Array.from({ length: lastWeekOfYear }, (_, i) => (i + 1)); // ['1', '2', ... 'lastWeek']
  }, [data]);
  const includedMonths = useMemo(() => {
    const lastIncludedMonth = Math.max(...data.map(d => d.month));
    return Array.from({ length: lastIncludedMonth }, (_, i) => (i + 1)); 
  }, [data]);
  
  const innerWidth = width - MARGIN.left - MARGIN.general;
  const cellSize = innerWidth / includedWeeksOfYear.length;;

  // SCALES
  const xScale = useMemo(
    () =>
      d3
        .scaleBand<number>()
        .domain(includedWeeksOfYear)
        .range([MARGIN.left + MARGIN.general, MARGIN.left + MARGIN.general + cellSize * includedWeeksOfYear.length])
        .paddingInner(0.2) 
        .paddingOuter(0.01),
    [includedWeeksOfYear, width]
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleBand<number>()
        .domain(includedDaysOfWeek)
        .range([MARGIN.top + MARGIN.general, MARGIN.top + MARGIN.general + cellSize * includedDaysOfWeek.length]) // (width)/includedWeeksOfYear.length*includedDaysOfWeek.length
        .paddingInner(0.2) 
        .paddingOuter(0.01),
    [includedDaysOfWeek, height]
  );

  const legendScale = d3.scaleBand<number>()
    .domain(d3.range(colors.length))  // [0,1,2,3,4]
    .range([0, colors.length * cellSize])
    .paddingInner(0.2) 
    .paddingOuter(0.01);

  const colorScale = (count: number) => {
    if (count === 0) {
      return colors[0];
    }
    const quartile = Math.ceil((count / max) * (colors.length - 1));
    return colors[quartile]
  }

  // AXES LABELS
  const xLabels = includedMonths.map((month, i) => {
    const firstWeekOfMonth = data.find(d => d.month === month)?.weekOfYear ?? 0;
    const xPos = xScale(firstWeekOfMonth) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth()}
        y={0}
        textAnchor="middle"
        dominantBaseline="hanging"
        className="text-xs fill-muted-foreground font-sans"
      >
        {monthNames[month-1]}
      </text>
    );
  });
  const yLabels = axesDaysOfWeek.map((dayOfWeek, i) => {
    const yPos = yScale(dayOfWeek) ?? 0;
    return (
      <text
        key={i}
        x={MARGIN.left}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        className="text-xs fill-muted-foreground font-sans"
      >
        {weekdayNames[dayOfWeek - 1]}
      </text>
    );
  });

  // Tooltip state stores entire ContributionDay
  const [tooltip, setTooltip] = useState<{ x: number; y: number; data: ContributionDay } | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  //
  const allRects = data.map((d, i) => {
    const x = xScale(d.weekOfYear) ?? 0;
    const y = yScale(d.dayOfWeek) ?? 0;
    return (
      <rect
        key={i}
        x={x}
        y={y}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={colorScale(d.count)}
        rx={2}
        onMouseEnter={() => {
          setTooltip({
            x: x,
            y: y,                          
            data: d
          });
          setVisible(true)
        }}
        onMouseLeave={() => {
          setVisible(false)
        }}
      />
    );
  });

  return (
    <div ref={divRef} className="relative w-full">
      <svg width={width} height={MARGIN.top + MARGIN.general + cellSize * includedDaysOfWeek.length} > 
        <g className="relative">
          {allRects}
          {xLabels}
          {yLabels}
        </g>
      </svg>
      <div className="flex justify-between items-center text-xs text-muted-foreground mt-5">
        <div className="">
          {contributionCount} values logged in 2025
        </div>
        <div className="flex items-center gap-2">
          Less
          <svg width={legendScale.range()[1]} height={yScale.bandwidth()}> 
            <g>
              {colors.map((color, i) => {
                return (
                  <rect
                    x={legendScale(i)}
                    width={legendScale.bandwidth()}
                    height={yScale.bandwidth()}
                    fill={color}
                    rx={2}
                  />
                )
              })}
            </g>
          </svg>
          More
        </div>
      </div>
      <div
          className={`absolute transform  -translate-x-[46%] bg-neutral-800 text-white text-xs px-2 py-1 rounded pointer-events-none z-50`}
          style={{
            left: tooltip ? tooltip.x: 0,
            top: tooltip ? tooltip.y - 27: 0,
            opacity: visible ? 1 : 0, transition: "opacity 0.2s ease-in-out"
          }}
        >
          {tooltip && 
          <div>
            {tooltip.data.count} logs on {tooltip.data.date}.
          </div>}
      </div>
    </div>
  );
}








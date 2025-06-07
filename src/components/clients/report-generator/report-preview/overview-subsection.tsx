// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { useOverviewReportData } from "@/context/overviewReportData/useOverviewReportData";

// chart configuration
import { type ChartConfig } from "@/components/ui/chart"

// UI
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import { ChartContainer } from "@/components/ui/chart"
import AverageBadge from "@/components/ui/average-badge";

const chartConfig = {
    grade: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

const getBarColorByGrade = (grade: number): string => {
  if (grade <= 4) return "var(--color-status-fail)";
  if (grade >= 5 && grade <= 6) return "var(--color-status-low)";
  if (grade >= 7) return "var(--color-status-pass-muted)";
  return "var(--color-muted)";
};

export default function OverviewSubsection() {
    const { hiveDropData } = useOrchardReportData();    
    const { allHiveDrops } = useOverviewReportData();

    // Combine all grades from all hivedrops
    const allGrades = hiveDropData.flatMap(hivedrop => hivedrop.grades);
    const highestGrade = allGrades.length > 0 ? Math.max(...allGrades) : 14;
    
    // set ticks dynamically based on the highest grade - every other value working backwards so highest is always last
    const ticks: number[] = [];
    const startValue = highestGrade % 2; // Start from 0 if highest is even, 1 if highest is odd
    for (let i = startValue; i <= highestGrade; i += 2) {
        ticks.push(i);
    }

    // Calculate combined statistics
    const totalHivesCounted = hiveDropData.reduce((sum, hivedrop) => sum + hivedrop.hivesCounted, 0);
    const totalHivesGraded = hiveDropData.reduce((sum, hivedrop) => sum + hivedrop.hivesGraded, 0);
    const overallAverage = allGrades.length > 0 ? allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length : 0;

    // Create grade count data for the combined chart
    const gradeCount = allGrades.reduce((acc: { grade: number; count: number }[], grade: number) => {
        const existingGrade = acc.find((item: { grade: number; count: number }) => item.grade === grade);
        if (existingGrade) {
            existingGrade.count++;
        } else {
            acc.push({ grade, count: 1 });
        }
        return acc;
    }, [] as { grade: number; count: number }[]);

    // Sort the chart data by grade for proper display
    const chartData = gradeCount.sort((a, b) => a.grade - b.grade);

    return (
        <div className="p-6 section w-[8.5in] h-[11in] border-1 shadow-lg border-border">
            <div className="grid grid-cols-12 gap-4">                
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Overview
                    </h4> 
                </div>
                <div id="data" className="col-span-9 flex flex-col gap-2 mt-[2px]">
                    <AverageBadge value={overallAverage}>Average: {overallAverage.toFixed(1)}</AverageBadge>
                    <small className="mt-[6px]">
                        <strong>
                            {'Hives counted: '}
                        </strong>
                        {totalHivesCounted}
                    </small>
                    <small className="mb-[6px]">
                        <strong>
                            {'Hives graded: '}
                        </strong>
                        {totalHivesGraded}
                    </small>
                    <div id="chart-wrapper" className="-ml-13">
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <BarChart data={chartData} >
                                <CartesianGrid vertical={true} />
                                <XAxis                                    
                                    dataKey="grade"
                                    domain={[-0.4, highestGrade + 0.4]}
                                    type="number"
                                    tickLine={false}
                                    ticks={ticks}
                                    tickMargin={0}
                                    axisLine={false}
                                    label={{ value: 'Grade', position: 'insideBottom', offset: -5 }}
                                />
                                <YAxis                                    
                                    dataKey="count"
                                    domain={[0, 'dataMax']}
                                    tickLine={false}
                                    tickMargin={0}
                                    axisLine={false}
                                    reversed={false}
                                    label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 20 }}
                                />
                                <Bar dataKey="count" radius={4} maxBarSize={150}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getBarColorByGrade(entry.grade)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </div>                        
                </div>
            </div>
        </div>
    );
}
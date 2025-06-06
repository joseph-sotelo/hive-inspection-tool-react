// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";

// types
import { type HiveDropData } from "@/components/types";

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

export default function HiveDropReportSubsection() {
    const { hiveDropData } = useOrchardReportData();    

    // Calculate the highest grade across all hivedrops so all charts can display the same range for easy comparison
    const allGrades = hiveDropData.flatMap(hivedrop => hivedrop.grades);
    const highestGrade = allGrades.length > 0 ? Math.max(...allGrades) : 14;
    // set ticks dynamically based on the highest grade - every other value working backwards so highest is always last
    const ticks: number[] = [];
    const startValue = highestGrade % 2; // Start from 0 if highest is even, 1 if highest is odd
    for (let i = startValue; i <= highestGrade; i += 2) {
        ticks.push(i);
    }

    // Group hivedrops into pairs
    const hiveDropPairs = [];
    for (let i = 0; i < hiveDropData.length; i += 2) {
        hiveDropPairs.push(hiveDropData.slice(i, i + 2));
    }

    const renderHiveDrop = (hivedrop: HiveDropData, globalIndex: number) => {
        const gradeCount = hivedrop.grades.reduce((acc: { grade: number; count: number }[], grade: number) => {
            const existingGrade = acc.find((item: { grade: number; count: number }) => item.grade === grade);
            if (existingGrade) {
                existingGrade.count++;
            } else {
                acc.push({ grade, count: 1 });
            }
            return acc;
        }, [] as { grade: number; count: number }[]);

        // Find min and max grades
        const minGrade = Math.min(...hivedrop.grades);
        const maxGrade = Math.max(...hivedrop.grades);

        // Create complete range with zero counts for missing grades
        const chartData = [];
        for (let grade = minGrade; grade <= maxGrade; grade++) {
            const existingData = gradeCount.find((item: { grade: number; count: number }) => item.grade === grade);
            chartData.push({
                grade,
                count: existingData ? existingData.count : 0
            });
        }

        return (
            <div key={globalIndex} className="grid grid-cols-12 gap-4 mb-6">                
                <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                    <h4>
                        Hive Drop {globalIndex + 1}
                    </h4> 
                </div>
                <div id="data" className="col-span-9 flex flex-col gap-2 mt-[2px]">
                    <AverageBadge value={hivedrop.average}>Average:{Number(hivedrop.average).toFixed(1)}</AverageBadge>
                    <small className="mt-[6px]">
                        <strong>
                            {'Hives counted: '}
                        </strong>
                        {hivedrop.hivesCounted}
                    </small>
                    <small className="mb-[6px]">
                        <strong>
                            {'Hives graded: '}
                        </strong>
                        {hivedrop.hivesGraded}
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
                                    // tickFormatter={(value) => value.toString()}
                                />
                                <YAxis                                    
                                    dataKey="count"
                                    domain={[0, 6]}
                                    tickLine={false}
                                    tickMargin={0}
                                    axisLine={false}
                                    reversed={false}
                                    label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 20 }}
                                    // tickFormatter={(value) => value.toString()}
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
        );
    };

    return (
        <>
            {hiveDropPairs.map((pair, pairIndex) => (
                <div key={pairIndex} className="p-6 section w-[8.5in] h-[11in] border-1 shadow-lg border-border">
                    {pair.map((hivedrop, indexInPair) => {
                        const globalIndex = pairIndex * 2 + indexInPair;
                        return renderHiveDrop(hivedrop, globalIndex);
                    })}
                </div>
            ))}
        </>
    );
}
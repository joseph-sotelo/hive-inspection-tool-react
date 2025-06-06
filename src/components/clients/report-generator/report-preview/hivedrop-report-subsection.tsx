// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";

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

    return (
        <>
            {hiveDropData.map((hivedrop, index) => {
                const gradeCount = hivedrop.grades.reduce((acc, grade) => {
                    const existingGrade = acc.find(item => item.grade === grade);
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
                    const existingData = gradeCount.find(item => item.grade === grade);
                    chartData.push({
                        grade,
                        count: existingData ? existingData.count : 0
                    });
                }

                return (
                    <div key={index} className="grid grid-cols-12 gap-4 p-6 section">                
                        <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                            <h4>
                                Hive Drop {index + 1}
                            </h4> 
                        </div>
                        <div id="data" className="col-span-9 flex flex-col gap-2">
                            <AverageBadge value={hivedrop.average}>Average:{Number(hivedrop.average).toFixed(1)}</AverageBadge>
                            <small>
                                <strong>
                                    Hives counted:
                                </strong>
                                {hivedrop.hivesCounted}
                            </small>
                            <small>
                                <strong>
                                    Hives graded:
                                </strong>
                                {hivedrop.hivesGraded}
                            </small>
                            <div id="chart-wrapper" className="-ml-13">
                                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                    <BarChart data={chartData} >
                                        <CartesianGrid vertical={false} />
                                        <XAxis                                    
                                            dataKey="grade"
                                            // domain={[-0.4, 14]}
                                            // type="number"
                                            tickLine={false}
                                            // ticks={[0, 2, 4, 6, 8, 10]}
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
            })}
        </>
    );
}
// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";

// chart configuration
import { type ChartConfig } from "@/components/ui/chart"

// UI
import { Bar, BarChart } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

export default function HiveDropReportSubsection() {
    const { hiveDropData } = useOrchardReportData();    

    return (
        <>
            {hiveDropData.map((hivedrop, index) => {
                const chartData = hivedrop.grades.reduce((acc, grade) => {
                    const existingGrade = acc.find(item => item.grade === grade);
                    if (existingGrade) {
                        existingGrade.count++;
                    } else {
                        acc.push({ grade, count: 1 });
                    }
                    return acc;
                }, [] as { grade: number; count: number }[]);
                
                return (
                    <div key={index} className="grid grid-cols-12 gap-4 p-6 section">                
                        <div id="headers" className="col-span-3 text-right flex flex-col gap-8">
                            <h4>
                                Hive Drop {index + 1}
                            </h4> 
                        </div>
                        <div id="data" className="col-span-9 flex flex-col gap-2">
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <Bar dataKey="grade" fill="var(--color-desktop)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
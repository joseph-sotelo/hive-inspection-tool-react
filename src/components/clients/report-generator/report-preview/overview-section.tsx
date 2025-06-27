// displays a chart comparing the selected orchard with all orchard averages

// context
import { useOrchardReportData } from "@/context/orchardReportData/useOrchardReportData";
import { useOverviewReportData } from "@/context/overviewReportData/useOverviewReportData";

// UI
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import AverageBadge from "@/components/ui/average-badge";
import { type ChartConfig, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

// hooks
import { useEffect, useState } from "react";

// object used to configure the chart
const chartConfig = {
    current: {
      label: "This orchard",
      color: "var(--color-brand-light)",
    },
    average: {
      label: "All orchards average",
      color: "var(--color-brand-light-muted)",
    },
  } satisfies ChartConfig

export default function OverviewSection() {

    // gets data for the selected orchard
    const { hiveDropData } = useOrchardReportData();    

    // gets data for all orchards
    const { allHiveDrops } = useOverviewReportData();
    
    // used to store averaged data for all orchards
    const [averagedData, setAveragedData] = useState<{grade: number, count: number}[]>([]);

    // Combine all grades from all hivedrops
    const allGrades = hiveDropData.flatMap(hivedrop => hivedrop.grades);
    
    // Find highest grade from both current data and averaged data; used to set the chart's max value
    const allGradesFromBothDatasets = [
        ...allGrades,
        ...averagedData.map(item => item.grade)
    ];
    const highestGrade = allGradesFromBothDatasets.length > 0 ? Math.max(...allGradesFromBothDatasets) : 14;
    
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
    const orchardData = setChartData(allGrades);  

    useEffect(() => {
        const summaries = allHiveDrops.map((hivedrop) => {            
            return setChartData(hivedrop);        
        });        
        
        // Calculate averaged data
        const averaged = averageOrchardSummaries(summaries);
        setAveragedData(averaged);
    }, [allHiveDrops]);

    // Combine current orchard data with averaged data for the chart
    const allGradesForChart = new Set([
        ...orchardData.map(item => item.grade),
        ...averagedData.map(item => item.grade)
    ]);

    const chartData = Array.from(allGradesForChart)
        .filter(grade => grade <= 16) // Only include grades up to 16
        .map(grade => {
            const currentData = orchardData.find(item => item.grade === grade);
            const avgData = averagedData.find(item => item.grade === grade);
            
            return {
                grade,
                current: currentData ? currentData.count : 0,
                average: avgData ? avgData.count : 0
            };
        }).sort((a, b) => a.grade - b.grade);

    return (
        <div className="flex flex-col gap-8">
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
                </div>
            </div>
            <div id="chart-wrapper" className="ml-10 flex flex-col h-full justify-center">
                <ChartContainer config={chartConfig} className="w-full h-[350px]">
                    <BarChart data={chartData} >
                        <CartesianGrid vertical={true} />
                        <XAxis                                    
                            dataKey="grade"
                            domain={[-0.4, 16.4]}
                            type="number"
                            tickLine={false}
                            ticks={ticks.filter(tick => tick <= 16)}
                            tickMargin={0}
                            axisLine={false}
                            allowDataOverflow={false}
                            scale="linear"
                            label={{ value: 'Frames counted', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis                                    
                            domain={[0, (dataMax: number) => Math.ceil(dataMax)]}
                            tickLine={false}
                            tickMargin={0}
                            axisLine={false}
                            reversed={false}
                            label={{ value: 'Number of hives', angle: -90, position: 'insideLeft', offset: 20 }}
                        />
                        <ChartLegend content={<ChartLegendContent />} className="-ml-93" />
                        <Bar dataKey="current" fill="var(--color-current)" radius={4} maxBarSize={75} >
                        </Bar>
                        <Bar dataKey="average" fill="var(--color-average)" radius={4} maxBarSize={75} >
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </div>                 
        </div>
    );
}

const setChartData = (allGrades: number[]) => {
    const gradeCount = allGrades.reduce((acc: { grade: number; count: number }[], grade: number) => {
        const existingGrade = acc.find((item: { grade: number; count: number }) => item.grade === grade);
        if (existingGrade) {
            existingGrade.count++;
        } else {
            acc.push({ grade, count: 1 });
        }        
        return acc;
    }, [] as { grade: number; count: number }[]);

    const chartData = gradeCount.sort((a, b) => a.grade - b.grade);
    return chartData;
}

const averageOrchardSummaries = (summaries: {grade: number, count: number}[][]) => {
    if (summaries.length === 0) return [];
    
    // Collect all unique grades across all summaries
    const allGrades = new Set<number>();
    summaries.forEach(summary => {
        summary.forEach(item => allGrades.add(item.grade));
    });
    
    // Calculate average count for each grade
    const averagedData = Array.from(allGrades).map(grade => {
        const gradesWithCount = summaries
            .map(summary => summary.find(item => item.grade === grade))
            .filter(item => item !== undefined) as {grade: number, count: number}[];
        
        const totalCount = gradesWithCount.reduce((sum, item) => sum + item.count, 0);
        const averageCount = totalCount / summaries.length; // Divide by total summaries, not just ones with this grade
        
        return { grade, count: averageCount };
    });
    
    return averagedData.sort((a, b) => a.grade - b.grade);
}


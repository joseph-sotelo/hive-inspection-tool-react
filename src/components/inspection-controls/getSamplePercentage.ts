// returns the percentage of hives that need to be graded for a given hive drop based on the standard deveiation of graded hives so far

// constants
import { STATS } from "@/constants";

type GetSamplePercentageProps = {
    populationSize: number;
    totalHiveGrades: number[][];
}

export const getSamplePercentage = ({ populationSize, totalHiveGrades }: GetSamplePercentageProps) => {
    const calculateStandardDeviation = (grades: number[]) => {
        if (grades.length === 0) return 0;

        // calculate mean
        const sum = grades.reduce((sum, grade) => sum + grade, 0);
        const average = sum / grades.length;

        // calculate deviations
        const deviations = grades.reduce((sum, grade) => sum + Math.pow(grade - average, 2), 0);

        // calculate variance
        const variance = deviations / (grades.length - 1);

        // calculate standard deviation
        return Math.sqrt(variance);
    };

    const grades = totalHiveGrades.flat();
    const standardDeviation = calculateStandardDeviation(grades);
    const confidenceInterval = STATS.CONFIDENCE_INTERVAL;
    const marginOfError = STATS.MARGIN_OF_ERROR;
    const sampleSize = Math.pow((confidenceInterval * standardDeviation) / marginOfError, 2);
    const samplePercentage = Math.min(Math.max(sampleSize / populationSize, 0.06), 0.4);       
    return samplePercentage;
};

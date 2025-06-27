// returns the percentage of hives that need to be graded for a given hive drop based on the standard deveiation of graded hives so far

export const getHiveDropAverage = (hiveDropHiveGrades: number[]) => {

    const sum = hiveDropHiveGrades.reduce((sum, grade) => sum + grade, 0);
    const average = sum / hiveDropHiveGrades.length;
    return average;
};

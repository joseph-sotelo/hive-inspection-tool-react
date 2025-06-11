// useful for updating state that is a 2d array
type ArrayReplace2dProps = {
    array: number[][],
    index: number,
    value: number[]
}

export const useArray2dReplace = ({array, index, value}: ArrayReplace2dProps) => {
   array[index] = value;
   return array;
}
// useful for updating state that is an array
type ArrayReplaceProps = {
    array: number[],
    index: number,
    value: number
}

export const useArrayReplace = ({array, index, value}: ArrayReplaceProps) => {
   array[index] = value;
   return array;
}
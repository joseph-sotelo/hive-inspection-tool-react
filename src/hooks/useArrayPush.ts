// useful for updating state that is an array
type ArrayPushProps = {
    array: number[],
    value: number
}

export const useArrayPush = ({array, value}: ArrayPushProps) => {
   return [...array, value];
}
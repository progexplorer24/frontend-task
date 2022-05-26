import { hexToRgb, sortColorsArray } from "./helpers"

type ColorObject = {
  color: string,
  isRemovable: boolean
}

export type ColorParsed = {
  color: number[],
  isRemovable: boolean
}

const predefinedColorList: ColorObject[] = [
  {color: "#F87171", isRemovable: false}, 
  {color: "#FB923C", isRemovable: false},  
  {color: "#F59E0B", isRemovable: false}, 
  {color: "#14B8A6", isRemovable: false}, 
  {color: "#0369A1", isRemovable: false},
  {color: "#1D4ED8", isRemovable: false},
  {color: "#312E81", isRemovable: false},
  {color: "#F5F3FF", isRemovable: false},
  {color: "#C084FC", isRemovable: false},
  {color: "#A21CAF", isRemovable: false},
  {color: "#F0ABFC", isRemovable: false},
  {color: "#DB2777", isRemovable: false},
  {color: "#F43F5E", isRemovable: false},
  {color: "#FDE68A", isRemovable: false},
  ]
  
  const parsedColorList: ColorParsed[] = predefinedColorList.map(el => {
    return {
      color: hexToRgb(el.color),
      isRemovable: el.isRemovable
    }
  })
  export const colorList = sortColorsArray(parsedColorList)
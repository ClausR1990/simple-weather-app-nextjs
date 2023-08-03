/*
In this function, the degreesToCompass function takes a meteorological degree as input and calculates the corresponding compass direction in Danish. 
It does this by dividing the input degrees by 45 (since there are 8 main compass directions, 360 / 8 = 45) and rounding the result to the nearest integer to get the index of the compassDirections array. 
The array contains the Danish compass directions, and the function returns the direction based on the calculated index
*/

export function degreesToCompass(degrees: number): string {
  const compassDirections = [
    'Nord',
    'Nordøst',
    'Øst',
    'Sydøst',
    'Syd',
    'Sydvest',
    'Vest',
    'Nordvest',
    'Nord',
  ]
  const index = Math.round((degrees % 360) / 45)
  return compassDirections[index]
}

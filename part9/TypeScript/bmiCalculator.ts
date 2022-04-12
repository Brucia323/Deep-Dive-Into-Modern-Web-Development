const calculateBmi = (height: number, weight: number): number => {
  return weight / (height * 0.01) ** 2
}

export default calculateBmi
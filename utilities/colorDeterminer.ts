const colorDeterminer = (value: number): {
  bg: string,
  text: string
} => {
  if (value <= 100) {
    return {
      bg: "#BFDBFE",
      text: "#60A5FA"
    };
  } else if (value <= 200) {
    return {
      bg: "#A7F3D0",
      text: "#34D399"
    };
  } else if (value <= 500) {
    return {
      bg: "#FDE68A",
      text: "#FBBF24"
    };
  } else {
    return {
      bg: "#FECACA",
      text: "#F87171"
    };
  }
}

export default colorDeterminer;
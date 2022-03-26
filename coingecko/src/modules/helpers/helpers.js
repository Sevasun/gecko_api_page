const round = (number) => {
  const module = Math.abs(+number);

  if (module < 0.00001) {
    return +number.toFixed(8);
  } else if (module < 0.0001) {
    return +number.toFixed(7);
  } else if (module < 0.001) {
    return +number.toFixed(6);
  } else if (module < 0.01) {
    return +number.toFixed(5);
  } else if (module < 0.1) {
    return +number.toFixed(4);
  } else if (module < 1) {
    return +number.toFixed(3);
  } else if (module > 1) {
    return +number.toFixed(2);
  } else {
    return +number;
  }
};

const spanColor = (number) => {
  if (parseFloat(number) > 0) {
    return <span className='text-success'>{number}</span>
  } else if (parseFloat(number) < 0) {
    return <span className='text-danger'>{number}</span>
  } else {
    return <span className='text-warning'>{number}</span>
  }
}

export { round, spanColor };

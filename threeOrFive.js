function threeOrFive(num) {
  let sum = 0;
  for (let x = 0; x < num; x++) {
    if (x % 3 === 0 || x % 5 === 0) {
      sum += x;
    }
  }
  console.log(sum);
}

threeOrFive(20)
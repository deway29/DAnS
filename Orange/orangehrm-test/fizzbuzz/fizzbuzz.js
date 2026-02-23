function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    // Kondisi 1: Kelipatan 3 DAN 5
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } 
    // Kondisi 2: Kelipatan 3 saja (bukan 5)
    else if (i % 3 === 0) {
      console.log("Fizz");
    } 
    // Kondisi 3: Kelipatan 5 saja (bukan 3)
    else if (i % 5 === 0) {
      console.log("Buzz");
    } 
    // Kondisi 4: Tidak memenuhi kondisi di atas
    else {
      console.log(i);
    }
  }
}

//  pemanggilan fungsi dengan batasan n (misal n = 15)
fizzBuzz(15);

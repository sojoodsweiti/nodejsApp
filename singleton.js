class Counter {
    constructor() {
      this.count = 0;
    }
  
    increment() {
      this.count++;
      console.log(`Count: ${this.count}`);
    }
  }
  
  // Create an instance of the Counter class
  const counterInstance = new Counter();
  
  // Get user input using readline
  const readline = require('readline');
  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readLine.question('Enter the number of times to increment: ', function (userInputCount) {
    // Convert the user input to a number
    const countToIncrement = parseInt(userInputCount, 10);
  
    // Use a loop to increment the counter
    for (let i = 0; i < countToIncrement; i++) {
      counterInstance.increment();
    }
  
    // Close the readline interface
    readLine.close();
  });
  
  // Prevent further modifications to the prototype
  Object.freeze(Counter.prototype);
  
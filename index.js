const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const closeReadline = () => {
  rl.close();
};


const getFieldSize = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Enter field size [X Y]: `, (fieldSizeInput) => {
      resolve(fieldSizeInput)
    })
  })
}

const getStartPosition = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Enter start position [X Y Compass direction (N E S W)]: `, (startPositionInput) => {
      resolve(startPositionInput)
    })
  })
}

const getMovements = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Enter movements in a single row (L = Left, R = Right, F = Move in set direction): `, (movements) => {
      resolve(movements)
    })
  })
}

const go = (size, startPosition, movements) => {
  return new Promise((resolve, reject) => {
    try {
      const directions = ["N", "E", "S", "W"]; // Possible directions
      const field = size.split(" ").map(Number); // Our map
      const position = startPosition.split(" "); // Start position & direction
      let x = parseInt(position[0]);
      let y = parseInt(position[1]);
      let direction = position[2].toUpperCase();

      // Turn to the left
      const goLeft = () => {
        const index = directions.indexOf(direction);
        direction = directions[(index + 3) % 4];
      }

      // Turn to the right
      const goRight = () => {
        const index = directions.indexOf(direction);
        direction = directions[(index + 1) % 4];
      }

      // 1 step forward
      const goForward = () => {
        if (direction === "N") {
          y = Math.max(y - 1, 0); // Either subtract or set to edge (0)
        } else if (direction === "E") {
          x = Math.min(x + 1, field[0] - 1); // Either add or set to edge (Max width)
        } else if (direction === "S") {
          y = Math.min(y + 1, field[1] - 1); // Either add or set to edge (Max height)
        } else if (direction === "W") {
          x = Math.max(x - 1, 0); // Either subtract or set to edge (0)
        }
      }

      // Iterate moves
      for (let i = 0; i < movements.length; i++) {
        (movements[i].toUpperCase() === "L") && goLeft();
        (movements[i].toUpperCase() === "R") && goRight();
        (movements[i].toUpperCase() === "F") && goForward();
      }
      closeReadline();
      resolve(`${x} ${y} ${direction}`);
    } catch (error) {
      closeReadline();
      resolve(null)
    }
  });
}

const main = async () => {
  const fieldSize = await getFieldSize()
  const startPosition = await getStartPosition()
  const movements = await getMovements()

  const result = await go(fieldSize, startPosition, movements)
  console.log(`Report: ${result}`);
}

module.exports = { go }; // Used for Jest testing

main() // Running in console

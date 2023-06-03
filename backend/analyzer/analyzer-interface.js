function analyze(code) {
  let result = {};

  let lines = code.split("\n");

  for (let line in lines) {
    console.log(line);
  }

  return result;
}


analyze(`
Hello there!

My name is Y

anni.

`);

/**
 * @method
 * @param {any} actual
 * @param {any} expected
 * @param {string=} message
 */
function assert_eq(actual, expected, message = "") {
  console.log("\nRunning Assert...");
  let assertionCorrect = actual === expected;

  console.log(`%cThe assertion that '${actual}' === '${expected}' is ${assertionCorrect}.`, assertionCorrect ? "color: lime;" : "color: red;");

  if (!assertionCorrect) {
    console.error(`\nExpected '${expected}', found '${actual}'!\nMessage: ${message}`);
  }
}

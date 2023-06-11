/**
 * @method
 * @param {any} actual
 * @param {any} expected
 * */
export function assert_eq(actual, expected) {
  console.log("\nRunning Assert...");
  let assertionCorrect = actual === expected;

  console.log(`%cThe assertion that '${actual}' === '${expected}' is ${assertionCorrect}.\n`, assertionCorrect ? "color: lime;" : "color: red;");

  if (!assertionCorrect) {
    console.error(`\nExpected '${expected}', found '${actual}'!`);
  }
}

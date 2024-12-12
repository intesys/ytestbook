/**
 * Removes tuples from the target array based on a predicate function.
 *
 * @param {Array<[string, string]>} target - The array of tuples to remove elements from.
 * @param {(tuple: [string, string]) => boolean} predicate - A function that determines which tuples to remove.
 * Tuples for which the predicate returns `true` will be removed.
 */
export function removeTuples(
  target: [string, string][],
  predicate: (tuple: [string, string]) => boolean,
) {
  target.filter(predicate).forEach((tupleToRemove) => {
    const index = target.findIndex((tuple) =>
      tuple.every((value, index) => value === tupleToRemove[index]),
    );
    target.splice(index, 1);
  });
}

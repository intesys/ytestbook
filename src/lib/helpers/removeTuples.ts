export function removeTuples(
  tuples: [string, string][],
  predicate: (tuple: [string, string]) => boolean,
) {
  tuples.filter(predicate).forEach((tupleToRemove) => {
    const index = tuples.findIndex((tuple) =>
      tuple.every((value, index) => value === tupleToRemove[index]),
    );
    tuples.splice(index, 1);
  });
}

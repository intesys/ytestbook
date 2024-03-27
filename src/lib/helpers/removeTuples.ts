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

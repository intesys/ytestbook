export function addTuples(
  target: [string, string][],
  secondId: string,
  firstIdArr: string[],
) {
  const currentFirstIdArr = target
    .filter((tuple) => tuple[1] === secondId)
    .map((tuple) => tuple[0]);

  firstIdArr
    .filter((firstId) => !currentFirstIdArr.includes(firstId))
    .forEach((firstId) => target.push([firstId, secondId]));
}

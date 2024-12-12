/**
 * Adds new tuples to the target array by combining `firstIdArr` elements with the given `secondId`,
 * ensuring no duplicate combinations already exist in the target.
 *
 * @param {Array<[string, string]>} target - The array of tuples where the new tuples will be added.
 * @param {string} secondId - The second element of each tuple to be added.
 * @param {Array<string>} firstIdArr - An array of strings to be combined with `secondId` for new tuples.
 */
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

/**
 * Adds, updates or removes resource from list.
 * If resource.doc doesn't exists, it returns the original .
 * Designed to be used with `PouchDB.change` and `React.useState`:
 * 
 * ```
 * PoouchDB.change()
 *  .on("change", (res) => {
 *    setState(updateStateOnChange(res))
 *  })
 * ```
 */
export const updateStateOnChange = <T extends PouchDB.Core.IdMeta>(resource: PouchDB.Core.ChangesResponseChange<T>) => (prevState: T[]): T[] => {
  if (!resource.doc) {
    return prevState;
  }

  if (resource.deleted) {
    const index = prevState.findIndex(el => el._id === resource.doc?._id);
    let state = [...prevState];
    state.splice(index, 1);
    return state;
  }

  const existsAtIndex = prevState.findIndex(el => el._id === resource.doc?._id);
  if (existsAtIndex > -1) {
    prevState[existsAtIndex] = resource.doc as T;
    return prevState;
  }

  return [...prevState, resource.doc as T];
}
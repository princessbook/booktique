export function getFromAndTo(page: number, itemPerPage: number) {
  let from = page * itemPerPage;
  let to = from + itemPerPage;

  if (page > 0) {
    from += 1;
  }
  return { from, to };
}

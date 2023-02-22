/**
 * @param {string} name
 * @returns {string[]}
 */
export function dataFilenames(name) {
  return (
    {
      quick_sort: ["sort"],
      bubble_sort: ["sort"],
      floyd: ["graph"],
      nearest_neighbour: ["graph"],
      prim: ["graph"],
    }[name] || [name]
  );
}

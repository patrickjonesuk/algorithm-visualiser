import { TableItem } from "@/lib/targets";

export function byId(id, prop = "id") {
  return (item) => item[prop] === id;
}

/**
 * @returns {TableItem}
 */
export function fractionObjectZero() {
  return TableItem.valueOnly({
    numerator: 0,
    denominator: null,
    value: 0,
    fraction: false,
  });
}

export async function examplesFor(alg) {
  const examples = [];
  for (const filename of dataFilenames(alg)) {
    examples.push(
      ...(await import(`../../data/examples/${filename}.json`)).examples
    );
  }
  return examples;
}

export async function exampleObj(example, alg) {
  if (!isNaN(example)) {
    const examples = await examplesFor(alg);
    if (example < examples.length) {
      return examples[example];
    }
  }
  return {};
}

export function copyInputToClipboard(input, misc = {}) {
  try {
    navigator.clipboard.writeText(
      JSON.stringify({
        title: "",
        description: "",
        display: false,
        input: input,
        ...misc,
      })
    );
  } catch (e) {}
}

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

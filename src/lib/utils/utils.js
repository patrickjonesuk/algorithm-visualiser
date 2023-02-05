export function byId(id, prop = "id") {
  return (item) => item[prop] === id;
}

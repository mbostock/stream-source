export default function(source) {
  return typeof source.read === "function" ? source : source.getReader();
}

declare interface Tuple extends ReadonlyArray<[]>, PermissibleProps {}

interface PermissibleProps {
  reverse(): [];
  sort(compareFn?: (a: any, b: any) => number): this;
}

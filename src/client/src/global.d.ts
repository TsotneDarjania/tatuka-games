// global.d.ts
declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.jpg" {
  const value: HTMLImageElement;
  export default value;
}

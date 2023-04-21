import layoutConfig from "../config/layoutConfig.json";

export const screenSize = () => {
  if (window.innerWidth >= 1500 && window.innerHeight > 850)
    return layoutConfig.extraWidth;
  if (window.innerWidth >= 600 && window.innerWidth < 1500)
    return layoutConfig.extraWidth;
  if (window.innerWidth < 600) return layoutConfig.extraWidth;

  return layoutConfig.extraWidth;
};

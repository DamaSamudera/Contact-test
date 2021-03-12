export const autoPx = px => (
  px * window.innerWidth / (window.innerWidth < 768 ? 360 : 1440)
);

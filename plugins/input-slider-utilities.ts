import plugin from 'tailwindcss/plugin';

const inputSliderUtilities = plugin(({ addVariant }) => {
  addVariant('slider-thumb', [
    '&::-webkit-slider-thumb', // chrome, safari, edge
    '&::-moz-range-thumb', // firefox
    '&::-ms-thumb', // IE
  ]);
  addVariant('slider-track', [
    '&::-webkit-slider-runnable-track', // chrome, safari, edge
    '&::-moz-range-track', // firefox
    '&::-ms-track', // IE
  ]);
});

export default inputSliderUtilities;

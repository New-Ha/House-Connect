import plugin from 'tailwindcss/plugin';

const scrollbarUtilities = plugin(({addUtilities}) => {
  addUtilities({
    '.scrollbar-hide': {
      /* IE and Edge */
      '-ms-overflow-style': 'none',

      /* Firefox */
      'scrollbar-width': 'none',

      /* Chrome, Safari and Opera */
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    
    '.scrollbar-default': {
      /* IE and Edge */
      '-ms-overflow-style': 'auto',

      /* Firefox */
      'scrollbar-width': 'auto',

      /* Chrome, Safari and Opera */
      '&::-webkit-scrollbar': {
        display: 'block'
      }
    }
  })
})

export default scrollbarUtilities
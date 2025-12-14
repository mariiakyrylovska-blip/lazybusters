export const getPetImage = (petId: string): string => {
  const baseUrl = import.meta.env.BASE_URL

  switch (petId) {
    case 'arlo':
      return `${baseUrl}9119.png`
    case 'sasa':
      return `${baseUrl}9120.png`
    case 'luma':
      return `${baseUrl}9118.png`
    case 'koshara':
      return `${baseUrl}koshara.png`
    case 'stasik':
      return `${baseUrl}stasik.png`
    default:
      return ''
  }
}


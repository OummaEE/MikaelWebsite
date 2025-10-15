// Mikael Erikssons konstgalleri data

const ARTWORK_GALLERY = [
  {
    id: 'route66-angel',
    title: 'STOP ASKING FOR PERMISSION',
    year: '2024',
    medium: 'Akryl på duk',
    dimensions: 'Storformat',
    description: 'Angel staty möter Route 66 motel graffiti kultur. En kraftfull kritik av auktoritet genom urbana symboler.',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/93a484a63df63d082eb451818a383a1b',
    themes: ['Urban kultur', 'Auktoritetskritik', 'Americana', 'Graffiti'],
    colors: ['Gul', 'Rosa', 'Grön', 'Blå']
  },
  {
    id: 'psychedelic-urban',
    title: 'URBAN PSYCHEDELIA',
    year: '2024',
    medium: 'Blandat media',
    dimensions: 'Mellanformat',
    description: 'Svampar och fjärilar i graffiti-landskap. Naturens psykedeliska möte med urban decay.',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/524d2411d3798d3dbfeecbf4b53c24c6',
    themes: ['Natur', 'Psykedelisk', 'Graffiti', 'Transformation'],
    colors: ['Röd', 'Orange', 'Gul', 'Svart']
  },
  {
    id: 'industrial-dystopia',
    title: 'WITH GREAT POWER COMES GREAT RESPONSIBILITY',
    year: '2024',
    medium: 'Akryl på duk',
    dimensions: 'Storformat',
    description: 'Industriell dystopi med filosofiska budskap. Spider-Man citat möter urban verklighet.',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/42988cb94da96d8eb238456ce286ac71',
    themes: ['Makt', 'Ansvar', 'Industri', 'Populärkultur'],
    colors: ['Blå', 'Orange', 'Gul', 'Svart']
  },
  {
    id: 'chain-link-portrait',
    title: '24 GIANT SIZE PKGS',
    year: '2024',
    medium: 'Akryl och tusch',
    dimensions: 'Mellanformat',
    description: 'Identitet bakom industriella metaforer. Portraits fragmenterade genom stängsel och text.',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/bdf9068e4d0cd8ac382a98ff804f64ea',
    themes: ['Identitet', 'Konsumtion', 'Fragmentering', 'Text'],
    colors: ['Blå', 'Rosa', 'Gul', 'Svart']
  },
  {
    id: 'blue-fragments',
    title: 'BLUE FRAGMENTS',
    year: '2024',
    medium: 'Tusch på papper',
    dimensions: 'Mindre format',
    description: 'Fragmentariska porträtt i blå toner. Ansikten som försvinner i abstrakta former.',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/459c1a11b046d3015219f2f9e52e6324',
    themes: ['Porträtt', 'Fragmentering', 'Identitet', 'Abstraktion'],
    colors: ['Blå', 'Svart', 'Vit']
  },
  {
    id: 'swedish-roots',
    title: 'SVENSKA RÖTTER',
    year: '2020-tal',
    medium: 'Akvarell på papper',
    dimensions: 'Mellanformat',
    description: 'Nostalgisk reflektion över svensk landsbygd. Kontrast till urbana verk - rötter och tradition.',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/ec1ecf4678e67c0f6e2c7ffe16a809d9',
    themes: ['Nostalgi', 'Landsbygd', 'Tradition', 'Rötter'],
    colors: ['Gul', 'Orange', 'Brun', 'Röd']
  },
  {
    id: 'exhibition-hall',
    title: 'JAKOBSBERGS KONSTHALL EXHIBITION',
    year: '2024',
    medium: 'Installation view',
    dimensions: 'Varierat',
    description: 'UNFUCK THE WORLD!!! exhibition på Jakobsbergs konsthall. Stora färgglada målningar möter urbana meddelanden.',
    imageUrl: 'https://page.gensparksite.com/v1/base64_upload/63b6eb07ee9ddf43de3cc58c6b59596b',
    themes: ['Utställning', 'Institutionell kontext', 'Presentation', 'Offentlighet'],
    colors: ['Blå', 'Gul', 'Rosa', 'Vit']
  }
];

// Export för användning i webbplatsen
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ARTWORK_GALLERY;
} else if (typeof window !== 'undefined') {
  window.ARTWORK_GALLERY = ARTWORK_GALLERY;
}
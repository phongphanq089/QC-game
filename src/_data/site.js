module.exports = {
  name: 'MUMOIRA',
  url: 'https://qc-game-html.netlify.app/',
  author: 'SweetSoft JSC',
  defaultTitle: 'MUMOIRA RESORT',
  defaultDescription: 'MUMOIRA Mu mới ra tháng 12 2025 - Mu Sài Gòn Pc Season 6.9 - Lâu dài - hấp dẫn - đông vui',
  defaultOgImage: 'https://qc-game-html.netlify.app/share-bg.jpg',

  favicon: 'https://MUMOIRAresortspa.com/favicon.ico',
  // /Orgacert
  baseUrl: process.env.NODE_ENV === 'production' ? '/Orgacert' : '',
  baseLink: process.env.NODE_ENV === 'production' ? 'https://qc-game-html.netlify.app' : '',
  imgUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://qc-game-html.netlify.app'
      : '',
}

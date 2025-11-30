module.exports = {
  name: 'Aquamarine',
  url: 'https://demo.sweetsoft.vn/Aquamarine',
  author: 'SweetSoft JSC',
  defaultTitle: 'AQUAMARINE RESORT & SPA, Nha Trang',
  defaultDescription: 'Aquamarine Resort Spa Cam Ranh by Swandor Nha Trang - khu nghỉ dưỡng 5 sao giữa thiên nhiên xanh mát với phòng sang trọng, công viên nước, ẩm thực đa dạng và vô số hoạt động giải trí cho mọi lứa tuổi.',
  defaultOgImage: 'https://demo.sweetsoft.vn/Aquamarine/share-bg.jpg',
  //'https://demo.sweetsoft.vn/Aquamarine/favicon.ico'
  // https://aquamarineresortspa.com/favicon.ico
  favicon: 'https://aquamarineresortspa.com/favicon.ico',
  // /Orgacert
  baseUrl: process.env.NODE_ENV === 'production' ? '/Orgacert' : '',
  baseLink: process.env.NODE_ENV === 'production' ? 'https://demo.sweetsoft.vn/Aquamarine' : '',
  imgUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://demo.sweetsoft.vn/Aquamarine'
      : '',
}

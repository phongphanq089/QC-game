const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const tailwindcss = require('eleventy-plugin-tailwindcss-4')
const eleventySass = require("eleventy-sass");
const prettier = require("prettier");


module.exports = function (eleventyConfig) {

  const isProduction = process.env.NODE_ENV === 'production';

  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')

  eleventyConfig.addTransform("prettier", function (content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      return prettier.format(content, {
        parser: "html",
        // Tùy chọn: bạn có thể thêm các quy tắc format của riêng mình ở đây
        // ví dụ: tabWidth: 2, singleQuote: true, ...
      });
    }
    return content;
  });

  eleventyConfig.addPlugin(tailwindcss, {
    input: 'styles/main.css',
    output: 'styles/main.css'
  });


  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('yy-MM-dd');
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("dd-MM-yy");
  });

  return {
    pathPrefix: isProduction ? '/SG-QuickPay/' : '/',
    dir: { input: 'src', output: '_site' }
  };
};

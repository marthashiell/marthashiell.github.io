const fs = require('fs');
const htmlMinify = require('html-minifier').minify;
const parse5 = require('parse5');
const Bundler = require('polymer-bundler').Bundler;
const jsMinify = require('uglify-es').minify;

const bundler = new Bundler({stripComments: true});

function minifyJS(text, inline) {
  const result = jsMinify(text, {parse: {bare_returns: inline}});
  if (result.error) {
    console.log(result.error);
    return text;
  }
  return result.code;
}

(async function() {
  const manifest = await bundler.generateManifest(['index_dev.html']);
  const bundle = await bundler.bundle(manifest);

  let out = parse5.serialize(bundle.documents.get('index_dev.html').ast);

  out = htmlMinify(out, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: minifyJS,
    removeComments: true,
    sortAttributes: true,
    sortClassName: true
  });

  fs.writeFileSync('index.html', out);
})();

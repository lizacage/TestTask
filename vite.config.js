import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

const jsToBottomNoModule = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      html = html.replace(`type="module" crossorigin`, "");
      let scriptTag = html.match(/<script[^>]*>(.*?)<\/script[^>]*>/)[0];
      html = html.replace(scriptTag, "");
      html = html.replace("<!-- # INSERT SCRIPT HERE -->", scriptTag);
      return html;
    }
  }
}

export default defineConfig({
  base: '',
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
        input: {
            main: resolve(root, 'index.html')
        },
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, 'partials'),
    }),
    jsToBottomNoModule()
  ]
})
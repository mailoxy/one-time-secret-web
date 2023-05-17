import adapter from '@sveltejs/adapter-cloudflare';
import {vitePreprocess} from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(
            {
                // default options are shown. On some platforms
                // these options are set automatically — see below
                // pages: 'build',
                // assets: 'build',
                // fallback: null,
                // precompress: false,
                // strict: true,
                routes: {
                  include: ['/*'],
                  exclude: ['<all>']
              }
            }
        )
    },
    preprocess: vitePreprocess()
};
export default config;

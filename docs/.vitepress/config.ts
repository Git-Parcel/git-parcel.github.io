import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
import { buildSidebar } from '../../lib/config-utils/sidebar.ts'
import { withMermaid } from 'vitepress-plugin-mermaid'

const isDev = Deno.args.includes('dev')

let config: UserConfig = {
  outDir: '../dist',
  base: '/',
  cleanUrls: true,
  title: 'Git-Parcel',
  description: 'A Minecraft mod',
  markdown: {
    math: true,
  },
  vite: {
    server: {
      allowedHosts: [
        'git-parcel.github.io',
        '.local',
      ],
    },
    resolve: {
      alias: {},
    },
  },
  ignoreDeadLinks: true,
  themeConfig: {
    externalLinkIcon: true,

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            processTerm: (term) => {
              term = term.toLowerCase()
                .replace(/([\u4e00-\u9fff])/g, '$1 ')
                .trim().replace(/\s+/g, ' ')
              const terms = term.split(' ')
              return terms.length === 1 ? term : terms
            },
          },
          searchOptions: {},
        },
      },
    },

    nav: [
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/dev': buildSidebar('dev'),
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Git-Parcel',
      },
    ],
    footer: {
      message: 'License: MIT',
    },
    editLink: {
      pattern:
        'https://github.com/Git-Parcel/Documentation/edit/main/docs/:path',
      text: '在 Github 上编辑此页',
    },
  },
} satisfies UserConfig<DefaultTheme.Config>

if (!isDev) {
  config = withMermaid(config)
}

export default defineConfig(config)

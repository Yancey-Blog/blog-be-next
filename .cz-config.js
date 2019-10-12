module.exports = {
  // types,
  types: [
    {
      value: ':sparkles: feat',
      name: '✨  A new feature',
    },
    {
      value: ':boom: breaking',
      name: '💥  Introducing breaking changes.',
    },
    {
      value: ':bug: fix',
      name: '🐛  A bug fix',
    },
    {
      value: ':ambulance: hotfix',
      name: '🚑  Critical hotfix.',
    },
    {
      value: ':memo: docs',
      name: '📝  Documentation only changes',
    },
    {
      value: ':bulb: docs_code',
      name: '💡  Documenting source code.',
    },
    {
      value: ':lipstick: ui',
      name: '💄  Updating the UI and style files.',
    },
    {
      value: ':construction: WIP',
      name: '🚧  Work in progress',
    },
    {
      value: ':hammer: refactor',
      name: '🔨  A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: ':art: style',
      name:
        '🎨  Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: ':rotating_light: lint',
      name: '🚨  Removing linter warnings.',
    },
    {
      value: ':pencil2: typo',
      name: '✏️️️  Fixing typos.',
    },
    {
      value: ':truck: mv',
      name: '🚚  Moving or renaming files.',
    },
    {
      value: ':fire: prune',
      name: '🔥  Removing code or files.',
    },
    {
      value: ':ok_hand: review',
      name: '👌  Updating code due to code review changes.',
    },
    {
      value: ':rewind: revert',
      name: '⏪  Reverting changes.',
    },
    {
      value: ':twisted_rightwards_arrows: merge',
      name: '🔀  Merging branches.',
    },
    {
      value: ':bookmark: release',
      name: '🔖  Releasing / Version tags.',
    },
    {
      value: ':white_check_mark: test',
      name: '✅  Adding (missing) tests',
    },

    {
      value: ':rocket: deploy',
      name: '🚀  Deploying stuff.',
    },
    {
      value: ':green_heart: fixci',
      name: '💚  Fixing CI Build.',
    },
    {
      value: ':whale: docker',
      name: '🐳  Work about Docker.',
    },

    {
      value: ':lock: security',
      name: '🔒  Fixing security issues.',
    },

    {
      value: ':wrench: config',
      name: '🔧  Changing configuration files.',
    },
    {
      value: ':package: dep_up',
      name: '📦  Updating compiled files or packages.',
    },
    {
      value: ':heavy_plus_sign: dep_add',
      name: '➕  Adding a dependency.',
    },
    {
      value: ':heavy_minus_sign: dep_rm',
      name: '➖  Removing a dependency.',
    },

    {
      value: ':hankey: chore',
      name:
        '💩  Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    },
    {
      value: ':loud_sound: log_add',
      name: '🔊  Adding logs.',
    },
    {
      value: ':mute: log_rm',
      name: '🔇  Removing logs.',
    },
    {
      value: ':globe_with_meridians: i18n',
      name: '🌐  Internationalization and localization.',
    },
    {
      value: ':alien: compat',
      name: '👽  Updating code due to external API changes.',
    },
    {
      value: ':tada: init',
      name: '🎉  Initial commit.',
    },
  ],

  // the scope of file you modified.
  scopes: [],

  // it needs to match the value for field type. Eg.: 'fix'

  // scopeOverrides: {
  // 	fix: [
  // 		{ name: 'merge' },
  // 		{ name: 'style' },
  // 		{ name: 'e2eTest' },
  // 		{ name: 'unitTest' },
  // 	],
  // },
  scopeOverrides: {
    ':wrench: docs': [{ name: ':wrench: docs' }, { name: ':bulb: docs_code' }],
  },

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body:
      'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
}

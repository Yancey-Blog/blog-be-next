<div align="center">

# Blog BE Next

The backend platform for Yancey Official Blog with Node.js, NestJS, MongoDB, GraphQL, JWT and more...

_This library is part of the [BEG (Blog Environment Group)](https://github.com/Yancey-Blog)_ ecosystem 📖

![Build Status](https://github.com/Yancey-Blog/blog-be-next/actions/workflows/github-actions.yml/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/899c1498056d402284353047fcde0632)](https://www.codacy.com/manual/YanceyOfficial/blog-be-next?utm_source=github.com&utm_medium=referral&utm_content=Yancey-Blog/blog-be-next&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/Yancey-Blog/blog-be-next/branch/master/graph/badge.svg)](https://codecov.io/gh/Yancey-Blog/blog-be-next)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FYancey-Blog%2Fblog-be-next.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FYancey-Blog%2Fblog-be-next?ref=badge_shield)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![Code Style](https://camo.githubusercontent.com/c83b8df34339bd302b7fd3fbb631f99ba25f87f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d70726574746965722d6666363962342e737667)
[![Version](https://img.shields.io/github/package-json/v/Yancey-Blog/blog-be-next)](https://github.com/Yancey-Blog/blog-be-next)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/Yancey-Blog/blog-be-next/pulls)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![Gitter](https://badges.gitter.im/yancey-official/community.svg)](https://gitter.im/yancey-official/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/Yancey-Blog/blog-be-next.svg)](http://isitmaintained.com/project/Yancey-Blog/blog-be-next 'Average time to resolve an issue')
[![Percentage of issues still open](http://isitmaintained.com/badge/open/Yancey-Blog/blog-be-next.svg)](http://isitmaintained.com/project/Yancey-Blog/blog-be-next 'Percentage of issues still open')

⭐️ _Found it cool? Want more updates?_ [**Show your support by giving a ⭐️**](https://github.com/Yancey-Blog/blog-be-next/stargazers)

<a href="https://www.paypal.me/yanceyleo" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://twitter.com/YanceyOfficial" target="_blank"><img src="https://img.shields.io/twitter/follow/YanceyOfficial.svg?style=social&label=Follow"></a>
</a>

</div>

---

## Menu

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Blog BE Next](#blog-be-next)
  - [Menu](#menu)
  - [Available Scripts](#available-scripts)
    - [yarn build](#yarn-build)
    - [yarn watch](#yarn-watch)
    - [yarn document](#yarn-document)
    - [yarn test](#yarn-test)
    - [yarn commit](#yarn-commit)
  - [Contributing](#contributing)
    - [Code of Conduct](#code-of-conduct)
    - [Contributing Guide](#contributing-guide)
    - [Good Issues](#good-issues)
    - [Commitizen](#uses-commitizen)
    - [Env Files](#uses-env-files)
    - [E2E Testing](#e2e-testing)
  - [Changelogs](#changelogs)
  - [TODOs](#todos)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Available Scripts

In the project directory, you can run:

### yarn build

Builds the app for production to the `dist` folder.
This script will delete the old `dist` folder before build.

### yarn watch

Runs the app in the development mode.
Open [http://localhost:3002](http://localhost:3002) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### yarn document

[compodoc](https://github.com/compodoc/compodoc) to generate an awesome document for this app.

### yarn test

Runs Jest via yarn test.

### yarn commit

An optional way to use `git cz` if you don't want to install `commitizen` globally.

[⇧ back to top](#Menu)

## Contributing

The main purpose of this repository is to continue to evolve BEG (Blog Environment Group), making it faster and easier to use. Development of Blog BE Next happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving Blog BE Next.

### [Code of Conduct](./CODE_OF_CONDUCT.md)

[BEG](https://github.com/Yancey-Blog) has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](./CONTRIBUTING.md)

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Blog BE Next.

### Good Issues

Please make sure to read the [Issue Reporting Checklist](./.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

### Commitizen

This app follows the [Angular Team's Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit), your commit will be checked by commitlint, please use `git cz` instead of `git commit`. For this reason, you should install `commitizen` globally or use `yarn commit` instead.

### Env Files

Creating `production.env`, `development.env` and `test.env` to save specified environment variables. Common parameters cound be filled in `.env`. Both `DATABASE_USER` and `DATABASE_PWD` are optional parameters in `development.env` and `test.env` file. Furthermore, `NEED_SIMULATE_NETWORK_THROTTLE` is only working on the development environment.

```bash
# Parameters in different environments should be filled in
# `production.env`, `development.env` and `test.env`.
NODE_ENV=<YOUR_NODE_ENV>
DATABASE_HOST=<YOUR_DATABASE_HOST>
DATABASE_PORT=<YOUR_DATABASE_PORT>
# `DATABASE_USER` and `DATABASE_PWD` are optional parameters in
# `development.env` and `test.env` file
DATABASE_USER=<YOUR_DATABASE_USER>
DATABASE_PWD=<YOUR_DATABASE_PWD>

# Common parameters cound be filled in `.env`.
APP_PORT=<YOUR_APP_PORT>
DATABASE_COLLECTION=<YOUR_DATABASE_COLLECTION>
BANDWAGON_SECRET_KEY=<YOUR_BANDWAGON_SECRET_KEY>
BANDWAGON_SERVER_ID=<YOUR_BANDWAGON_SERVER_ID>
ALI_ACCESS_KEY_ID=<YOUR_ALI_ACCESS_KEY_ID>
ALI_ACCESS_KEY_SECRET=<YOUR_ALI_ACCESS_KEY_SECRET>
ALI_OSS_BUCKET=<YOUR_ALI_OSS_BUCKET>
ALI_SMS_SIGN_NAME=<YOUR_ALI_SMS_SIGN_NAME>
ALI_SMS_TEMPLATE_CODE=<YOUR_ALI_SMS_TEMPLATE_CODE>
IP_STACK_ACCESS_KEY=<YOUR_IP_STACK_ACCESS_KEY>
GOOGLE_RECAPTCHA_KEY=<YOUR_GOOGLE_RECAPTCHA_KEY>
AZURE_STORAGE_CONNECTION_STRING=<YOUR_AZURE_STORAGE_CONNECTION_STRING>
JWT_SECRET_KEY=<YOUR_JWT_SECRET_KEY>
JWT_EXPIRES_TIME=<YOUR_JWT_EXPIRES_TIME>
# Only works on the development environment.
NEED_SIMULATE_NETWORK_THROTTLE=<BOOLEAN>
```

### E2E Testing

We use e2e testing for every module and test them at CI stage, you must write related test cases before PR.

[⇧ back to top](#Menu)

## Changelogs

The following are **prehistoric changelogs** on building infrastructure for this app. Just as a memorial. See the real detailed changes for each release are documented in the [CHANGELOG](./CHANGELOG.md).

- 2019-12-03 Integrates e2e testing.

- 2019-11-26 Integrates JWT.

- 2019-11-07 Integrates dotenv.

- 2019-11-04 Integrates GraphQL.

- 2019-10-20 Integrates MongoDB and write the first RESTful CRUD.

- 2019-10-12 Initital repo.

[⇧ back to top](#Menu)

## TODOs

- ~~[ ] Full text search for post (We are using Algolia Search)~~

- [ ] Fine-grained type verification system optimization

- [ ] Supports forget password

- [ ] Supports role-based permission system

- [ ] Supports two factor authentication (Both of TOTP and SMS)

- [ ] Dockerize

[⇧ back to top](#Menu)

## License

Blog BE Next is under the [MIT licensed](https://opensource.org/licenses/MIT). See the [LICENSE](./LICENSE) file for the full license text.

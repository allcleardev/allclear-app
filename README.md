[![allclear](public/android-chrome-192x192.png)](https://allclear.app)

[![Version](https://badgen.net/github/tag/allcleardev/allclear-app)](https://github.com/allcleardev/allclear-app/tags)
[![Release](https://badgen.net/github/release/allcleardev/allclear-app)](https://github.com/allcleardev/allclear-app/releases)
[![Commits](https://badgen.net/github/commits/allcleardev/allclear-app)](https://github.com/allcleardev/allclear-app/commits/master)

[![All
PRs](https://badgen.net/github/prs/allcleardev/allclear-app)](https://github.com/allcleardev/allclear-app/pulls) [![Build Status](https://badgen.net/github/open-prs/allcleardev/allclear-app)](https://github.com/allcleardev/allclear-app/pulls?q=is%3Aopen+is%3Apr)
[![Closed
PRs](https://badgen.net/github/closed-prs/allcleardev/allclear-app)](https://github.com/allcleardev/allclear-app/pulls?q=is%3Apr+is%3Aclosed)

# AllClear Front End Application

- [General Info](#general-info)
- [Running the Project](#running-the-project)
- [Testing the Project](#testing-the-project)
- [Building the Project](#building-the-project)
- [Further Reading](#further-reading)

## General Info

This is the web version of [AllClear](http://go.allclear.app).

AllClear has the largest database of COVID-19 test centers in the country. Each listing is manually verified and regularly checked for updates and changes.

## Running the Project

In the project directory, run:

### `npm start`

This will start the app in the development mode.<br />
Open <http://localhost:3000> to view it in the
browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Testing the Project

In the project directory, run:

### `npm run test:inspect`

Launches the e2e test runner in the interactive watch mode.
You can install
[nim](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en) to automatically open the chrome debugger so you can inspect variables within the scope of your tests. Trigger a breakpoint by placing `debugger` statements in your test.

### env variables for testing

You'll need to pull a session token from the admin app, and supply an
env variable for some of the tests to run:

`SESSION_ID='GOD-SESSION-TOKEN'`

## Building the Project

In the project directory, run:

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build
for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Further Reading

- [Naming Conventions](./docs/naming-conventions.md)
- [Code of Conduct](./docs/code_of_conduct.md)
- [Contributing](./docs/contributing.md)
- [Bug Report Issue Templates](./.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature Request Issue Template](./.github/ISSUE_TEMPLATE/feature_request.md)
- [Feature Request Issue Template](./.github/ISSUE_TEMPLATE/feature_request.md)
- [Pull Request Issue Template](./docs/pull_request_template.md)

## Contact

General inquiries: [info@allclear.app](mailto:info@allclear.app)

Report a security issue: [security@allclear.app](mailto:security@allclear.app)

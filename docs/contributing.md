# How to Contribute

👍🎉 First off, thanks for taking the time to contribute! We appreciate you! 🎉👍

The following is a set of guidelines for contributing to the AllClear Web App.

## How Do I Start?

In the main README you will find a section on [Running the Project](#../README.md#running-the-project)

## The Project is Running, Now What?

### Help review open [PR's](https://github.com/allcleardev/allclear-app/pulls). If you're comfortable reviewing the PR's, please do so.

1. Pull down the PR branch locally and test the work.

   > `git checkout -t origin/[branch_name]`

2. If everything works well, and it’s a low risk PR into dev, go ahead and approve the PR and merge it via Github. If not, leave comments and request changes.

### Help with New Work!

1. Grab a ticket from the top of the backlog. See Default (Unassigned) tickets [here](https://ilico.aha.io/bookmarks/feature_boards/6809100612504060589/6823896129923516857)
2. Off of the `dev` branch, create a new branch with the ticket number e.g.

```sh
git checkout dev
git pull
git checkout -b AC-152
```

3. Do the work
   When your work is complete, merge dev back into your branch, push up your local branch and create a pull request on Github to merge the branch into dev branch. e.g.

```sh
# add your changes
git add someFile.js
# commit with the ticket number
git commit -m "AC-152 fix: header misalignment"
# merge any changes to dev that were made while you were working on your branch
git pull origin dev
# run linting locally, to ensure your PR passes the lint checks .  Fix any issues
npm run lint
# push your local branch back up to remote
git push origin AC-152
```

4. Create a PR on [github](https://github.com/allcleardev/allclear-app/compare)
5. Once you've created your PR, CI tests will automatically run directly on the PR. Once these are done (in a few minutes), you should see "All checks have passed" . If you don't, fix the issues.

Thank you again! We look forward to seeing your code in the dev branch soon 👩‍💻 👨‍💻 🚤

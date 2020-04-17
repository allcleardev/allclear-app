# Naming Conventions

Contains a collection of guidelines for writing file names used in this application

**Guidelines:**

- [Branch Names](#branchnames)
- [Filenames](#filenames)
- [Classes and symbols](#classes-and-symbols)
- [General component custom prefix](#general-component-custom-prefix)


## Branch Names

- Only name branches based on ticket number.
- Create Branches based off of the `dev` branch.
- If you require two branches for one ticket (if the ticket was sent back for QA, or needs a new base), just suffix the original branch name with a letter.
  - Ex) Original branch name was `AC-22` , the follow up branch would be called `AC-22b`


## File Names

- Use dashes (-) to separate words in the descriptive name. Use kebab-case. 
- Use dots (.) to separate the descriptive name from the type.
- Use consistent type names for all components, following a pattern that describes the component's feature then its type (`feature.type.ts`).
  - **File type names in use:**
    - `.component`
    - `.page`
    - `.service`
    - `.helpers`
    - `.constants`
    - `.context`
    - `.hooks`
    - `.icon` (for custom svg files)

## Classes and Symbols

- Use upper camel case for class names.
- Match the name of the symbol to the name of the file:

  `app.context.js`

## Directory Structure

There are currently 3 subfolders directly under the Components folder: `pages` and `general`

1. Page - A top-level component that is associated 1-1 with a url route.  

   - Directory shortcut:
     > `@bases/*`

2. General

   - Contains all reusable component subfolders, prefixed with "AC"
   - Directory shortcut:
     > `@components/*`

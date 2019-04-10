# RepoPage

A Vue.js page that displays the repositories of a GitHub account.

#### [Demo](https://ekarbe.github.io)

## Installation

1. Clone this repository and change into its folder:

```bash
git clone git@github.com:ekarbe/repo-page.git
cd repo-page
```

2. Install the node modules:


```bash
npm install
```

3. Configure the user/org in [config.json](public/config.json).
  
  name: The login of an user or organisation.
  type: The type of login. Can be `users` or `orgs`.

4. Change into your github.io page stream

```bash
git remote rm origin
git remote add origin git@github.com:yourname/yourrepo.git
```

  ###### To change the targeted branch you have to edit the --branch flag in the deploy script at [package.json](package.json).

5. Then run the deploy script

```bash
npm run deploy
```


## Development

  Follow installation to step 3. Then run `npm run serve`.

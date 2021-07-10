# nustutors

**Core Website Features:**

- Tutor registration with fields for modules completed and teachable skills
- Tutee signups with fields for modules/skills to learn, available timings, price quote
- For You page for relevant requests
- Mailing List/ Notification system for tutors to find relevant requests
- Reputation system for tutors - quantitative reviews which contribute to the tutor rating (this is visible to learners)

**Optional:**

- Automatically determine tags/details based on descriptions
- An app

**List of Technologies:**

- MERN stack
  - Node(.js) - the premier JavaScript web server
  - Express(.js) - Node.js web framework
  - MongoDB - document database
  - React(.js) - a client-side JavaScript framework
- HTML/CSS/Javascript
- Git
- Hosted on Heroku

**Troubleshooting**

- When trying to use hooks, the given error is displayed despite all the hook rules being followed:

  ```
  hooks can only be called inside the body of a function component
  ```

  This occurs when an imported module uses a react version that is different from the version used in the index.

  This can be resolved by appending `react: path.resolve('./node_modules/react')` to the `alias` property within `resolve` in `/webapp/node_modules/react-scripts/config/webpack.config.js`

**TODO**

- Sidebar instead of dropdown for narrow viewports
- https://freefrontend.com/

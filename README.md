# nustutors

**Core Website Features:**

- Tutor registration with fields for modules completed and teachable skills
- Tutee signups with fields for modules/skills to learn, available timings, price quote
- For You page for relevant requests
- Mailing List/ Notification system for tutors to find relevant requests

**Additional:**

- Reputation system for tutors - quantitative reviews which contribute to the tutor rating (this is visible to learners)
- An app

**List of Technologies:**

- Node(.js)
- React(.js)
- Firestore, Firebase Auth, Firebase Storage, Firebase Hosting
- Git

**Troubleshooting**

- When trying to use hooks, the given error is displayed despite all the hook rules being followed:

  ```
  hooks can only be called inside the body of a function component
  ```

  This occurs when an imported module uses a react version that is different from the version used in the index.

  This can be resolved by appending `react: path.resolve('./node_modules/react')` to the `alias` property within `resolve` in `/webapp/node_modules/react-scripts/config/webpack.config.js`

- If there are problems with on a page containg timing selection, ensure no JSX components are declared inside each other.

- Do NOT use the index parameter of map as the key when rendering a list of components - deleting/adding items will reallocate the keys.

**TODO**

- limit on document uploads, enforced from storage
- manage previous uploads
- Consider variations of modules
- Custom firestore rule -> public, protected fields on profile
- Animate presence on BasicTable
- Show location preferences on tutor and tutee modals

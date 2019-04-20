# Peacock
An application for documenting and sharing projects and hobbies

- packages/ contains all of our services and developer packages
- top level package.json and lerna.json exist for monorepo management
- publish bash script is for publishing changes to npm 

Read about yarn and lerna [here](https://medium.com/naresh-bhatia/sharing-ui-components-with-lerna-and-yarn-workspaces-be1ebca06efe) 
and about our project structure [here](https://medium.com/trabe/monorepo-setup-with-lerna-and-yarn-workspaces-5d747d7c0e91)

## packages/
### common-tooling
- This directory contains repo wide dependencies that are _actually_ dev dependencies, and config files
- When creating a new service using babel, eslint, etc. import these config files to the top of the corresponding service level config.
- The `task` script allows other packages to execute commands from dependencies installed within this package

### frontend
- This directory contains our core frontend react service
- to use: `yarn install` then `yarn start`

### backend
- This directory contains our graphql api service
- to use: `yarn install`, `yarn prismadeploy`, then `yarn start`

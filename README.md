# Lost and Found System

<a name="readme-top"></a>

### Live API Link: [https://lost-and-found-server-p8.vercel.app/](https://lost-and-found-server-p8.vercel.app/)

<br/>
<!-- ABOUT THE PROJECT -->

## About

The Lost & Found website is a community-driven platform designed to help individuals report and reclaim lost items. By facilitating the reporting of both lost and found items, the website aims to create a seamless process for reuniting people with their belongings. The platform includes user-friendly features for reporting items, verifying ownership, and managing user profiles, with additional administrative tools for overseeing site activity and user management.

## API Documentation

I used postman to do api documentation. Click the link below to view the api documentation.

#### Postman link: [https://documenter.getpostman.com/view/22696421/2sA3QniEfn](https://documenter.getpostman.com/view/22696421/2sA3QniEfn)

## API Endpoints

### Auth

- register user
- login user
- change password

### User

- get my profile
- get all users
- get single user
- update my profile
- update user role
- update user status
- delete user

### Lost item

- report lost item
- update lost item
- get my lost items
- get all lost items
- get single lost item
- mark as found item
- delete lost item

### Found item

- report found item
- get my found items
- get my single found items
- get all found items
- get single found items
- update found item
- delete found item

### Claim item

- send claim request
- update claim request
- update claim request status
- get my claim request
- get single claim request
- get claim requests by found id
- delete claim request

### Reports

- total item count report

## Getting Started

### 1. Clone the repository:

```
git clone https://github.com/modasser-nayem/lost-and-found-server-p8.git

cd lost-and-found-server-p8
```

### 2. Install Dependencies:

```
npm install
```

### 3. Set Environment Variables:

Create a `.env` file in the root directory and define the required environment variables. include necessary variables.

```
NODE_ENV
PORT
DATABASE_URL
BCRYPT_SALT_ROUNDS
JWT_ACCESS_SECRET
JWT_ACCESS_EXPIRESIN
JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRESIN
```

### 4. Run the Application:

- For development:

```
npm run dev
```

- For production:

```
npm start
```

### 5. Build the Application:

```
npm run build
```

## Scripts

- `npm run dev`: Start the application in development mode using `ts-node-dev`.
- `npm start`: Start the application in production mode using the compiled `server.js` file.
- `npm run build`: Compile TypeScript files using `tsc`.
- `npm run lint`: Run ESLint to lint TypeScript files.
- `npm run lint:fix`: Run ESLint with the `--fix` option to automatically fix linting issues.
- `npm run format`: Run Prettier to format code.
- `npm run format:fix`: Run Prettier with the `--write` option to automatically fix formatting issues.

## Built With

- Typescript
- Express.js
- PostgreSQL
- Prisma
- jsonwebtoken

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- bcrypt
- zod
- cors
- dotenv
- eslint
- prettier

<!-- CONTACT -->

## Contact

Ali Modasser Nayem - [Linkedin](https://www.linkedin.com/in/alimodassernayem/) [Portfolio](https://alimodassernayem.vercel.app/)

Email: modassernayem@gimail.com

<p align="right"><a href="#readme-top">back to top</a></p>

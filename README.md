# Lost and Found System

<a name="readme-top"></a>

### Live API Link: [https://lost-and-found-server-p8.vercel.app/](https://lost-and-found-server-p8.vercel.app/)

<br/>
<!-- ABOUT THE PROJECT -->

## API Documentation

I used postman to do api documentation. Click the link below to view the api documentation.

#### Postman link: [https://documenter.getpostman.com/view/22696421/2sA3QniEfn](https://documenter.getpostman.com/view/22696421/2sA3QniEfn)

## API Endpoints

### Auth

### User

### Lost item

### Found item

### Claim item

## Getting Started

### 1. Clone the repository:

```
git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-modasser-nayem

cd l2-b2-fullstack-track-assignment-8-modasser-nayem
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

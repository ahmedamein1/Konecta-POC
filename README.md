# Interactive Task Manager

This repository contains:

- **backend** → Node.js + Express API  
- **frontend-react** → React version  
- **frontend-angular** → Angular version  

All frontends connect to the same Todo API.

---

## Project Structure

```
backend/
frontend-angular/
frontend-react/
```

---

## Backend (Node.js)

Start backend:

```bash
cd backend
npm install
npm start
```

### Backend .env file

Located at:

```
backend/.env
```

Used to control the server port:

```
PORT=4000
```

API base URL:

```
http://localhost:4000/todo
```

Mock database:

```
backend/todos-data/todos.json
```

---

## React Setup

Start React:

```bash
cd frontend-react
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

### Where the API endpoint is set in React

Inside the repo at:

```
frontend-react/.env
```

Content:

```
REACT_APP_TODO_API_ENDPOINT=http://localhost:4000/todo
```

---

## Angular Setup

Start Angular:

```bash
cd frontend-angular
npm install
npm start
```

Runs on:

```
http://localhost:4200
```

### Where the API endpoint is set in Angular

Located at:

```
frontend-angular/src/app/config/api-endpoint.ts
```

Content:

```ts
export const API_URL = 'http://localhost:4000/todo';
```

---

## Summary

| Part | Port | API Config Location |
|------|------|----------------------|
| Backend | 4000 | backend/.env |
| React | 3000 | frontend-react/.env |
| Angular | 4200 | src/app/config/api-endpoint.ts |

All apps communicate with:

```
http://localhost:4000/todo
```

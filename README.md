This is a [Next.js](https://nextjs.org/) project for Educathon Hackathon 2024 April

## Project Introduction

Connect4Good is a social platform where user can connect with various ongoing social programs published by Social Communitities, Groups,NGO etc

This project has two roles: 
1) user:- who view and show interest on projects published by the Social Groups
2) group:- group means any social group who wants to connect with users for programs/projects

###

Social Groups can publish projects such as :-
1) Animal Safety, Food Distribution and many more.
2) Users can show their interest to any specific program.
3) Social Group then connects with the selected users with their social handles

## How to setup project locally

Create .env.local file at root of the project and create two variables
```bash
    MONGODB_URL= //set it to MongoDB Atlas URL
    JWT_SECRET= //random strong string
```
and now run
```bash
npm run dev
```

and now your app will start at  http://localhost:3000

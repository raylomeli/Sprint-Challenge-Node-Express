# Review Questions

## What is Node.js?

Node.js is an open source server environment. Node.js uses javascript on the server. Node.js uses asynchronous programming. It is single-threaded, non blocking, asynchronously programming, which is very memory efficient. Node can generate dynamic page content. Node can open, read, write, delete, and close files on the server. Node can collect data, it can add delete modify data in a database.

## What is Express?

It is a web application framework for Node.js. It has been called the de facto standard server framework for node.js. This allows developers to build software with Javascript on the server side for the first time. This allows an entire site with just javascript.

Node.js was not intended to buiild websites, the Express framework is able to add built in structure and functions needed to actually build a website.

## Mention two parts of Express that you learned about this week.

Dramatically reduces ampount of code needed to create server.
Can be used for APIs, Single-page, multi-page, and hybrid mobile and web apps. Common back-end functionality for web applications.

## What is Middleware?

It is software that lies between an operating system and the applications running on it. Functions as a hidden translation layer. Can be referred to as plumbing as it connections two applications so data and databases can be easily passed between the 'pipe'.

## What is a Resource?

## What can the API return to help clients know if a request was successful?

Http status code 2xx: Success.

## How can we partition our application into sub-applications?

.use() a router or sub-router, a developer can create new instances of the Express object and luse it in another Express object just like a router or other middleware.

## What is express.json() and why do we need it?

express.json is part of the bodyParser. Returns middleware that only passes JSON.
It is needed for Post and Put requests because in both you are sending data. Is a method inbuilt in express to recognize the incoming request object as a JSON object.

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.username;
  
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    //Write your code here
    let myPromise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Show Books Details in the shop");
      }, 4000);
    });
  
    myPromise1.then((successMessage) => {
      res.send(
        JSON.stringify({
          Books: books,
        })
      );
      console.log("From Callback " + successMessage);
    });
  });
  
  // Get book details based on ISBN
  public_users.get("/isbn/:isbn", function (req, res) {
    let myPromise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Filter books based on ISBN Details in the shop");
      }, 2000);
    });
  
    myPromise1.then((successMessage) => {
      res.send(JSON.stringify(data));
      console.log("From Callback " + successMessage);
    });
  
    const isbn = req.params.isbn;
    let filtered_books = books[isbn];
    const data = {
      booksbyisbn: filtered_books,
    };
  });
  
  // Get book details based on author
  public_users.get("/author/:author", function (req, res) {
    //Write your code here
    const author = req.params.author;
    const data = [];
  
    for (const key of Object.keys(books)) {
      const book = books[key];
  
      if (book.author == author) {
        data.push({
          isbn: key,
          title: book.title,
          reviews: book.reviews,
        });
      }
    }
    let myPromise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Show Author Details in the shop");
      }, 2000);
    });
  
    myPromise1.then((successMessage) => {
      res.send(
        JSON.stringify({
          booksbyauthor: data,
        })
      );
      console.log("From Callback " + successMessage);
    });
  });
  
  // Get all books based on title
  public_users.get("/title/:title", function (req, res) {
    //Write your code here
    const title = req.params.title;
    const data = [];
  
    for (const key of Object.keys(books)) {
      const book = books[key];
  
      if (book.title == title) {
        data.push({
          isbn: key,
          author: book.author,
          reviews: book.reviews,
        });
      }
    }
    let myPromise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Show Title Details in the shop");
      }, 2000);
    });
  
    myPromise1.then((successMessage) => {
      res.send(
        JSON.stringify({
          booksbytitle: data,
        })
      );
      console.log("From Callback " + successMessage);
    });
  });
  
  //  Get book review
  public_users.get("/review/:isbn", function (req, res) {
    //Write your code here
  
    const isbn = req.params.isbn;
    const filtered_books = books[isbn].reviews;
  
    res.send(JSON.stringify(filtered_books));
  });
  
  module.exports.general = public_users;

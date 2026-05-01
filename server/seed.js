import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";
import Quiz from "./src/models/Quiz.js";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/codify";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected for seeding...");

    // 1. Create Official Creator
    const strongPassword = "Codify@Admin#2026";
    const hashedPassword = await bcrypt.hash(strongPassword, 10);
    let creator = await User.findOne({ email: "admin@gmail.com" });
    
    if (!creator) {
      creator = await User.create({
        name: "Official Creator",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "creator",
      });
      console.log(`Creator user updated: admin@gmail.com / ${strongPassword}`);
    }

    // 2. Comprehensive Quizzes (20 Questions Each)
    const quizzes = [
      {
        tech: "JavaScript",
        title: "JavaScript Mastery (20 Questions)",
        createdBy: creator._id,
        questions: [
          { id: 1, question: "Which of the following is not a reserved word in JavaScript?", options: ["interface", "throws", "program", "short"], answer: "program" },
          { id: 2, question: "What is the result of '1' + 1?", options: ["2", "11", "undefined", "Error"], answer: "11" },
          { id: 3, question: "Which method converts a JSON string into a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"], answer: "JSON.parse()" },
          { id: 4, question: "What is 'NaN'?", options: ["Not a Number", "Null and None", "New and Null", "None and Next"], answer: "Not a Number" },
          { id: 5, question: "Which operator is used for strict equality?", options: ["==", "===", "=", "!="], answer: "===" },
          { id: 6, question: "Which company developed JavaScript?", options: ["Google", "Microsoft", "Netscape", "Oracle"], answer: "Netscape" },
          { id: 7, question: "What is the output of 'typeof null'?", options: ["null", "undefined", "object", "string"], answer: "object" },
          { id: 8, question: "How do you write a comment in JavaScript?", options: ["// comment", "<!-- comment -->", "/* comment */", "Both A and C"], answer: "Both A and C" },
          { id: 9, question: "Which event occurs when the user clicks on an HTML element?", options: ["onchange", "onclick", "onmouseover", "onmouseclick"], answer: "onclick" },
          { id: 10, question: "How do you declare a JavaScript variable?", options: ["v carName", "variable carName", "var carName", "let carName"], answer: "let carName" },
          { id: 11, question: "Which operator is used to assign a value to a variable?", options: ["*", "=", "-", "x"], answer: "=" },
          { id: 12, question: "What is the output of 2 + '2'?", options: ["4", "22", "NaN", "Error"], answer: "22" },
          { id: 13, question: "Which function is used to serialize an object into a JSON string?", options: ["JSON.parse()", "JSON.toString()", "JSON.stringify()", "JSON.serialize()"], answer: "JSON.stringify()" },
          { id: 14, question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create myFunction()"], answer: "function myFunction()" },
          { id: 15, question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()", "execute myFunction()"], answer: "myFunction()" },
          { id: 16, question: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"], answer: "if (i == 5)" },
          { id: 17, question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?", options: ["if (i != 5)", "if i <> 5", "if (i <> 5)", "if i != 5 then"], answer: "if (i != 5)" },
          { id: 18, question: "How does a WHILE loop start?", options: ["while (i <= 10)", "while i = 1 to 10", "while (i <= 10; i++)", "while i <= 10"], answer: "while (i <= 10)" },
          { id: 19, question: "How does a FOR loop start?", options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)"], answer: "for (i = 0; i <= 5; i++)" },
          { id: 20, question: "What is the correct way to write a JavaScript array?", options: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green')"], answer: "var colors = ['red', 'green', 'blue']" }
        ],
      },
      {
        tech: "Java Programming",
        title: "Java Core Mastery (20 Questions)",
        createdBy: creator._id,
        questions: [
          { id: 1, question: "Which component is used to compile, debug and execute the java programs?", options: ["JRE", "JIT", "JDK", "JVM"], answer: "JDK" },
          { id: 2, question: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "using"], answer: "extends" },
          { id: 3, question: "Which of these is not a primitive data type?", options: ["int", "boolean", "char", "String"], answer: "String" },
          { id: 4, question: "What is the size of 'float' in Java?", options: ["16 bits", "32 bits", "64 bits", "8 bits"], answer: "32 bits" },
          { id: 5, question: "Which of these is used to access a member of a class?", options: ["&", ".", ":", "*"], answer: "." },
          { id: 6, question: "What is the default value of a boolean variable?", options: ["true", "false", "0", "null"], answer: "false" },
          { id: 7, question: "Which access specifier is the most restrictive?", options: ["public", "protected", "private", "default"], answer: "private" },
          { id: 8, question: "Which of these is not a loop in Java?", options: ["for", "while", "do-while", "foreach"], answer: "foreach" },
          { id: 9, question: "Which keyword is used to refer to the current object?", options: ["self", "current", "this", "object"], answer: "this" },
          { id: 10, question: "Which of these is used to handle exceptions?", options: ["try", "catch", "throw", "All of the above"], answer: "All of the above" },
          { id: 11, question: "What is the entry point of a Java program?", options: ["start()", "init()", "main()", "run()"], answer: "main()" },
          { id: 12, question: "Which package is imported by default?", options: ["java.io", "java.util", "java.lang", "java.net"], answer: "java.lang" },
          { id: 13, question: "Can a class implement multiple interfaces?", options: ["Yes", "No", "Only if abstract", "Only if final"], answer: "Yes" },
          { id: 14, question: "Which keyword is used to define a constant?", options: ["const", "final", "static", "immutable"], answer: "final" },
          { id: 15, question: "What is polymorphism?", options: ["Hiding data", "Many forms", "Inheritance", "Encapsulation"], answer: "Many forms" },
          { id: 16, question: "Which collection allows unique elements only?", options: ["List", "Set", "Map", "Queue"], answer: "Set" },
          { id: 17, question: "What is the parent class of all classes in Java?", options: ["String", "Object", "Main", "Parent"], answer: "Object" },
          { id: 18, question: "Which method is used to get the length of a string?", options: ["size()", "length", "length()", "count()"], answer: "length()" },
          { id: 19, question: "Which of these is used to create an object?", options: ["class", "new", "object", "create"], answer: "new" },
          { id: 20, question: "What is a constructor?", options: ["A normal method", "A method with no return type", "A method with the same name as class", "Both B and C"], answer: "Both B and C" }
        ],
      },
      {
        tech: "MongoDB",
        title: "MongoDB Expert Quiz (20 Questions)",
        createdBy: creator._id,
        questions: [
          { id: 1, question: "What is the primary way to store data in MongoDB?", options: ["Tables", "Documents", "Files", "Blocks"], answer: "Documents" },
          { id: 2, question: "Which command is used to insert a document?", options: ["db.add()", "db.insert()", "db.collection.insertOne()", "db.put()"], answer: "db.collection.insertOne()" },
          { id: 3, question: "What format does MongoDB use to store data?", options: ["JSON", "XML", "BSON", "SQL"], answer: "BSON" },
          { id: 4, question: "Which command is used to show all databases?", options: ["show dbs", "show databases", "list dbs", "All of the above"], answer: "show dbs" },
          { id: 5, question: "How do you drop a database in MongoDB?", options: ["db.drop()", "db.dropDatabase()", "drop database", "db.delete()"], answer: "db.dropDatabase()" },
          { id: 6, question: "What is a 'collection' in MongoDB?", options: ["A table", "A row", "A database", "A column"], answer: "A table" },
          { id: 7, question: "Which command is used to find all documents?", options: ["db.collection.get()", "db.collection.find()", "db.collection.selectAll()", "db.collection.list()"], answer: "db.collection.find()" },
          { id: 8, question: "How do you filter results in find()?", options: ["find({name: 'A'})", "find('name=A')", "find(where name='A')", "query({name: 'A'})"], answer: "find({name: 'A'})" },
          { id: 9, question: "What is the default port for MongoDB?", options: ["3306", "5432", "27017", "8080"], answer: "27017" },
          { id: 10, question: "Which command updates a document?", options: ["update()", "updateOne()", "save()", "Both A and B"], answer: "Both A and B" },
          { id: 11, question: "What is an '_id' field?", options: ["A secondary key", "A primary key", "A foreign key", "An index only"], answer: "A primary key" },
          { id: 12, question: "How do you delete a document?", options: ["db.collection.remove()", "db.collection.deleteOne()", "db.collection.delete()", "Both A and B"], answer: "Both A and B" },
          { id: 13, question: "What is Sharding?", options: ["Data replication", "Data partitioning", "Data encryption", "Data compression"], answer: "Data partitioning" },
          { id: 14, question: "What is the purpose of an Index?", options: ["To secure data", "To speed up queries", "To save space", "To delete data"], answer: "To speed up queries" },
          { id: 15, question: "Which operator is used for 'greater than'?", options: ["$gt", "$greater", ">", "$more"], answer: "$gt" },
          { id: 16, question: "Which operator is used for 'equal to'?", options: ["$eq", "=", "==", "$equal"], answer: "$eq" },
          { id: 17, question: "What is the use of 'sort()'?", options: ["To filter data", "To order data", "To group data", "To count data"], answer: "To order data" },
          { id: 18, question: "How to count documents in a collection?", options: ["db.collection.size()", "db.collection.count()", "db.collection.length()", "db.collection.amount()"], answer: "db.collection.count()" },
          { id: 19, question: "What is GridFS?", options: ["A file system for large files", "A database engine", "A search engine", "A replication strategy"], answer: "A file system for large files" },
          { id: 20, question: "Which of these is not a MongoDB feature?", options: ["Schema-less", "Joins", "Replication", "Indexing"], answer: "Joins" }
        ],
      },
      {
        tech: "HTML",
        title: "HTML5 Structure (20 Questions)",
        createdBy: creator._id,
        questions: [
          { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"], answer: "Hyper Text Markup Language" },
          { id: 2, question: "Who is making the Web standards?", options: ["Mozilla", "Microsoft", "The World Wide Web Consortium", "Google"], answer: "The World Wide Web Consortium" },
          { id: 3, question: "Choose the correct HTML element for the largest heading:", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: "<h1>" },
          { id: 4, question: "What is the correct HTML element for inserting a line break?", options: ["<lb>", "<br>", "<break>", "<line>"], answer: "<br>" },
          { id: 5, question: "What is the correct HTML for adding a background color?", options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "None of these"], answer: "<body style='background-color:yellow;'>" },
          { id: 6, question: "Choose the correct HTML element to define important text:", options: ["<important>", "<i>", "<strong>", "<b>"], answer: "<strong>" },
          { id: 7, question: "Choose the correct HTML element to define emphasized text:", options: ["<italic>", "<i>", "<em>", "<emphasize>"], answer: "em" },
          { id: 8, question: "What is the correct HTML for creating a hyperlink?", options: ["<a>http://google.com</a>", "<a href='http://google.com'>Google</a>", "<a url='http://google.com'>Google</a>", "<a name='http://google.com'>Google</a>"], answer: "<a href='http://google.com'>Google</a>" },
          { id: 9, question: "Which character is used to indicate an end tag?", options: ["*", "<", "^", "/"], answer: "/" },
          { id: 10, question: "How can you make a numbered list?", options: ["<ul>", "<list>", "<ol>", "<dl>"], answer: "<ol>" },
          { id: 11, question: "How can you make a bulleted list?", options: ["<ul>", "<list>", "<ol>", "<dl>"], answer: "<ul>" },
          { id: 12, question: "What is the correct HTML for making a checkbox?", options: ["<check>", "<checkbox>", "<input type='checkbox'>", "<input type='check'>"], answer: "<input type='checkbox'>" },
          { id: 13, question: "What is the correct HTML for making a text input field?", options: ["<input type='textfield'>", "<textinput>", "<input type='text'>", "<textfield>"], answer: "<input type='text'>" },
          { id: 14, question: "What is the correct HTML for making a drop-down list?", options: ["<list>", "<input type='dropdown'>", "<select>", "<input type='list'>"], answer: "<select>" },
          { id: 15, question: "What is the correct HTML for making a text area?", options: ["<textarea>", "<input type='textarea'>", "<input type='textbox'>", "<text>"], answer: "<textarea>" },
          { id: 16, question: "What is the correct HTML for inserting an image?", options: ["<img href='image.gif'>", "<image src='image.gif'>", "<img src='image.gif'>", "<img alt='image.gif'>"], answer: "<img src='image.gif'>" },
          { id: 17, question: "What is the correct HTML for inserting a background image?", options: ["<body background='background.gif'>", "<body style='background-image:url(background.gif)'>", "<background img='background.gif'>", "Both A and B"], answer: "<body style='background-image:url(background.gif)'>" },
          { id: 18, question: "An <iframe> is used to display a web page within a web page.", options: ["True", "False", "Only in HTML4", "Only in HTML5"], answer: "True" },
          { id: 19, question: "HTML comments start with <!-- and end with -->", options: ["True", "False", "Only in head", "Only in body"], answer: "True" },
          { id: 20, question: "Which HTML element defines the title of a document?", options: ["<head>", "<meta>", "<title>", "<header>"], answer: "<title>" }
        ],
      },
      {
        tech: "CSS",
        title: "CSS3 Design (20 Questions)",
        createdBy: creator._id,
        questions: [
          { id: 1, question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
          { id: 2, question: "What is the correct HTML for referring to an external style sheet?", options: ["<style src='mystyle.css'>", "<link rel='stylesheet' type='text/css' href='mystyle.css'>", "<stylesheet>mystyle.css</stylesheet>", "<link href='mystyle.css'>"], answer: "<link rel='stylesheet' type='text/css' href='mystyle.css'>" },
          { id: 3, question: "Where in an HTML document is the correct place to refer to an external style sheet?", options: ["In the <body> section", "At the end of the document", "In the <head> section", "After the <body> section"], answer: "In the <head> section" },
          { id: 4, question: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<script>", "<style>", "<link>"], answer: "<style>" },
          { id: 5, question: "Which HTML attribute is used to define inline styles?", options: ["font", "class", "style", "styles"], answer: "style" },
          { id: 6, question: "Which is the correct CSS syntax?", options: ["body {color: black;}", "{body;color:black;}", "body:color=black;", "{body:color=black;}"], answer: "body {color: black;}" },
          { id: 7, question: "How do you insert a comment in a CSS file?", options: ["// this is a comment", "/* this is a comment */", "' this is a comment", "// this is a comment //"], answer: "/* this is a comment */" },
          { id: 8, question: "Which property is used to change the background color?", options: ["bgcolor", "color", "background-color", "style-color"], answer: "background-color" },
          { id: 9, question: "How do you add a background color for all <h1> elements?", options: ["h1.all {background-color:#FFFFFF;}", "all.h1 {background-color:#FFFFFF;}", "h1 {background-color:#FFFFFF;}", "h1 {bg-color:#FFFFFF;}"], answer: "h1 {background-color:#FFFFFF;}" },
          { id: 10, question: "Which CSS property is used to change the text color of an element?", options: ["text-color", "fgcolor", "color", "font-color"], answer: "color" },
          { id: 11, question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: "font-size" },
          { id: 12, question: "What is the correct CSS syntax for making all the <p> elements bold?", options: ["p {font-weight:bold;}", "<p style='font-size:bold;'>", "p {text-size:bold;}", "p {font-style:bold;}"], answer: "p {font-weight:bold;}" },
          { id: 13, question: "How do you display hyperlinks without an underline?", options: ["a {text-decoration:none;}", "a {decoration:no-underline;}", "a {underline:none;}", "a {text-underline:none;}"], answer: "a {text-decoration:none;}" },
          { id: 14, question: "How do you make each word in a text start with a capital letter?", options: ["text-transform:capitalize", "text-style:capitalize", "transform:capitalize", "font-transform:capitalize"], answer: "text-transform:capitalize" },
          { id: 15, question: "Which property is used to change the font of an element?", options: ["font-family", "font-style", "font-weight", "font-type"], answer: "font-family" },
          { id: 16, question: "How do you make the text bold?", options: ["font:bold;", "font-weight:bold;", "style:bold;", "text-bold:true;"], answer: "font-weight:bold;" },
          { id: 17, question: "How do you display a border like this: The top border = 10px, bottom border = 5px, left border = 20px, right border = 1px?", options: ["border-width:10px 5px 20px 1px;", "border-width:10px 1px 5px 20px;", "border-width:10px 20px 5px 1px;", "border-width:5px 20px 10px 1px;"], answer: "border-width:10px 1px 5px 20px;" },
          { id: 18, question: "Which property is used to change the left margin of an element?", options: ["padding-left", "margin-left", "indent", "spacing-left"], answer: "margin-left" },
          { id: 19, question: "When using the padding property; are you allowed to use negative values?", options: ["Yes", "No", "Only for top", "Only for bottom"], answer: "No" },
          { id: 20, question: "How do you select an element with id 'demo'?", options: ["#demo", ".demo", "demo", "*demo"], answer: "#demo" }
        ],
      }
    ];

    for (const q of quizzes) {
      await Quiz.findOneAndUpdate({ tech: q.tech }, q, { upsert: true, new: true });
      console.log(`Updated/Added 20 questions for: ${q.tech}`);
    }

    console.log("Full database seeding with 20 questions each completed! 🚀");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedData();

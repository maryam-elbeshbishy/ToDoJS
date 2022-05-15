//To Do App using Node JS and Express
var express = require('express');
var app = express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

//completed and uncompleted task array 
var taskArr = ["Draw a frog"];
var completedArr = [];

//add a new task to the list/array of tasks
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    taskArr.push(newTask); //add new input into taskArr array
    res.redirect("/"); //redirect to root url after actions
});

//remove task(s) from the "to do" and add them to the compeleted list/array
app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") { //marking a singular task as completed
        completedArr.push(completeTask); //add to completed array
        taskArr.splice(taskArr.indexOf(completeTask), 1); //remove from task array 
    } 
    else if (typeof completeTask === "object") { //marking multiple tasks as completed
        for (var i = 0; i < completeTask.length; i++) {     
            completedArr.push(completeTask[i]);
            taskArr.splice(taskArr.indexOf(completeTask[i]), 1); 
        }
}
   res.redirect("/"); //redirect to root url after actions
});

//render html code
app.get("/", function(req, res) {
    res.render("index", { taskArr: taskArr, completedArr: completedArr }); //passes arrays with data into html code to display
});

//host port number (http://localhost:3000/)
app.listen(3000, function () {
  console.log('Running on port 3000!')
});


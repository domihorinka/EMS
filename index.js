const mysql = require("mysql2")
const inquirer = require("inquirer")

require("dotenv").config()

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employees_db',
  });
  
  function mainPrompt(){
    inquirer.prompt([{
        type:"list", 
        name:"option",
        message:"What would you like to do?",
        choices:["View All Employees"]
    }]).then(answers => {
        console.log(answers.option)
        if(answers.option === "View All Employees"){
            viewAllEmployees()
        }
    })
  }

  function viewAllEmployees(){
      connection.promise().query("SELECT * FROM employee").then(data => {
          const emp = data[0]
          console.table(emp)
            mainPrompt()
      })
  }

mainPrompt()

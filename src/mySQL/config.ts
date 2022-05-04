import mysql from "mysql";
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "tiger",
	database: "ogni",
  });
  con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
  });

  export{con}
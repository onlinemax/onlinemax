// function addNewUser(name, country){
//     var mysql = require("mysql");

//     var con = mysql.createConnection({
//         host: "localhost",
//         user:"user",
//         password: "harvard",
//         database: "personne"
//     });
//     var sql = `INSERT INTO personne (name, country) VALUES ('${name}', '${country}')`;
//     con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(`Personne created with name: ${name} and country: ${country}`);
//     });
//     con.end();
// }
// let person = {personName:"alo" , country: "whatever"};
// const fs = require("fs");
// const data = fs.readFileSync("person.txt", "utf-8");
// const lines = data.split("\n");
// const names = [];
// const countries = []
// lines.forEach(element => {
//     names.push(element.split(",")[0].toLowerCase().trim());   
//     countries.push(element.split(",")[1].trim());   
// });

// for (let i = 0; i < names.length; i++){
//     addNewUser(names[i], countries[i]);
// }
module.exports = {
    
    getAllUsers: function(){  
        var syncSql = require("sync-sql");

        var sql = "SELECT * FROM personne";
        var output = syncSql.mysql({
            host: "localhost",
            user:"user",
            password: "harvard",
            database: "personne",
            port: 3306
        }, 
        sql);
        let person = [];
        
        for (let i = 0; i < output.data.rows.length; i++){
            let element = require("./person");
            element = new element.Person(output.data.rows[i].name, output.data.rows[i].country);
            person.push(element);
        }
    return person;
    }
}
function loadSomeone(users){
  const random = Math.floor(Math.random() * 100) % 40;
  let person = users[random];
  person.url = "../../personnages/" + person.url;
  return person;
}
function removeAccents(str){
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');}
function getUsers(){
  const db = require("./db");
  return db.getAllUsers();
}
function areSimilar(s1, s2){
  const comparator = require("string-metric");
  const instance = new comparator.JaroWinkler();
  return instance.similarity(s1, s2) > 0.8;
}
function isValidName(toVerify, person){
    return areSimilar(toVerify, person.name.toLowerCase());
}
function isValidCountry(toVerify, person){
    return areSimilar(toVerify, person.country.toLowerCase());
}
function toTitle(string){
  let char = string.split("");
  char[0] = char[0].toUpperCase();
  for (let i = 0; i < char.length; i++){
      if ((char[i] == "-" || char[i] == " ") && i != char.length - 1)
          char[i + 1] = char[i + 1].toUpperCase();   
  }
 return char.join("");
}
const express = require("express");
const app = express();
const port = 3000;
const users = getUsers();
let person = loadSomeone(users);
let name ="";
let country = "";
// 2 = not queried 1 = good 0 == wrong
let countryFound = 2;
let nameFound = 2;
console.log(__dirname);
app.set("view engine", "ejs");
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.get("/", (req, res) =>{
  nameFound = 2;
  countryFound = 2;
  person = loadSomeone(users);
  res.render("pages/index", {
    person, 
    country,
    name, 
    countryFound,
    nameFound
  });
});
app.get("/process_get", (req, res) =>{
 
  name = req.query.name;
  country = req.query.country;
  
  if (isValidName(removeAccents(name).toLowerCase(), person)){
    nameFound = 1;
  }
  else {nameFound = 0;}

  if (isValidCountry(removeAccents(country).toLowerCase(), person)) {
    countryFound = 1}
  else {countryFound = 0;}

  person.name = toTitle(person.name);
  person.country = toTitle(person.country);
  res.render("pages/index", {
    person, 
    country,
    name,
    countryFound,
    nameFound
  });
});
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/personnages'));



app.listen(port, () =>{
  console.log(`Example app listening on port: ${port}`);
});
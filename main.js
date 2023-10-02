
import { getAllUsers } from "./db";
let allPeople = getAllUsers();
let random = Math.floor(Math.random * 100) % 40;
let element = allPeople[random];
const inputName = Document.querySelector("#name");
inputName.setAttribute("placeholder", element.name);
const inputCountry= Document.querySelector("#pays");
inputCountry.setAttribute("placeholder", element.country);



/*
Assignement:

# HTML
Complete the HTML to have semantic and compliant markups.

# PURE JAVASCRIPT
Dynamically add a user to the users list.
1. Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
2. Use the addUser function to submit the user's data.
3. If the ajax request returns an error, display the error message in red.
4. Display the newly added user in the users list when the request was successful. 

# BONUS
- make WCAG compliant
- add some CSS3 properties

*/


// START YOUR CODE HERE
// const {ServiceWrapper, ClientHandler, HOOKS} = require("js-service-wrapper");
import {ServiceWrapper, ClientHandler, HOOKS} from "js-service-wrapper.js";

let nameInput = "";
let emailInput = "";

const nameInputElem = document.querySelector("[type='text']");
const emailInputElem = document.querySelector("[type='email']");
const addUserButton = document.getElementsByTagName("button");
console.log("nameInputElem ", nameInputElem);
console.log("emailInputElem ", emailInputElem);
console.log("addUserButton ", addUserButton);


const handleNameInput = (event) => {
    nameInput = event && event.target && event.target.value;
};

const handleEmailInput = (event) => {
    emailInput = event && event.target && event.target.value;
};

const addErrorMessage=(message)=>{
    const errorMessageDiv = document.createElement("div");
    const errorMessage = document.createTextNode(message);
    errorMessageDiv.style.setProperty('color', 'red');
    errorMessageDiv.setAttribute("id", "error-message");
    errorMessageDiv.appendChild(errorMessage);

    emailInputElem.focus();
    document.body.insertBefore(errorMessageDiv, nameInputElem);
};

const removeErrorMessage=()=>{
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv && errorMessageDiv.remove();
};

const handleButtonClick=(event)=>{
    const isValidEmail = (emailInput) => {
        return String(emailInput)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const submitUser=()=>{
        // const asyncWrapper = async (addUser(username, email, callback), params = null) => {
        //     try {
        //         const data = await asyncFunction(params)
        //         return [data, null]
        //     }
        //     catch (error) {
        //         return [ null, error ]
        //     }
        // }
        const getResponseText=(response)=>console.log("Reponse is: ", response);

        addUser(nameInput, emailInput, getResponseText);


        removeErrorMessage();
    };

    !!isValidEmail(emailInput) ? submitUser() : addErrorMessage("please enter a valid email address");


    console.log("isValidEmail", !!isValidEmail(emailInput));
    


};

nameInputElem.addEventListener("input", handleNameInput);
emailInputElem.addEventListener("input", handleEmailInput);
addUserButton[0].addEventListener("click", handleButtonClick);




// END YOUR CODE HERE




// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
    var xhr = new XMLHttpRequest();
    var response;
    var success = (!!Math.round(Math.random()));
    
    if (!success){
        response = JSON.stringify({
            success: success,
            error: "Oups, something went wrong!"
        });
    } else {
        response = JSON.stringify({
            success: success,
            user: {
                username: username,
                email: email
            }
        });   
    }
    
    xhr.open("POST", "/echo/json/");
    xhr.onload = function () {
            console.log("calling onload function")
    		if (xhr.status === 200) {
        		callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.send("json=" + response);
    console.log("var response: ", response);
};
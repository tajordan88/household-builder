"use strict";
var form = {},
    buttonAge = {},
    counter = 0,
    ret = [];

/*Add onsubmit event for form.*/
form = document.getElementsByTagName("form")[0];
form.setAttribute("onsubmit", "serializePostData()");

/*Add onclick event for add button.*/
buttonAge = document.getElementsByTagName("button")[0];
buttonAge.setAttribute("onclick", "validateForm()");

/*Function: Add item to list.*/
function addItem() {
    var inputAge = 0,
        inputRel = "",
        inputSmoker = false,
        householdList = {},
        list = [],
        listItemId = 0,
        button = {},
        li = {};

    inputAge = document.getElementsByTagName("input")[0];
    inputRel = document.getElementsByTagName("select")[0];
    inputSmoker = document.getElementsByTagName("input")[1];
    householdList = document.getElementsByClassName("household")[0];

    listItemId = list[list.length - 1] + 1;
    list.push(listItemId);

    button = document.createElement("button");
    button.innerHTML = "Delete";
    button.setAttribute("onclick", "removeItem(this)");
    button.setAttribute("id", listItemId);

    li = document.createElement("li");
    li.appendChild(document.createTextNode("Age: " + inputAge.value + 
        ", Relationship: " + inputRel.value + ", Smoker: " + 
        inputSmoker.checked));
    li.setAttribute("age", inputAge.value);
    li.setAttribute("relationship", inputRel.value);
    li.setAttribute("smoker", inputSmoker.checked);
    householdList.appendChild(li);
    li.appendChild(button);
}

/*Function: Remove item from list.*/
function removeItem(listId) {
    listId.parentNode.parentNode.removeChild(listId.parentNode);
}

/*Function: validate form for age greater than 0 and age and relationship 
fields not empty. addItem() if passed validation.*/
function validateForm(formData) {
    event.preventDefault();

    /*Validate 'age' to be greater than 0.*/
    var age = 0,
        rel = "";
    age = document.forms[0].age.value;
    rel = document.forms[0].rel.value;
    if (age > 0 && age !== "" && rel !== "") {
        addItem();
        return false;
    } else {
        alert("Must fill out Age greater than 0 and Relationship field.");
        return false;
    }
    return false;
}

/*Grab data and put into an array. */
function serializePostData() {
    event.preventDefault();

    var householdListFinal = [],
        listItems = {},
        serializedHouseholdListFinal = "",
        debugElement = {},
        serializedText = {},
        divElem = {};
    listItems = document.getElementsByTagName("li");
    householdListFinal = map(listItems, getText);

    serializedHouseholdListFinal = JSON.stringify(householdListFinal);

    debugElement = document.getElementsByClassName("debug")[0];
    serializedText = document.createTextNode(serializedHouseholdListFinal);

    divElem = document.createElement("div");
    divElem.appendChild(serializedText);
    if (counter === 1) {
        debugElement.removeChild(debugElement.childNodes[0]);
    }
    debugElement.appendChild(divElem);
    debugElement.style.display = "block";
    counter = 1;
}

function map(listOfItems, text) {
    var ret = [],
        i = -1,
        len = listOfItems.length;
    while (++i < len) ret[i] = text(listOfItems[i]);
    return ret;
}

function getText(node) {
    var ageHolder = 0,
        relationshipHolder = "",
        smokerHolder = false,
        listItemObject = {};
    ageHolder = node.getAttribute("age");
    relationshipHolder = node.getAttribute("relationship");
    smokerHolder = node.getAttribute("smoker");
    listItemObject = { age: ageHolder, relationship: relationshipHolder, 
        smoker: smokerHolder };

    ret.push(listItemObject);

    return listItemObject;
}
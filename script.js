const formEl = document.forms[0];
const mgs = document.getElementById('mgs');
const addItems = document.getElementById('add__items');
const searchBox = document.getElementById('search__box');
let items = document.getElementById("items");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();

    resetForm();


});

searchBox.addEventListener('keyup', filterItems );

let formValidation = () => {

    if(addItems.value === "") {
        mgs.innerHTML = "please add a new task...";
    } else {
        mgs.innerHTML = "";

        getUserData();

    }

};


let userData = [];
const getUserData = () => {
    userData.push({
        text: addItems.value,
    });

    storage()

    newTask();


};

const newTask = () => {
    items.innerHTML = "";
    let listItems = document.createElement("div");
    userData.map((x, y) => { 
        let p = document.createElement('p');
        listItems.className = 'text__span';
        p.className = 'text__span';
        p.id = y
        p.textContent = x.text;
        listItems.append(p);
        p.style.paddingLeft = '10px';
        p.addEventListener('click', function(e) {
            const pText = p.innerText;
            console.log(pText);
            let input  = document.createElement('input');
            input.className = 'newInput';
            input.value = pText;
            let inputContainer = document.createElement('div');
            inputContainer.className = "container";
            inputContainer.append(input);
            let btn = document.createElement("button");
            btn.className = 'newBtn';  
            btn.innerText = 'Update';
            btn.addEventListener('click', (e) => {

                if(input) {
                    editTask(y, input.value)
                    
                } else if(input.value !== pText) {
                    editTask(y,input.value)

                }

            });

            input.addEventListener('keypress', (e) => {
                if(e.key === "Enter") {
                    editTask(y,input.value);
                    e.preventDefault();

                }
            })
            inputContainer.append(btn)

            items.replaceChild(inputContainer,p);
        })
        let span = document.createElement('span');
        span.className = 'options';
        let i = document.createElement("i");
        i.className = "fas fa-trash-alt edit";
        i.addEventListener('click', function() {
            deleteTask(this);
            newTask(this);
        });
        span.append(i);
        listItems = p;
        p.append(span);
        
        items.append(p);
        
    });

};

const resetForm = () => {
    addItems.value = " ";
    formEl.reset();
};
const storage = () => {
    localStorage.setItem("userData", JSON.stringify(userData));


}
const deleteTask = (event) => {
    event.parentElement.parentElement.remove();
    userData.splice(event.parentElement.parentElement.id, 1);
    storage()
};



const editTask = (index, newValue) => {
    userData[index].text = newValue;
    storage()
    newTask()

};

function filterItems(e){
    let text = e.target.value.toLowerCase();
    let myitem = items.getElementsByTagName('p');
    Array.from(myitem).forEach(function(item){
    let itemName = item.firstChild.textContent;
    if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display = 'flex';
    } else {
        item.style.display = 'none';
    }
    });


};



(() => {
    userData = JSON.parse(localStorage.getItem("userData")) || [] ;
    newTask();

}) ();  
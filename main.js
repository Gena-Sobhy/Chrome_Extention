// elements
const saveEl = document.getElementById('save-el'); 
const ulEl = document.querySelector('.saved-urls');

const saveBtn = document.querySelector('.save-btn');
const deleteBtn = document.querySelector('.delete-btn');
const tabBtn = document.querySelector('.save-tab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

let myLeads = [];
// actions

//click or enter key press
document.addEventListener('keypress' , (e) => {
    let key = e.keyCode;

    if(key ===13) {
        saveBtn.click();
    }
})

    //code
//local storage
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
} 

function render(leads) {
    let listOfItems = '';

    for (let i = 0; i < leads.length; i++) {
        listOfItems +=
            `<div class="div">
                <li class="url">
                    <a href="${leads[i]}" target="_blank">
                        ${leads[i]}
                    </a>
                </li>
            </div>`
    }

    ulEl.innerHTML = listOfItems;
}

saveBtn.addEventListener('click', function() {
    if(!myLeads.includes(saveEl.value) && !myLeads.includes(saveEl.value.replaceAll(' ' , '_'))) {
        if(saveEl.value != '' && saveEl.value != null) {
            myLeads.push(saveEl.value.replaceAll(' ' , '_'));
        }
    }

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    saveEl.value = '';
});

deleteBtn.addEventListener('click' , function() {
    myLeads = [];
    localStorage.clear();
    render(myLeads);

})

tabBtn.addEventListener('click' , function() {
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // });

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        myLeads.push(tabs[0].url);
        render(myLeads);
    });
});

// practice

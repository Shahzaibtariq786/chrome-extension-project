let saveBtn = document.getElementById("save-btn");
let inputBtn = document.getElementById("input-el");
let myLeads = [];
let myCategories = []
const ulEl = document.getElementById("ul-el");
const leadsContainer = document.getElementById("leads-container")
let container = document.getElementById("container");
let delBtn = document.getElementById("del-btn");
let saveTab = document.getElementById("tab-btn");
const catText = document.getElementById("cat-input")
const catBtn = document.getElementById("cat-btn")
const categoryContainer = document.getElementById("link-cat")
const tabs = [
  {url: "https://www.aniwave.com" }
]

saveTab.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true},function(tabs){
    myLeads.push(tabs[0].url)
  myCategories.push(catText.value)
  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  localStorage.setItem("myCategories",JSON.stringify(myCategories))
  renderCat(myCategories,myLeads)
  renderFunction(myLeads)
  catText.value = ""
  })
})


catBtn.addEventListener("click",function(){
  myCategories.push(catText.value)
  // console.log(myCategories)
  localStorage.setItem("myCategories",JSON.stringify(myCategories))
  // let textOfInput = catText.value
  renderCat(myCategories,myLeads)
 })
const categoriesFromLocalStorage = JSON.parse( localStorage.getItem("myCategories") )
if(categoriesFromLocalStorage){
  myCategories = categoriesFromLocalStorage
  renderCat(myCategories,myLeads)
}

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  renderFunction(myLeads)
}

delBtn.addEventListener("dblclick",function(){
  localStorage.clear();
  myLeads = [];
  myCategories = [];
  renderCat(myCategories,myLeads)
  renderFunction(myLeads)
})
saveBtn.addEventListener("click", function () {
  myLeads.push(inputBtn.value);
  myCategories.push(catText.value)
  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  localStorage.setItem("myCategories",JSON.stringify(myCategories))
  // inputBtn.value = ""
  renderCat(myCategories,myLeads)
  renderFunction(myLeads)
})
function renderFunction(leads) {
  let listItems = "";
  for (i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href="${leads[i]}">
           ${leads[i]}
        </a>
    </li>
    `;
    
  }
  // let block = ""
  // block += `
  // <h4>

  // </h4>
  // `
  // leadsContainer.push(block)
  ulEl.innerHTML = listItems;
}
function renderCat(category,leads){
  // let hasEmptyString = true;
  let block = "";
  for( i= 0; i< category.length; i++ ){
  let numberOfCat = i+1   
  block +=`
  <h4><span>${numberOfCat}</span> ${category[i]}</h4>
  `
}
  categoryContainer.innerHTML = block

}
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create'
let tmp;
function gettotal(){
    if(price.value !=''){
        let result=+price.value+ +taxes.value+ +ads.value- +discount.value
        total.innerHTML=result
        total.style.background='green'
    }else{
        total.innerHTML='';
         total.style.background='red'
    }
}
//create product
let datapro;
if(localStorage.product !=null){
datapro=JSON.parse(localStorage.product)
}else{datapro=[]}

submit.onclick = function() {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };


    if(mood==="create"){if(newpro.count>1){
        for(let i=0;i<newpro.count;i++){
            datapro.push(newpro)
        }
    }else{datapro.push(newpro)}
    }else{datapro[tmp]=newpro
        mood='create'
        submit.innerHTML='create'
        count.style.display='block'
    }
    
    //save localstorage
    localStorage.setItem('product',JSON.stringify(datapro))
    console.log(newpro)
    cleardata()
    showdata()
}
//clear data
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    total.style.background="red"
    count.value='';
    category.value='';
}
//read
function showdata(){
    gettotal()
    let table='';
    for(let i=0;i<datapro.length;i++){
        table+=`<tr>
        <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateDate(${i})" class="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                </tr>
                `

    }
    document.getElementById('tbody').innerHTML=table
    let btndelete=document.getElementById('deleteAll')
    if(datapro.length>0){
btndelete.innerHTML=`<button onclick="deleteAll()">delete All(${datapro.length})</button>`
    }else{btndelete.innerHTML=''}
}showdata()
//delete
function deleteData(i){
    datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro)
    showdata()
    //deleteAll
}function deleteAll(){
    localStorage.clear;
    datapro.splice(0)
    showdata()
}
//UpDate
function updateDate(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal()
    count.style.display='none'
    category.value=datapro[i].category;
   submit.innerHTML='upDate'
   mood="update"
   tmp=i;
   scroll({
    top:0,
    behavior:'smooth'
    
   })
}
//search
let searchMood = 'title';

function getsearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'search by title';
    } else {
        searchMood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
}

function searchData(value) {
    let table = '';
    if (searchMood === 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateDate(${i})" class="update">update</button></td>
                    <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                </tr>`;
            }
        }
    } else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateDate(${i})" class="update">update</button></td>
                    <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                </tr>`;
            }
        }
    } 

    document.getElementById('tbody').innerHTML = table;
}

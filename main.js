
let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let create=document.getElementById('create')

function gettotal(){
    if(price.value!=''){
        let result=+price.value+ +taxes.value+ +ads.value- +discount.value;
        total.innerHTML=result;
        total.style.background=('green')
    }else{total.style.background=('red')}
}
let datapro;
if(localStorage.product!=null)
    {
        datapro=JSON.parse(localStorage.product)
    }else{datapro=[]}
    create.onclick=function(){
        let newpro={
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            count:count.value,
            category:category.value,
            total: total.innerHTML
        }
        datapro.push(newpro)
        localStorage.setItem('product',JSON.stringify(datapro) )
        console.log(datapro)
        showdata()
        cleardata()
    }
    function cleardata(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML 
        count.value='';
        category.value='';
        
    }
    function showdata(){
        let taple='';
        for(let i=0;i<datapro.length;i++){
            taple+=`<td>${i}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
 <td>${datapro[i].discount}</td>
 <td>${datapro[i].total}</td> 
  <td>${datapro[i].category}</td> 
     <td><button id="update">update</button></td>
<td><button  onclick="deletedata( ${i})" id="delete">delete</button></td> 
            </tr>
            `
        }
document.getElementById('tbody').innerHTML=taple
}showdata()

function deletedata(i){datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro)
showdata()

}

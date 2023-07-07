/* Global Variables */
const key = '&appid=38244a8238de06ab7b24935093c321c8&units=metric';
const url = 'http://localhost:3000/';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

const zip = document.getElementById('zip');
const name = document.getElementById('name');
const feel = document.getElementById('feelings');
const btn = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


async function getZipCodeInfo(zipCode){
    return await (await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${key}`)).json());
}

btn.addEventListener('click',()=>{
    
    getZipCodeInfo(zip.value).then((data)=>{
        postMessage(data);
        console.log(data);
    });
    


})

async function postMessage(data){

    let res = await fetch(`${url}post`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    //console.log(res);
    try { 
        if (!res.ok) { 
            alert("error")
        }
        res.json().then(data=> {
            if(res.ok){
                UpdateUI();
            }
            else {
                alert('Not Complete')
            }
        }).catch((error)=>{
            console.log("error 2");
        })
    }
    catch(error){
        console.log("error 3");
    }
}


async function UpdateUI(){
    let res = await fetch(`${url}get`);
    try {
        res.json().then(
            data=> {
                name.innerHTML = `City Name: ${data.name}`;
                date.innerHTML = `Date is: ${d}`;
                temp.innerHTML = `Temp is: ${(data.main.temp)} C`;
                content.innerHTML = `My feeling is: ${feel.value}`;                
            }
        ).catch(error=> console.log("error 4"));
    }
    catch(error){
        console.log("error 5");
    }
}



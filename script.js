let fCurrencies=document.getElementById("fCurrencies");             //this has first selection currency code

let fCurrencyValue=document.getElementById("fCurrencyValue");       //this will have entered amount element

let sCurrencies=document.getElementById("sCurrencies");             //this is similar to fCurrencies

let sCurrencyValue=document.getElementById("sCurrencyValue")        //this will be used to display output

let btn=document.getElementById("submitBtnInput");                  //submit button

let fFlagImg=document.getElementById("fFlag");                      //First Flag image
let sFlagImg=document.getElementById("sFlag");                      //Second Flag Image

let fvalue=0;                                                       //Actual entered amount
let fcountrycode='usd',scountrycode='usd';                                      //used for storing Country code for API Request


let dropdown=document.querySelectorAll(".selectCurrencies");        //dropdown list
console.log(fCurrencies);


//Logic to add options of countries from codes.js file

for(let select of dropdown){
    for(let countryCodes in countryList){
        let newOption=document.createElement("option");

        newOption.innerText=countryCodes;

        newOption.value=countryCodes;

        select.append(newOption);
    }
}

//Logic to change Flag

dropdown.forEach(flag=>{
    flag.addEventListener("input",()=>{
        
        console.log("fCurrencies : ",fCurrencies);

        let foption = countryList[fCurrencies.value];                   //for storing selected country code for Flag API
        console.log("foption : ",foption);

        fcountrycode=fCurrencies.value.toLowerCase();                   //Updating Country code for URL
        console.log("fcountrycode : ",fcountrycode);

        fFlagImg.src=`https://flagsapi.com/${foption}/flat/64.png`;     //Changing Image

        let soption = countryList[sCurrencies.value];                   //for storing Second selected country code for Flag API
        console.log("soption : ",soption);

        scountrycode=sCurrencies.value;                                 //Updating Country code for URL
        
        sFlagImg.src=`https://flagsapi.com/${soption}/flat/64.png`;     //Changing Image
    })
});


//To extract Entered Amount

fCurrencyValue.addEventListener("change",()=>{
    let val=parseFloat(fCurrencyValue.value);
    if(isNaN(val) || val<=0){
        alert("Enter a Valid Amount");
        fCurrencyValue.value="";
        fvalue=0;
    }
    else{
    fvalue=fCurrencyValue.value; 
    console.log("fvalue : ",fvalue);
    }
});



//Logic To fetch form API

btn.addEventListener("click",async(evt)=>{

    evt.preventDefault();            //Prevent reloading of page

    const URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fcountrycode}.json`;

    try{
    promise=await fetch(URL)            
    let jsonPromise=await promise.json();

    let finalValue=fvalue*(jsonPromise[fcountrycode.toLowerCase()][scountrycode.toLowerCase()]);
    let finalValueRound=Math.trunc(finalValue*Math.pow(10, 6))/Math.pow(10, 6);
    console.log(jsonPromise[fcountrycode.toLowerCase()][scountrycode.toLowerCase()]);
    console.log(finalValue);
    sCurrencyValue.innerText=finalValueRound;
    }
    catch(error){
        alert("Some Error Occured. Try Again Sometime Later");
    }
});






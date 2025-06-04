// setTimeout(function ma(){
//     console.log("hello");
// },2000);
// ma();// reference error:ma() is not defined


// let foo=10;
// (function (){
//     console.log(foo);//ReferenceError: cannot access foo before initilixation
//     let foo=50;
// })();

// console.log(k);
// let k=290;


//using debounsing
const btn= document.querySelector('button');

const but=_.debounce(()=>{
    console.log("button is clicked");
},2000)

btn.addEventListener("click",but);
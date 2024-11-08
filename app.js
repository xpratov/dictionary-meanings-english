// 3. Inputni qilish
// 4. Referencing qismini va musiqani qilish

const darkBtn=document.querySelector(".dark-light") 
const font_title=document.querySelector(".font-title")
const fontingBtn=document.querySelector(".fonting")
const inputxt=document.querySelector(".inputing input")
const headingOne=document.querySelector("h1")
const sanserifBtn=document.querySelector(".choose-font p:first-child")
const serifBtn=document.querySelector(".choose-font p:nth-child(2)")
const monoBtn=document.querySelector(".choose-font p:last-child")
const bodyEl=document.body
const fonetik=document.querySelector(".referencing p")
const playSound=document.querySelector(".referencing svg")

darkBtn.addEventListener("click", ()=>{
    bodyEl.classList.toggle("dark_body")
    document.querySelector(".dark-circle1").classList.toggle("hidden")
    document.querySelector(".dark-circle2").classList.toggle("hidden")
    font_title.classList.toggle("clr-fff")
    fontingBtn.classList.toggle("border-fff")
    darkBtn.classList.toggle("bg-purple")
    document.querySelector("header path").classList.toggle("clr-stroke")
    inputxt.classList.toggle("bg-1f")
    inputxt.classList.toggle("clr-fff")
    document.querySelector(".inputing").classList.toggle("bg-1f")
    headingOne.classList.toggle("clr-fff")
    document.querySelectorAll("h4").forEach(x=>{x.classList.toggle("clr-fff")})
    document.querySelectorAll("main li").forEach(x=>{x.classList.toggle("clr-fff")})
    document.querySelector("footer a").classList.toggle("clr-fff")
    document.querySelector(".choose-font").classList.toggle("bg-1f")
    document.querySelector(".choose-font").classList.toggle("clr-fff")
    document.querySelector(".choose-font").classList.toggle("shadow-purple")
})

document.querySelector("header section").addEventListener("click", ()=>{
    document.querySelector(".choose-font").classList.toggle("hidden")
})

sanserifBtn.addEventListener("click", ()=>{
    bodyEl.classList.toggle("ft-sans-serif")
})

serifBtn.addEventListener("click", ()=>{
    bodyEl.classList.toggle("ft-serif")
})

monoBtn.addEventListener("click", ()=>{
    bodyEl.classList.toggle("ft-mono")
})

function searching(){
    let res=false;
    document.querySelector(".inputing img").addEventListener("click", ()=>{
        res= true
    });
    return res
}
const fetchData=()=>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputxt.value}`)
    .then(res=>res.json())
    .then(data=>updateDOM(data))
}
bodyEl.addEventListener("keydown", (event)=>{
    if (event.key=="Enter"){
        fetchData()
    }
});
document.querySelector(".inputing img").addEventListener("click", ()=>{
    fetchData()
})

function updateDOM(data){
    result=data[0]
    let noun_meanings=result.meanings[0].definitions
    let verb_meanings=result.meanings[1].definitions
    let synonyms=result.meanings[0].synonyms
    headingOne.innerHTML=inputxt.value
    fonetik.textContent=result.phonetics[0].text
    playSound.addEventListener("click", (sorc)=>{
        sorc=result.phonetics[0].audio
        let sound = new Audio(sorc)
        sound.play();
    })
    noun_meanings.forEach(element => {
        console.log(element);
        document.querySelector(".be_noun ul").innerHTML += `<li>${element.definition}<li/>`
    });
    synonyms.forEach(element => {
        document.querySelector(".be_noun section").innerHTML+=`<p>${element}<p/>`
    });
    verb_meanings.forEach(element => {
        document.querySelector(".be_verb ul").innerHTML += `<li>${element.definition}<li/>`
    });
    document.querySelector(".be_verb section").innerHTML +=`<p>${result.meanings[1].definitions.example}<p/>`
    document.querySelector("footer p").innerHTML=`<a target="_blank" href="${result.sourceUrls[0]}">${result.sourceUrls[0]}<a/>`
}

















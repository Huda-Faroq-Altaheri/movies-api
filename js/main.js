
"use strict"

// ----------------------------------------------Start-Home ---------------------------------------------------------- --
let
   localSearch=document.getElementById("local-search"),
   externalSearch=document.getElementById("external-search"),
   movie=[],
   currentMovie='Jack+',
   currentLink='now_playing',
   link=document.getElementsByClassName("link");




//Get Data from API:
async function fetchUrl()
{
    let result=await fetch(`https://api.themoviedb.org/3/movie/${currentLink}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&fbcl`)
    result=await result.json();
    movie=result.results
    displayMovie();
}


//Display Movies Api:
function displayMovie(){

    let movieData="";

    for (let i = 0; i <movie.length; i++) {
      movieData +=`
      <div class="col-md-4 my-3  ">
      <div class="img-item">
          <img class="img-movie" src="https://image.tmdb.org/t/p/original/${movie[i].poster_path}"alt="image-movie" >
          <div class="overlay d-flex align-items-center ">
              <div class="text-center ">
              <h2 class="py-2 fw-bold ">${movie[i].original_title}Free Guy</h2>
              <h5 class="fw-bold fs-6">${movie[i].overview}</h5>
              <h4 class="py-1 fs-4">rate: <span>${movie[i].vote_average}</span> </h4>
              <h4 class="fs-4">${movie[i].release_date}</h4>
             </div>
          </div> </div></div> `        
    }
    document.getElementById("displayMoves").innerHTML=movieData;
}

//Onload Calling Function:
fetchUrl();


//---------------------------------------------- Search & Srearch by Word ----------------------------------------------------------


// Search by current arrayMovie :
$("#local-search").keyup(()=>{
    currentSearch(localSearch.value)
})

// Search by api Movie :
$("#external-search").keyup(()=>{
    // currentMovie=externalSearch.value;
    fetchMoviesSearch(externalSearch.value);
})



//Get movies Search from API:
async function fetchMoviesSearch(currentMovie)
{
    let result=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${currentMovie}`)
    result=await result.json();
    movie=result.results;
    displayMovie();
}

// Search in arrayMovie Function:
function currentSearch(trem){
    let tres='';
    for (let i = 0; i < movie.length; i++) {
        if(movie[i].original_title.toLowerCase().includes(trem.toLowerCase())){
            tres +=`
            <div class="col-md-4 my-3  ">
            <div class="img-item">
                <img class="img-movie" src="https://image.tmdb.org/t/p/original/${movie[i].poster_path}"alt="image-movie" >
                <div class="overlay d-flex align-items-center ">
                    <div class="text-center ">
                    <h2 class="py-2 fw-bold ">${movie[i].original_title}Free Guy</h2>
                    <h5 class="fw-bold fs-6">${movie[i].overview}</h5>
                    <h4 class="py-1 fs-4">rate: <span>${movie[i].vote_average}</span> </h4>
                    <h4 class="fs-4">${movie[i].release_date}</h4>
                   </div>
                </div> </div></div>
            ` 
        } 
    }
    document.getElementById("displayMovesSearch").innerHTML=tres;
}






//----------------------------------------------Start-Slide-menu & Start-strip-navbar  ----------------------------------------------------------
$(".strip-toggel-menu").click(()=>{

    if($("#slide-menu").css("left")== "0px")
    {
        let counter=0;
        $("#slide-menu").animate({"left":"248px"},500); 
        $("#strip-navbar").animate({"left":0},500)
            $("li").eq(counter).animate({"top":"0px"},1000,()=>{counter++;
            $("li").eq(counter).animate({"top":"0px"},500,()=>{counter++;
            $("li").eq(counter).animate({"top":"0px"},500,()=>{counter++;
            $("li").eq(counter).animate({"top":"0px"},500,()=>{counter++;
            $("li").eq(counter).animate({"top":"0px"},500,()=>{counter++;
            $("li").eq(counter) .animate({"top":"0px"},500)  
            })        })      })     })     }) 
            $(".strip-toggel-menu").html(`<i class="fa fa-close fs-3"></i>`)        
    }
    else{

     $("li").siblings().animate({'top':'500px'},400)
     $("#slide-menu").animate({"left":"0px"},500);
     $("#strip-navbar").animate({"left":"-250px"},500);
     $(".strip-toggel-menu").html(`<i class="fa fa-align-justify fs-3"></i>`)
    }
})


//----------------------------------------------End-Slide-menu & End-strip-navbar ----------------------------------------------------------




//-- -------------------------------------Arrow-Up------------------------------------------- -->

let durationOffSet=$("#displayMoves").offset().top;
$(window).scroll(()=>{

    let wScrol=$(window).scrollTop();
    if( wScrol > durationOffSet + 150){
        $(".divUp").fadeIn(1000);
    }
    else
    {
        $(".divUp").fadeOut(1000);
    }
})
$(".divUp").click(()=>{
$("html,body").animate({scrollTop:0},3000);
})




 //-- ------------------------------------- Start-click-links------------------------------------------- -->
 
 $("a[href^='#contacUs']").click((e)=>{
    let aLink=$(e.target).attr("href");
    let aOffSet=$(aLink).offset().top;
    $("html,body").animate({ scrollTop:aOffSet },1500)
})


for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click",(e)=>{
        let aLink= $(e.target).attr("value");
        currentLink=aLink;
        fetchUrl() })
}


$(".link-trending").click(async()=>{
    console.log("KKKKK")
    let result=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    result=await result.json();
    movie=result.results;
    console.log(movie);
    displayMovie();
})

 //-- ------------------------------------- End-click-links------------------------------------------- -->




 //-- -------------------------------------Start-hiddind-loadingScreen------------------------------------------- -->

$(".loadingScreen .spinner").fadeOut(1000,()=>{
    $(".loadingScreen .spinner").parent().fadeOut(1000,()=>{
        $("body").css("overflow","auto");
        $(".loadingScreen").remove();
    });
})
//-- -------------------------------------End-hiddind-loadingScreen------------------------------------------- -->







//----------------------------------------------Start- Validation ----------------------------------------------------------

// pull values Inputs
let yourNameInp=document.getElementById("yourName"),
    yourPhoneInp=document.getElementById("yourPhone"),
    yourPassWordInp=document.getElementById("yourPassWord"),
    yourEmailInp=document.getElementById("yourEmail"),
    yourAgeInp=document.getElementById("yourAge"),
    yourRepasswordInp=document.getElementById("yourRepassword"),
    nameAlertP=document.getElementById("nameAlert"),
    phoneAlertP=document.getElementById("phoneAlert"),
    passAlertP=document.getElementById("passAlert"),
    emailAlertP=document.getElementById("emailAlert"),
    ageAlertP=document.getElementById("ageAlert"),
    rePassAlertP=document.getElementById("rePassAlert"),
    submitBtn=document.getElementById("submit"),
    inputs=document.getElementsByClassName("inp-form");


// regular expression for Inputs
let nameRegex=/^[A-Z][a-z A-z 0-9]{3,9}$/,
    phhoneRegex=/^(002)?01[0125][0-9]{8}$/,
    passwordRegex=/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    emailRegex=/^[a-z0-9]+@[a-z]{5,10}(\.com)$/,
    ageRegex=/^([1-5][0-7]|60)$/,
    repasswordRegex=/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;


// validation call for Inputs Value
 $("#yourName").keyup(()=>{validation(nameRegex,yourNameInp,nameAlertP);$("#fill-inpt").html("");$("#success").html("");})
 $("#yourPhone").keyup(()=>{validation(phhoneRegex,yourPhoneInp,phoneAlertP);$("#fill-inpt").html("");$("#success").html("");})
 $("#yourPassWord").keyup(()=>{validation(passwordRegex,yourPassWordInp,passAlertP);$("#fill-inpt").html("");$("#success").html("");})
 $("#yourEmail").keyup(()=>{validation(emailRegex,yourEmailInp,emailAlertP);$("#fill-inpt").html("");$("#success").html("");})
 $("#yourAge").keyup(()=>{validation(ageRegex,yourAgeInp,ageAlertP);$("#fill-inpt").html("");$("#success").html("");})
 $("#yourRepassword").keyup(()=>{validation(repasswordRegex,yourRepasswordInp,rePassAlertP);$("#fill-inpt").html("");$("#success").html("");})

// validation function
function  validation(regex,input,alert){
    if(!regex.test(input.value))
    {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        alert.classList.remove("d-none");
        return false
    }
    else
    {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        alert.classList.add("d-none");
        return true;
    }
}
//Reset Form
function clearForm(){
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value="";

        yourNameInp.classList.remove("is-invalid");
        yourNameInp.classList.remove("is-valid"); 
        nameAlertP.classList.add("d-none");
        
        yourPhoneInp.classList.remove("is-invalid");
        yourPhoneInp.classList.remove("is-valid");
        phoneAlertP.classList.add("d-none"); 
         

        yourPassWordInp.classList.remove("is-invalid");
        yourPassWordInp.classList.remove("is-valid");
        passAlertP.classList.add("d-none");

        yourEmailInp.classList.remove("is-invalid");
        yourEmailInp.classList.remove("is-valid");
        emailAlertP.classList.add("d-none");

        
        yourAgeInp.classList.remove("is-invalid");
        yourAgeInp.classList.remove("is-valid");
        ageAlertP.classList.add("d-none");

        yourRepasswordInp.classList.remove("is-invalid");
        yourRepasswordInp.classList.remove("is-valid");
        rePassAlertP.classList.add("d-none");
    }
}

// click submit button
$("#submit").click(()=>{
    if(validation(nameRegex,yourNameInp,nameAlertP) &&  
    validation(phhoneRegex,yourPhoneInp,phoneAlertP) &&
    validation(passwordRegex,yourPassWordInp,passAlertP) &&
    validation(emailRegex,yourEmailInp,emailAlertP) &&
    validation(ageRegex,yourAgeInp,ageAlertP) &&
    validation(repasswordRegex,yourRepasswordInp,rePassAlertP)){
      console.log("hhhhh")
      $("#success").html("Data has been sent")
      $("#fill-inpt").html("")
    }
    else
    {
        $("#fill-inpt").html("Fill all the inputs")
        $("#success").html("")
    }


    clearForm()

})



//----------------------------------------------End- Validation ----------------------------------------------------------






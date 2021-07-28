
document.addEventListener('DOMContentLoaded', function () {
    
    const $btn = document.querySelector('.btn700');
    const $global = document.querySelector('#global-container');
    const $body = document.querySelector('body');
    const $blackCover = document.querySelector('.black-cover');
    
    const clickType = window.ontouchstart ? 'touchstart' : 'click';
    
    $blackCover.addEventListener('click',function() {
        $body.classList.remove('open');
        $body.classList.remove('reserveMode');
    })
    $btn.addEventListener('click',function() {
        $body.classList.toggle('open');
    })



    //resesrveEvent

    const reserveEvent = (e)=> {
        e.preventDefault();
        if($body.classList.contains('open')==true){
            $body.classList.remove('open');
        }
        $body.classList.toggle('reserveMode');
    }

    
    const $reserve = document.querySelectorAll('.reserve');
    
    for(let i = 0; i < $reserve.length ; i++){
        $reserve[i].addEventListener(clickType,reserveEvent);
    }

    const $inputs = document.querySelectorAll('input');
    const $formBoxItems = document.querySelectorAll('.form-box-item');
    

    const checkForm = () => {
        let $form = document.querySelector('form')
        for(let i = 0; i < $inputs.length; i++){

            if($inputs[i].value == ""&&$inputs[i+1].value == ""){
                $formBoxItems[i].classList.add('missing-word');
                $formBoxItems[i+1].classList.add('missing-word');
                return false;
                
            }else if ($inputs[i].value == ""){
                $formBoxItems[i].classList.add('missing-word');
                return false;
                
            }else {
                for(let i = 0; i < $inputs.length; i++){
                    $formBoxItems[i].classList.remove('missing-word');
                    
                }
                $body.classList.remove('reserveMode');
                
            }
            
        }
        setTimeout(()=>{
            alert(`${$inputs[0].value}様、リクエスト予約ありがとうございます。お店からの予約確認のメールをお待ちください。※リクエスト予約の翌日（定休日含まず）までにお店から連絡がなかった場合は直接お問い合わせください。`);

        },1000)
        


    }

    const $submit = document.querySelector('#submit-btn');

    $submit.addEventListener(clickType,checkForm);


    const closeReserveEvent = ()=> {
        $body.classList.remove('reserveMode');
    }

    const $formCloseBtns = document.querySelectorAll('.close-btn-wrap');
    for(let i =0; i < $formCloseBtns.length; i++){
        $formCloseBtns[i].addEventListener(clickType, closeReserveEvent);

    }




    
    
    
   
    
    const $phrase = document.querySelector('.before-welcome');
    
    const $welTit = document.querySelector('.welcome-title');
    const $menuTit = document.querySelector('.menu-title');
    const $chefTit = document.querySelector('.chef-title');
    const $accTit = document.querySelector('.access-title');
    
    const ttlEve = (entries, observer)=> {
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
    
                setTimeout(() => {
                    
                    entry.target.classList.add('view');
                    let titleStr = entry.target.textContent;
                    let titleChar = titleStr.split('');
                    entry.target.innerHTML = titleChar.reduce((acc,curr)=>{
                        return `${acc}<span class='ttlChar'>${curr}</span>`
                        
                    },'')
                        
                }, 500);
                observer.unobserve(entry.target);
    
            }
        })
    }
    
    const viewEve = (entries, observer)=> {
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
    
                setTimeout(() => {
                    
                    entry.target.classList.add('view');
                    let titleStr = entry.target.textContent;
                        
                }, 500);
                observer.unobserve(entry.target);
    
            }
        })
    }
    
    // const meal = document.querySelector('.mealname');   
    // // const meals = meal.split('');
    // const mealchar = meal.innerHTML.split('');
    // console.log(mealchar);
    
    
    const option =  {
        root: null,
        rootMargin: "-120px 0px"
        
    }
    
    const ioTitle = new IntersectionObserver(ttlEve, option);
    
    ioTitle.observe($welTit);
    ioTitle.observe($menuTit);
    ioTitle.observe($chefTit);
    ioTitle.observe($accTit);
    
    
    const ioBeforeWrap = new IntersectionObserver(viewEve, option);
    
    ioBeforeWrap.observe($phrase); 
    
    
    
    
    const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]:not(.reserve)');
    console.log(smoothScrollTrigger);
    for (let i = 0; i < smoothScrollTrigger.length; i++){
        smoothScrollTrigger[i].addEventListener('click', (e) => {
            e.preventDefault();
            if($body.classList.contains('open')==true){
                $body.classList.remove('open');
            }
            setTimeout(() => {
                let href = smoothScrollTrigger[i].getAttribute('href');
                let targetElement = document.getElementById(href.replace('#', ''));
                const rect = targetElement.getBoundingClientRect().top;
                const offset = window.pageYOffset; 
                const target = rect + offset;
                window.scrollTo({
                    top: target,
                    behavior: 'smooth',
                  });
                
            }, 600);
        });
        
    }

    const PageTopBtn = document.querySelector('#totop-logo');
    PageTopBtn.addEventListener('click', () =>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'

        });
    });



    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var toTwoDigits = function (num, digit) {
    num += ''
    if (num.length < digit) {
        num = '0' + num
    }
    return num
    }

    var yyyy = toTwoDigits(year, 4)
    var mm = toTwoDigits(month, 2)
    var dd = toTwoDigits(day, 2)
    var ymd = yyyy + "-" + mm + "-" + dd;

    document.querySelector("#day").value = ymd;




    const $hour =  document.cafeForm.hour;
    let hourStr = '';

    for(let i =11; i <= 20; i++){
        hourStr += `<option value="${i}">${i}時</option>`   
    }
    $hour.innerHTML  = hourStr;



    const $minute =  document.cafeForm.minute;

    let minuteStr ='';

    for(let i = 0; i <= 45; i = i + 15  ){
        minuteStr += `<option value="${i}">${i}分</option>`   
    }

    $minute.innerHTML  = minuteStr;



    const $selectNum =  document.querySelector('.number-select');

    let numStr ='';

    for(let i = 1; i <= 20; i++  ){
        　numStr += `<option value="${i}">${i}名</option>`   
    }

    $selectNum.innerHTML  = numStr;



    
        
});    

// class reserveClass {
//     constructor(el){
//         this.el = document.querySelector(el);

        

//     }
// }
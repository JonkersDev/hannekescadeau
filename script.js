let gems = localStorage.getItem('gems');
let hartjes = localStorage.getItem('hartjes');
let lvl = localStorage.getItem('lvl');
let streakcount = localStorage.getItem('streak');
if( gems == undefined ) gems = 1000;
if( hartjes == undefined ) hartjes = 5;
if( lvl == undefined ) lvl = 1;
if( streakcount == undefined ) streakcount = 29;
document.querySelector('.levens').innerHTML = hartjes;
document.querySelector('.gemcount').innerHTML = gems;
document.querySelector('.streakcount').innerHTML = streakcount;

// localStorage.setItem('lvl', 1);
console.log(lvl)

let q = [
    'Si me tienes me quieres compartir. Y si me compartes, ya no me tienes.',
    'Por la luna o el sol puedo ser encontrado, pero en la oscuridad me he ido otra vez. Sin embargo, siempre estoy contigo.',
    'Soy tan claro como un diamante. Aunque puedes caminar sobre el agua con mi fuerza, no me guardes en tu bolsillo o me iré en una hora.',
    'Quita nuestra piel y no lloraremos. ¡Pero lo hace! ¿Que somos?',
    'Los pobres me tienen, los ricos no me necesitan. ¡Si me comes te mueres!',
    'Todas las noches me dicen qué hacer, y todas las mañanas hago lo que me dicen. Pero aún así siempre me gritan.',
    'Soy una planta y si te sientas debajo de mí demasiado tiempo, morirás.',
    `<span>Vraag 1</span> -ge im=t<hr><span>Vraag 2</span> -s -h uw=eau<hr><span>Vraag 3</span> -j<hr><span>Vraag 4</span> ui=e<hr><span>Vraag 5</span> ts=u + <span>Vraag 6</span> -kker<hr><span>Vraag 7</span> -wa -r lie=foon`
];
let tips = [
    'Als je me hebt wil je me delen. En als je me deelt heb je me niet meer.',
    'Door maan of zon ben ik te vinden, maar in het duister ben ik weer weg. Toch ben ik altijd bij je.',
    'Ik ben zo helder als een diamant. Hoewel je met mijn kracht op water kunt lopen, moet je mij niet in je zak bewaren want dan ben ik binnen een uur verdwenen.',
    'Verwijder onze huid en wij zullen niet huilen. Maar jij wel! Wat zijn wij?',
    'De armen hebben mij, de rijken hebben mij niet nodig. Als je me eet ga je dood!',
    'Elke avond vertellen ze me wat ik moet doen, en elke ochtend doe ik wat me gezegd is. Maar toch wordt er altijd op me gefoeterd.',
    'Ik ben een plant en als te lang onder mij zit ga je dood.',
    'Geen vertaling deze keer'
]
let a = [
    'geheim', 
    'schaduw', 
    'ijs', 
    'uien', 
    'niets', 
    'wekker', 
    'waterlelie', 
    'het cadeau is een nieuwe telefoon'
]

const unlock = (level)=>{
    for( i = 0; i < level; i++ ){
        if( i < 9 ) document.querySelector(`.l-${i}`).classList.add('unlock');
        if( i + 1  != level ) {
            document.querySelector(`.l-${i}`).classList.add('done');
        }

        if( i == 4 ) {
            document.querySelector(`.l-4`).src = './closed-chest.png';
        }
        
        if( i == 5 ) {
            document.querySelector(`.l-4`).src = './chest-open.svg';
        }
    }
}

unlock(lvl);


document.body.addEventListener('click', e=>{
    if( !e.target.classList.contains('lesson') ) {

        document.querySelectorAll('.arrow').forEach(elm=>{
            elm.remove();
        })
        document.querySelectorAll('.start-popup').forEach(elm=>{
            elm.remove();
        });

    }
})

document.querySelectorAll('.lesson').forEach(lesson=>{
    lesson.addEventListener('click', ()=>{
        document.querySelector('.popup').style = 'display: none;';
        let arrow = document.createElement('div');
        arrow.classList.add('arrow');
        let popup = document.createElement('div');
        popup.classList = 'start-popup';
        popup.innerHTML = `<h1>Start lesson</h1>`
        let startBTN = document.createElement('button');
        startBTN.innerText = `START +5 XP`

        startBTN.addEventListener('click', ()=>{
            startLesson(lesson.getAttribute('data-lvl'));
        })

        popup.append(startBTN);
        lesson.append(arrow);
        lesson.append(popup);

    })
})

const startLesson = (level)=>{

    if ( hartjes > 0 ) {

        let loading = document.createElement('section');
        loading.classList = 'loading-screen';
        loading.innerHTML = '<div></div>'
        document.body.append(loading);
        setTimeout(()=>{
            loading.remove();
        }, 5500)
        console.log(level);


        let question = document.createElement('section');
        question.classList = 'oefening';
        question.innerHTML = `<div class="top-bar">
                                <div class="close">✕</div>
                                <div class="progress"><div><div></div></div></div>
                                <div class="hearts nav-item"><img src="./heart.svg" alt="" class="heart">${hartjes}</div></div>
                            <h3>Translate this sentence</h3>

                            <div class="question">
                                <img src="./download.png" alt="" class="q${level} boy">
                                <div class="quest q${level}">${q[level]}<span class="quest">${tips[level]}</span></div>
                            </div>

                            <textarea placeholder="Type your answer in Dutch"></textarea>
                            <img class="tips" src="./tips_icon.png">

                            <div class="check pending empty">CHECK</div>
                            <div class="check-back empty"></div>`;
        
        document.body.append(question);
        question.querySelector('.close').addEventListener('click', ()=>{
            question.remove();
        })

        question.querySelector('textarea').addEventListener('keyup', ()=>{
            if( question.querySelector('textarea').value != "" ){
                question.querySelector('.check').classList.remove('empty');
                question.querySelector('.check-back').classList.remove('empty');
            } else {
                question.querySelector('.check').classList.add('empty');
                question.querySelector('.check-back').classList.add('empty');
            }
        })

        question.querySelector('.tips').addEventListener('click', ()=>{

            let tip = document.createElement('section');
            tip.classList = 'oefening';
            tip.innerHTML = `
            <div class="reward">
            <h1 class="blue">Weet je zeker dat je een tip wilt kopen?</h1>
            <h3>Iedere tip kost <span>50 gems</span>.</h3>
            </div>
            <div class="gems nav-item"><svg class="gem" width="24px" height="30px" viewBox="0 0 24 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="lingot" transform="translate(1.000000, 1.000000)" fill-rule="nonzero"><path d="M2.12,5.36 L8.595,1.452 C9.9891922,0.61047923 11.7348078,0.61047923 13.129,1.452 L19.604,5.359 C20.9201138,6.15339332 21.7243996,7.57872448 21.7240001,9.116 L21.7240001,18.782 C21.7240001,20.3189192 20.9198086,21.7437908 19.604,22.538 L13.129,26.445 C11.7348078,27.2865208 9.9891922,27.2865208 8.595,26.445 L2.12,22.538 C0.804191377,21.7437908 0,20.3189192 0,18.782 L0,9.116 C0,7.578 0.804,6.154 2.12,5.359 L2.12,5.36 Z" id="Path" stroke="#FFFFFF" stroke-width="2" fill="#1CB0F6"/><path d="M10.89,5.273 L10.89,8.438 C10.89,8.816 10.692,9.166 10.37,9.362 L7.422,11.145 C7.05578595,11.3664376 6.59336378,11.350749 6.243,11.105 L3.857,9.433 C3.55901568,9.22418286 3.38621247,8.87935269 3.39729469,8.51565441 C3.40837691,8.15195613 3.60185462,7.81828687 3.912,7.628 L9.245,4.352 C9.57820431,4.14746267 9.99593499,4.1389799 10.3371682,4.32982156 C10.6784014,4.52066323 10.8898476,4.88102607 10.89,5.272 L10.89,5.273 Z" id="Path" fill="#FFFFFF" opacity="0.793"/></g></g></svg><div class="gemcount">${gems}</div></div>
            <div class="annu">ANNULEREN</div>
            <div class="check blue">KOPEN -50 GEMS</div>
            <div class="check-back blue"></div>`;

            document.body.append(tip);

            tip.querySelector('.annu').addEventListener('click', ()=>{
                tip.remove();
            })

            tip.querySelector('.check').addEventListener('click', ()=>{
                gems-= 50;
                localStorage.setItem("gems", gems);
                document.querySelectorAll('.gemcount').forEach(counter=>{
                    counter.innerText = gems;
                })
                tip.querySelector('.check').remove();
                tip.querySelector('.annu').innerText = 'CONTINUE';
                tip.querySelector('.annu').classList = 'check blue';
                tip.querySelector('h1').innerText = "Hint gekocht!";
                tip.querySelector('h3').innerHTML = "Vraag aan <span> de geweldige Mark</span> wat de hint is.";
            })
        })

        question.querySelector('.check').addEventListener('click', ()=>{

            if( question.querySelector('.check').classList.contains('pending') ) {

                if ( question.querySelector('textarea').value.toLowerCase().includes(a[level].toLowerCase()) ) {

                    question.querySelector('.check').classList.add('correct')
                    question.querySelector('.check').classList.remove('pending')
                    question.querySelector('.check-back').classList.add('correct')
                    question.querySelector('.check').innerText = 'CONTINUE';
                    
                    question.querySelector('.boy').src = './download3.png';

                    let correct = document.createElement('div');
                    correct.classList = 'answer correct';
                    correct.innerHTML = `<div class="flex"><div class="correct-icon"><img src="./checkmark.svg" alt=""></div>Great job!</div>`
                    question.append(correct);  

                    
                    console.log(level, lvl);
                    if( level == lvl - 1 && lvl <= 4 ) {
                        lvl++;
                        localStorage.setItem('lvl', lvl);
                        unlock(lvl);
                    }
                    if( level == lvl - 2  && lvl >= 6 ) {
                        lvl++;
                        localStorage.setItem('lvl', lvl);
                        unlock(lvl);
                    }

                } else {

                    question.querySelector('.check').classList.add('incorrect')
                    question.querySelector('.check').classList.remove('pending')
                    question.querySelector('.check-back').classList.add('incorrect')
                    question.querySelector('.check').innerText = 'GOT IT';

                    question.querySelector('.boy').src = './download2.png';
        
                    hartjes--;
                    question.querySelector('.hearts').innerHTML = `<img src="./heart.svg" alt="" class="heart">${hartjes}`;
                    document.querySelector('.levens').innerHTML = hartjes;
                    
                    let incorrect = document.createElement('div');
                    incorrect.classList = 'answer';
                    incorrect.innerHTML = `<div class="flex"><div class="wrong-icon"><img src="./x.svg" alt=""></div>Incorrect</div><h4>Correct Answer:</h4><p>Zo makkelijk is het niet hè ;)</p>`
                    question.append(incorrect)    

                }

        
        } else if (level == 7 && question.querySelector('textarea').value.toLowerCase().includes(a[level].toLowerCase()) ){

            let tip = document.createElement('section');
            tip.classList = 'oefening';
            tip.innerHTML = `
            <div class="reward klaar">
            <img src="./streak.png" alt="" class="heart">
            <h1 class="streak">30 year streak!</h1>
            <h1 class="blue">Gefeliciteerd met je verjaardag allerlieste<br><3</h1>
            <h3>Van je cadeau gaan helaas nog een aantal punten af aangezien je niet al je gems behouden hebt.<br>100% ÷ ${gems} gems x mijn gulle hart = toch nog een flinke korting op je nieuwe telefoon!<br>Maar je zult toch zelf wat bij moeten leggen om meer dan een burnerphone te krijgen...</h3>
            </div>
            <div class="gems nav-item"><svg class="gem" width="24px" height="30px" viewBox="0 0 24 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="lingot" transform="translate(1.000000, 1.000000)" fill-rule="nonzero"><path d="M2.12,5.36 L8.595,1.452 C9.9891922,0.61047923 11.7348078,0.61047923 13.129,1.452 L19.604,5.359 C20.9201138,6.15339332 21.7243996,7.57872448 21.7240001,9.116 L21.7240001,18.782 C21.7240001,20.3189192 20.9198086,21.7437908 19.604,22.538 L13.129,26.445 C11.7348078,27.2865208 9.9891922,27.2865208 8.595,26.445 L2.12,22.538 C0.804191377,21.7437908 0,20.3189192 0,18.782 L0,9.116 C0,7.578 0.804,6.154 2.12,5.359 L2.12,5.36 Z" id="Path" stroke="#FFFFFF" stroke-width="2" fill="#1CB0F6"/><path d="M10.89,5.273 L10.89,8.438 C10.89,8.816 10.692,9.166 10.37,9.362 L7.422,11.145 C7.05578595,11.3664376 6.59336378,11.350749 6.243,11.105 L3.857,9.433 C3.55901568,9.22418286 3.38621247,8.87935269 3.39729469,8.51565441 C3.40837691,8.15195613 3.60185462,7.81828687 3.912,7.628 L9.245,4.352 C9.57820431,4.14746267 9.99593499,4.1389799 10.3371682,4.32982156 C10.6784014,4.52066323 10.8898476,4.88102607 10.89,5.272 L10.89,5.273 Z" id="Path" fill="#FFFFFF" opacity="0.793"/></g></g></svg><div class="gemcount">${gems}</div></div>
            <div class="check blue">KLAAR +1 TELEFOON</div>
            <div class="check-back blue"></div>`;

            document.body.append(tip);

            tip.querySelector('.check').addEventListener('click', ()=>{
                tip.remove();
                question.remove();
                document.querySelector('.streakcount').innerText = 30;
                localStorage.setItem('streak', 30);
            })

        } else {
            console.log(level)

            question.remove();

        }

    })

} else {

    let tip = document.createElement('section');
    tip.classList = 'oefening';
    tip.innerHTML = `
    <div class="reward">
    <img src="./heart.svg" alt="" class="heart">
    <h1 class="blue">Ohnee,<br> je hartjes zijn op! :(</h1>
    <h3>Voor <span>100 gems</span> kun je je hartjes weer vullen tot <span>5</span>.</h3>
    </div>
    <div class="gems nav-item"><svg class="gem" width="24px" height="30px" viewBox="0 0 24 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="lingot" transform="translate(1.000000, 1.000000)" fill-rule="nonzero"><path d="M2.12,5.36 L8.595,1.452 C9.9891922,0.61047923 11.7348078,0.61047923 13.129,1.452 L19.604,5.359 C20.9201138,6.15339332 21.7243996,7.57872448 21.7240001,9.116 L21.7240001,18.782 C21.7240001,20.3189192 20.9198086,21.7437908 19.604,22.538 L13.129,26.445 C11.7348078,27.2865208 9.9891922,27.2865208 8.595,26.445 L2.12,22.538 C0.804191377,21.7437908 0,20.3189192 0,18.782 L0,9.116 C0,7.578 0.804,6.154 2.12,5.359 L2.12,5.36 Z" id="Path" stroke="#FFFFFF" stroke-width="2" fill="#1CB0F6"/><path d="M10.89,5.273 L10.89,8.438 C10.89,8.816 10.692,9.166 10.37,9.362 L7.422,11.145 C7.05578595,11.3664376 6.59336378,11.350749 6.243,11.105 L3.857,9.433 C3.55901568,9.22418286 3.38621247,8.87935269 3.39729469,8.51565441 C3.40837691,8.15195613 3.60185462,7.81828687 3.912,7.628 L9.245,4.352 C9.57820431,4.14746267 9.99593499,4.1389799 10.3371682,4.32982156 C10.6784014,4.52066323 10.8898476,4.88102607 10.89,5.272 L10.89,5.273 Z" id="Path" fill="#FFFFFF" opacity="0.793"/></g></g></svg><div class="gemcount">${gems}</div></div>
    <div class="annu">ANNULEREN</div>
    <div class="check blue">KOPEN -100 GEMS</div>
    <div class="check-back blue"></div>`;

    document.body.append(tip);

    tip.querySelector('.annu').addEventListener('click', ()=>{
        tip.remove();
    })

    tip.querySelector('.check').addEventListener('click', ()=>{
        hartjes += 5;
        gems-= 100;
        localStorage.setItem("gems", gems);
        localStorage.setItem("hartjes", hartjes);
        document.querySelectorAll('.gemcount').forEach(counter=>{
            counter.innerText = gems;
        })

        document.querySelectorAll('.levens').forEach(counter=>{
            counter.innerText = hartjes;
        })
        tip.querySelector('.check').remove();
        tip.querySelector('.annu').innerText = 'CONTINUE';
        tip.querySelector('.annu').classList = 'check blue';
        tip.querySelector('h1').innerText = "Hartjes gekocht!";
        tip.querySelector('h3').innerHTML = "Je kunt nu weer verder spelen.";
    })

}

}

document.querySelector('.l-4').addEventListener('click', ()=>{
    // console.log('yes')
    if ( lvl >= 5 ){
        let question = document.createElement('section');
        question.classList = 'oefening';
        question.innerHTML = `
        <div class="reward">
        <h1 class="blue">+1 cadeau</h1>
        <img src="./Duolingo-chest.png">
        <h3>Je hebt je eerste cadeau verdient!</h3>
        <p>Kijk onder de bank. Dit cadeau is ook een <span>hint</span> naar het grote cadeau.</p>
        </div>
        <div class="check blue">CONTINUE</div>
        <div class="check-back blue"></div>`;
        
        document.body.append(question);
    
        question.querySelector('.check').addEventListener('click', ()=>{
            console.log(lvl);
            question.remove();
            if( lvl == 5 ){
                lvl++;
                unlock(lvl);
                localStorage.setItem("lvl", lvl);
            }
        })
    }


})

document.querySelector('.info').addEventListener('click', ()=>{
    // console.log('yes')
    let question = document.createElement('section');
    question.classList = 'oefening';
    question.innerHTML = `
    <div class="reward">
    <h1 class="blue">Welkom bij Hanneke's Kerstcadeau</h1>
    <h3>Iedere les is een stukje van de puzzel naar het <span>Grote kerstcadeau</span>. Weet jij bij de laatste vraag wat het cadeau is dan is deze voor jou!<br><br>Pas wel op want je hebt maar 5 hartjes. Meer hartjes kosten gems!</h3>
    </div>
    <div class="check blue">CONTINUE</div>
    <div class="check-back blue"></div>`;
    
    document.body.append(question);

    question.querySelector('.check').addEventListener('click', ()=>{
        question.remove();
    })

})



document.body.addEventListener('click', ()=>{
    document.body.requestFullscreen();
})

// window.addEventListener('resize', ()=>{
//     let vh = Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
//     document.body.style.height = vh + 'px';
//     document.querySelectorAll('.oefening').forEach(elm=>{
//         elm.style.height = vh + 'px';
//     })
// })
'use strict';

// Alle scener og svar
const scenesData = {

    // Scene 2: Svage passwords
    'tilScene2': {
        sceneId: 's2',
        title: 'Svage passwords',
        text: 'Hvilket af disse passwords er det svageste?',
    },
    'rigtigPw': {
        sceneId: 's2a',
        title: 'Rigtigt!',
        text: '"123456" er et af de mest brugte og farlige passwords. Derfor er dette og lignende passwords kæmpe No-Go!'
    },
    'forkertPw1': {
        sceneId: 's2b',
        title: 'Forkert',
        text: '"Kaffe!2023" er bedre end valgmulighed A, men det er stadig lidt for forudsigeligt.'
    },
    'forkertPw2': {
        sceneId: 's2c',
        title: 'Ikke helt',
        text: 'Dette password er faktisk et stærkt et! Måske misforstod du spørgsmålet?'
    },

    // Scene 3: Genbrug af passwords
    'tilScene3': {
        sceneId: 's3',
        title: 'Genbrug af passwords',
        text: 'Hvad er den største risiko ved at bruge det samme password til flere konti?'
    },
    'forkertGen1': {
        sceneId: 's3a',
        title: 'Jaaeh, men...',
        text: 'Det kan godt være, at det er nemmere at huske - men det er også farligt at genbruge passwords! Du ville vel heller ikke bruge den samme nøgle til din hoveddør som til din cykel, vel?'
    },
    'rigtigGen': {
        sceneId: 's3b',
        title: 'Jaa tak!',
        text: 'Den svarede du helt rigtigt på - godt gået! Et lækket password kan nemlig give adgang til hele dit digitale liv.'
    },
    'forkertGen2': {
        sceneId: 's3c',
        title: 'Ups!',
        text: 'Genbrug af passwords til flere konti har faktisk den helt modsatte effekt end at beskytte dine data - du risikerer nemlig at hackere kan få adgang til nogle enormt kritiske informationer om dig.'
    },

    // Scene 4: to-faktor-godkendelse
    'tilScene4': {
        sceneId: 's4',
        title: 'Brug af to-faktor godkendelse',
        text: 'Hvad gør to-faktor-godkendelse (2FA) mere sikkert?'
    },
    'forkertToFa1': {
        sceneId: 's4a',
        title: 'Øv!',
        text: '2FA handler ikke om reklamer - det handler om at sikre dine logins gennem 2 faktorer. F.eks. dit password OG en sms-kode.'
    },
    'rigtigToFa': {
        sceneId: 's4b',
        title: 'Du har den!',
        text: '2FA handler nemlig om at kombinere noget du ved med noget du har - f.eks. dit password og en sms-kode.'
    },
    'forkertToFa2': {
        sceneId: 's4c',
        title: 'Ikke helt!',
        text: '2FA øger sikkerheden, men det er stadig enormt vigtigt at vælge stærke passwords.'
    },

    // Scene 5: Gemte passwords i browseren
    'tilScene5': {
        sceneId: 's5',
        title: 'Gemte passwords i browseren',
        text: 'Din browser tilbyder at gemme dine passwords. Hvad bør du overveje?'
    },
    'forkertBrowser1': {
        sceneId: 's5a',
        title: 'Ikke helt korrekt',
        text: 'Browsere kan gemme passwords, men de er ikke altid lige sikre som en rigtig passwordmanager.'
    },
    'rigtigBrowser': {
        sceneId: 's5b',
        title: 'Yaay!',
        text: 'Det er nemlig helt rigtigt - Passwordmanagers er designet til sikker lagring og kryptering.'
    },
    'forkertBrowser2': {
        sceneId: 's5c',
        title: 'Umuligt',
        text: 'Det er virkelig svært at huske sine unikke, stærke passwords uden hjælp - det handler om at gemme dem sikkert.'
    },

    // Scene 6: Brug af passwordmanager
    'tilScene6': {
        sceneId: 's6',
        title: 'Brug af en passwordmanager',
        text: 'Hvad er en god grund til at bruge en passwordmanager?'
    },
    'forkertPwMa1': {
        sceneId: 's6a',
        title: 'Faktisk lige modsat!',
        text: 'En passwordmanager hjælper dig faktisk med netop ikke(!!) at bruge det samme password overalt.'
    },
    'rigtigPwMa': {
        sceneId: 's6b',
        title: 'Yeees!',
        text: 'Du har helt ret! En passwordmanager gør det nemt at have unikke, stærke og dermed sikre passwords.'
    },
    'forkertPwMa2': {
        sceneId: 's6c',
        title: 'Ups!',
        text: 'Det er ikke rigtigt - din passwordmanager kan ikke dele dine koder med andre uden din tilladelse fra et kendt device.'
    },

    // Scene 7: Afslutning
    'tilScene7': {
        sceneId: 's7',
        title: 'Tak for din deltagelse!',
    }
};

//Variabler
let score = 0; //Tæller scoren for hvert svar
let errorCount = 0; //Tæller antal fejl undervejs

// Vælg knapper og scener
const btns = document.querySelectorAll('button');
const scenes = document.querySelectorAll('[id^=s]');

// Check-answer funktion
const checkAnswer = (e) => {

    //Oprydning
    scenes.forEach(scene => scene.style.display = 'none');

    //Opdækning, find scene-objekt baseret på knap-id
    const data = scenesData[e.target.id];
    if (data) {
        const scene = document.querySelector(`#${data.sceneId}`);
        if (scene === 's1') {
            const nu = new Date();
            localStorage.setItem('startTid', nu);
        }
/*         if (scene === 's7') {
            const nu = new Date();
            const da = localStorage.getItem('startTid');
            const paragraf = scene.getElementById('slutTid');
            paragraf.innerText = 'hurra';
        } */
        scene.style.display = 'flex';

        const heading = scene.querySelector('h2');
        const text = scene.querySelector('p');
        if (heading) heading.innerText = data.title;
        let tekst = data.text;
        
        //Tjekker om svaret er korrekt
        const isCorrect = e.target.classList.contains('korrekt');
        const isWrong = e.target.classList.contains('forkert1') || e.target.classList.contains('forkert2');

        //Feedback baseret på antal fejl
        if (isWrong) {
            errorCount++;
        
            switch (errorCount) {
                case 1:
                    tekst = 'Okay første fejl - du har den fra nu af! ' + tekst;
                    break;
                case 2:
                    tekst = 'Du har nu lavet 2 fejl - prøv lidt hårdere! ' + tekst;
                    break;
                case 3:
                    tekst = '3. fejl - lad dem blive de sidste! Er du sikker at du har læst spørgsmålene OG svarene nøje? ' + tekst;
                    break;
                case 4:
                    tekst = 'Du er lidt på et skråplan mht. fejl - gør dig umage med denne her! ' + tekst;
                    break;
                case 5:
                    tekst = 'Du har fået for mange fejl by now - hvis du har mod på det, så prøv igen helt forfra! Vi tager lige en sidste - du får hep din retning! ' + tekst;
                    break;
            }  
            }
            text.innerText = tekst;  
        }
    };

// Tilføj eventListeners til knapper
btns.forEach(btn => btn.addEventListener('click', checkAnswer));
document.getElementById('tilScene7').addEventListener('click', () => {
    visValgOversigt();
})

// Vis scene 1 som det første
document.addEventListener('DOMContentLoaded', () => {
    scenes.forEach(scene => scene.style.display = 'none');
    document.querySelector('#s1').style.display = 'flex';
    }
);
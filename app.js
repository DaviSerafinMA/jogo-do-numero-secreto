let limite = 10;
let nsortedos = [];
let nsecreto = rng();  
let tentativas = 1;

function exibirTextonatela (tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
//    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2})
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextonatela('h1','Jogo do número secreto');
    exibirTextonatela('p','Tente advinhar o número, de 1 a 10');
}
exibirMensagemInicial();

function chutarClick(){
    let chute = document.querySelector('input').value
    if(chute==nsecreto){
        exibirTextonatela('h1','Parabéns!');
        let wordtentativa = tentativas > 1? ' tentativas' : ' tentativa';
        let mensagemtentativas = `Você descobriu o número secreto em ` + tentativas + wordtentativa;
        exibirTextonatela('p',mensagemtentativas);
        console.log('Usuario venceu!');
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute>nsecreto){
            exibirTextonatela('p','O número secreto é menor');
            console.log('Usuario errou');
        }else{
            exibirTextonatela('p','O número secreto é maior');
            console.log('Usuario errou');
        }
    tentativas++;
    limparCampo();
    }

}

function rng() {
    let nescolhido = parseInt(Math.random()*limite+1);
    let quantidadeNsorteados = nsortedos.length;

    if(quantidadeNsorteados == limite){
        nsortedos = [];
    }

    if(nsortedos.includes(nescolhido)) {
        return rng();
    } else{
        nsortedos.push(nescolhido);
        console.log(nsortedos);
        return nescolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute = '';
}

function reiniciarClick() {
    nsecreto = rng();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true)
}
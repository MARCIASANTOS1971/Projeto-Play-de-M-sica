/*   JSON -> JavaScript Object Notation -> Formato de representação o JS

var json = '{"nome": "Marcia", "idade":50, "Profissão":"Advogada"}';
var dados = JSON.parse(json); // convertendo JSON para string  -> processamento

console.log(dados.nome);
console.log(dados.Idade); // saída
console.log(dados.Profissão);

*/

let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let usuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let validUsuario = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let repitsenha = document.querySelector('#repitsenha');
let labelRepitsenha = document.querySelector('#labelRepitsenha');
let validRepitsenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');


nome.addEventListener('keyup', () => {

    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
        nome.setAttribute('style', 'border-color: red');
        validNome = false;
    } else {
        labelNome.setAttribute('style', 'color: green');
        labelNome.innerHTML = 'Nome';
        nome.setAttribute('style', 'border-color: green');
        validNome = true;
    }


});


usuario.addEventListener('keyup', () => {

    if (usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color: red');
        labelUsuario.innerHTML = 'Usuario *Insira no mínimo 5 caracteres';
        usuario.setAttribute('style', 'border-color: red');
        validUsuario = false;
    } else {
        labelUsuario.setAttribute('style', 'color: green');
        labelUsuario.innerHTML = 'Usuario';
        usuario.setAttribute('style', 'border-color: green');
        validUsuario = true;
    }
});
senha.addEventListener('keyup', () => {

    if (senha.value.length <= 5) {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
        senha.setAttribute('style', 'border-color: red');
        validSenha = false;
    } else {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha';
        senha.setAttribute('style', 'border-color: green');
        validSenha = true;
    }
});

repitsenha.addEventListener('keyup', () => {

    if (senha.value !== repitsenha.value) {
        labelRepitsenha.setAttribute('style', 'color: red');
        labelRepitsenha.innerHTML = 'Confirma Senha *As senhas não conferem';
        repitsenha.setAttribute('style', 'border-color: red');

    } else {
        labelRepitsenha.setAttribute('style', 'color: green');
        labelRepitsenha.innerHTML = 'Confirma Senha';
        repitsenha.setAttribute('style', 'border-color: green');
        validRepitsenha = true;
    }
});

function cadastrar() {
    if (validNome & validUsuario & validSenha & validRepitsenha) {
        //pega os valores do formulario de cadastro e cria um objeto 
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
        listaUser.push(
                {
                    nome: nome.value,
                    userCad: usuario.value,
                    senhaCad: senha.value

                }
        );
        // converte para objeto string
        localStorage.setItem('listaUser', JSON.stringify(listaUser)); // cria um string

        msgSuccess.setAttribute('style', 'display:block');//retiro o background
        msgSuccess.innerHTML = '<strong> Cadastrando usuário...</strong>';//inserir a mensagem
        msgError.setAttribute('style', 'display:none');//retira o  estilo da mensagem de erro
        msgError.innerHTML = '';//retira a mensagem de erro
        setTimeout(() => {//atrasa o redirecionamento em 4 seg
            window.location.href = 'http://127.0.0.1:5500/Aula-JavaScript-20-Player-inicio/public/index.html';
        }, 4000);


        
    } else {
        msgError.setAttribute('style', 'display:block');
        msgError.innerHTML = '<strong>Prencha todos os campos</strong>';
        msgSuccess.setAttribute('style', 'display:none');

       
    }


}

//funcão autenticar o usuario cadastrado
function entrar() {
    let usuario = document.querySelector('#usuario');
    let userLabel = document.querySelector('#userLabel');

    let senha = document.querySelector('#senha');
    let senhaLabel = document.querySelector('#senhaLabel');

    let msgError = document.querySelector('#msgError');
    let listaUser = [];

//    let userValid = {
//        nome: '',
//        user: '',
//        senha: ''
//    };

    listaUser = JSON.parse(localStorage.getItem('listaUser'));

    listaUser.forEach((item) => {
        if (usuario.value === item.userCad && senha.value === item.senhaCad) {

            userValid = {
                nome: item.nomeCad,
                user: item.userCad,
                senha: item.senhaCad
            };
        }
    });

    if (usuario.value === userValid.user && senha.value === userValid.senha) {
        window.location.href = 'http://127.0.0.1:5500/Aula-JavaScript-20-Player-inicio/public/inicio/index.html';
        //gerar um token para autenticar o usuario
        let mathRandom = Math.random().toString(16).substr(2);
        let token = mathRandom + mathRandom;
        //console.log(token);
        localStorage.setItem('token', token);
        localStorage.setItem('userLogado', JSON.stringify(userValid));
    } else {
        userLabel.setAttribute('style', 'color: red');
        usuario.setAttribute('style', 'border-color: red');
        senhaLabel.setAttribute('style', 'color: red');
        senha.setAttribute('style', 'border-color: red');
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = 'Usuário ou senha incorretos';
        usuario.focus();
    }

}


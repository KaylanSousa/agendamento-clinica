
const hoje=new Date().toISOString().split("T")[0];
document.getElementById("data").setAttribute("min",hoje);

function mascaraTelefone(campo){

let valor=campo.value.replace(/\D/g,"");

if(valor.length>10){
valor=valor.replace(/^(\d{2})(\d{5})(\d{4}).*/,"($1) $2-$3");
}else{
valor=valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/,"($1) $2-$3");
}

campo.value=valor;
}

function mascaraCPF(campo){

let valor=campo.value.replace(/\D/g,"");

valor=valor.replace(/(\d{3})(\d)/,"$1.$2");
valor=valor.replace(/(\d{3})(\d)/,"$1.$2");
valor=valor.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

campo.value=valor;

}

function validarCPF(cpf){

cpf=cpf.replace(/\D/g,"");

if(cpf.length!==11||/^(\d)\1+$/.test(cpf)) return false;

let soma=0;
let resto;

for(let i=1;i<=9;i++)
soma=soma+parseInt(cpf.substring(i-1,i))*(11-i);

resto=(soma*10)%11;

if(resto===10||resto===11) resto=0;
if(resto!==parseInt(cpf.substring(9,10))) return false;

soma=0;

for(let i=1;i<=10;i++)
soma=soma+parseInt(cpf.substring(i-1,i))*(12-i);

resto=(soma*10)%11;

if(resto===10||resto===11) resto=0;

if(resto!==parseInt(cpf.substring(10,11))) return false;

return true;

}

function enviarWhatsApp(){

var cpf=document.getElementById("cpf").value;
var erroCPF=document.getElementById("erroCPF");

if(!validarCPF(cpf)){
erroCPF.style.display="block";
return;
}else{
erroCPF.style.display="none";
}

var dataSelecionada=document.getElementById("data").value;
var erro=document.getElementById("erroData");

var dataObj=new Date(dataSelecionada);
var hojeObj=new Date();

hojeObj.setHours(0,0,0,0);

if(!dataSelecionada||dataObj<hojeObj||dataObj.getDay()===0){
erro.style.display="block";
return;
}else{
erro.style.display="none";
}

var nome=document.getElementById("nome").value;
var telefone=document.getElementById("telefone").value;
var protocolo=document.getElementById("protocolo").value;
var hora=document.getElementById("hora").value;
var obs=document.getElementById("obs").value;

var mensagem=`✨ Novo Agendamento

Nome: ${nome}
Telefone: ${telefone}
CPF: ${cpf}
Protocolo: ${protocolo}
Data: ${dataSelecionada}
Horário: ${hora}
Observações: ${obs}`;

var numeroClinica="5599981566923";

document.getElementById("formContainer").style.display="none";
document.getElementById("successMessage").style.display="block";
document.getElementById("loader").style.display="block";

setTimeout(function(){

var url="https://wa.me/"+numeroClinica+"?text="+encodeURIComponent(mensagem);

window.location.href=url;

},2000);

}


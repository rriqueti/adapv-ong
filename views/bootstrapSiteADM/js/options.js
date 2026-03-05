// Mudar de div quando apertar o botão
const botaoGeral = document.getElementById('botao-geral');
const botaoFoto = document.getElementById('botao-foto');
const botaoExtra = document.getElementById('botao-extra');

const opcaoGeral = document.getElementById('opcao-geral');
const opcaoFoto = document.getElementById('opcao-foto');
const opcaoExtra = document.getElementById('opcao-extra');

botaoGeral.addEventListener('click', () => {
    opcaoGeral.style.display = 'flex';
    opcaoFoto.style.display = 'none';
    opcaoExtra.style.display = 'none';
    botaoGeral.classList.add('ativo');
    botaoFoto.classList.remove('ativo');
    botaoExtra.classList.remove('ativo');
});

botaoFoto.addEventListener('click', () => {
    opcaoGeral.style.display = 'none';
    opcaoFoto.style.display = 'flex';
    opcaoExtra.style.display = 'none';
    botaoGeral.classList.remove('ativo');
    botaoFoto.classList.add('ativo');
    botaoExtra.classList.remove('ativo');
});

botaoExtra.addEventListener('click', () => {
    opcaoGeral.style.display = 'none';
    opcaoFoto.style.display = 'none';
    opcaoExtra.style.display = 'flex';
    botaoGeral.classList.remove('ativo');
    botaoFoto.classList.remove('ativo');
    botaoExtra.classList.add('ativo');
});

// Atualizar o subtitulo Nome quando inserir um nome no input
const nomeInput = document.getElementById('nome');
const subtituloNome = document.querySelector('.subtitulo-nome h5 b');

nomeInput.addEventListener('input', function() {
  if (nomeInput.value.trim() === '') {
    subtituloNome.textContent = 'Nome';
  } else {
    subtituloNome.textContent = nomeInput.value;
  }
});

if (nomeInput.value.trim() === '') {
  subtituloNome.textContent = 'Nome';
}

// Mudar estilo botão favorito
function botaoFavorito(button) {
  var favoritoButton = button;
  var favoritoIcon = favoritoButton.querySelector('iconify-icon');
  var iconAtual = favoritoIcon.getAttribute('icon');

  if (iconAtual === 'bi:star') {
    favoritoIcon.setAttribute('icon', 'bi:star-fill');
    favoritoIcon.style.color = 'rgb(255, 230, 0)';
    favoritoButton.style.backgroundColor = 'var(--paleta-cinza)';
  } else {
    favoritoIcon.setAttribute('icon', 'bi:star');
    favoritoIcon.style.color = '';
    favoritoButton.style.backgroundColor = '';
  }
}


// // Mudar as opções pelo select contato
// var layouts = {
//   'celular': document.getElementById('celular').cloneNode(true),
//   'email': document.getElementById('email').cloneNode(true),
//   'residencial': document.getElementById('residencial').cloneNode(true)
// };

// function selecionarOpcao(valor) {
//   var container = document.querySelector('.quebra-volun-contato');
  
//   // Remover o layout atual
//   while (container.firstChild) {
//     container.removeChild(container.firstChild);
//   }

//   // Inserir o novo layout
//   container.appendChild(layouts[valor]);
// }

//! //////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ !\\
// document.addEventListener('DOMContentLoaded', function () {
//   // Duplicar as divs quando apertar o botão adicionar
//   var adicionarButton = document.getElementById('adicionar-button');

//   adicionarButton.addEventListener('click', function () {
//     var quebraVolunContato = document.querySelector('.quebra-volun-contato');
//     var clonedQuebraVolunContato = quebraVolunContato.cloneNode(true);

//     // Limpa os campos clonados (se desejar)
//     var inputFields = clonedQuebraVolunContato.querySelectorAll('input');
//     var selectFields = clonedQuebraVolunContato.querySelectorAll('select');

//     inputFields.forEach(function (input) {
//       input.value = ''; // Limpa o valor do campo
//     });

//     selectFields.forEach(function (select) {
//       select.value = select.querySelector('option').value; // Define o valor do primeiro item
//     });

//     // Insere o clone logo após o original
//     quebraVolunContato.parentNode.insertBefore(clonedQuebraVolunContato, quebraVolunContato.nextSibling);

//     // Adiciona evento de clique para o botão "Excluir" no clone
//     var excluirButton = clonedQuebraVolunContato.querySelector('#excluir-button');

//     excluirButton.addEventListener('click', function () {
//       clonedQuebraVolunContato.remove(); // Remove o clone quando o botão "Excluir" é clicado
//     });

//     // Adiciona evento de clique para o botão "Favorito" no clone
//     var favoritoButton = clonedQuebraVolunContato.querySelector('#favorito-button');

//     favoritoButton.addEventListener('click', function () {
//       botaoFavorito(favoritoButton);
//     });

//     // Adiciona evento de alteração do select no clone
//     var selectContato = clonedQuebraVolunContato.querySelector('#contatos');
//     selectContato.addEventListener('change', function () {
//       selecionarOpcao(selectContato.value, clonedQuebraVolunContato);
//     });
//   });
// });
// ! ENTENDER COMO CLONAR ELEMENTOS
// ! Dificuldade =>
// ! Quando um elemento é clonado várias vezes com comandos JS aplicado em botões, inputs, select, etc e ele é usado/ativado apenas o elemento original ou primeiro elemento é alterado
// ! Por exemplo, quero clonar um elemento como área de contato. Quero adicionar mais de um telefone logo eu duplico todas as características das opções anteriores, quando eu vou utilizar algum botão que existe js aplicado ele apenas aplica ao elemento original.
// ! (Adicionar telefone 1 +), (Adicionar telefone 2 +), quando vou apertar no botão mais "+" para adicionar o "Adicionar telefone 3", ele só funciona se eu apertar no "Adicionar telefone 1", o botão do 2 é inutilizável.

window.onload = function() {
  document.getElementById("botaofile").addEventListener("click", function() {
      document.getElementById("inputfile").click();
  });

  document.getElementById("inputfile").addEventListener("change", function() {
      var file = this.files[0];
      if (file) {
          var reader = new FileReader();
          reader.onload = function(event) {
              document.getElementById("preview").src = event.target.result;
              document.getElementById("preview").style.display = "block";
          };
          reader.readAsDataURL(file);
      }
  });
};

document.getElementById('doado').addEventListener('change', function() {
  // Esconde todas as divs
  var divs = document.querySelectorAll('.dinheiro, .racao, .remedio');
  divs.forEach(function(div) {
      div.style.display = 'none';
  });

  // Mostra a div correspondente à seleção
  var selectedValue = this.value;
  if(selectedValue !== 'selecione') {
      var selectedDiv = document.querySelector('.' + selectedValue);
      if(selectedDiv) {
          selectedDiv.style.display = 'block';
      }
  }
});
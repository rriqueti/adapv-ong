var adocoes = []; // Array para armazenar os dados de adoções

function camposValidosAdocao() {
    let vNomeAdotante = document.querySelector('#nome').value;
    let vNomeAnimal = document.querySelector('#selectanimais').selectedOptions;
    let vCPF = document.querySelector('#campoCPF').value;
    let vRG = document.querySelector('#campoRG').value;
    let vNascimento = document.querySelector('#campoData').value;
    let vNacionalidade = document.querySelector('#nacionalidade').value;
    let vGenero = document.querySelector('#genero').value;
    let vContato = document.querySelector('#campoCel').value;
    let vRua = document.querySelector('#campoRua').value;
    let vNum = document.querySelector('#campoNum').value;
    let vBairro = document.querySelector('#bairro').value;
    let vCidade = document.querySelector('#cidade').value;
    let vEstado = document.querySelector('#estado').value;
    let vCEP = document.querySelector('#campoCEP').value;

    let isValid = true;

    // Validação do Nome do Adotante
    if (!vNomeAdotante) {
        document.getElementById("erroNome").textContent = "É necessário informar o Nome do Adotante.";
        document.getElementById("nome").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNome").textContent = "";
        document.getElementById("nome").style.border = "1px solid black";
    }

    // Validação do Nome do Animal
    if (vNomeAnimal.length === 0) {
        document.getElementById("erroNomeAnimal").textContent = "É necessário selecionar pelo menos um Animal.";
        document.getElementById("selectanimais").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNomeAnimal").textContent = "";
        document.getElementById("selectanimais").style.border = "1px solid black";
    }

    // Validação do CPF
    if (!vCPF) {
        document.getElementById("erroCPF").textContent = "É necessário informar o CPF.";
        document.getElementById("campoCPF").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCPF").textContent = "";
        document.getElementById("campoCPF").style.border = "1px solid black";
    }

    // Validação do RG
    if (!vRG) {
        document.getElementById("erroRG").textContent = "É necessário informar o RG.";
        document.getElementById("campoRG").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroRG").textContent = "";
        document.getElementById("campoRG").style.border = "1px solid black";
    }
    // Validação da Data de Nascimento
    if (!vNascimento) {
        document.getElementById("erroData").textContent = "É necessário informar a Data de Nascimento.";
        document.getElementById("campoData").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroData").textContent = "";
        document.getElementById("campoData").style.border = "1px solid black";
    }

    // Validação da Nacionalidade
    if (vNacionalidade === "selecione") {
        document.getElementById("erroNacionalidade").textContent = "É necessário selecionar a Nacionalidade.";
        document.getElementById("nacionalidade").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNacionalidade").textContent = "";
        document.getElementById("nacionalidade").style.border = "1px solid black";
    }

    // Validação do Gênero
    if (vGenero === "selecione") {
        document.getElementById("erroGenero").textContent = "É necessário selecionar o Gênero.";
        document.getElementById("genero").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroGenero").textContent = "";
        document.getElementById("genero").style.border = "1px solid black";
    }

    // Validação do Contato (Celular)
    if (!vContato) {
        document.getElementById("erroContato").textContent = "É necessário informar um número de Contato.";
        document.getElementById("campoCel").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroContato").textContent = "";
        document.getElementById("campoCel").style.border = "1px solid black";
    }

    // Validação do Endereço (Rua, Número, Bairro, Cidade, Estado, CEP)
    if (!vRua) {
        document.getElementById("erroRua").textContent = "É necessário informar a Rua.";
        document.getElementById("campoRua").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroRua").textContent = "";
        document.getElementById("campoRua").style.border = "1px solid black";
    }

    if (!vNum) {
        document.getElementById("erroNum").textContent = "É necessário informar o Número.";
        document.getElementById("campoNum").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNum").textContent = "";
        document.getElementById("campoNum").style.border = "1px solid black";
    }

    if (!vBairro) {
        document.getElementById("erroBairro").textContent = "É necessário informar o Bairro.";
        document.getElementById("bairro").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroBairro").textContent = "";
        document.getElementById("bairro").style.border = "1px solid black";
    }

    if (vCidade === "selecione") {
        document.getElementById("erroCidade").textContent = "É necessário informar a Cidade.";
        document.getElementById("cidade").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCidade").textContent = "";
        document.getElementById("cidade").style.border = "1px solid black";
    }

    if (vEstado === "selecione") {
        document.getElementById("erroEstado").textContent = "É necessário selecionar o Estado.";
        document.getElementById("estado").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroEstado").textContent = "";
        document.getElementById("estado").style.border = "1px solid black";
    }

    if (!vCEP) {
        document.getElementById("erroCEP").textContent = "É necessário informar o CEP.";
        document.getElementById("campoCEP").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCEP").textContent = "";
        document.getElementById("campoCEP").style.border = "1px solid black";
    }
    return isValid;
}

function adicionarAdocao() {
    if (!camposValidosAdocao()) {
        return;
    }
    let vNomeAdotante = document.querySelector('#nome').value;
    let vNomeAnimal = Array.from(document.querySelector('#selectanimais').selectedOptions, option => option.value);
    let vCPF = document.querySelector('#campoCPF').value;
    let vRG = document.querySelector('#campoRG').value;
    let vNascimento = document.querySelector('#campoData').value;
    let vNacionalidade = document.querySelector('#nacionalidade').value;
    let vGenero = document.querySelector('#genero').value;
    let vContato = document.querySelector('#campoCel').value;
    let vRua = document.querySelector('#campoRua').value;
    let vNum = document.querySelector('#campoNum').value;
    let vBairro = document.querySelector('#bairro').value;
    let vCidade = document.querySelector('#cidade').value;
    let vEstado = document.querySelector('#estado').value;
    let vCEP = document.querySelector('#campoCEP').value;
    adocoes.push({ nomeAdotante: vNomeAdotante, nomeAnimal: vNomeAnimal, CPF: vCPF, RG: vRG, nascimento: vNascimento, nacionalidade: vNacionalidade, genero: vGenero, contato: vContato, endereco: { rua: vRua, numero: vNum, bairro: vBairro, cidade: vCidade, estado: vEstado, cep: vCEP } });

    atualizarTabelaAdocoes();
}

function atualizarTabelaAdocoes() {
    let tab = document.querySelector('#tabela');
    let html = `<tr>
                    <th>Nome Adotante</th>
                    <th>Nome Animal</th>
                    <th>CPF</th>
                    <th>RG</th>
                    <th>Data de Nascimento</th>
                    <th>Nacionalidade</th>
                    <th>Gênero</th>
                    <th>Contato</th>
                    <th>Endereço</th>
                </tr>`;

    for (let adocao of adocoes) {
        let endereco = `${adocao.endereco.rua}, ${adocao.endereco.numero} - ${adocao.endereco.bairro}, ${adocao.endereco.cidade} - ${adocao.endereco.estado}, CEP: ${adocao.endereco.cep}`;
        
        html += `<tr>
                    <td>${adocao.nomeAdotante}</td>
                    <td>${adocao.nomeAnimal.join(", ")}</td>
                    <td>${adocao.CPF}</td>
                    <td>${adocao.RG}</td>
                    <td>${adocao.nascimento}</td>
                    <td>${adocao.nacionalidade}</td>
                    <td>${adocao.genero}</td>
                    <td>${adocao.contato}</td>
                    <td>${endereco}</td>
                </tr>`;
    }

    tab.innerHTML = html;
}

atualizarTabelaAdocoes();
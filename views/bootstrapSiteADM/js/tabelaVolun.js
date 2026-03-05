var voluntarios = []; // Array para armazenar os dados dos voluntários

function camposValidosVoluntario() {
    let vTipoPessoa = document.querySelector('#tipopessoa').value;
    let vNomeCompleto = document.querySelector('#nome').value;
    let vCPF = document.querySelector('#campoCPF').value;
    let vRG = document.querySelector('#campoRG').value;
    let vDataNascimento = document.querySelector('#campoData').value;
    let vNacionalidade = document.querySelector('#nacionalidade').value;
    let vGenero = document.querySelector('#genero').value;
    let vContato = document.querySelector('#campoCel').value;

    let isValid = true;

    // Validação dos campos
    if (!vNomeCompleto) {
        document.getElementById("erroNome").textContent = "É necessário informar o Nome Completo.";
        document.getElementById("nome").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNome").textContent = "";
        document.getElementById("nome").style.border = "1px solid black";
    }

    if (!vCPF) {
        document.getElementById("erroCPF").textContent = "É necessário informar um CPF válido.";
        document.getElementById("campoCPF").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCPF").textContent = "";
        document.getElementById("campoCPF").style.border = "1px solid black";
    }

    if (vTipoPessoa === "selecione" || vNacionalidade === "selecione" || vGenero === "selecione") {
        document.getElementById("tipopessoa").style.border = vTipoPessoa === "selecione" ? "2px solid red" : "1px solid black";
        document.getElementById("nacionalidade").style.border = vNacionalidade === "selecione" ? "2px solid red" : "1px solid black";
        document.getElementById("genero").style.border = vGenero === "selecione" ? "2px solid red" : "1px solid black";
        document.getElementById("erroTipoPessoa").textContent = vTipoPessoa === "selecione" ? "É necessário selecionar o Tipo." : "";
        document.getElementById("erroNacionalidade").textContent = vNacionalidade === "selecione" ? "É necessário selecionar a Nacionalidade." : "";
        document.getElementById("erroGenero").textContent = vGenero === "selecione" ? "É necessário selecionar o Gênero." : "";
        isValid = false;
    }

    if (!vDataNascimento) {
        document.getElementById("erroData").textContent = "É necessário informar a Data de Nascimento.";
        document.getElementById("campoData").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroData").textContent = "";
        document.getElementById("campoData").style.border = "1px solid black";
    }

    if (!vContato) {
        document.getElementById("erroContato").textContent = "É necessário informar um Contato.";
        document.getElementById("campoCel").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroContato").textContent = "";
        document.getElementById("campoCel").style.border = "1px solid black";
    }

    if(!vRG){
        document.getElementById("erroRG").textContent = "É necessário informar um RG válido";
        document.getElementById("campoRG").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroRG").textContent = "";
        document.getElementById("campoRG").style.border = "1px solid black";
    }

    return isValid;
}

function adicionarVoluntario() {
    if (!camposValidosVoluntario()) {
        return;
    }

    // Obter valores dos campos
    let vTipoPessoa = document.querySelector('#tipopessoa').value;
    let vNomeCompleto = document.querySelector('#nome').value;
    let vCPF = document.querySelector('#campoCPF').value;
    let vRG = document.querySelector('#campoRG').value || '';
    let vDataNascimento = document.querySelector('#campoData').value;
    let vNacionalidade = document.querySelector('#nacionalidade').value;
    let vGenero = document.querySelector('#genero').value;
    let vContato = document.querySelector('#campoCel').value;

    // Adicionar voluntário ao array
    voluntarios.push({ tipoPessoa: vTipoPessoa, nomeCompleto: vNomeCompleto, cpf: vCPF, rg: vRG, dataNascimento: vDataNascimento, nacionalidade: vNacionalidade, genero: vGenero, contato: vContato });

    // Adicionar linha à tabela
    let htmlLinha = `<tr>
                        <td>${vTipoPessoa}</td>
                        <td>${vNomeCompleto}</td>
                        <td>${vCPF}</td>
                        <td>${vRG}</td>
                        <td>${vDataNascimento}</td>
                        <td>${vNacionalidade}</td>
                        <td>${vGenero}</td>
                        <td>${vContato}</td>
                    </tr>`;
    let tab = document.querySelector('#tabela');
    tab.innerHTML += htmlLinha;
}

function carregaTabelaVoluntarios(dados) {
    let tab = document.querySelector('#tabela');
    let html = `<tr>
                    <th>Tipo</th> <th>Nome Completo</th> <th>CPF</th> <th>RG</th> <th>Data Nasc.</th> <th>Nacionalidade</th> <th>Gênero</th> <th>Contato</th>
                </tr>`;
    for (let voluntario of dados) {
        html += `<tr>
                    <td>${voluntario.tipoPessoa}</td>
                    <td>${voluntario.nomeCompleto}</td>
                    <td>${voluntario.cpf}</td>
                    <td>${voluntario.rg}</td>
                    <td>${voluntario.dataNascimento}</td>
                    <td>${voluntario.nacionalidade}</td>
                    <td>${voluntario.genero}</td>
                    <td>${voluntario.contato}</td>
                 </tr>`;
    }
    tab.innerHTML = html;
}

carregaTabelaVoluntarios(voluntarios);

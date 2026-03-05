var empresas = []; // Array para armazenar os dados das empresas

function camposValidosEmpresa() {
    let isValid = true;

    // Validação do Nome da Empresa
    let vNome = document.querySelector('#nome').value;
    if (!vNome) {
        document.getElementById("erroNome").textContent = "É necessário informar o Nome da Empresa.";
        document.getElementById("nome").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNome").textContent = "";
        document.getElementById("nome").style.border = "1px solid black";
    }

    // Validação do CNPJ
    let vCNPJ = document.querySelector('#CNPJ').value;
    if (!vCNPJ) {
        document.getElementById("erroCNPJ").textContent = "É necessário informar o CNPJ.";
        document.getElementById("CNPJ").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCNPJ").textContent = "";
        document.getElementById("CNPJ").style.border = "1px solid black";
    }

    // Validação do CEP
    let vCEP = document.querySelector('#campoCEP').value;
    if (!vCEP) {
        document.getElementById("erroCEP").textContent = "É necessário informar o CEP.";
        document.getElementById("campoCEP").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCEP").textContent = "";
        document.getElementById("campoCEP").style.border = "1px solid black";
    }

    // Validação da Rua
    let vRua = document.querySelector('#campoRua').value;
    if (!vRua) {
        document.getElementById("erroRua").textContent = "É necessário informar a Rua.";
        document.getElementById("campoRua").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroRua").textContent = "";
        document.getElementById("campoRua").style.border = "1px solid black";
    }

    // Validação do Bairro
    let vBairro = document.querySelector('#bairro').value;
    if (!vBairro) {
        document.getElementById("erroBairro").textContent = "É necessário informar o Bairro.";
        document.getElementById("bairro").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroBairro").textContent = "";
        document.getElementById("bairro").style.border = "1px solid black";
    }

    // Validação do Número
    let vNumero = document.querySelector('#campoNum').value;
    if (!vNumero) {
        document.getElementById("erroNum").textContent = "É necessário informar o Número.";
        document.getElementById("campoNum").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNum").textContent = "";
        document.getElementById("campoNum").style.border = "1px solid black";
    }

    // Validação da Cidade
    let vCidade = document.querySelector('#cidades').value;
    if (vCidade === "selecione") {
        document.getElementById("erroCidades").textContent = "É necessário selecionar a Cidade.";
        document.getElementById("cidades").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCidades").textContent = "";
        document.getElementById("cidades").style.border = "1px solid black";
    }

    // Validação do Estado
    let vEstado = document.querySelector('#estado').value;
    if (vEstado === "selecione") {
        document.getElementById("erroEstado").textContent = "É necessário selecionar o Estado.";
        document.getElementById("estado").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroEstado").textContent = "";
        document.getElementById("estado").style.border = "1px solid black";
    }

    // Validação do Celular (apenas validação, não incluído na tabela)
    let vCelular = document.querySelector('#campoCel').value;
    if (!vCelular) {
        document.getElementById("erroCel").textContent = "É necessário informar o Celular.";
        document.getElementById("campoCel").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroCel").textContent = "";
        document.getElementById("campoCel").style.border = "1px solid black";
    }

    return isValid;
}

function adicionarEmpresa() {
    if (!camposValidosEmpresa()) {
        return;
    }

    let vNome = document.querySelector('#nome').value;
    let vCNPJ = document.querySelector('#CNPJ').value;
    let vCEP = document.querySelector('#campoCEP').value;
    let vRua = document.querySelector('#campoRua').value;
    let vBairro = document.querySelector('#bairro').value;
    let vNumero = document.querySelector('#campoNum').value;
    let vCidade = document.querySelector('#cidades').value;
    let vEstado = document.querySelector('#estado').value;

    empresas.push({ nome: vNome, CNPJ: vCNPJ, CEP: vCEP, rua: vRua, bairro: vBairro, numero: vNumero, cidade: vCidade, estado: vEstado });

    let htmlLinha = `<tr>
                        <td>${vNome}</td>
                        <td>${vCNPJ}</td>
                        <td>${vCEP}</td>
                        <td>${vRua}</td>
                        <td>${vBairro}</td>
                        <td>${vNumero}</td>
                        <td>${vCidade}</td>
                        <td>${vEstado}</td>
                    </tr>`;
    let tab = document.querySelector('#tabela');
    tab.innerHTML += htmlLinha;
}

function carregaTabelaEmpresas() {
    let tab = document.querySelector('#tabela');
    let html = `<tr>
                    <th>Nome</th> <th>CNPJ</th> <th>CEP</th> <th>Rua</th> <th>Bairro</th> <th>Número</th> <th>Cidade</th> <th>Estado</th>
                </tr>`;
    for (let empresa of empresas) {
        html += `<tr>
                    <td>${empresa.nome}</td>
                    <td>${empresa.CNPJ}</td>
                    <td>${empresa.CEP}</td>
                    <td>${empresa.rua}</td>
                    <td>${empresa.bairro}</td>
                    <td>${empresa.numero}</td>
                    <td>${empresa.cidade}</td>
                    <td>${empresa.estado}</td>
                 </tr>`;
    }
    tab.innerHTML = html;
}

carregaTabelaEmpresas();

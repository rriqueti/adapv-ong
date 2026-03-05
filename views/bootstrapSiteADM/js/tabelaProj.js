var projetos = []; // Array para armazenar os dados dos projetos

function camposValidosProjeto() {
    let vNomeProjeto = document.querySelector('#nome').value;
    let vVoluntarios = document.querySelector('#volun').selectedOptions;
    let vEmpresas = document.querySelector('#empresa').selectedOptions;
    let vData = document.querySelector('#campoData').value;
    let vDescricao = document.querySelector('#descricao').value;

    let isValid = true;

    // Validação do nome do projeto
    if (!vNomeProjeto) {
        document.getElementById("erroNome").textContent = "É necessário informar o Nome do Projeto.";
        document.getElementById("nome").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNome").textContent = "";
        document.getElementById("nome").style.border = "1px solid black";
    }

    // Validação dos voluntários
    if (vVoluntarios.length === 0) {
        document.getElementById("erroVolun").textContent = "É necessário selecionar ao menos um Voluntário.";
        document.getElementById("volun").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroVolun").textContent = "";
        document.getElementById("volun").style.border = "1px solid black";
    }

    // Validação das empresas
    if (vEmpresas.length === 0) {
        document.getElementById("erroEmpresa").textContent = "É necessário selecionar ao menos uma Empresa.";
        document.getElementById("empresa").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroEmpresa").textContent = "";
        document.getElementById("empresa").style.border = "1px solid black";
    }

    // Validação da data
    if (!vData) {
        document.getElementById("erroData").textContent = "É necessário informar a Data.";
        document.getElementById("campoData").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroData").textContent = "";
        document.getElementById("campoData").style.border = "1px solid black";
    }

    // Validação da descrição
    if (!vDescricao) {
        document.getElementById("erroDescricao").textContent = "É necessário informar a Descrição.";
        document.getElementById("descricao").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroDescricao").textContent = "";
        document.getElementById("descricao").style.border = "1px solid black";
    }

    return isValid;
}

function adicionarProjeto() {
    if (!camposValidosProjeto()) {
        return;
    }

    let vNomeProjeto = document.querySelector('#nome').value;
    let vVoluntarios = Array.from(document.querySelector('#volun').selectedOptions).map(option => option.value);
    let vEmpresas = Array.from(document.querySelector('#empresa').selectedOptions).map(option => option.value);
    let vData = document.querySelector('#campoData').value;
    let vDescricao = document.querySelector('#descricao').value;

    projetos.push({ nome: vNomeProjeto, voluntarios: vVoluntarios, empresas: vEmpresas, data: vData, descricao: vDescricao });

    atualizarTabelaProjetos();
}

function atualizarTabelaProjetos() {
    let tab = document.querySelector('#tabela');
    let html = `<tr>
                    <th>Nome do Projeto</th> <th>Voluntários</th> <th>Empresas</th> <th>Data</th> <th>Descrição</th>
                </tr>`;
    for (let projeto of projetos) {
        html += `<tr>
                    <td>${projeto.nome}</td>
                    <td>${projeto.voluntarios.join(", ")}</td>
                    <td>${projeto.empresas.join(", ")}</td>
                    <td>${projeto.data}</td>
                    <td>${projeto.descricao}</td>
                 </tr>`;
    }
    tab.innerHTML = html;
}

// Chama a função para carregar a tabela com os projetos existentes
atualizarTabelaProjetos();

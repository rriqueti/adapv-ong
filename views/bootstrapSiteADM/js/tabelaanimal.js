var animais = []; // Array para armazenar os dados

function camposValidos() {
    let vNome = document.querySelector('#nome').value;
    let vSexo = document.querySelector('#sexo').value;
    let vEspecie = document.querySelector('#especie').value;
    let vEstado = document.querySelector('#estado').value;

    let isValid = true;

    if (!vNome) {
        document.getElementById("erroNome").textContent = "É necessário informar o Nome.";
        document.getElementById("nome").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNome").textContent = "";
        document.getElementById("nome").style.border = "1px solid black";
    }

    if (vSexo === "selecione" || vEspecie === "selecione" || vEstado === "selecione") {
        document.getElementById("sexo").style.border = vSexo === "selecione" ? "2px solid red"  : "1px solid black";
        document.getElementById("especie").style.border = vEspecie === "selecione" ? "2px solid red" : "1px solid black";
        document.getElementById("estado").style.border = vEstado === "selecione" ? "2px solid red" : "1px solid black";
        document.getElementById("erroSexo").textContent = vSexo === "selecione" ? "É necessário selecionar o Sexo." : "";
        document.getElementById("erroEspecie").textContent = vEspecie === "selecione" ? "É necessário selecionar a Espécie." : "";
        document.getElementById("erroEstado").textContent = vEstado === "selecione" ? "É necessário selecionar o Estado." : "";
        isValid = false;
    }

    return isValid;
}

function adicionarItem2() {
    if (!camposValidos()) {
        return;
    }

    let vNome = document.querySelector('#nome').value;
    let vSexo = document.querySelector('#sexo').value;
    let vEspecie = document.querySelector('#especie').value;
    let vDataNascimento = document.querySelector('#campoData').value || '';
    let vEstado = document.querySelector('#estado').value;
    let vRaca = document.querySelector('#raca').value || '';
    let vPelagem = document.querySelector('#pelagem').value || '';

    animais.push({ nome: vNome, dataNascimento: vDataNascimento, raca: vRaca, sexo: vSexo, especie: vEspecie, pelagem: vPelagem, estado: vEstado});

    let htmlLinha = `<tr>
                        <td>${vNome}</td>
                        <td>${vDataNascimento}</td>
                        <td>${vRaca}</td>
                        <td>${vSexo}</td>
                        <td>${vEspecie}</td>
                        <td>${vPelagem}</td>
                        <td>${vEstado}</td>
                    </tr>`;
    let tab = document.querySelector('#tabela');
    tab.innerHTML += htmlLinha;
}

function carregaTabela2(dados) {
    let tab = document.querySelector('#tabela');
    let html = `<tr>
                    <th>Nome</th> <th>Data Nasc.</th> <th>Raça</th> <th>Sexo</th> <th>Espécie</th> <th>Pelagem</th> <th>Estado</th>
                </tr>`;
    for (let animal of dados) {
        html += `<tr>
                    <td>${animal.nome}</td>
                    <td>${animal.dataNascimento}</td>
                    <td>${animal.raca}</td>
                    <td>${animal.sexo}</td>
                    <td>${animal.especie}</td>
                    <td>${animal.pelagem}</td>
                    <td>${animal.estado}</td>
                 </tr>`;
    }
    tab.innerHTML = html;
}

carregaTabela2(animais);

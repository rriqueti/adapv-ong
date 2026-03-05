var doacoes = [];

function camposValidosDoacao() {
    let vTipoPessoa = document.querySelector('#tipopessoa').value;
    let vNomeCompleto = document.querySelector('#nome').value;
    let vCPFCNPJ = document.querySelector('#campoCPF').value;
    let vRG = document.querySelector('#campoRG').value;
    let vNacionalidade = document.querySelector('#nacionalidade').value;
    let vDataDoacao = document.querySelector('#campoData').value;
    let vTipoDoacao = document.querySelector('#doado').value;

    let isValid = true;

    // Validação do Tipo de Pessoa
    if (vTipoPessoa === "selecione") {
        document.getElementById("erroTipo").textContent = "É necessário selecionar o Tipo de Pessoa.";
        document.getElementById("tipopessoa").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroTipo").textContent = "";
        document.getElementById("tipopessoa").style.border = "1px solid black";
    }

    // Validação do Nome Completo
    if (!vNomeCompleto) {
        document.getElementById("erroNome").textContent = "É necessário informar o Nome Completo.";
        document.getElementById("nome").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNome").textContent = "";
        document.getElementById("nome").style.border = "1px solid black";
    }

    // Validação do CPF/CNPJ
    if (!vCPFCNPJ) {
        document.getElementById("erroCPF").textContent = "É necessário informar o CPF/CNPJ.";
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

    // Validação da Nacionalidade
    if (vNacionalidade === "selecione") {
        document.getElementById("erroNacionalidade").textContent = "É necessário selecionar a Nacionalidade.";
        document.getElementById("nacionalidade").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroNacionalidade").textContent = "";
        document.getElementById("nacionalidade").style.border = "1px solid black";
    }

    // Validação da Data de Doação
    if (!vDataDoacao) {
        document.getElementById("erroData").textContent = "É necessário informar a Data de Doação.";
        document.getElementById("campoData").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroData").textContent = "";
        document.getElementById("campoData").style.border = "1px solid black";
    }

    if (vTipoDoacao === "selecione") {
        document.getElementById("erroDoado").textContent = "É necessário selecionar a Doação.";
        document.getElementById("doado").style.border = "2px solid red";
        isValid = false;
    } else {
        document.getElementById("erroDoado").textContent = "";
        document.getElementById("doado").style.border = "1px solid black";
    }

    // Validações específicas de acordo com o tipo de doação
    if (vTipoDoacao === 'dinheiro') {
        let vValorDinheiro = document.querySelector('#valordinheiro').value;
        if (!vValorDinheiro) {
            document.getElementById("erroValorDinheiro").textContent = "É necessário informar o valor doado.";
            document.getElementById("valordinheiro").style.border = "2px solid red";
            isValid = false;
        } else {
            document.getElementById("erroValorDinheiro").textContent = "";
            document.getElementById("valordinheiro").style.border = "1px solid black";
        }
    } else if (vTipoDoacao === 'racao') {
        let vMarcaRacao = document.querySelector('#marcaracao').value;
        let vPesoRacao = document.querySelector('#peso').value;
        if (!vMarcaRacao) {
            document.getElementById("erroMarcaRacao").textContent = "É necessário informar a marca da ração.";
            document.getElementById("marcaracao").style.border = "2px solid red";
            isValid = false;
        } else {
            document.getElementById("erroMarcaRacao").textContent = "";
            document.getElementById("marcaracao").style.border = "1px solid black";
        }
        if (!vPesoRacao) {
            document.getElementById("erroPesoRacao").textContent = "É necessário informar o peso da ração.";
            document.getElementById("peso").style.border = "2px solid red";
            isValid = false;
        } else {
            document.getElementById("erroPesoRacao").textContent = "";
            document.getElementById("peso").style.border = "1px solid black";
        }
    } else if (vTipoDoacao === 'remedio') {
        let vNomeMed = document.querySelector('#nomeMed').value;
        let vQuantidadeMed = document.querySelector('#qntMed').value;
        if (!vNomeMed) {
            document.getElementById("erroNomeMed").textContent = "É necessário informar o nome do remédio.";
            document.getElementById("nomeMed").style.border = "2px solid red";
            isValid = false;
        } else {
            document.getElementById("erroNomeMed").textContent = "";
            document.getElementById("nomeMed").style.border = "1px solid black";
        }
        if (!vQuantidadeMed) {
            document.getElementById("erroQuantidadeMed").textContent = "É necessário informar a quantidade do remédio.";
            document.getElementById("qntMed").style.border = "2px solid red";
            isValid = false;
        } else {
            document.getElementById("erroQuantidadeMed").textContent = "";
            document.getElementById("qntMed").style.border = "1px solid black";
        }
    }

    return isValid;
}
function adicionarDoacao() {
    if (!camposValidosDoacao()) {
        return;
    }

    let vTipoPessoa = document.querySelector('#tipopessoa').value;
    let vNomeCompleto = document.querySelector('#nome').value;
    let vCPFCNPJ = document.querySelector('#campoCPF').value;
    let vRG = document.querySelector('#campoRG').value;
    let vNacionalidade = document.querySelector('#nacionalidade').value;
    let vDataDoacao = document.querySelector('#campoData').value;
    let vTipoDoacao = document.querySelector('#doado').value;
    let detalhesDoacao;

    if (vTipoDoacao === 'dinheiro') {
        detalhesDoacao = 'Valor: R$' + document.querySelector('#valordinheiro').value;
    } else if (vTipoDoacao === 'racao') {
        detalhesDoacao = 'Marca: ' + document.querySelector('#marcaracao').value + ', Peso: ' + document.querySelector('#peso').value + ' kg';
    } else if (vTipoDoacao === 'remedio') {
        detalhesDoacao = 'Medicamento: ' + document.querySelector('#nomeMed').value + ', Quantidade: ' + document.querySelector('#qntMed').value;
    }

    doacoes.push({
        tipoPessoa: vTipoPessoa,
        nomeCompleto: vNomeCompleto,
        CPFCNPJ: vCPFCNPJ,
        RG: vRG,
        nacionalidade: vNacionalidade,
        dataDoacao: vDataDoacao,
        tipoDoacao: vTipoDoacao,
        detalhesDoacao: detalhesDoacao
    });

    atualizarTabelaDoacoes();
}
function atualizarTabelaDoacoes() {
    let tabela = document.querySelector('#tabela');
    let html = `<tr>
                    <th>Tipo Pessoa</th>
                    <th>Nome Completo</th>
                    <th>CPF/CNPJ</th>
                    <th>RG</th>
                    <th>Nacionalidade</th>
                    <th>Data de Doação</th>
                    <th>Tipo de Doação</th>
                    <th>Detalhes da Doação</th>
                </tr>`;
    for (let doacao of doacoes) {
        html += `<tr>
                    <td>${doacao.tipoPessoa}</td>
                    <td>${doacao.nomeCompleto}</td>
                    <td>${doacao.CPFCNPJ}</td>
                    <td>${doacao.RG}</td>
                    <td>${doacao.nacionalidade}</td>
                    <td>${doacao.dataDoacao}</td>
                    <td>${doacao.tipoDoacao}</td>
                    <td>${doacao.detalhesDoacao}</td>
                </tr>`;
    }
    tabela.innerHTML = html;
}
atualizarTabelaDoacoes()
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/empresas/listar";
    }

    function limparValidacao() {
        document.getElementById("emp_nome").style["border-color"] = "#ced4da";
        document.getElementById("emp_cnpj").style["border-color"] = "#ced4da";
        document.getElementById("emp_cep").style["border-color"] = "#ced4da";
        document.getElementById("emp_num").style["border-color"] = "#ced4da";
        document.getElementById("emp_cidade").style["border-color"] = "#ced4da";
        document.getElementById("emp_estado").style["border-color"] = "#ced4da";
        document.getElementById("emp_rua").style["border-color"] = "#ced4da";
        document.getElementById("emp_bairro").style["border-color"] = "#ced4da";
        document.getElementById("emp_complemento").style["border-color"] = "#ced4da";
        document.getElementById("emp_telefone").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();

        let id = document.querySelector("#id").value;
        let nome = document.querySelector("#emp_nome").value;
        let cnpj = document.querySelector("#emp_cnpj").value;
        let cep = document.querySelector("#emp_cep").value;
        let numero = document.querySelector("#emp_num").value;
        let cidade = document.querySelector("#emp_cidade").value;
        let estado = document.querySelector("#emp_estado").value;
        let rua = document.querySelector("#emp_rua").value;
        let bairro = document.querySelector("#emp_bairro").value;
        let complemento = document.querySelector("#emp_complemento").value;
        let telefone = document.querySelector("#emp_telefone").value;
        let createdAt = document.querySelector("#createdAt").value;

        let listaErros = [];

        if (nome === "") {
            listaErros.push("emp_nome");
        }
        if (cnpj === "") {
            listaErros.push("emp_cnpj");
        }
        if (cep === "") {
            listaErros.push("emp_cep");
        }
        if (numero === "") {
            listaErros.push("emp_num");
        }
        if (cidade === "") {
            listaErros.push("emp_cidade");
        }
        if (estado === "") {
            listaErros.push("emp_estado");
        }
        if (rua === "") {
            listaErros.push("emp_rua");
        }
        if (bairro === "") {
            listaErros.push("emp_bairro");
        }
        if (complemento === "") {
            listaErros.push("emp_complemento");
        }
        if (telefone === "") {
            listaErros.push("emp_telefone");
        }

        if (listaErros.length == 0) {

            let obj = {
                id: id,
                nome: nome,
                cnpj: cnpj,
                cep: cep,
                numero: numero,
                cidade: cidade,
                estado: estado,
                rua: rua,
                bairro: bairro,
                complemento: complemento,
                telefone: telefone,
                createdAt: createdAt
            };

            fetch("/empresas/alterar", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.ok) {
                        window.location.href = "/empresas/listar";
                    }
                    else {
                        alert(r.msg);
                    }
                })

        }
        else {

            for (let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");

        }
    }
});

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/eventos/listar";
    }

    function limparValidacao() {
        document.getElementById("even_nome").style["border-color"] = "#ced4da";
        document.getElementById("even_descricao").style["border-color"] = "#ced4da";
        document.getElementById("even_local").style["border-color"] = "#ced4da";
        document.getElementById("even_dataInicio").style["border-color"] = "#ced4da";
        document.getElementById("even_dataFinal").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();
        let id = document.querySelector("#even_id").value;
        let nome = document.querySelector("#even_nome").value;
        let desc = document.querySelector("#even_descricao").value;
        let local = document.querySelector("#even_local").value;
        let inicio = document.querySelector("#even_dataInicio").value;
        let fim = document.querySelector("#even_dataFinal").value;
        let createdAt = document.querySelector("#createdAt").value;

        let listaErros = [];

        if (nome === "") {
            listaErros.push("even_nome");
        }
        if (desc === "") {
            listaErros.push("even_descricao");
        }
        if (local === "") {
            listaErros.push("even_local");
        }
        if (inicio === "") {
            listaErros.push("even_dataInicio");
        }
        if (fim === "") {
            listaErros.push("even_dataFinal");
        }

        let inicioData = new Date(inicio).toISOString();
        let finalData = new Date(fim).toISOString();
        if (inicioData > finalData) {
            listaErros.push("even_dataInicio");
            listaErros.push("even_dataFinal");
        }


        if (listaErros.length == 0) {

            let obj = {
                id: id,
                nome: nome,
                desc: desc,
                local: local,
                inicio: inicio,
                fim: fim,
                createdAt: createdAt
            };

            fetch("/eventos/alterar", {
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
                        window.location.href = "/eventos/listar";
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


})
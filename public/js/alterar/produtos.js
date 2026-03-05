document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/produtos/listar";
    }

    function limparValidacao() {
        document.getElementById("prod_nome").style["border-color"] = "#ced4da";
        document.getElementById("prod_tipo").style["border-color"] = "#ced4da";
        document.getElementById("prod_desc").style["border-color"] = "#ced4da";
        document.getElementById("prod_qnt").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();
        let id = document.querySelector("#id").value;
        let nome = document.querySelector("#prod_nome").value;
        let tipo = document.querySelector("#prod_tipo").value;
        let desc = document.querySelector("#prod_desc").value;
        let qnt = document.querySelector("#prod_qnt").value;
        let createdAt = document.querySelector("#createdAt").value;

        let listaErros = [];

        if (nome === "") {
            listaErros.push("prod_nome");
        }
        if (tipo === "") {
            listaErros.push("prod_tipo");
        }
        if (desc === "") {
            listaErros.push("prod_desc");
        }
        if (qnt === "") {
            listaErros.push("prod_qnt");
        }


        if (listaErros.length == 0) {

            let obj = {
                id: id,
                nome: nome,
                tipo: tipo,
                desc: desc,
                qnt: qnt,
                createdAt: createdAt
            }

            fetch("/produtos/alterar", {
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
                        window.location.href = "/produtos/listar";
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
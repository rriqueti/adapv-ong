document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/estoque/listar";
    }

    function limparValidacao() {
        document.getElementById("prod_id").style["border-color"] = "#ced4da";
        document.getElementById("doa_id").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let prod_id = document.querySelector("#prod_id").value;
        let doa_id = document.querySelector("#doa_id").value;

        let listaErros = [];

        if (prod_id === "" && doa_id === "") {
            if (prod_id === "") {
                listaErros.push("prod_id");
            }
            if (doa_id === "") {
                listaErros.push("doa_id");
            }
        }

        if (listaErros.length == 0) {

            let obj = {
                prod_id: prod_id,
                doa_id: doa_id
            }

            fetch("/estoque/cadastrar", {
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
                        window.location.href = "/estoque/listar";
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
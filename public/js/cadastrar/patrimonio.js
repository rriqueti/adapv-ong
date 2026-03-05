document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/patrimonio/listar";
    }

    function limparValidacao() {
        document.getElementById("patrim_valor").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let patrim_valor = document.querySelector("#patrim_valor").value;
        let doa_id = document.querySelector("#doa_id").value;


        let listaErros = [];

        if (patrim_valor === "") {
            listaErros.push("patrim_valor");
        }

        if (listaErros.length == 0) {

            let obj = {
                valor: patrim_valor,
                doa_id: doa_id
            }

            fetch("/patrimonio/cadastrar", {
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
                        window.location.href = "/patrimonio/listar";
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
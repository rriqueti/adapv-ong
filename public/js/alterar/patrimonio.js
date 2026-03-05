document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/patrimonio/listar";
    }

    function limparValidacao() {
        document.getElementById("patrim_valor").style["border-color"] = "#ced4da";
        document.getElementById("doa_id").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();

        let id = document.querySelector("#id").value;
        let patrim_valor = document.querySelector("#patrim_valor").value;
        let doa_id = document.querySelector("#doa_id").value;
        let createdAt = document.querySelector("#createdAt").value;


        let listaErros = [];
        if (patrim_valor === "" && doa_id === "") {
            if (patrim_valor === "") {
                listaErros.push("patrim_valor");
            }
            if (doa_id === "") {
                listaErros.push("doa_id");
            }
        }

        if (listaErros.length == 0) {

            let obj = {
                id: id,
                valor: patrim_valor,
                doa_id: doa_id,
                createdAt: createdAt
            }

            fetch("/patrimonio/alterar", {
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
                        window.location.href = "/";
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
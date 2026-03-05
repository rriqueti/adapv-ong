document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/voluntarios/listar";
    }

    function limparValidacao() {
        document.getElementById("idVolun").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();

        let id = document.querySelector("#id").value;
        let voluntario = document.querySelector("#idVolun").value;
        let createdAt = document.querySelector("#createdAt").value;

        let listaErros = [];

        if (voluntario === "") {
            listaErros.push("idVolun");
        }

        if (listaErros.length == 0) {

            let obj = {
                id: id,
                voluntario: voluntario,
                createdAt: createdAt
            };

            fetch("/voluntarios/alterar", {
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
                        window.location.href = "/voluntarios/listar";
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
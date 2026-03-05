document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/adocao/listar";
    }

    function limparValidacao() {
        document.getElementById("idAdo").style["border-color"] = "#ced4da";
        document.getElementById("idAni").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let adotante = document.querySelector("#idAdo").value;
        let animal = document.querySelector("#idAni").value;
        let listaErros = [];

        if (adotante === "") {
            listaErros.push("idAdo");
        }

        if (animal === "") {
            listaErros.push("idAni");
        }

        if (listaErros.length == 0) {

            let obj = {
                adotante: adotante,
                animal: animal
            };

            fetch("/adocao/cadastrar", {
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
                        window.location.href = "/adocao/listar";
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
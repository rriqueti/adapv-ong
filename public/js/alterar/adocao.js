document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/adocao/listar";
    }

    function limparValidacao() {
        document.getElementById("IdAdotante").style["border-color"] = "#ced4da";
        document.getElementById("IdAnimal").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();
        let id = document.querySelector("#id").value;
        let adotante = document.querySelector("#IdAdotante").value;
        let animal = document.querySelector("#IdAnimal").value;
        let createdAt = document.querySelector("#createdAt").value;

        let listaErros = [];

        if (adotante == 0) {
            listaErros.push("IdAdotante");
        }

        if (animal == 0) {
            listaErros.push("IdAnimal");
        }

        if (listaErros.length == 0) {

            let obj = {
                id: id,
                adotante: adotante,
                animal: animal,
                createdAt: createdAt
            };

            fetch("/adocao/alterar", {
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
                        alert(r.msg);
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
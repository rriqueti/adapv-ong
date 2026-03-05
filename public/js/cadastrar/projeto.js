document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/projeto/listar";
    }

    function limparValidacao() {
        document.getElementById("nomePro").style["border-color"] = "#ced4da";
        document.getElementById("dataPro").style["border-color"] = "#ced4da";
        document.getElementById("descPro").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let nome = document.querySelector("#nomePro").value;
        let data = document.querySelector("#dataPro").value;
        let desc = document.querySelector("#descPro").value;


        let listaErros = [];

        if (nome === "") {
            listaErros.push("nome");
        }
        if (data === "") {
            listaErros.push("data");
        }
        if (desc === "") {
            listaErros.push("desc");
        }

        if (listaErros.length == 0) {

            let obj = {
                nome: nome,
                data: data,
                desc: desc
            }

            fetch("/projeto/cadastrar", {
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
                        window.location.href = "/projeto/listar";
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
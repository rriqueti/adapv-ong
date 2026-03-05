document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("pess_id").style["border-color"] = "#ced4da";
        document.getElementById("adm_email").style["border-color"] = "#ced4da";
        document.getElementById("adm_senha").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let pess_id = document.querySelector("#pess_id").value;
        let adm_email = document.querySelector("#adm_email").value;
        let adm_senha = document.querySelector("#adm_senha").value;

        let listaErros = [];

        if (pess_id === "") {
            listaErros.push("pess_id");
        }
        if (adm_email === "") {
            listaErros.push("adm_email");
        }
        if (adm_senha === "") {
            listaErros.push("adm_senha");
        }

        if (listaErros.length == 0) {

            let obj = {
                pess_id: pess_id,
                email: adm_email,
                senha: adm_senha
            };

            fetch("/admin/cadastrar", {
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
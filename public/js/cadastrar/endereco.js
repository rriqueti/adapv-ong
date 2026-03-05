document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/endereco/listar";
    }

    function limparValidacao() {
        document.getElementById("end_cep").style["border-color"] = "#ced4da";
        document.getElementById("end_rua").style["border-color"] = "#ced4da";
        document.getElementById("end_numero").style["border-color"] = "#ced4da";
        document.getElementById("end_bairro").style["border-color"] = "#ced4da";
        document.getElementById("end_cidade").style["border-color"] = "#ced4da";
        document.getElementById("end_estado").style["border-color"] = "#ced4da";
        document.getElementById("end_complemento").style["border-color"] = "#ced4da";
        document.getElementById("pess_id").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let cep = document.querySelector("#end_cep").value;
        let rua = document.querySelector("#end_rua").value;
        let numero = document.querySelector("#end_numero").value;
        let bairro = document.querySelector("#end_bairro").value;
        let cidade = document.querySelector("#end_cidade").value;
        let estado = document.querySelector("#end_estado").value;
        let complemento = document.querySelector("#end_complemento").value;
        let pess_id = document.querySelector("#pess_id").value;

        let listaErros = [];

        if (cep === "") {
            listaErros.push("end_cep");
        }
        if (rua === "") {
            listaErros.push("end_rua");
        }
        if (numero === "") {
            listaErros.push("end_numero");
        }
        if (bairro === "") {
            listaErros.push("end_bairro");
        }
        if (cidade === "") {
            listaErros.push("end_cidade");
        }
        if (estado === "") {
            listaErros.push("end_estado");
        }
        if (complemento === "") {
            listaErros.push("end_complemento");
        }
        if (pess_id === "") {
            listaErros.push("pess_id");
        }

        if (listaErros.length == 0) {

            let obj = {
                cep: cep,
                rua: rua,
                num: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                complem: complemento,
                pess_id: pess_id
            };

            fetch("/endereco/cadastrar", {
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
                        window.location.href = "/endereco/listar";
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

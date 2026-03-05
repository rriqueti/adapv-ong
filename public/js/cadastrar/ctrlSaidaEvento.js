document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/ctrlSaidaEvento/listar";
    }

    function limparValidacao() {
        document.getElementById("ctrlEven_desc").style["border-color"] = "#ced4da";
        document.getElementById("ctrlEven_estado").style["border-color"] = "#ced4da";
        document.getElementById("prod_id").style["border-color"] = "#ced4da";
        document.getElementById("prod_qnt").style["border-color"] = "#ced4da";
        document.getElementById("even_id").style["border-color"] = "#ced4da";
        document.getElementById("patrim_valor").style["border-color"] = "#ced4da";
        document.getElementById("ani_id").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let desc = document.getElementById("ctrlEven_desc").value;
        let estado = document.getElementById("ctrlEven_estado").value;

        let prod_id = document.getElementById("prod_id").value;
        let parts = prod_id.split("/")
        let prod_ids = parts.map(part => part.trim().match(/^\d+/g)).toString()

        let prod_qnt = document.getElementById("prod_qnt").value;
        let even_id = document.getElementById("even_id").value;
        let patrim_valor = document.getElementById("patrim_valor").value;
        let ani_id = document.getElementById("ani_id").value;
        console.log(even_id);
        console.log(prod_id);

        let listaErros = [];
        if (even_id === "") {
            if (even_id === "") {
                listaErros.push("even_id");
            }
            if (desc === "") {
                listaErros.push("ctrlEven_desc");
            }
        }
        if (estado === "") {
            listaErros.push("ctrlEven_estado");
        }
        if (prod_id !== '' && prod_qnt === '' || prod_id === '' && prod_qnt !== '') {
            if (prod_id === "") {
                listaErros.push("prod_id");
            }
            if (prod_qnt === "") {
                listaErros.push("prod_qnt");
            }
        }
        if (prod_id === "" && prod_qnt === "" && patrim_valor === "" && ani_id === "") {
            if (prod_id === "") {
                listaErros.push("prod_id");
            }
            if (prod_qnt === "") {
                listaErros.push("prod_qnt");
            }
            if (patrim_valor === "") {
                listaErros.push("patrim_valor");
            }
            if (ani_id === "") {
                listaErros.push("ani_id");
            }
        }


        if (listaErros.length == 0) {

            let obj = {
                desc: desc,
                estado: estado,
                prod_id: prod_ids,
                prod_qnt: prod_qnt,
                even_id: even_id,
                patrim_valor: patrim_valor,
                ani_id: ani_id
            };

            fetch("/ctrlSaidaEvento/cadastrar", {
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
                        window.location.href = "/ctrlSaidaEvento/listar";
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
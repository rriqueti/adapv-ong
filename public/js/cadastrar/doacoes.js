document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    document.getElementById("cancelar").addEventListener("click", redirecionar);

    function redirecionar() {
        window.location.href = "/doacoes/listar";
    }

    function limparValidacao() {
        document.getElementById("doa_tipo").style["border-color"] = "#ced4da";
        document.getElementById("doa_desc").style["border-color"] = "#ced4da";
        document.getElementById("doa_qnt").style["border-color"] = "#ced4da";
        document.getElementById("doa_data").style["border-color"] = "#ced4da";
        document.getElementById("pess_id").style["border-color"] = "#ced4da";
        document.getElementById("doa_doador").style["border-color"] = "#ced4da";
        document.getElementById("doa_cpf_cnpj").style["border-color"] = "#ced4da";
        document.getElementById("doa_rg").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let tipo = document.querySelector("#doa_tipo").value;
        let desc = document.querySelector("#doa_desc").value;
        let qnt = document.querySelector("#doa_qnt").value;
        let doador = document.querySelector("#doa_doador").value;
        let cpf_cnpj = document.querySelector("#doa_cpf_cnpj").value;
        let rg = document.querySelector("#doa_rg").value;
        let data = document.querySelector("#doa_data").value;
        let pess_id = document.querySelector("#pess_id").value;
        console.log(doador, cpf_cnpj, rg, pess_id)

        let listaErros = [];

        if (tipo === "") {
            listaErros.push("doa_tipo");
        }
        if (desc === "") {
            listaErros.push("doa_desc");
        }
        if (qnt === "") {
            listaErros.push("doa_qnt");
        }
        if (data === "") {
            listaErros.push("doa_data");
        }

        if (pess_id === "") {
            if (doador === "" && cpf_cnpj === "" && rg === "") {
                listaErros.push("pess_id");
            } else {
                if (doador === "") {
                    listaErros.push("doa_doador");
                }
                if (cpf_cnpj === "") {
                    listaErros.push("doa_cpf_cnpj");
                }
                if (rg === "") {
                    listaErros.push("doa_rg");
                }
            }
        } else {
            if ((doador !== "" || cpf_cnpj !== "" || rg !== "") && pess_id !== "") {
                listaErros.push("pess_id");
                listaErros.push("doa_doador");
                listaErros.push("doa_cpf_cnpj");
                listaErros.push("doa_rg");
            }
            if (doador !== "" || cpf_cnpj !== "" || rg !== "") {
                listaErros.push("pess_id");
                if (doador === "") {
                    listaErros.push("doa_doador");
                }
                if (cpf_cnpj === "") {
                    listaErros.push("doa_cpf_cnpj");
                }
                if (rg === "") {
                    listaErros.push("doa_rg");
                }
            }
        }

        if (listaErros.length == 0) {

            let obj = {
                tipo: tipo,
                desc: desc,
                qnt: qnt,
                doador: doador,
                cpf_cnpj: cpf_cnpj,
                rg: rg,
                data: data,
                pess_id: pess_id
            };

            fetch("/doacoes/cadastrar", {
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
                        window.location.href = "/doacoes/listar";
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

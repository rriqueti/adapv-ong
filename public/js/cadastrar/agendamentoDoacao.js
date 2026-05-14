document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("btnCadastrar");

    btn.addEventListener("click", cadastrar);

    async function cadastrar() {

        let obj = {

            doador_nome: document.getElementById("doador_nome").value,

            produto_nome: document.getElementById("produto_nome").value,

            produto_tipo: document.getElementById("produto_tipo").value,

            produto_marca: document.getElementById("produto_marca").value,

            quantidade: document.getElementById("quantidade").value,

            produto_validade: document.getElementById("produto_validade").value,

            data_doacao: document.getElementById("data_doacao").value,

            hora_doacao: document.getElementById("hora_doacao").value,

            endereco: document.getElementById("endereco").value,

            observacoes: document.getElementById("observacoes").value
        };

        console.log(obj);

        try {

            let resposta = await fetch("/agendamento/cadastrar", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(obj)
            });

            let r = await resposta.json();

            if (r.ok) {

                alert(r.msg);

                window.location.href = "/agendamento/listar";

            }
            else {

                alert(r.msg);

            }

        }
        catch (erro) {

            console.log(erro);

            alert("Erro ao cadastrar");

        }
    }
});
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);
    document.getElementById("cancelar").addEventListener("click", () => window.location.href = "/atividades/listar");

    function limparValidacao() {
        ["atv_nome", "atv_desc", "atv_data", "pro_id"].forEach(id => {
            document.getElementById(id).style["border-color"] = "#ced4da";
        });
    }

    async function cadastrar() {
        limparValidacao();

        const nome = document.querySelector("#atv_nome").value;
        const data = document.querySelector("#atv_data").value;
        const desc = document.querySelector("#atv_desc").value;
        const pro_id = document.querySelector("#pro_id").value;
        const emp_id = document.querySelector("#emp_id").value;

        // Obter voluntários selecionados (checkboxes)
        const checkboxes = document.querySelectorAll('input[name="voluntarios"]:checked');
        const voluntarios = Array.from(checkboxes).map(cb => cb.value);

        let listaErros = [];
        if (nome === "") listaErros.push("atv_nome");
        if (data === "") listaErros.push("atv_data");
        if (desc === "") listaErros.push("atv_desc");
        if (!pro_id) listaErros.push("pro_id");

        if (listaErros.length === 0) {
            const obj = {
                nome,
                data,
                desc,
                pro_id,
                emp_id,
                voluntarios
            };

            try {
                const response = await fetch("/atividades/cadastrar", {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: { "Content-Type": "application/json" }
                });

                const result = await response.json();
                if (result.ok) {
                    window.location.href = "/atividades/listar";
                } else {
                    alert(result.msg);
                }
            } catch (err) {
                console.error(err);
                alert("Erro ao processar a requisição.");
            }
        } else {
            listaErros.forEach(id => {
                document.getElementById(id).style["border-color"] = "red";
            });
            alert("Preencha corretamente os campos indicados!");
        }
    }
});

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

        const form = document.getElementById("formProjeto");
        const formData = new FormData();
        
        let nome = document.querySelector("#nomePro").value;
        let data = document.querySelector("#dataPro").value;
        let desc = document.querySelector("#descPro").value;
        let objetivo = document.querySelector("#objetivoPro").value;
        let banner = document.querySelector("#bannerPro").files[0];
        
        // Obter voluntários selecionados
        let selectVol = document.querySelector("#voluntariosPro");
        let voluntarios = Array.from(selectVol.selectedOptions).map(option => option.value);

        let listaErros = [];

        if (nome === "") listaErros.push("nomePro");
        if (data === "") listaErros.push("dataPro");
        if (desc === "") listaErros.push("descPro");

        if (listaErros.length == 0) {
            
            formData.append("nome", nome);
            formData.append("data", data);
            formData.append("desc", desc);
            formData.append("objetivo", objetivo);
            if (banner) formData.append("banner", banner);
            
            voluntarios.forEach(vId => {
                formData.append("voluntarios", vId);
            });

            fetch("/projeto/cadastrar", {
                method: 'POST',
                body: formData
                // Não definir Content-Type ao usar FormData, o browser cuidará disso com o boundary correto
            })
            .then(r => r.json())
            .then(r => {
                if (r.ok) {
                    window.location.href = "/projeto/listar";
                }
                else {
                    alert(r.msg);
                }
            })
            .catch(err => {
                console.error("Erro no cadastro:", err);
                alert("Ocorreu um erro ao processar a requisição.");
            });
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

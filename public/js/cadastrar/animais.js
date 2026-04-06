document.addEventListener("DOMContentLoaded", function () {
    const formAnimal = document.getElementById("formAnimal");

    if (formAnimal) {
        formAnimal.addEventListener("submit", function (e) {
            e.preventDefault();

            const dataDesconhecida = document.getElementById("dataDesconhecida").checked;
            const campoData = document.getElementById("campoData").value;

            const data = {
                nome: document.getElementById("nome").value,
                sexo: document.getElementById("sexo").value,
                especie: document.getElementById("especie").value,
                raca: document.getElementById("raca").value || 'Sem raça definida',
                campoData: dataDesconhecida ? null : campoData,
                dataDesconhecida: dataDesconhecida ? 'on' : 'off',
                localidade: document.getElementById("localidade").value,
                disp: document.getElementById("disp").value,
                ester: document.getElementById("ester").value || 'Indefinido',
                pelagem: document.getElementById("pelagem").value || 'Indefinido',
                desc: document.getElementById("desc").value || '',
                estado: 'Ativo' // Valor padrão se necessário para o banco
            };

            Swal.fire({
                title: 'Confirmar Cadastro?',
                text: "Os dados do animal serão salvos.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10b981',
                confirmButtonText: 'Sim, cadastrar',
                cancelButtonText: 'Revisar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("/animais/cadastrar", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(r => {
                        if (r.ok) {
                            Swal.fire('Sucesso!', r.msg, 'success')
                            .then(() => window.location.href = "/animais/listar");
                        } else {
                            Swal.fire('Erro!', r.msg, 'error');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Erro!', 'Não foi possível se conectar ao servidor.', 'error');
                    });
                }
            });
        });
    }

    // Gerencia o estado do campo de data caso a checkbox 'Desconhecida' seja ativada
    const chkDesconhecida = document.getElementById("dataDesconhecida");
    const inputData = document.getElementById("campoData");

    if (chkDesconhecida && inputData) {
        chkDesconhecida.addEventListener("change", function() {
            inputData.disabled = this.checked;
            if (this.checked) inputData.value = "";
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const formAnimal = document.getElementById("formAnimal");

    if (formAnimal) {
        formAnimal.addEventListener("submit", function (e) {
            e.preventDefault();

            const dataDesconhecida = document.getElementById("dataDesconhecida").checked;
            const campoData = document.getElementById("campoData").value;

            const data = {
                id: document.getElementById("id").value,
                createdAt: document.getElementById("createdAt").value,
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
                estado: 'Ativo'
            };

            Swal.fire({
                title: 'Confirmar Alterações?',
                text: "Os dados do animal serão atualizados.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#10b981',
                confirmButtonText: 'Sim, atualizar',
                cancelButtonText: 'Revisar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("/animais/alterar", {
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

    const chkDesconhecida = document.getElementById("dataDesconhecida");
    const inputData = document.getElementById("campoData");

    if (chkDesconhecida && inputData) {
        chkDesconhecida.addEventListener("change", function() {
            inputData.disabled = this.checked;
            if (this.checked) inputData.value = "";
        });
    }
});
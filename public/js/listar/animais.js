document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel);
    let btns = document.querySelectorAll(".btnExclusao");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", excluir);
    }

    function excluir() {
        let id = this.dataset.codigoexclusao;

        if (id != null) {
            if (confirm("Tem certeza que deseja excluir esse animal?")) {
                let obj = {
                    id: id
                }

                fetch('/animais/excluir', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                })
                    .then(r => {
                        return r.json()
                    })
                    .then(r => {
                        if (r.ok) {
                            window.location.reload();
                        }
                        else {
                            alert(r.msg);
                        }

                    })
            }
        }
        else {
            alert("Nenhum ID encontrado para exclusão");
        }
    }

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaAnimais"));
        XLSX.writeFile(wb, "relatorio-animais.xlsx");
    }

    const adocaoModalEl = document.getElementById('adocaoModal');
    if (adocaoModalEl) {
        const adocaoModal = new bootstrap.Modal(adocaoModalEl);

        // Evento disparado quando o modal está prestes a ser exibido
        adocaoModalEl.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const animalId = button.getAttribute('data-animal-id');
            const animalNome = button.getAttribute('data-animal-nome');

            // Atualiza o conteúdo do modal com os dados do animal
            const modalAnimalNome = adocaoModalEl.querySelector('#modalAnimalNome');
            const modalAnimalIdInput = adocaoModalEl.querySelector('#modalAnimalId');
            modalAnimalNome.textContent = animalNome;
            modalAnimalIdInput.value = animalId;
        });

        // Evento de envio do formulário de adoção
        const formAdocao = document.getElementById('formAdocao');
        formAdocao.addEventListener('submit', async function (event) {
            event.preventDefault();

            const adotanteId = formAdocao.querySelector('#adotante').value;
            const animalId = formAdocao.querySelector('#modalAnimalId').value;

            if (!adotanteId || adotanteId === '0') {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção!',
                    text: 'Por favor, selecione um adotante!',
                });
                return;
            }

            const payload = { animal: animalId, adotante: adotanteId };

            try {
                const response = await fetch('/adocao/cadastrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();
                adocaoModal.hide();

                if (result.ok) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: result.msg,
                    });
                    window.location.reload(); // Recarrega a página para atualizar o status
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: result.msg || 'Ocorreu um erro ao registrar a adoção.',
                    });
                }
            } catch (error) {
                adocaoModal.hide();
                await Swal.fire({
                    icon: 'error',
                    title: 'Erro de Conexão',
                    text: 'Não foi possível se comunicar com o servidor.',
                });
            }
        });
    }
});
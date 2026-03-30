document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel);
    let btns = document.querySelectorAll(".btnExclusao");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", excluir);
    }

    function excluir() {
        let id = this.dataset.codigoexclusao;

        if (id != null) {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter isso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let obj = { id: id };

                    fetch('/voluntarios/excluir', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(obj)
                    })
                    .then(r => r.json())
                    .then(r => {
                        if (r.ok) {
                            Swal.fire('Excluído!', 'O voluntário foi removido com sucesso.', 'success').then(() => {
                                window.location.reload();
                            });
                        } else {
                            Swal.fire('Erro!', r.msg || 'Erro ao excluir.', 'error');
                        }
                    });
                }
            });
        }
    }

    function exportarExcel() {
        var wb = XLSX.utils.table_to_book(document.getElementById("tabelaVolunt"));
        XLSX.writeFile(wb, "relatorio-voluntarios.xlsx");
    }
})
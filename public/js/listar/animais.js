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
})
document.addEventListener("DOMContentLoaded", function () {

    // ========== FILTROS ==========
    const cards = document.querySelectorAll(".animal-card-new");
    const buscaNome = document.getElementById("buscaNome");
    const filtroLocalidade = document.getElementById("filtroLocalidade");
    const countEl = document.getElementById("countAnimais");
    const semResultados = document.getElementById("semResultados");
    const filterChips = document.querySelectorAll(".filter-chip");

    let filtroAtivo = "todos"; // valor de ani_disponivel

    function aplicarFiltros() {
        const textoBusca = (buscaNome.value || "").toLowerCase().trim();
        const localidade = filtroLocalidade.value;
        let visiveis = 0;

        cards.forEach(card => {
            const nome = card.dataset.nome || "";
            const disp = card.dataset.disponivel || "";
            const loc = card.dataset.localidade || "";

            const passaBusca = nome.includes(textoBusca);
            const passaDisp = filtroAtivo === "todos" || disp === filtroAtivo;
            const passaLoc = !localidade || loc === localidade;

            if (passaBusca && passaDisp && passaLoc) {
                card.classList.remove("hidden");
                visiveis++;
            } else {
                card.classList.add("hidden");
            }
        });

        if (countEl) countEl.textContent = visiveis;
        if (semResultados) {
            if (visiveis === 0 && cards.length > 0) {
                semResultados.classList.remove("d-none");
            } else {
                semResultados.classList.add("d-none");
            }
        }
    }

    // Chips de disponibilidade
    filterChips.forEach(chip => {
        chip.addEventListener("click", function () {
            filterChips.forEach(c => c.classList.remove("active"));
            this.classList.add("active");
            filtroAtivo = this.dataset.value;
            aplicarFiltros();
        });
    });

    if (buscaNome) buscaNome.addEventListener("input", aplicarFiltros);
    if (filtroLocalidade) filtroLocalidade.addEventListener("change", aplicarFiltros);

    // ========== EXCLUSÃO ==========
    document.querySelectorAll(".btnExclusao").forEach(btn => {
        btn.addEventListener("click", async function () {
            const id = this.dataset.codigoexclusao;
            if (!id) return;

            const confirm = await Swal.fire({
                title: "Excluir Animal?",
                text: "Esta ação não pode ser desfeita.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ef4444",
                confirmButtonText: "Sim, excluir",
                cancelButtonText: "Cancelar"
            });

            if (!confirm.isConfirmed) return;

            fetch("/animais/excluir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            .then(r => r.json())
            .then(r => {
                if (r.ok) {
                    Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Animal excluído!", showConfirmButton: false, timer: 2000 });
                    // Remove o card da DOM
                    const card = btn.closest(".animal-card-new");
                    if (card) {
                        card.style.transition = "opacity 0.3s, transform 0.3s";
                        card.style.opacity = "0";
                        card.style.transform = "scale(0.9)";
                        setTimeout(() => { card.remove(); aplicarFiltros(); }, 300);
                    }
                } else {
                    Swal.fire("Erro!", r.msg, "error");
                }
            })
            .catch(() => Swal.fire("Erro!", "Não foi possível conectar ao servidor.", "error"));
        });
    });

    // ========== EXPORTAR EXCEL ==========
    const btnExcel = document.getElementById("btnExportarExcel");
    if (btnExcel) {
        btnExcel.addEventListener("click", function () {
            const wb = XLSX.utils.table_to_book(document.getElementById("tabelaAnimais"));
            XLSX.writeFile(wb, "relatorio-animais.xlsx");
        });
    }

    // ========== MODAL ADOÇÃO ==========
    const adocaoModalEl = document.getElementById("adocaoModal");
    if (adocaoModalEl) {
        const adocaoModal = new bootstrap.Modal(adocaoModalEl);

        document.querySelectorAll(".btnAdotar").forEach(btn => {
            btn.addEventListener("click", function () {
                document.getElementById("modalAnimalNome").textContent = this.dataset.animalNome;
                document.getElementById("modalAnimalId").value = this.dataset.animalId;
            });
        });

        const formAdocao = document.getElementById("formAdocao");
        if (formAdocao) {
            formAdocao.addEventListener("submit", async function (e) {
                e.preventDefault();
                const animalId = document.getElementById("modalAnimalId").value;

                try {
                    const resp = await fetch("/adocao/cadastrar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ animal: animalId })
                    });
                    const result = await resp.json();
                    adocaoModal.hide();

                    if (result.ok) {
                        await Swal.fire({ icon: "success", title: "Solicitação enviada!", text: result.msg });
                        window.location.reload();
                    } else {
                        await Swal.fire({ icon: "error", title: "Erro!", text: result.msg });
                    }
                } catch {
                    adocaoModal.hide();
                    await Swal.fire({ icon: "error", title: "Erro de Conexão", text: "Não foi possível se comunicar com o servidor." });
                }
            });
        }
    }
});
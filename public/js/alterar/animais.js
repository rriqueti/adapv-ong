document.addEventListener("DOMContentLoaded", function () {
    const formAnimal = document.getElementById("formAnimal");
    const dropZone = document.getElementById("dropZone");
    const fotosInput = document.getElementById("fotosInput");
    const previasContainer = document.getElementById("previasContainer");

    let arquivosSelecionados = [];

    // --- Drag & Drop ---
    if (dropZone) {
        dropZone.addEventListener("click", () => fotosInput.click());

        dropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZone.classList.add("drag-over");
        });
        dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("drag-over");
            adicionarArquivos(Array.from(e.dataTransfer.files));
        });

        fotosInput.addEventListener("change", (e) => {
            adicionarArquivos(Array.from(e.target.files));
            e.target.value = "";
        });
    }

    function adicionarArquivos(novosArquivos) {
        const permitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        novosArquivos.forEach(file => {
            if (!permitidos.includes(file.type)) return;
            arquivosSelecionados.push(file);
        });
        renderPrevias();
    }

    function renderPrevias() {
        previasContainer.innerHTML = "";
        const dt = new DataTransfer();
        arquivosSelecionados.forEach(f => dt.items.add(f));
        fotosInput.files = dt.files;

        arquivosSelecionados.forEach((file, idx) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const item = document.createElement("div");
                item.className = "foto-item";
                item.id = "previa-novo-" + idx;
                item.innerHTML = `
                    <img src="${e.target.result}" alt="Prévia">
                    <div class="foto-actions">
                        <button type="button" class="btn-foto btn-foto-remove" onclick="removerNovo(${idx})" title="Remover">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                previasContainer.appendChild(item);
            };
            reader.readAsDataURL(file);
        });
    }

    window.removerNovo = function (idx) {
        arquivosSelecionados.splice(idx, 1);
        renderPrevias();
    };

    // --- Foto de perfil em fotos existentes (AJAX) ---
    window.definirPerfilExistente = async function (fotoId, aniId) {
        const res = await fetch('/animais/foto/perfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ foto_id: fotoId, ani_id: aniId })
        });
        const r = await res.json();
        if (r.ok) {
            // Atualiza visual: remove is-perfil de todos, adiciona no clicado
            document.querySelectorAll('#fotosExistentes .foto-item').forEach(el => {
                el.classList.remove('is-perfil');
                const badge = el.querySelector('.badge-perfil');
                if (badge) badge.remove();
            });
            const alvo = document.getElementById('foto-db-' + fotoId);
            if (alvo) {
                alvo.classList.add('is-perfil');
                const badge = document.createElement('span');
                badge.className = 'badge-perfil';
                badge.textContent = '⭐ Perfil';
                alvo.appendChild(badge);
            }
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Foto de perfil atualizada!', showConfirmButton: false, timer: 2000 });
        } else {
            Swal.fire('Erro!', r.msg, 'error');
        }
    };

    // --- Remover foto existente ---
    window.removerFotoExistente = async function (fotoId, fotoPath) {
        const confirm = await Swal.fire({
            title: 'Remover Foto?',
            text: 'Esta ação não pode ser desfeita.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Sim, remover',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        const res = await fetch('/animais/foto/excluir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ foto_id: fotoId, foto_path: fotoPath })
        });
        const r = await res.json();
        if (r.ok) {
            const item = document.getElementById('foto-db-' + fotoId);
            if (item) item.remove();
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Foto removida!', showConfirmButton: false, timer: 2000 });
        } else {
            Swal.fire('Erro!', r.msg, 'error');
        }
    };

    // --- Submit ---
    if (formAnimal) {
        formAnimal.addEventListener("submit", function (e) {
            e.preventDefault();

            const dataDesconhecida = document.getElementById("dataDesconhecida").checked;
            const campoData = document.getElementById("campoData");
            if (dataDesconhecida && campoData) {
                campoData.disabled = false;
                campoData.value = "";
            }

            Swal.fire({
                title: "Confirmar Alterações?",
                text: "Os dados do animal serão atualizados.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#10b981",
                confirmButtonText: "Sim, atualizar",
                cancelButtonText: "Revisar"
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(formAnimal);
                    if (arquivosSelecionados.length > 0) {
                        formData.delete("fotos");
                        arquivosSelecionados.forEach(f => formData.append("fotos", f));
                    }

                    fetch("/animais/alterar", {
                        method: "POST",
                        body: formData
                    })
                    .then(r => r.json())
                    .then(r => {
                        if (r.ok) {
                            Swal.fire("Sucesso!", r.msg, "success")
                            .then(() => window.location.href = "/animais/listar");
                        } else {
                            Swal.fire("Erro!", r.msg, "error");
                        }
                    })
                    .catch(() => Swal.fire("Erro!", "Não foi possível conectar ao servidor.", "error"));
                }
            });
        });
    }

    // --- Checkbox data desconhecida ---
    const chkDesconhecida = document.getElementById("dataDesconhecida");
    const inputData = document.getElementById("campoData");
    if (chkDesconhecida && inputData) {
        chkDesconhecida.addEventListener("change", function () {
            inputData.disabled = this.checked;
            if (this.checked) inputData.value = "";
        });
    }
});
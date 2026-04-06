document.addEventListener("DOMContentLoaded", function () {
    const formAnimal = document.getElementById("formAnimal");
    const dropZone = document.getElementById("dropZone");
    const fotosInput = document.getElementById("fotosInput");
    const previasContainer = document.getElementById("previasContainer");
    const fotoPerfil = document.getElementById("fotoPerfil");

    let arquivosSelecionados = []; // DataTransfer para manter a lista
    let perfilIndex = 0; // índice da foto que será o perfil

    // --- Drag & Drop ---
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
        e.target.value = ""; // reseta o input para permitir reselecionar
    });

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

        // Sincroniza o input de arquivo com os arquivos selecionados
        const dt = new DataTransfer();
        arquivosSelecionados.forEach(f => dt.items.add(f));
        fotosInput.files = dt.files;

        arquivosSelecionados.forEach((file, idx) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const item = document.createElement("div");
                item.className = "foto-item" + (idx === perfilIndex ? " is-perfil" : "");
                item.id = "previa-" + idx;

                item.innerHTML = `
                    <img src="${e.target.result}" alt="Prévia">
                    <div class="foto-actions">
                        <button type="button" class="btn-foto btn-foto-perfil" onclick="definirPerfilNovo(${idx})" title="Definir como perfil">
                            <i class="fas fa-star"></i>
                        </button>
                        <button type="button" class="btn-foto btn-foto-remove" onclick="removerNovo(${idx})" title="Remover">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    ${idx === perfilIndex ? '<span class="badge-perfil">⭐ Perfil</span>' : ''}
                `;
                previasContainer.appendChild(item);
            };
            reader.readAsDataURL(file);
        });

        fotoPerfil.value = perfilIndex;
    }

    window.definirPerfilNovo = function (idx) {
        perfilIndex = idx;
        renderPrevias();
    };

    window.removerNovo = function (idx) {
        arquivosSelecionados.splice(idx, 1);
        if (perfilIndex >= arquivosSelecionados.length) {
            perfilIndex = Math.max(0, arquivosSelecionados.length - 1);
        }
        renderPrevias();
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
                title: "Confirmar Cadastro?",
                text: "Os dados do animal serão salvos.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#10b981",
                confirmButtonText: "Sim, cadastrar",
                cancelButtonText: "Revisar"
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData(formAnimal);
                    // Re-adiciona os arquivos selecionados
                    if (fotosInput.files.length > 0) {
                        formData.delete("fotos");
                        arquivosSelecionados.forEach(f => formData.append("fotos", f));
                    }

                    fetch("/animais/cadastrar", {
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
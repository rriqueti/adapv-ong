document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const adocaoCards = document.querySelectorAll('.adocao-card-wrapper');
    const actionButtons = document.querySelectorAll('.btn-acao-adocao');

    // Lógica de Filtro
    if (filterButtons.length > 0 && adocaoCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Gerencia classe 'active'
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                adocaoCards.forEach(card => {
                    if (filter === 'todos' || card.dataset.status === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lógica para Aprovar/Rejeitar
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const adocaoId = this.dataset.id;
                const acao = this.dataset.acao;
                const animalNome = this.closest('.adocao-card').querySelector('.animal-nome').textContent;

                const confirmResult = await Swal.fire({
                    title: `Confirmar Ação`,
                    text: `Você tem certeza que deseja "${acao}" a solicitação de adoção para ${animalNome}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: acao === 'Aprovada' ? '#198754' : '#dc3545',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: `Sim, ${acao}!`,
                    cancelButtonText: 'Cancelar'
                });

                if (confirmResult.isConfirmed) {
                    try {
                        const response = await fetch('/adocao/status', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: adocaoId, status: acao })
                        });

                        const result = await response.json();

                        if (result.ok) {
                            await Swal.fire('Sucesso!', result.msg, 'success');
                            window.location.reload();
                        } else {
                            await Swal.fire('Erro!', result.msg, 'error');
                        }
                    } catch (error) {
                        await Swal.fire('Erro de Conexão', 'Não foi possível se comunicar com o servidor.', 'error');
                    }
                }
            });
        });
    }
});
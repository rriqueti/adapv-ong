$(document).ready(function() {
    $('#volun').select2({
        tags: true,
        tokenSeparators: [','],
        placeholder: 'Digite os nomes dos voluntário participantes',
        // Opções adicionais conforme necessário
    });

    $('#volun').on('change', function() {
        // Aqui você pode lidar com a alteração das opções selecionadas, se necessário
        var selectedOptions = $(this).val();
        console.log(selectedOptions);
    });
});
  
$(document).ready(function() {
    $('#empresa').select2({
        tags: true,
        tokenSeparators: [','],
        placeholder: 'Digite os nomes das empresas parceiras',
        // Opções adicionais conforme necessário
    });

    $('#empresa').on('change', function() {
        // Aqui você pode lidar com a alteração das opções selecionadas, se necessário
        var selectedOptions = $(this).val();
        console.log(selectedOptions);
    });
});

$(document).ready(function() {
    $('#selectanimais').select2({
        tags: true,
        tokenSeparators: [','],
        placeholder: 'Digite os nomes dos animais',
        // Opções adicionais conforme necessário
    });

    $('#selectanimais').on('change', function() {
        // Aqui você pode lidar com a alteração das opções selecionadas, se necessário
        var selectedOptions = $(this).val();
        console.log(selectedOptions);
    });
});
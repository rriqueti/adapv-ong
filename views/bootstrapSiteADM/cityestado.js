document.getElementById('Estadu').addEventListener('change', function() {
    var estadoSelecionado = this.value;
    var selectCidades = document.getElementById('Citys');

    var cidadesPorEstado = {
        'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Senador Guiomard'],
        'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
        'AP': ['Macapá', 'Santana', 'Laranjal do Jari'],
        'AM': ['Manaus', 'Parintins', 'Itacoatiara'],
        'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
        'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
        'DF': ['Brasília'],
        'ES': ['Vitória', 'Vila Velha', 'Serra'],
        'GO': ['Goiânia', 'Aparecida de Goiânia', 'Anápolis'],
        'MA': ['São Luís', 'Imperatriz', 'São José de Ribamar'],
        'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
        'MS': ['Campo Grande', 'Dourados', 'Três Lagoas'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
        'PA': ['Belém', 'Ananindeua', 'Santarém'],
        'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita'],
        'PR': ['Curitiba', 'Londrina', 'Maringá'],
        'PE': ['Recife', 'Jaboatão dos Guararapes', 'Olinda'],
        'PI': ['Teresina', 'Parnaíba', 'Picos'],
        'RJ': ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias'],
        'RN': ['Natal', 'Mossoró', 'Parnamirim'],
        'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Novo Hamburgo', 'Canoas', 'Gravataí', 'Viamão', 'São Leopoldo', 'Rio Grande'],
        'RO': ['Porto Velho', 'Ji-Paraná', 'Ariquemes'],
        'RR': ['Boa Vista', 'Rorainópolis'],
        'SC': ['Florianópolis', 'Joinville', 'Blumenau'],
        'SP': ['Americana', 'Araraquara', 'Araçatuba', 'Atibaia', 'Barueri', 'Bauru', 'Botucatu', 'Bragança Paulista', 'Campinas', 'Carapicuíba', 'Cotia', 'Cruzeiro', 'Diadema', 'Embu das Artes', 'Ferraz de Vasconcelos', 'Franca', 'Francisco Morato', 'Guaratinguetá', 'Guarujá', 'Hortolândia', 'Indaiatuba', 'Itapecerica da Serra', 'Itapetininga', 'Itapeva', 'Itapevi', 'Itaquaquecetuba', 'Itu', 'Jacareí', 'Jundiaí', 'Limeira', 'Marília', 'Mogi Guaçu', 'Mogi das Cruzes', 'Osasco', 'Pindamonhangaba', 'Piracicaba', 'Poá', 'Praia Grande', 'Presidente Prudente', 'Ribeirão Preto', 'Rio Claro', 'Santo André', 'Santos', 'Sorocaba', 'Sumaré', 'Suzano', 'São Bernardo do Campo', 'São Caetano do Sul', 'São Carlos', 'São José do Rio Preto', 'São José dos Campos', 'São Paulo', 'São Vicente', 'Taboão da Serra', 'Taubaté'],
        'SE': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto'],
        'TO': ['Palmas', 'Araguaína', 'Gurupi'],
        'EX': ['Cidade Internacional 1', 'Cidade Internacional 2'] // Exemplo para Estrangeiro
    };

    selectCidades.innerHTML = ''; // Limpa as cidades existentes

    if (cidadesPorEstado[estadoSelecionado]) {
        cidadesPorEstado[estadoSelecionado].forEach(function(cidade) {
            var novaOpcao = new Option(cidade, cidade);
            selectCidades.add(novaOpcao);
        });
    } else {
        selectCidades.add(new Option('Selecione um estado primeiro...', ''));
    }
});
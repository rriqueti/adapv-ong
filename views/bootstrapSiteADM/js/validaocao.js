// CPF //
function mCpf() {
    var cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    event.target.value = cpf;
}
// Validar CPF //
function validarCPF() {
    var cpf = event.target.value;
    var ok = 1;
    var add;
    if (cpf != "") {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            ok = 0;
        if (ok == 1) {
            add = 0;
            for (i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                ok = 0;
            if (ok == 1) {
                add = 0;
                for (i = 0; i < 10; i++)
                    add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(cpf.charAt(10)))
                    ok = 0;
            }
        }
        if (ok == 0) {
            document.getElementById("erroCPF").textContent = "É necessário informar um CPF válido.";
            event.target.style.border = "2px solid red"
        }
        else{
            document.getElementById("erroCPF").textContent = "";
            event.target.style.border = ""
        }
    }
}

// CEP //
function mCEP() {
    var cep = event.target.value;
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/.(\d{3})(\d)/, ".$1-$2")
    event.target.value = cep;
}

// DATA //
function vData() {
    var data = event.target.value;

    // Remove tudo o que não é dígito
    data = data.replace(/\D/g, "");

    // Adiciona a primeira barra após o dia
    if (data.length >= 2) {
        data = data.substring(0, 2) + '/' + data.substring(2);
    }

    // Adiciona a segunda barra após o mês
    if (data.length >= 5) {
        data = data.substring(0, 5) + '/' + data.substring(5);
    }

    // Verifica se a data é válida
    if (data.length === 10) {
        var partes = data.split('/');
        var dia = parseInt(partes[0], 10);
        var mes = parseInt(partes[1], 10);
        var ano = parseInt(partes[2], 10);

        if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900 || ano > 2023) {
            document.getElementById("erroData").textContent = "É necessário informar uma data válida";
            event.target.value = '';
            event.target.style.border = "2px solid red"
            return;
        }else{
            document.getElementById("erroData").textContent = "";
            event.target.style.border = ""


        }
    }

    // Atualiza o valor do campo com a data formatada
    event.target.value = data;
}


// RG //
function vRG() {
    var rg = event.target.value;

    // Remove tudo o que não é dígito
    rg = rg.replace(/\D/g, "");

    // Adiciona o primeiro ponto após os dois primeiros dígitos
    if (rg.length >= 2) {
        rg = rg.substring(0, 2) + '.' + rg.substring(2);
    }   

    // Adiciona o segundo ponto após os cinco primeiros dígitos
    if (rg.length >= 6) {
        rg = rg.substring(0, 6) + '.' + rg.substring(6);
    }

    // Adiciona o traço após o oitavo dígito
    if (rg.length >= 10) {
        rg = rg.substring(0, 10) + '-' + rg.substring(10, 11);
    }

    // Atualiza o valor do campo com o RG formatado
    event.target.value = rg;
}
// TEL //
function mTel () {
    var tel = event.target.value;
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
       tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
       tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
       tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
       tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
       tel = tel.replace(/(.{4})$/, "-$1")
    }
    event.target.value = tel;
 }

 //Validar Email //
 function vEmail() {
    var email = event.target.value;
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!regex.test(email)) {
        document.getElementById("erroEmail").textContent = "É necessário informar um email válido";
            event.target.style.border = "2px solid red"
            return;
        }else{
            document.getElementById("erroEmail").textContent = "";
            event.target.style.border = ""
        }
}

function vCampos() {
    var campos = [
        { id: "nome", nome: "Nome"},
        { id: "campoCPF", nome: "CPF", validacao: validarCPF },
        { id: "campoCEP", nome: "CEP", validacao: mCEP },
        { id: "campoData", nome: "Data", validacao: vData },
        { id: "campoRG", nome: "RG", validacao: vRG },
        { id: "campoTel", nome: "Telefone", validacao: mTel },
        { id: "campoEmail", nome: "Email", validacao: vEmail }
    ];
    var campo
    for (var i = 0; i < campos.length; i++) {
        campo = document.getElementById(campos[i].id);
        if (!campo.value) {
            alert("O campo " + campos[i].nome + " não foi preenchido.");
            return false;
        }
        campos[i].validacao();
    }
    return true;
}
function mascara(m,t,e){
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g,'');
    var l = texto.length;
    var lm = m.length;
    if(window.event) {                  
       id = e.keyCode;
    } else if(e.which){                 
       id = e.which;
    }
    cursorfixo=false;
    if(cursor < l)cursorfixo=true;
    var livre = false;
    if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
    ii=0;
    mm=0;
    if(!livre){
       if(id!=8){
          t.value="";
          j=0;
          for(i=0;i<lm;i++){
             if(m.substr(i,1)=="#"){
                t.value+=texto.substr(j,1);
                j++;
             }else if(m.substr(i,1)!="#"){
                      t.value+=m.substr(i,1);
                    }
                    if(id!=8 && !cursorfixo)cursor++;
                    if((j)==l+1)break;
                        
          } 	
       }
    }
    if(cursorfixo && !livre)cursor--;
      t.setSelectionRange(cursor, cursor);
  }
  function validarCNPJ() {
    var cnpj = event.target.value;
    var ok = true;

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '' || cnpj.length != 14) {
        ok = false;
    }

    var cnpjInvalidos = [
        "00000000000000", "11111111111111", "22222222222222",
        "33333333333333", "44444444444444", "55555555555555",
        "66666666666666", "77777777777777", "88888888888888",
        "99999999999999"
    ];

    if (cnpjInvalidos.includes(cnpj)) {
        ok = false;
    }

    if (ok) {
        var tamanho = cnpj.length - 2
        var numeros = cnpj.substring(0, tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }

        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            ok = false;
        }

        if (ok) {
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)) {
                ok = false;
            }
        }
    }

    if (!ok) {
        alert("Ops... Ocorreu um problema... CNPJ inválido!");
        document.getElementById("CNPJ").style.border="2px solid red";
    }else{
        document.getElementById("CNPJ").style.border="1px solid black";
    }
}

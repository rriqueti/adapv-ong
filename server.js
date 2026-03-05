const express = require('express')
const expressEjsLayout = require('express-ejs-layouts');

let AdocaoRoute = require("./routes/adocaoRoutes");
let AnimaisRoute = require("./routes/animaisRoutes");
let AtividadesRoute = require("./routes/atividadesRoutes");
let DoacoesRoute = require("./routes/doacoesRoutes");
let EmpresasRoute = require("./routes/empresasRoutes");
let EnderecoRoute = require("./routes/enderecoRoutes");
let PessoaRoute = require("./routes/pessoaRoutes");
let ProjetosRoute = require("./routes/projetosRoutes");
let VoluntariosRoute = require("./routes/voluntariosRoutes");
let HomeRoute = require("./routes/homeRoute")
let EventosRoute = require("./routes/eventosRoutes")
let PatrimonioRoute = require("./routes/patrimonioRoutes")
let ProdutosRoute = require("./routes/produtosRoutes")
let EstoqueRoute = require("./routes/estoqueRoutes")
let CtrlSaidaEventoRoutes = require("./routes/ctrlSaidaEventoRoutes")
let AdminRoute = require("./routes/adminRoutes");
let loginRoute = require("./routes/loginRoutes");
// let ONGADAPVRoute = require("./routes/ONGADAPVRoutes");
const cookieParser = require('cookie-parser');
const AuthMiddleware = require('./middleware/authMiddleware');

const app = express();

// Configurações ---

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.use(expressEjsLayout);
app.use(cookieParser());

// ---

app.use('/login', loginRoute)

let auth = new AuthMiddleware();
app.use(auth.auth);

// Rotas ---
app.use('/', HomeRoute)
app.use('/pessoa', PessoaRoute)
app.use('/adocao', AdocaoRoute);
app.use('/animais', AnimaisRoute);
app.use('/atividades', AtividadesRoute);
app.use('/doacoes', DoacoesRoute);
app.use('/empresas', EmpresasRoute);
app.use('/projeto', ProjetosRoute);
app.use('/voluntarios', VoluntariosRoute);
app.use('/endereco', EnderecoRoute);
app.use('/eventos', EventosRoute)
app.use('/patrimonio', PatrimonioRoute)
app.use('/produtos', ProdutosRoute)
app.use('/estoque', EstoqueRoute)
app.use('/ctrlSaidaEvento', CtrlSaidaEventoRoutes)
app.use('/admin', AdminRoute)
// app.use('/ONGADAPV', ONGADAPVRoute)



// ---

app.listen(5000, function () {
    console.log("Site está no ar.")
})
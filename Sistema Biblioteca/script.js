let livros = [];
let usuarios = [];
let emprestimos = [];

const tabelaLivros = document.getElementById("tabelaLivros");
const tabelaUsuarios = document.getElementById("tabelaUsuarios")
const tabelaEmprestimos = document.getElementById("tabelaEmprestimos")

//Cadastro de Livros
document.getElementById("formLivro").addEventListener("submit", e => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const ano = document.getElementById("ano").value;
    const status = document.getElementById("status").value;
    
    livros.push({ titulo, autor, ano, status});
    e.target.reset();
    renderLivros();
    atualizarSelectLivros();
});
function renderLivros() {
    tabelaLivros.innerHTML = "";
    livros.forEach(livro => {
        tabelaLivros.innerHTML += `
        <tr>
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.ano}</td>
        <td>${livro.status}</td>
        </tr>
        `;
    })
}

//Cadastro de Usuários

document.getElementById("formUsuario").addEventListener("submit", e =>{
    e.preventDefault();
    const nome = document.getElementById("nomeUsuario").value;
    usuarios.push({ nome });
    e.target.reset();
    renderUsuarios();
    atualizarSelectUsuarios();
});

function renderUsuarios() {
    tabelaUsuarios.innerHTML = "";
    usuarios.forEach(usuario => {
        tabelaUsuarios.innerHTML +=
    `<tr><td>${usuario.nome}</td></tr>
    `;
});
}

// Empréstimos
document.getElementById("formEmprestimo").addEventListener("submit", e => {
    e.preventDefault();
    const usuario = document.getElementById("usuarioEmprestimo").value;
    const livro = document.getElementById("livroEmprestimo").value;
    const data = document.getElementById("dataEmprestimo").value;

    // Atualiza status do livro
    const livroOBJ = livros.find(l => l.titulo === livro);
    if (livroOBJ && livroOBJ.status === "Disponível"){
        livroOBJ.status = "Emprestado";
        emprestimos.push({usuario, livro, data});
    } else {
        alert("Livro já emprestado!");
    }
    
    renderLivros();
    renderEmprestimos();
    atualizarSelectLivros();
});

function renderEmprestimos(){
    tabelaEmprestimos.innerHTML = "";
    emprestimos.forEach((emp, index) => {
        tabelaEmprestimos.innerHTML +=
        `<tr>
            <td>${emp.usuario}</td>
            <td>${emp.livro}</td>
            <td>${emp.data}</td>
            <td><button class="delete" onclick="devolverLivro(${index})">Devolver</button></td>
            
        </tr>
        `;
    });
}

// Devolução

function devolverLivro(index){
const emp = emprestimos[index];
const livroOBJ = livros.find(l => l.titulo === emp.livro);
if(livroOBJ) livroOBJ.status = "Disponível";
emprestimos.splice(index, 1);
renderLivros();
renderEmprestimos();
atualizarSelectLivros();
}

// atualiza selects
function atualizarSelectUsuarios() {
    const select = document.getElementById("usuarioEmprestimo");
    select.innerHTML = "";
    usuarios.forEach(usuario => {
        select.innerHTML += `<option value="${usuario.nome}">${usuario.nome}</option>`;
    });
}
function atualizarSelectLivros(){
    const select = document.getElementById("livroEmprestimo");
    select.innerHTML = "";
    livros.forEach(livro => {
        if (livro.status === "Disponível"){
            select.innerHTML += `<option value="${livro.titulo}">${livro.titulo}</option>`;
        }
    });
}
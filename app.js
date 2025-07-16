const usuarios = [
  { usuario: "admin", senha: "1234", tipo: "admin" },
  { usuario: "func", senha: "1234", tipo: "func" }
];

let usuarioAtual = null;

function login() {
  const u = document.getElementById('user').value.trim();
  const s = document.getElementById('pass').value.trim();
  const erro = document.getElementById('erroLogin');
  erro.innerText = "";

  if (!u || !s) {
    erro.innerText = "Preencha todos os campos.";
    return;
  }

  const found = usuarios.find(user => user.usuario === u && user.senha === s);
  if (found) {
    usuarioAtual = found;
    document.getElementById('login').style.display = 'none';
    document.getElementById('conteudo').style.display = 'block';
    navigate('dashboard');
  } else {
    erro.innerText = 'Usuário ou senha inválidos';
  }
}

function logout() {
  usuarioAtual = null;
  document.getElementById('login').style.display = 'block';
  document.getElementById('conteudo').style.display = 'none';
  document.getElementById('user').value = "";
  document.getElementById('pass').value = "";
  document.getElementById('erroLogin').innerText = "";
}

function navigate(secao) {
  const secoes = document.querySelectorAll('.section');
  secoes.forEach(s => s.classList.remove('active'));
  document.getElementById(secao).classList.add('active');

  const itens = document.querySelectorAll('.sidebar ul li');
  itens.forEach(i => i.classList.remove('active'));
  [...itens].find(i => i.innerText.toLowerCase().includes(secao))?.classList.add('active');

  if (secao === 'admin' && usuarioAtual?.tipo !== 'admin') {
    document.getElementById(secao).innerHTML = '<p style="color: #e53935; font-weight:bold; padding: 16px 0;">⚠️ Acesso restrito ao administrador.</p>';
  }
}

// Enter para login
document.getElementById('pass').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') login();
});
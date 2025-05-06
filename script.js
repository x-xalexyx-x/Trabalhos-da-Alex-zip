function appendToDisplay(value) {
    document.getElementById("display").value += value;
  }
  
  function clearDisplay() {
    document.getElementById("display").value = "";
  }
  
  function calculate() {
    try {
      const result = eval(document.getElementById("display").value);
      document.getElementById("display").value = result;
    } catch (error) {
      alert("Expressão inválida!");
    }
  }
  
  const taxas = {
    "USD": { "BRL": 5.2, "EUR": 0.93, "TRY": 32.1 },
    "BRL": { "USD": 0.19, "EUR": 0.18, "TRY": 6.2 },
    "EUR": { "USD": 1.08, "BRL": 5.6, "TRY": 34.4 },
    "TRY": { "USD": 0.031, "BRL": 0.16, "EUR": 0.029 }
  };

  function converterMoeda() {
    const valor = parseFloat(document.getElementById("valor").value);
    const moedaDe = document.getElementById("moedaDe").value;
    const moedaPara = document.getElementById("moedaPara").value;

    if (isNaN(valor)) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    if (moedaDe === moedaPara) {
      document.getElementById("valorConvertido").innerText = valor.toFixed(2) + " " + moedaPara;
      return;
    }

    const taxa = taxas[moedaDe][moedaPara];

    if (!taxa) {
      alert("Conversão não disponível.");
      return;
    }

    const resultado = valor * taxa;
    document.getElementById("valorConvertido").innerText = resultado.toFixed(2) + " " + moedaPara;
  }

  
  function adicionarTarefa() {
    const input = document.getElementById("novaTarefa");
    const texto = input.value.trim();
    if (texto === "") return;

    const li = document.createElement("li");
    li.textContent = texto;

    // Criar botão de concluir
    const botaoConcluir = document.createElement("button");
    botaoConcluir.textContent = "✔️ Concluir";
    botaoConcluir.style.marginLeft = "10px";
    botaoConcluir.onclick = function () {
        // Remove o botão de concluir
        botaoConcluir.style.display = "none";
        // Marca como concluída e move para a lista de concluídas
        li.classList.add("concluida");
        document.getElementById("listaConcluida").appendChild(li);
    };

    // Criar botão de excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "❌ Excluir";
    botaoExcluir.style.marginLeft = "10px";
    botaoExcluir.onclick = function () {
        li.remove();
    };

    li.appendChild(botaoConcluir);
    li.appendChild(botaoExcluir);

    document.getElementById("listaPendente").appendChild(li);

    input.value = "";
}


function gerarSenha() {
  const comprimento = document.getElementById("comprimento").value;
  const incluirMaiusculas = document.getElementById("incluirMaiusculas").checked;
  const incluirMinusculas = document.getElementById("incluirMinusculas").checked;
  const incluirNumeros = document.getElementById("incluirNumeros").checked;
  const incluirSimbolos = document.getElementById("incluirSimbolos").checked;
  
  const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const simbolos = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
  
  let caracteres = "";
  
  if (incluirMaiusculas) caracteres += maiusculas;
  if (incluirMinusculas) caracteres += minusculas;
  if (incluirNumeros) caracteres += numeros;
  if (incluirSimbolos) caracteres += simbolos;
  
  if (caracteres === "") {
      alert("Selecione ao menos um tipo de caractere.");
      return;
  }
  
  let senha = "";
  for (let i = 0; i < comprimento; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  
  document.getElementById("senhaGerada").value = senha;
}

function copiarSenha() {
  const senha = document.getElementById("senhaGerada");
  senha.select();
  document.execCommand("copy");
  alert("Senha copiada para a área de transferência!");
}


const palavras = [
  { palavra: "gato", dica: "Animal de estimação" },
  { palavra: "estrela", dica: "Objeto no céu" },
  { palavra: "arcoiris", dica: "Fenômeno óptico" },
  { palavra: "mestre", dica: "Pessoa com grande conhecimento" },
  { palavra: "amizade", dica: "Relação de carinho entre pessoas" }
];
let palavraSecreta;
let dica;
let erros;
let tentativasRestantes;
let letrasCorretas;

function iniciarJogo() {
  // Escolher uma palavra aleatória e sua dica
  const sorteio = palavras[Math.floor(Math.random() * palavras.length)];
  palavraSecreta = sorteio.palavra;
  dica = sorteio.dica;

  erros = 0;
  tentativasRestantes = 6;
  letrasCorretas = [];

  // Exibe a dica
  document.querySelector("#dica span").textContent = dica;

  // Atualiza a palavra com underscores
  document.getElementById("palavra").textContent = palavraSecreta.split('').map(() => '_').join(' ');

  // Atualiza as tentativas restantes
  document.getElementById("tentativas").textContent = tentativasRestantes;

  // Atualiza o número de erros
  document.getElementById("erros").textContent = erros;

  // Limpa o desenho do bonequinho
  document.getElementById("forca").textContent = '';

  // Cria o teclado
  criarTeclado();

  // Esconde a mensagem final
  document.getElementById("mensagemFinal").style.display = "none";
}

function criarTeclado() {
  const teclado = document.getElementById("teclado");
  teclado.innerHTML = '';

  const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');
  letras.forEach(letra => {
      const button = document.createElement("button");
      button.textContent = letra;
      button.onclick = () => jogar(letra);
      teclado.appendChild(button);
  });
}

function jogar(letra) {
  // Desabilita o botão após ser clicado
  const botoes = document.querySelectorAll("#teclado button");
  botoes.forEach(botao => {
      if (botao.textContent === letra) {
          botao.disabled = true;
      }
  });

  // Verifica se a letra está na palavra secreta
  if (palavraSecreta.includes(letra)) {
      letrasCorretas.push(letra);
      atualizarPalavra();
  } else {
      erros++;
      tentativasRestantes--;
      document.getElementById("erros").textContent = erros;
      document.getElementById("tentativas").textContent = tentativasRestantes;

      // Atualiza o desenho da forca com o bonequinho
      desenharForca();
  }

  // Verifica se o jogo acabou
  if (tentativasRestantes === 0) {
      mostrarMensagemFinal("Ah, você perdeu! A palavra era: " + palavraSecreta, "😭");
  } else if (!document.getElementById("palavra").textContent.includes('_')) {
      mostrarMensagemFinal("Parabéns! Você ganhou!", "🎉");
  }
}

function atualizarPalavra() {
  let palavraAtualizada = palavraSecreta.split('').map(letra => 
      letrasCorretas.includes(letra) ? letra : '_'
  ).join(' ');

  document.getElementById("palavra").textContent = palavraAtualizada;
}

function desenharForca() {
  const desenhos = [
      '🙂', // 0 erro
      '😐', // 1 erro
      '😞', // 2 erro
      '😢', // 3 erro
      '😣', // 4 erro
      '😭'  // 5 erro
  ];

  document.getElementById("forca").textContent = desenhos[erros];
}

function mostrarMensagemFinal(mensagem, emoji) {
  const mensagemFinal = document.getElementById("mensagemFinal");
  mensagemFinal.textContent = mensagem + " " + emoji;
  mensagemFinal.style.display = "block";
}

function reiniciarJogo() {
  iniciarJogo();
}

iniciarJogo();  // Inicia o jogo automaticamente ao carregar a página


function contarPalavras() {
  const texto = document.getElementById("texto").value;
  const palavras = texto.trim().split(/\s+/).filter(function(palavra) {
      return palavra.length > 0;
  });
  const contador = palavras.length;
  document.getElementById("contador").textContent = contador;
}


  
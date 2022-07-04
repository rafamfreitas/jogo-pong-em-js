
// variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// ajuste de velocidade da bola
let velocidadeXBolinha = 4;
let velocidadeYBolinha = 4;

// medidas da raquete
let xRaquete = 5;
let yRaquete = 140;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variáveis da colisão da raquete
let colidiu = false;

// variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErro = 0;

// placar do jogo
let meusPontos = 0;
let pontosOponente = 0;


// cria o campo de fundo
function setup() {
  createCanvas(600, 400);
}

//desenha no canva criado anteriormente, valor 0 para cor preta
function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoComLib(xRaquete, yRaquete);
  //mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  //verificaColisaoComLib(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponente();
  mostraPlacar();
  marcaPonto();  
  
}

//mostra a bola
function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

//movimenta a bola
function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

// faz com que a bola rebata ao tocar as bordas
function colisaoBolinha(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

// cria uma raquete para o jogador
function mostraRaquete(x, y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}

// permite jogador movimentar a raquete
function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

// faz com que a bolinha colida com a raquete
function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

// faz com que a bolinha colida com a raquete, mas utilizando uma lib pra isso
function verificaColisaoComLib(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
  }
}

// movimenta a raquete adversaria
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErro;
  calculaChanceDeErrar();
  
}

function mostraPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(280, 10, 40, 20);
  fill(255);
  text(meusPontos, 300, 26);
  //fill(color(255, 140, 0))
 // rect(400, 10, 40, 20);
 // fill(255);
 // text(pontosOponente, 420, 26);
}

// responsavel por marcar os pontos do jogo
function marcaPonto(){
   colidiu = collideRectCircle(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (colidiu){
    meusPontos += 1;
    velocidadeXBolinha ++;
    velocidadeYBolinha ++;
  }
  
  if (xBolinha < 10){
    meusPontos = 0;
    velocidadeXBolinha = 4;
    velocidadeYBolinha = 4;
  }
}

// faz com que o oponente tenha chance de errar as vezes
function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErro += 1;
    if (chanceDeErro >= 39){
      chanceDeErro = 40;
    }
  } else {
    chanceDeErro -= 1;
    if (chanceDeErro <= 35){
      chanceDeErro = 35;
    }
  }
}

function start(){ //Função de Inicio
    $("#inicio").hide();
    $("#fundoGame").append("<div id='jogador' class='animaJogador'></div>")
    $("#fundoGame").append("<div id='inimigo1'></div>")
    $("#fundoGame").append("<div id='inimigo2'></div>")
    $("#fundoGame").append("<div id='placar'></div>")

    var jogo = {}

    var podeAtirar = true

    var pontuacao = 0

    var posicaoY = 440

    var TECLA = {
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        P: 80
    }// mapeamento de teclas

    jogo.pressionou = []

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    })
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    })
    // verifica as teclas apertadas

    jogo.timer = setInterval(loop, 30)

    function loop(){
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        colisao();
        placar();
    } // Fim do Loop

    function moveJogador(){
        if(jogo.pressionou[TECLA.W]){
            var topo = parseInt($("#jogador").css("top"))
            if(topo >= 450){
                $("#jogador").css("top", topo - 10)
            }
        }
        if(jogo.pressionou[TECLA.S]){
            var topo = parseInt($("#jogador").css("top"))
            if(topo <= 575){
                $("#jogador").css("top", topo + 10)
            }
        }
        if(jogo.pressionou[TECLA.A]){
            var left = parseInt($("#jogador").css("left"))
            if(left >= 10){
                $("#jogador").css("left", left - 10)
            }
        }
        if(jogo.pressionou[TECLA.D]){
            var left = parseInt($("#jogador").css("left"))
            if(left <= 900){
                $("#jogador").css("left", left + 10)
            }
        }
        if(jogo.pressionou[TECLA.P]){
            disparo()
        }
    }// fim da função do jogador

    function disparo(){
        if(podeAtirar == true){
            podeAtirar = false
            let topo = parseInt($("#jogador").css("top"))
            let posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 20
            topoTiro = topo + 2
            $("#fundoGame").append("<div id='disparo'></div>")
            $("#disparo").css("top", topoTiro)
            $("#disparo").css("left", tiroX)
            var tempoDisparo = window.setInterval(executarDisparo, 30)
        }

            function executarDisparo(){
                let posicaoX = parseInt($("#disparo").css("left"))
                $("#disparo").css("left", posicaoX + 90)
                if(posicaoX > 900){
                    window.clearInterval(tempoDisparo)
                    tempoDisparo = null
                    $("#disparo").remove()
                    podeAtirar = true
                }
            }
    }// fim da func de atirar

    function moveInimigo1(){
        let posicaoX = parseInt($("#inimigo1").css("left"))
        $("#inimigo1").css("left", posicaoX - 5)
        $("#inimigo1").css("top", posicaoY)
        if(posicaoX <= 0){
            posicaoY = 440
            $("#inimigo1").css("left", 910)
            $("#inimigo1").css("top", posicaoY)
        }
    }//fim da func de mover o inimigo 1

    function moveInimigo2(){
        let posicaoX = parseInt($("#inimigo2").css("left"))
        $("#inimigo2").css("left", posicaoX - 3)
        $("#inimigo2").css("top", 550)
        if(posicaoX <= 0){
            $("#inimigo2").css("left", 910)
            $("#inimigo2").css("top", 550)
        }
    }// fim da func de mover o inimigo 2

    function colisao(){
        var colideJogadorInimigo1 = ($("#jogador").collision($("#inimigo1")))
        if(colideJogadorInimigo1.length > 0){
            $("#inimigo1").css("left", 910)
            $("#inimigo1").css("top", 550)
        }

        var colideJogadorInimigo2 = ($("#jogador").collision($("#inimigo2")))
        if(colideJogadorInimigo2.length > 0){
            $("#inimigo2").css("left", 910)
            $("#inimigo2").css("top", 550)
        }
        var colideDisparoInimigo1 = ($("#disparo").collision($("#inimigo1")))
        if(colideDisparoInimigo1.length > 0){
            $("#inimigo1").css("left", 910)
            $("#inimigo1").css("top", 550)
            $("#disparo").css("top", 1000)
            pontuacao += 50
            
        }
    } // Fim da func de colisão

    function placar(){
        $("#placar").html("<h2> PONTOS: " + pontuacao + "</h2>")
    }

    // IDEIA COLOCAR UMA MODEDA PARA SER COLETADA QUE APARECE EM QUALQUE LUGAR DA AREA ANDAVEL E ELA QUE FAZ AUMENTAR OS PONTOS

}// fim da func start
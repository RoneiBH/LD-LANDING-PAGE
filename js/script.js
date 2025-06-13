// Documentação: Script para a página de assistência técnica de smartphones
// Possui funcionalidades para controle de menu mobile, carrossel de depoimentos e validação de formulário

document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    const botaoMenu = document.getElementById('botaoMenu');
    const menuNav = document.getElementById('menu');
    const btnAnterior = document.getElementById('anterior');
    const btnProximo = document.getElementById('proximo');
    const depoimentos = document.querySelectorAll('.depoimento');
    const formularioContato = document.getElementById('formularioContato');
    
    // Índice atual do carrossel
    let indiceAtual = 0;
    const totalDepoimentos = depoimentos.length;
    
    // Função para alternar o menu mobile
    function alternarMenu() {
        // Alterna a classe 'aberto' para exibir/ocultar o menu
        menuNav.classList.toggle('aberto');
        
        // Alterna a animação do botão do menu (hambúrguer para X)
        const spans = botaoMenu.querySelectorAll('span');
        if (menuNav.classList.contains('aberto')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Função para fechar o menu ao clicar em um link de navegação
    function fecharMenuAoNavegar() {
        // Verifica se o menu está aberto antes de fechá-lo
        if (menuNav.classList.contains('aberto')) {
            alternarMenu();
        }
    }
    
    // Função para mostrar o depoimento pelo índice
    function mostrarDepoimento(indice) {
        // Esconde todos os depoimentos
        depoimentos.forEach(depoimento => {
            depoimento.style.display = 'none';
        });
        
        // Mostra apenas o depoimento atual
        depoimentos[indice].style.display = 'flex';
    }
    
    // Função para ir para o próximo depoimento
    function proximoDepoimento() {
        indiceAtual = (indiceAtual + 1) % totalDepoimentos;
        mostrarDepoimento(indiceAtual);
    }
    
    // Função para ir para o depoimento anterior
    function depoimentoAnterior() {
        indiceAtual = (indiceAtual - 1 + totalDepoimentos) % totalDepoimentos;
        mostrarDepoimento(indiceAtual);
    }
    
    // Função para validar o formulário
    function validarFormulario(evento) {
        evento.preventDefault();
        
        // Obter dados do formulário
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const modelo = document.getElementById('modelo').value.trim();
        const problema = document.getElementById('problema').value.trim();
        
        // Validação básica
        if (!nome || !email || !telefone || !modelo || !problema) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validação de email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            alert('Por favor, insira um endereço de email válido.');
            return;
        }
        
        // Validação de telefone (formato brasileiro)
        const regexTelefone = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
        if (!regexTelefone.test(telefone)) {
            alert('Por favor, insira um número de telefone válido (ex: (11) 99999-8888).');
            return;
        }
        
        // Simulação de envio bem-sucedido (em produção, aqui enviaria para o servidor)
        alert('Obrigado! Sua solicitação foi enviada com sucesso. Entraremos em contato em breve.');
        formularioContato.reset();
    }
    
    // Função para rolagem suave ao clicar em links de navegação
    function configurarRolagemSuave() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Fecha o menu mobile se estiver aberto
                fecharMenuAoNavegar();
                
                // Obtém o elemento alvo
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcula a posição considerando o cabeçalho fixo
                    const headerHeight = document.getElementById('cabecalho').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Realiza a rolagem suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Função para destacar o item do menu conforme a rolagem
    function configurarDestaqueMenu() {
        // Obtém todas as seções para observar
        const secoes = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let posicaoAtual = window.scrollY + window.innerHeight / 3;
            
            secoes.forEach(secao => {
                const secaoTopo = secao.offsetTop - document.getElementById('cabecalho').offsetHeight;
                const secaoAltura = secao.offsetHeight;
                const secaoId = secao.getAttribute('id');
                
                if(posicaoAtual >= secaoTopo && posicaoAtual < secaoTopo + secaoAltura) {
                    // Remove a classe 'ativo' de todos os links
                    document.querySelectorAll('nav ul li a').forEach(link => {
                        link.classList.remove('ativo');
                    });
                    
                    // Adiciona a classe 'ativo' ao link correspondente à seção visível
                    const linkAtivo = document.querySelector(`nav ul li a[href="#${secaoId}"]`);
                    if (linkAtivo) {
                        linkAtivo.classList.add('ativo');
                    }
                }
            });
        });
    }
    
    // Função para animar o cabeçalho ao rolar a página
    function configurarAnimacaoCabecalho() {
        const cabecalho = document.getElementById('cabecalho');
        let posicaoAnterior = window.pageYOffset;
        
        window.addEventListener('scroll', () => {
            const posicaoAtual = window.pageYOffset;
            
            // Adiciona sombra mais pronunciada quando a página rola para baixo
            if (posicaoAtual > 50) {
                cabecalho.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                cabecalho.style.padding = '0.7rem 0';
            } else {
                cabecalho.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                cabecalho.style.padding = '1rem 0';
            }
            
            posicaoAnterior = posicaoAtual;
        });
    }
    
    // Inicialização
    function inicializar() {
        // Configurar eventos do menu
        botaoMenu.addEventListener('click', alternarMenu);
        
        // Configurar eventos do carrossel
        btnAnterior.addEventListener('click', depoimentoAnterior);
        btnProximo.addEventListener('click', proximoDepoimento);
        
        // Configurar validação do formulário
        formularioContato.addEventListener('submit', validarFormulario);
        
        // Configurar rolagem suave
        configurarRolagemSuave();
        
        // Configurar destaque do menu durante a rolagem
        configurarDestaqueMenu();
        
        // Configurar animação do cabeçalho
        configurarAnimacaoCabecalho();
        
        // Mostrar o primeiro depoimento
        mostrarDepoimento(indiceAtual);
        
        // Iniciar rotação automática do carrossel
        setInterval(proximoDepoimento, 5000);
    }
    
    // Iniciar aplicação
    inicializar();
});


//✅ JavaScript para redirecionar para o WhatsApp
document.getElementById("formularioContato").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const modelo = document.getElementById("modelo").value;
    const problema = document.getElementById("problema").value;

    const mensagem = `Olá, me chamo ${nome}.\n\nGostaria de solicitar um orçamento com as seguintes informações:\n📱 Modelo: ${modelo}\n⚠️ Problema: ${problema}\n📧 E-mail: ${email}\n📞 Telefone: ${telefone}`;

    const numeroWhatsApp = "5531983452191"; // Substitua pelo número desejado
    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, '_blank');
});
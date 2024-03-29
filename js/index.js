function setupIntersectionObserver(selector, animationClass) {
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                // Remover o observador após a classe ser adicionada para evitar repetição
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Observar o viewport
        rootMargin: window.innerWidth >= 800 ? '280px' : '180px', // Definir a margem inicial
        threshold: 0.5 // 50% de interseção é necessário
    });

    const elementosAnimacao = document.querySelectorAll(selector);

    elementosAnimacao.forEach(elemento => {
        observer.observe(elemento);
    });

    // Adicionando um listener de redimensionamento da janela para ajustar dinamicamente a margem
    window.addEventListener('resize', () => {
        observer.rootMargin = window.innerWidth >= 800 ? '280px' : '180px';
    });
}

setupIntersectionObserver('.membro-direita', 'animacao-membro-direita');
setupIntersectionObserver('.logo-nav', 'animacao-membro-esquerda');
setupIntersectionObserver('.membro-meio', 'animacao-membro-meio');
setupIntersectionObserver('.two-buttons', 'animacao-membro-meio');
setupIntersectionObserver('.card-confronto', 'animacao-membro-esquerda')

function setupIntersectionObserverMargin(selector, animationClass) {
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                // Remover o observador após a classe ser adicionada para evitar repetição
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Observar o viewport
        rootMargin: window.innerWidth >= 800 ? '250px' : '350px', // Definir a margem inicial
        threshold: 0.5 // 50% de interseção é necessário
    });

    const elementosAnimacao = document.querySelectorAll(selector);

    elementosAnimacao.forEach(elemento => {
        observer.observe(elemento);
    });

    // Adicionando um listener de redimensionamento da janela para ajustar dinamicamente a margem
    window.addEventListener('resize', () => {
        observer.rootMargin = window.innerWidth >= 800 ? '0px' : '250px';
    });
}
setupIntersectionObserverMargin('.descricao-patrocinador', 'animacao-membro-meio');
setupIntersectionObserverMargin('.conteudo-sobre', 'animacao-membro-meio');
setupIntersectionObserverMargin('.banner-apresentacao-animacao', 'animacao-membro-esquerda');

const slider = document.getElementsByClassName('container-wrapper');
for (let i = 0; i < slider.length; i++) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider[i].addEventListener('mousedown', (e) => {
        isDown = true;
        slider[i].classList.add('active');
        startX = e.pageX - slider[i].offsetLeft;
        scrollLeft = slider[i].scrollLeft;
    });

    slider[i].addEventListener('mouseleave', () => {
        isDown = false;
        slider[i].classList.remove('active');
    });

    slider[i].addEventListener('mouseup', () => {
        isDown = false;
        slider[i].classList.remove('active');
    });

    slider[i].addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider[i].offsetLeft;
        const walk = (x - startX) * 3;
        slider[i].scrollLeft = scrollLeft - walk;
    });
}

function DownLoadImage() {
    let button = document.getElementsByClassName('download')

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener('click', function () {

            var downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', 'black-inside.png');
            downloadLink.href = `papeis/papel-${i + 1}.png`;

            document.body.appendChild(downloadLink);

            downloadLink.click();

            document.body.removeChild(downloadLink);
        });
    }
}
DownLoadImage()

function MenuMobile() {
    let menu = document.getElementById('menu')

    menu.addEventListener('click', function () {
        let menuMobile = document.getElementById('menuMobile')

        menuMobile.classList.remove('close-efeito')
        menuMobile.classList.toggle('menu-none')
    })

    let close = document.getElementById('close')

    close.addEventListener('click', function () {
        let menuMobile = document.getElementById('menuMobile')

        menuMobile.classList.toggle('close-efeito')
        setTimeout(() => {
            menuMobile.classList.toggle('menu-none')
        }, 1000)
    })
}
MenuMobile()


document.getElementById('squad').addEventListener('click', function () {
    alert('Infelizmente esse evento ainda esta em produção.')
})

document.getElementById('x1').addEventListener('click', function () {
    alert('Infelizmente esse evento ainda esta em produção.')
})

/*
function Contador() {
    // Função para enviar o IP para o arquivo PHP
    function enviarIPParaContadorPHP() {
        // Obtendo o IP do usuário
        getIP(function (ip) {
            // Criando um objeto FormData
            var formData = new FormData();
            formData.append('ip', ip);

            // Enviando o IP para o arquivo PHP usando fetch
            fetch('./php/contador.php', {
                method: 'POST',
                body: formData
            })
        });
    }

    // Função para obter o IP do usuário
    function getIP(callback) {
        // Usando uma API gratuita para obter o IP
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                callback(data.ip);
            })
            .catch(error => console.error('Erro ao obter o IP:', error));
    }

    // Chamando a função para enviar o IP ao carregar a página
    window.onload = enviarIPParaContadorPHP;

}
Contador()

<?php
// Configurações do banco de dados
$host = 'localhost';
$dbname = 'contador_ip';
$username = 'root';
$password = '';

// Conexão com o banco de dados usando PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}

// Verificando se o IP foi enviado
if (isset($_POST['ip'])) {
    $ip = $_POST['ip'];

    // Verificando se o IP já existe no banco de dados
    $stmt = $pdo->prepare("SELECT COUNT(*) AS total FROM contador WHERE ip = :ip");
    $stmt->bindParam(':ip', $ip);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row['total'] == 0) {
        // Se o IP não existir, insere-o no banco de dados
        $stmt = $pdo->prepare("INSERT INTO contador (ip) VALUES (:ip)");
        $stmt->bindParam(':ip', $ip);
        $stmt->execute();
    }
}

visitantes.php

<?php

$ip_esperado = '191.242.70.168';
$ip_usuario = $_SERVER['REMOTE_ADDR'];

if ($ip_usuario == $ip_esperado) {
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Erro na conexão com o banco de dados: " . $e->getMessage());
    }

    $stmt = $pdo->prepare("SELECT COUNT(DISTINCT ip) AS total FROM contador");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $totalIps = $row['total'];
    echo "Total de visitantes: $totalIps";
} else {
    header('location: index.html');
}



*/
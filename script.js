let clickCount = 0;
let incrementValue = 1;
let upgradeCost = 1000;
let multiplier = 1;

const GPUs = {
    "ARC A380": { Marca: "Intel", quantidade: 0, Max: 10, preco: 900, MHz: 600 },
    "R5 230": { Marca: "AMD", quantidade: 0, Max: 10, preco: 200, MHz: 75 },
    "RX 550": { Marca: "AMD", quantidade: 0, Max: 10, preco: 450, MHz: 300 },
    "RX 580": { Marca: "AMD", quantidade: 0, Max: 10, preco: 800, MHz: 1000 },
    "GT 610": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 150, MHz: 50 },
    "GT 1030": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 350, MHz: 200 },
    "GTX 1630": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 850, MHz: 700 },
    "GTX 1650": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 900, MHz: 800 },
    "GTX 1660": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 1100, MHz: 1400 },
    "GTX 1660 Ti": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 1250, MHz: 1700 },
    "GTX 1050": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 750, MHz: 900 },
    "GTX 1050 Ti": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 800, MHz: 1100 },
    "GTX 1060": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 900, MHz: 1300 },
    "GTX 1070": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 3000, MHz: 2000 },
    "GTX 1080": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 3500, MHz: 3000 },
    "RTX 2060": { Marca: "NVidea", quantidade: 0, Max: 10, preco: 2200, MHz: 1900 }
};

const inventário = {
    "1050 FE": { raridade: 50, quantidade: 0 },
    "1060 FE": { raridade: 40, quantidade: 0 },
    "1070 FE": { raridade: 30, quantidade: 0 },
    "1080 FE": { raridade: 20, quantidade: 0 },
    "2080 Ti CyberPunk Edition": { raridade: 10, quantidade: 0 },
}

// Selecionar elementos
const clickCountDisplay = document.getElementById('clickCount');
const clickButton = document.getElementById('clickButton');
const autoClickerButton = document.getElementById('autoClickerButton');
const PCFoto = document.getElementById('PCFoto');
const shopContainer = document.getElementById('shopContainer');
const sortOptions = document.getElementById('sortOptions');
const mhzSpeedElement = document.getElementById('mhzSpeed');
const DinheiroSpeedElement = document.getElementById('DinheiroSpeed');
const progressBar = document.getElementById('progress-bar');
const progressTimeValue = document.getElementById('progress-time-value');
const delbtn = document.getElementById('delbtn');

// Função para atualizar a exibição de cliques
function updateClickDisplay() {
    clickCountDisplay.textContent = clickCount;

    if (clickCount >= 1000000000) {
        PCFoto.src = "./PCFotos/PC14.png";
    } else if (clickCount >= 500000000) {
        PCFoto.src = "./PCFotos/PC13.png";
    } else if (clickCount >= 100000000) {
        PCFoto.src = "./PCFotos/PC12.png";
    } else if (clickCount >= 50000000) {
        PCFoto.src = "./PCFotos/PC11.png";
    } else if (clickCount >= 10000000) {
        PCFoto.src = "./PCFotos/PC10.png";
    } else if (clickCount >= 5000000) {
        PCFoto.src = "./PCFotos/PC9.png";
    } else if (clickCount >= 1000000) {
        PCFoto.src = "./PCFotos/PC8.png";
    } else if (clickCount >= 500000) {
        PCFoto.src = "./PCFotos/PC7.png";
    } else if (clickCount >= 100000) {
        PCFoto.src = "./PCFotos/PC6.png";
    } else if (clickCount >= 50000) {
        PCFoto.src = "./PCFotos/PC5.png";
    } else if (clickCount >= 10000) {
        PCFoto.src = "./PCFotos/PC4.png";
    } else if (clickCount >= 5000) {
        PCFoto.src = "./PCFotos/PC3.png";
    } else if (clickCount >= 1000) {
        PCFoto.src = "./PCFotos/PC2.png";
    } else {
        PCFoto.src = "./PCFotos/PC1.png";
    }
}

// Função de clique
clickButton.addEventListener('click', () => {
    clickCount += incrementValue * multiplier;
    updateClickDisplay();
});


// Função de upgrade
upgradeButton.addEventListener('click', () => {
    if (clickCount >= upgradeCost) {
        clickCount -= upgradeCost;
        
        // Incrementa o Max de todas as GPUs em 5
        for (const gpu of Object.values(GPUs)) {
            gpu.Max += 5;
        }

        // Duplica o custo do upgrade
        upgradeCost *= 2;

        // Atualiza a exibição
        updateClickDisplay();
        gerarHTMLGPUs(sortGPUs(sortOptions.value));
        upgradeButton.textContent = `Upgrade (Custo: ${upgradeCost})`;
    } else {
        alert('Você não tem MarujoCoins suficientes para um upgrade!');
    }
});


// Função para gerar o HTML das GPUs
function gerarHTMLGPUs(sortedGPUs) {
    shopContainer.innerHTML = ''; // Limpa o conteúdo existente
    for (const [placa, { quantidade, preco, MHz, Max, Marca }] of Object.entries(sortedGPUs)) {
        const shopItemGPU = document.createElement('div');
        shopItemGPU.classList.add('shop-item-GPU');
        
        const textoDiv = document.createElement('div');
        textoDiv.classList.add('texto');
        textoDiv.innerHTML = `
            <p><strong>${Marca} ${placa}</strong></p>
            <p><span>Custo: ${preco} MarujoCoins</span></p>
            <p><span>MarujoCoin ${MHz} MHz/5s</span></p>
            <button class="ComprarBtn" data-placa="${placa}" data-preco="${preco}">Comprar</button>
            <p><span>N° de Placas ${quantidade}/${Max}</span></p>
        `;
        
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img');
        imgDiv.innerHTML = `
            <img class="imgGPU" src="./GPUFotos/${placa.replace(/\s+/g, '')}.png" alt="${placa}">
        `;
        
        shopItemGPU.appendChild(textoDiv);
        shopItemGPU.appendChild(imgDiv);
        shopContainer.appendChild(shopItemGPU);
    }
}

// Função para ordenar GPUs
function sortGPUs(criteria) {
    const sortedEntries = Object.entries(GPUs).sort((a, b) => {
        const [placaA, dadosA] = a;
        const [placaB, dadosB] = b;

        if (criteria === 'nome') {
            return placaA.localeCompare(placaB);
        } else if (criteria === 'preco') {
            return dadosA.preco - dadosB.preco;
        } else if (criteria === 'mhz') {
            return dadosA.MHz - dadosB.MHz;
        } else if (criteria === 'marca') {
            return dadosA.Marca.localeCompare(dadosB.Marca);
        }
        return 0;
    });

    return Object.fromEntries(sortedEntries);
}

// Função para comprar uma GPU
function ComprarGPU(placa, preco) {
    if (GPUs.hasOwnProperty(placa)) {
        if (clickCount >= preco) {
            if (GPUs[placa].quantidade < GPUs[placa].Max) {
                GPUs[placa].quantidade++;
                clickCount -= preco;
                updateClickDisplay();
                gerarHTMLGPUs(sortGPUs(sortOptions.value)); // Atualiza a lista com a ordenação atual
            } else {
                alert('Você já comprou o número máximo dessa placa!');
            }
        } else {
            alert('MarujoCoins insuficiente!');
        }
    } else {
        alert('Placa não encontrada!');
    }
}

// Gera o HTML das GPUs e aplica a ordenação inicial quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const initialSortedGPUs = sortGPUs(sortOptions.value || 'nome'); // Ordena por nome inicialmente
    gerarHTMLGPUs(initialSortedGPUs);
});

// Adiciona um listener de evento para todos os botões de compra
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('ComprarBtn')) {
        const placa = event.target.getAttribute('data-placa');
        const preco = parseInt(event.target.getAttribute('data-preco'), 10);
        ComprarGPU(placa, preco);
    }
});

// Adiciona um listener para a seleção de ordenamento
sortOptions.addEventListener('change', function() {
    const sortCriteria = this.value;
    const sortedGPUs = sortGPUs(sortCriteria);
    gerarHTMLGPUs(sortedGPUs);
});

// Função para atualizar a velocidade de MHz exibida no HTML
function updateMHZSpeed(totalMHz) {
    if (mhzSpeedElement) {
        mhzSpeedElement.textContent = `Velocidade: ${totalMHz} MHz/5s`;
        DinheiroSpeedElement.textContent = `Dinheiro: ${totalMHz / 1000} MarujoCoins/5s`;
    }
}

// Função para atualizar o clickCount com base nas GPUs
function updateClickCountWithGPU() {
        let totalMHz = 0;

        // Calcula o total de MHz baseado na quantidade de cada GPU
        for (const { MHz, quantidade } of Object.values(GPUs)) {
            totalMHz += MHz * quantidade;
        }

        // Atualiza o clickCount com base no total de MHz
        clickCount += totalMHz / 1000;
        updateClickDisplay(); // Atualiza a exibição de cliques
        updateMHZSpeed(totalMHz); // Atualiza a velocidade de MHz exibida
}

// Função para atualizar a barra de progresso e o tempo restante
function updateProgressBar() {
    const totalDuration = 5; // Tempo total em segundos
    let width = 0;
    let timeLeft = totalDuration;
    
    function updateProgress() {
        width += 100 / totalDuration; // Aumenta a largura da barra
        progressBar.style.width = width + '%';
        timeLeft -= 1;
        progressTimeValue.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(progressInterval);
            progressBar.style.width = '100%'; // Garante que a barra atinja 100%
            progressTimeValue.textContent = '0'; // Mostra 0 quando o tempo acabar
             // Atualiza o clickCount após o tempo expirar
            
            // Reinicia a barra de progresso após o intervalo definido
            setTimeout(() => {
                width = 0;
                timeLeft = totalDuration;
                progressBar.style.width = '0%';
                progressTimeValue.textContent = timeLeft;
                updateClickCountWithGPU();
                progressInterval = setInterval(updateProgress, 1000); // Reinicia o intervalo
            }, 1000); // Tempo de espera para reiniciar (1 segundo)
        }
    }

    let progressInterval = setInterval(updateProgress, 1000); // Atualiza a cada 1 segundo
}

// Chama a função para iniciar a barra de progresso quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar(); // Inicia a barra de progresso
});

function escolherPlacaPorRaridade() {
    const placas = Object.entries(inventário);
    const totalRaridade = placas.reduce((acc, [, { raridade }]) => acc + raridade, 0);
    let random = Math.random() * totalRaridade;
    for (const [nome, { raridade }] of placas) {
        if (random < raridade) {
            return nome;
        }
        random -= raridade;
    }
}


function adicionarPlacaAoInventário() {
    const placaEscolhida = escolherPlacaPorRaridade();
    if (inventário[placaEscolhida]) {
        inventário[placaEscolhida].quantidade++;
        // Aqui você pode atualizar a exibição do inventário, se necessário
        atualizarInventárioDisplay();
    }
}

const horasEmMilissegundos = 3 * 60 * 60 * 1000; // 3 horas em milissegundos

function iniciarIntervaloDePlacas() {
    adicionarPlacaAoInventário(); // Chama imediatamente para que o jogador não tenha que esperar 3 horas na primeira execução
    setInterval(adicionarPlacaAoInventário, horasEmMilissegundos);
}

// Inicia o intervalo quando a página carrega
document.addEventListener('DOMContentLoaded', iniciarIntervaloDePlacas);


function atualizarInventárioDisplay() {
    const inventárioDisplay = document.getElementById('inventárioDisplay');
    if (inventárioDisplay) {
        inventárioDisplay.innerHTML = ''; // Limpa o conteúdo existente
        for (const [nome, { quantidade }] of Object.entries(inventário)) {
            const item = document.createElement('div');
            item.textContent = `${nome}: ${quantidade}`;
            inventárioDisplay.appendChild(item);
        }
    }
}

// Função para atualizar o inventário no popup
function atualizarInventarioPopup() {
    const inventarioFotos = document.getElementById('inventarioFotos');
    inventarioFotos.innerHTML = ''; // Limpa o conteúdo existente

    for (const [nome, { raridade, quantidade }] of Object.entries(inventário)) {
        for (let i = 0; i < quantidade; i++) {
            const img = document.createElement('img');
            img.src = `./GPUFotos/${nome.replace(/\s+/g, '')}.png`;
            img.alt = nome;
            img.className = `PlacasInv${raridade}`; // Define a classe com base na raridade
            
            // Adiciona o nome da placa como um atributo de dados
            img.setAttribute('data-name', nome);

            // Adiciona eventos para mostrar e esconder o tooltip
            img.addEventListener('mouseover', (event) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = event.target.getAttribute('data-name');
                document.body.appendChild(tooltip);
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            });

            img.addEventListener('mousemove', (event) => {
                const tooltip = document.querySelector('.tooltip');
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
            });

            img.addEventListener('mouseout', () => {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });

            inventarioFotos.appendChild(img);
        }
    }
}

// Abre o popup
document.getElementById('invbtn').addEventListener('click', () => {
    atualizarInventarioPopup(); // Atualiza o conteúdo do popup
    document.getElementById('inventarioPopup').style.display = 'block';
});

// Fecha o popup
document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('inventarioPopup').style.display = 'none';
});

// Fecha o popup se clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('inventarioPopup')) {
        document.getElementById('inventarioPopup').style.display = 'none';
    }
});

function salvarDados() {
    const SAVE = {
        clickCount,
        incrementValue,
        upgradeCost,
        multiplier,
        GPUs,
        inventário
    };

    // Salva os dados no localStorage
    localStorage.setItem('saveData', JSON.stringify(SAVE));
}

function carregarDados() {
    const savedData = localStorage.getItem('saveData');
    if (savedData) {
        const SAVE = JSON.parse(savedData);

        // Restaura os dados do jogo a partir do objeto carregado
        clickCount = SAVE.clickCount;
        incrementValue = SAVE.incrementValue;
        upgradeCost = SAVE.upgradeCost;
        multiplier = SAVE.multiplier;
        Object.assign(GPUs, SAVE.GPUs);
        Object.assign(inventário, SAVE.inventário);

        // Atualiza a exibição
        updateClickDisplay();
        gerarHTMLGPUs(sortGPUs(sortOptions.value));
        atualizarInventárioDisplay();
    }
}

window.addEventListener('beforeunload', salvarDados);

setInterval(salvarDados, 60000); // Salva os dados a cada 60 segundos

document.addEventListener('DOMContentLoaded', () => {
    carregarDados(); // Carrega os dados do jogo
    updateProgressBar(); // Inicia a barra de progresso
});

function clearLocalStorage() {
    localStorage.clear();
    console.log("Todo o localStorage foi apagado.");
}

delbtn.addEventListener('click', () => {
    clearLocalStorage();
    alert("Conta toda apagada");
});
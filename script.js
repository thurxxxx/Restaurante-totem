document.addEventListener('DOMContentLoaded', () => {
    // --- CARDÁPIO COM IMAGENS ROYALTY FREE DO PIXABAY ---
    const menuData = {
        massas: [
            { id: 1, name: "Spaghetti Carbonara", price: 35.00, img: "https://cdn.pixabay.com/photo/2017/08/07/18/20/spaghetti-2601901_1280.jpg" },
            { id: 2, name: "Lasagna Bolonhesa", price: 40.00, img: "https://cdn.pixabay.com/photo/2018/03/17/03/37/lasagna-3236413_1280.jpg" },
            { id: 3, name: "Penne ao Pesto", price: 32.50, img: "https://cdn.pixabay.com/photo/2020/08/07/09/22/pasta-5472125_1280.jpg" },
            { id: 4, name: "Fettuccine Alfredo", price: 38.00, img: "https://cdn.pixabay.com/photo/2017/08/07/18/20/fettuccine-2601902_1280.jpg" },
            { id: 5, name: "Gnocchi ao Sugo", price: 30.00, img: "https://cdn.pixabay.com/photo/2017/08/07/18/20/gnocchi-2601900_1280.jpg" },
        ],
        acompanhamentos: [
            { id: 6, name: "Pão de Alho", price: 12.00, img: "https://cdn.pixabay.com/photo/2016/06/16/23/02/bread-1461751_1280.jpg" },
            { id: 7, name: "Salada Caprese", price: 18.00, img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/salad-1238248_1280.jpg" },
            { id: 8, name: "Porção de Polpette", price: 20.00, img: "https://cdn.pixabay.com/photo/2022/04/13/14/28/meatballs-7130484_1280.jpg" },
        ],
        bebidas: [
            { id: 9, name: "Refrigerante", price: 7.00, img: "https://cdn.pixabay.com/photo/2016/03/27/18/20/cocktail-1283858_1280.jpg" },
            { id: 10, name: "Suco Natural", price: 9.00, img: "https://cdn.pixabay.com/photo/2016/11/18/17/20/orange-1833768_1280.jpg" },
            { id: 11, name: "Água Mineral", price: 5.00, img: "https://cdn.pixabay.com/photo/2016/05/16/22/16/water-1395397_1280.jpg" },
        ],
        sobremesas: [
            { id: 12, name: "Tiramisù", price: 18.00, img: "https://cdn.pixabay.com/photo/2016/02/19/11/53/tiramisu-1209542_1280.jpg" },
            { id: 13, name: "Panna Cotta", price: 16.00, img: "https://cdn.pixabay.com/photo/2017/02/08/13/28/pannacotta-2045108_1280.jpg" },
            { id: 14, name: "Mousse de Chocolate", price: 15.00, img: "https://cdn.pixabay.com/photo/2017/07/16/10/43/chocolate-mousse-2501932_1280.jpg" },
        ],
        combos: [
            { id: 15, name: "Combo Clássico", price: 50.00, desc: "Carbonara + Pão de Alho + Refri", img: "https://cdn.pixabay.com/photo/2017/08/07/18/20/spaghetti-2601901_1280.jpg" },
            { id: 16, name: "Combo Famiglia", price: 65.00, desc: "Lasagna + Salada + Suco", img: "https://cdn.pixabay.com/photo/2018/03/17/03/37/lasagna-3236413_1280.jpg" },
            { id: 17, name: "Combo Leggero", price: 45.00, desc: "Penne ao Pesto + Água", img: "https://cdn.pixabay.com/photo/2020/08/07/09/22/pasta-5472125_1280.jpg" },
        ]
    };

    const curiosidades = [
        "O formato 'penne' foi criado para facilitar a absorção de molhos.",
        "A primeira receita de lasanha data do século XIII na Itália.",
        "O pesto tradicional é feito com manjericão, pinoli e queijo pecorino.",
        "O spaghetti é o tipo de massa mais consumido no mundo.",
        "O tiramisù significa 'me leve para cima' em italiano.",
        "Sabia que o fettuccine Alfredo foi criado em Roma em 1914?",
        "A panna cotta surgiu no norte da Itália, na região do Piemonte.",
        "O gnocchi é feito tradicionalmente com batata!",
        "A Caprese é uma salada que homenageia as cores da bandeira italiana.",
        "O pão de alho é um clássico em churrascos brasileiros, mas tem origem italiana!"
    ];

    let cart = [];
    let pagamentosDia = [];

    // --- RENDERIZAÇÃO DO CARDÁPIO ---
    function renderMenuItems() {
        const sections = {
            massas: document.getElementById('massas-section'),
            combos: document.getElementById('combos-section'),
            acompanhamentos: document.getElementById('acompanhamentos-section'),
            bebidas: document.getElementById('bebidas-section'),
            sobremesas: document.getElementById('sobremesas-section'),
        };

        for (const category in sections) {
            const section = sections[category];
            section.innerHTML = '';
            menuData[category].forEach(item => {
                const itemHTML = `
                    <div class="menu-item" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                        <img src="${item.img}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        ${item.desc ? `<p>${item.desc}</p>` : ''}
                        <p class="price">R$ ${item.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn">Adicionar</button>
                    </div>
                `;
                section.innerHTML += itemHTML;
            });
        }
    }

    // --- CARRINHO ---
    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    function updateCart() {
        const cartItemsEl = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        
        cartItemsEl.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name}</span><strong>R$ ${item.price.toFixed(2)}</strong>`;
            cartItemsEl.appendChild(li);
            total += item.price;
        });
        cartTotalEl.textContent = `R$ ${total.toFixed(2)}`;
    }

    function clearCart() {
        cart = [];
        updateCart();
    }

    // --- EVENTOS DO CARDÁPIO ---
    document.querySelector('.menu-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const itemEl = e.target.closest('.menu-item');
            const name = itemEl.dataset.name;
            const price = parseFloat(itemEl.dataset.price);
            addToCart(name, price);
        }
    });

    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

    // --- MODAL DE MONTE SUA MASSA ---
    const modal = document.getElementById('custom-pasta-modal');
    const openModalBtn = document.getElementById('open-custom-modal-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const customPastaForm = document.getElementById('custom-pasta-form');

    openModalBtn.addEventListener('click', () => modal.style.display = 'block');
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target == modal) modal.style.display = 'none';
        if (e.target == pagamentoModal) pagamentoModal.style.display = 'none';
        if (e.target == notaModal) notaModal.style.display = 'none';
        if (e.target == sorteioModal) sorteioModal.style.display = 'none';
        if (e.target == pagamentosModal) pagamentosModal.style.display = 'none';
    });

    customPastaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let price = 20.00 + 8.00;
        const base = document.getElementById('base-massa').value;
        const molho = document.getElementById('molho-massa').value;
        let adicionais = [];
        document.querySelectorAll('input[name="adicional"]:checked').forEach(checkbox => {
            price += 5.00;
            adicionais.push(checkbox.value);
        });
        let name = `Massa ${base} com molho ${molho}`;
        if (adicionais.length > 0) {
            name += ` e ${adicionais.join(', ')}`;
        }
        addToCart(name, price);
        modal.style.display = 'none';
        customPastaForm.reset();
    });

    // --- CURIOSIDADE DO DIA ---
    function renderCuriosidade() {
        const randomIdx = Math.floor(Math.random() * curiosidades.length);
        document.getElementById('curiosidade-dia').textContent = curiosidades[randomIdx];
    }

    // --- PAGAMENTO ---
    const pagamentoModal = document.getElementById('pagamento-modal');
    const closePagamentoBtn = document.querySelector('.close-pagamento-btn');
    const pagamentoForm = document.getElementById('pagamento-form');
    const formaPagamento = document.getElementById('forma-pagamento');
    const pixSection = document.getElementById('pix-section');
    const cartaoSection = document.getElementById('cartao-section');
    const dinheiroSection = document.getElementById('dinheiro-section');
    const checkoutBtn = document.getElementById('checkout-btn');
    const pagamentoErro = document.getElementById('pagamento-erro');
    const numeroCartao = document.getElementById('numero-cartao');
    const validadeCartao = document.getElementById('validade-cartao');
    const cvcCartao = document.getElementById('cvc-cartao');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            pagamentoModal.style.display = 'block';
        } else {
            alert('Seu carrinho está vazio!');
        }
    });

    closePagamentoBtn.addEventListener('click', () => pagamentoModal.style.display = 'none');

    formaPagamento.addEventListener('change', () => {
        pixSection.style.display = formaPagamento.value === 'pix' ? 'block' : 'none';
        cartaoSection.style.display = ['credito', 'debito'].includes(formaPagamento.value) ? 'block' : 'none';
        dinheiroSection.style.display = formaPagamento.value === 'dinheiro' ? 'block' : 'none';
        pagamentoErro.style.display = 'none';
    });

    function validarCamposPagamento() {
        if (formaPagamento.value === 'credito' || formaPagamento.value === 'debito') {
            // Validação número do cartão: 16 dígitos, pode ter espaços
            let numero = numeroCartao.value.replace(/\s+/g, '');
            if (!/^\d{16}$/.test(numero)) {
                pagamentoErro.textContent = "Número do cartão inválido. Deve conter 16 dígitos.";
                pagamentoErro.style.display = 'block';
                numeroCartao.focus();
                return false;
            }
            // Validade: MM/AA e mês entre 01-12 e ano >= atual
            let val = validadeCartao.value.trim();
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(val)) {
                pagamentoErro.textContent = "Validade inválida. Use MM/AA.";
                pagamentoErro.style.display = 'block';
                validadeCartao.focus();
                return false;
            }
            let [mes, ano] = val.split('/');
            let agora = new Date();
            let anoAtual = Number(agora.getFullYear().toString().slice(-2));
            if (Number(ano) < anoAtual || (Number(ano) === anoAtual && Number(mes) < agora.getMonth() + 1)) {
                pagamentoErro.textContent = "Cartão vencido.";
                pagamentoErro.style.display = 'block';
                validadeCartao.focus();
                return false;
            }
            // CVC: 3 dígitos
            if (!/^\d{3}$/.test(cvcCartao.value.trim())) {
                pagamentoErro.textContent = "CVC inválido. Deve conter 3 dígitos.";
                pagamentoErro.style.display = 'block';
                cvcCartao.focus();
                return false;
            }
        }
        pagamentoErro.style.display = 'none';
        return true;
    }

    // --- NOTA FISCAL ---
    const notaModal = document.getElementById('nota-modal');
    const closeNotaBtn = document.querySelector('.close-nota-btn');
    const voltarMenuBtn = document.getElementById('voltar-menu-btn');
    const notaFiscalContent = document.getElementById('nota-fiscal-content');

    closeNotaBtn.addEventListener('click', () => notaModal.style.display = 'none');
    voltarMenuBtn.addEventListener('click', () => {
        notaModal.style.display = 'none';
    });

    pagamentoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Validação
        if (!formaPagamento.value) {
            pagamentoErro.textContent = "Escolha uma forma de pagamento!";
            pagamentoErro.style.display = 'block';
            formaPagamento.focus();
            return;
        }
        if (!validarCamposPagamento()) return;

        // Geração simplificada da nota fiscal
        let notaHtml = `<h3>Sapore Veloce - Nota Fiscal</h3>`;
        notaHtml += `<ul>`;
        let total = 0;
        cart.forEach(item => {
            notaHtml += `<li>${item.name} - R$ ${item.price.toFixed(2)}</li>`;
            total += item.price;
        });
        notaHtml += `</ul>`;
        notaHtml += `<p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>`;
        notaHtml += `<p><strong>Forma de pagamento:</strong> ${formaPagamento.selectedOptions[0].text}</p>`;
        notaHtml += `<p>Data: ${new Date().toLocaleString('pt-BR')}</p>`;
        notaHtml += `<p>Código da nota: NF-${Math.floor(Math.random() * 900000 + 100000)}</p>`;
        notaHtml += `<p>Obrigado por comprar conosco! 🍝</p>`;
        notaFiscalContent.innerHTML = notaHtml;

        // Registrar pagamento
        pagamentosDia.push({
            itens: [...cart],
            total,
            forma: formaPagamento.selectedOptions[0].text,
            data: new Date().toLocaleString('pt-BR'),
            nota: `NF-${Math.floor(Math.random() * 900000 + 100000)}`
        });

        pagamentoModal.style.display = 'none';
        notaModal.style.display = 'block';
        clearCart();
        pagamentoForm.reset();
    });

    // --- PAGAMENTOS DO DIA ---
    const verPagamentosBtn = document.getElementById('ver-pagamentos-btn');
    const pagamentosModal = document.getElementById('pagamentos-modal');
    const fecharPagamentosBtn = document.getElementById('fechar-pagamentos-btn');
    const closePagamentosBtn = document.querySelector('.close-pagamentos-btn');
    const pagamentosDiaContent = document.getElementById('pagamentos-dia-content');

    function renderPagamentosDia() {
        if (pagamentosDia.length === 0) {
            pagamentosDiaContent.innerHTML = "<p>Nenhum pagamento efetuado hoje.</p>";
            return;
        }
        let html = "";
        pagamentosDia.forEach((pag, idx) => {
            html += `<div style="border-bottom:1px solid #eee; margin-bottom:10px; padding-bottom:8px">
                        <strong>Pagamento ${idx+1}</strong><br>
                        <span><b>Data:</b> ${pag.data}</span><br>
                        <span><b>Forma:</b> ${pag.forma}</span><br>
                        <span><b>Nota:</b> ${pag.nota}</span><br>
                        <span><b>Total:</b> R$ ${pag.total.toFixed(2)}</span>
                        <ul>
                            ${pag.itens.map(item => `<li>${item.name} - R$ ${item.price.toFixed(2)}</li>`).join('')}
                        </ul>
                    </div>`;
        });
        pagamentosDiaContent.innerHTML = html;
    }

    verPagamentosBtn.addEventListener('click', () => {
        renderPagamentosDia();
        pagamentosModal.style.display = 'block';
    });
    fecharPagamentosBtn.addEventListener('click', () => pagamentosModal.style.display = 'none');
    closePagamentosBtn.addEventListener('click', () => pagamentosModal.style.display = 'none');

    // --- SORTEIO SEMANAL ---
    const sorteioBanner = document.getElementById('sorteio-banner');
    const sorteioModal = document.getElementById('sorteio-modal');
    const closeSorteioBtn = document.querySelector('.close-sorteio-btn');
    const participarSorteioBtn = document.getElementById('participar-sorteio-btn');
    const sorteioForm = document.getElementById('sorteio-form');
    const sorteioResposta = document.getElementById('sorteio-resposta');

    participarSorteioBtn.addEventListener('click', () => sorteioModal.style.display = 'block');
    closeSorteioBtn.addEventListener('click', () => sorteioModal.style.display = 'none');

    sorteioForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('sorteio-nome').value.trim();
        const email = document.getElementById('sorteio-email').value.trim();
        if (nome && email) {
            sorteioResposta.textContent = `Parabéns, ${nome}! Você está participando do sorteio semanal. Boa sorte!`;
            sorteioForm.reset();
        }
    });

    // --- INICIALIZAÇÃO ---
    renderMenuItems();
    renderCuriosidade();
});
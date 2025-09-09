document.addEventListener('DOMContentLoaded', () => {

    // --- BANCO DE DADOS DO CARDÁPIO ---
    const menuData = {
        massas: [
            { id: 1, name: "Spaghetti Carbonara", price: 35.00, img: "https://images.pexels.com/photos/14875082/pexels-photo-14875082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 2, name: "Lasagna Bolonhesa", price: 40.00, img: "https://images.pexels.com/photos/7187393/pexels-photo-7187393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 3, name: "Penne ao Pesto", price: 32.50, img: "https://images.pexels.com/photos/15130283/pexels-photo-15130283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 4, name: "Fettuccine Alfredo", price: 38.00, img: "https://images.pexels.com/photos/12737637/pexels-photo-12737637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 5, name: "Gnocchi ao Sugo", price: 30.00, img: "https://images.pexels.com/photos/8968417/pexels-photo-8968417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ],
        acompanhamentos: [
            { id: 6, name: "Pão de Alho", price: 12.00, img: "https://images.pexels.com/photos/1775038/pexels-photo-1775038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 7, name: "Salada Caprese", price: 18.00, img: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 8, name: "Porção de Polpette", price: 20.00, img: "https://images.pexels.com/photos/6069903/pexels-photo-6069903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ],
        bebidas: [
            { id: 9, name: "Refrigerante", price: 7.00, img: "https://images.pexels.com/photos/1571221/pexels-photo-1571221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 10, name: "Suco Natural", price: 9.00, img: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 11, name: "Água Mineral", price: 5.00, img: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ],
        sobremesas: [
            { id: 12, name: "Tiramisù", price: 18.00, img: "https://images.pexels.com/photos/5741151/pexels-photo-5741151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 13, name: "Panna Cotta", price: 16.00, img: "https://images.pexels.com/photos/6303788/pexels-photo-6303788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 14, name: "Mousse de Chocolate", price: 15.00, img: "https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ],
        combos: [
            { id: 15, name: "Combo Clássico", price: 50.00, desc: "Carbonara + Pão de Alho + Refri", img: "https://images.pexels.com/photos/14875082/pexels-photo-14875082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 16, name: "Combo Famiglia", price: 65.00, desc: "Lasagna + Salada + Suco", img: "https://images.pexels.com/photos/7187393/pexels-photo-7187393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
            { id: 17, name: "Combo Leggero", price: 45.00, desc: "Penne ao Pesto + Água", img: "https://images.pexels.com/photos/15130283/pexels-photo-15130283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        ]
    };

    let cart = [];

    // --- FUNÇÕES DE RENDERIZAÇÃO E CARRINHO ---

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

    // --- EVENT LISTENERS ---

    // Adicionar item do menu principal
    document.querySelector('.menu-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const itemEl = e.target.closest('.menu-item');
            const name = itemEl.dataset.name;
            const price = parseFloat(itemEl.dataset.price);
            addToCart(name, price);
        }
    });

    // Botões do carrinho
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Pedido finalizado com sucesso! Total: ${document.getElementById('cart-total').textContent}`);
            clearCart();
        } else {
            alert('Seu carrinho está vazio!');
        }
    });

    // --- LÓGICA DO MODAL (DIFERENCIAL) ---
    const modal = document.getElementById('custom-pasta-modal');
    const openModalBtn = document.getElementById('open-custom-modal-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const customPastaForm = document.getElementById('custom-pasta-form');

    openModalBtn.addEventListener('click', () => modal.style.display = 'block');
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    customPastaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let price = 20.00 + 8.00; // Preço base + molho
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

    // --- INICIALIZAÇÃO ---
    renderMenuItems();
});
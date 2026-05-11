
const games=[
{name:'Cyber Nova',price:199,image:'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'},
{name:'Dark Ruins',price:129,image:'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop'},
{name:'Galaxy Arena',price:249,image:'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&auto=format&fit=crop'},
{name:'Shadow Ops',price:159,image:'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop'}
];

const grid=document.getElementById('gamesGrid');
const cartSidebar=document.getElementById('cartSidebar');
const cartItems=document.getElementById('cartItems');
const total=document.getElementById('total');
const cartCount=document.getElementById('cartCount');

let cart=[];

function renderGames(list){
grid.innerHTML='';

list.forEach(game=>{
const card=document.createElement('div');
card.className='game-card';

card.innerHTML=`
<img src="${game.image}">
<div class="game-info">
<h3>${game.name}</h3>
<p>AAA Game</p>
<div class="price">R$ ${game.price}</div>
<button onclick="addToCart('${game.name}',${game.price})">Adicionar</button>
</div>
`;

grid.appendChild(card);
});
}

renderGames(games);

window.addToCart=(name,price)=>{
cart.push({name,price});
updateCart();
}

function updateCart(){
cartItems.innerHTML='';

let sum=0;

cart.forEach((item,index)=>{
sum+=item.price;

const div=document.createElement('div');
div.className='cart-item';

div.innerHTML=`
<span>${item.name}</span>
<button onclick="removeItem(${index})">X</button>
`;

cartItems.appendChild(div);
});

total.innerText=sum;
cartCount.innerText=cart.length;
}

window.removeItem=(index)=>{
cart.splice(index,1);
updateCart();
}

document.getElementById('cartBtn').onclick=()=>{
cartSidebar.classList.add('active');
}

document.getElementById('closeCart').onclick=()=>{
cartSidebar.classList.remove('active');
}

document.getElementById('searchInput').addEventListener('input',e=>{
const value=e.target.value.toLowerCase();

const filtered=games.filter(g=>
g.name.toLowerCase().includes(value)
);

renderGames(filtered);
});

let ownedGames = JSON.parse(localStorage.getItem("ownedGames")) || [];
let username = localStorage.getItem("username") || "";

window.onload = () => {
  if(username){
    document.getElementById("loginScreen").style.display = "none";
    updateProfile();
  }

  renderLibrary();
};

function login(){
  const user = document.getElementById("username").value;

  if(user.trim() === ""){
    alert("Digite um nome.");
    return;
  }

  localStorage.setItem("username", user);
  username = user;

  document.getElementById("loginScreen").style.display = "none";

  updateProfile();

  showNotification("Login realizado.");
}

function updateProfile(){
  document.getElementById("profileName").innerText = username;
  document.getElementById("profileBig").innerText = username;
}

function buyGame(game){
  if(!ownedGames.includes(game)){
    ownedGames.push(game);
    localStorage.setItem("ownedGames", JSON.stringify(ownedGames));

    renderLibrary();

    showNotification(game + " adicionado à biblioteca.");
  } else {
    showNotification("Você já possui este jogo.");
  }
}

function renderLibrary(){
  const list = document.getElementById("libraryList");

  list.innerHTML = "";

  ownedGames.forEach(game => {
    const item = document.createElement("div");

    item.className = "library-item";

    item.innerHTML = `
      <span>${game}</span>
      <button onclick="installGame('${game}')">INSTALAR</button>
    `;

    list.appendChild(item);
  });
}

function installGame(game){
  let progress = 0;

  document.getElementById("downloadText").innerText =
    "Instalando " + game + "...";

  const bar = document.getElementById("progressBar");

  const interval = setInterval(() => {
    progress += 5;

    bar.style.width = progress + "%";

    if(progress >= 100){
      clearInterval(interval);

      showNotification(game + " instalado com sucesso.");

      document.getElementById("downloadText").innerText =
        game + " pronto para jogar.";
    }

  }, 150);
}

function wishlist(game){
  showNotification(game + " adicionado à wishlist.");
}

function showNotification(text){
  const n = document.getElementById("notification");

  n.innerText = text;

  n.style.display = "block";

  setTimeout(() => {
    n.style.display = "none";
  }, 3000);
}

const APIURL = "https://api.github.com/users/";

const search = document.getElementById('form');
const userCardBody = document.querySelector('.profile-container');


search.addEventListener('submit', (e) => {
    e.preventDefault();
    const gitname = document.getElementById('input').value;
    if(gitname){
        getGithubProfile(gitname);
    }
});


async function getGithubProfile(name){
    const response = await fetch(APIURL + name);
    const gitProfile = await response.json();
    createUserCard(gitProfile);
};

function createUserCard(profile){
    userCardBody.innerHTML = '';
    userCardBody.innerHTML = `
    <img src="${profile.avatar_url}" alt="${profile.name}" class="profile-picture">
    <div class="information"> 
        <h3 class="name">${profile.name}</h3>
        <h4 class="position">${(profile.company === null) ? "Não informado" : profile.company}</h4>
        <p class="profile-desc">${profile.bio}</p>
        <div class="goods">
            <span><i class="fa-solid fa-user-group"></i> ${profile.following}</span>
            <span><i class="fa-solid fa-user-group"></i> ${profile.followers}</span>
            <span><i class="fa-solid fa-book-bookmark"></i> ${profile.public_repos}</span>
        </div>
    </div>
    `;
    
};




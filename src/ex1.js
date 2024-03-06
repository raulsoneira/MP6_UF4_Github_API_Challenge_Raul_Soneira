// Importa la llibreria Octokit
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

// Defineix el teu token d'accés personal
const TOKEN = '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';

// Crea una instància d'Octokit amb el teu token d'accés
const octokit = new Octokit({ auth: TOKEN });

// Funció per obtenir informació de l'usuari
async function fetchUserInfo(username) {
  try {
    // Fes una petició per obtenir la informació de l'usuari
    const response = await octokit.request(`GET /users/${username}`, {
      username: username,
    });

    // Extreu les dades rellevants de l'usuari
    const userData = {
      login: response.data.login,
      name: response.data.name,
      bio: response.data.bio,
    };

    return userData;
  } catch (error) {
    console.error("Error en obtenir la informació de l'usuari:", error.message);
    throw error;
  }
}

// Function to fetch repositories for a user
async function fetchUserRepo(username) {
  try {
    // Fes una petició per obtenir els repositoris de l'usuari
    const response = await octokit.request(`GET /users/${username}/repos`, {
      username: username,
    });

    // Extreu les dades dels repositoris
    const repos =  response.data.map((repo) => ({
      name: repo.name,
      full_name: repo.full_name,
      language: repo.language,
      created_at: new Date(repo.created_at),
    }))
    .sort((a, b) => b.created_at - a.created_at);

    return repos;

  } catch (error) {
    console.error('Error en obtenir els repositoris de l\'usuari:', error.message);
    throw error;
  }
}

// Mostra la informació bàsica de l'usuari
async function userInfo(username) {
  try {
    const userData = await fetchUserInfo(username);

    // Obté el contenidor de dades de GitHub per a la informació de l'usuari
    const userInfoContainer = document.querySelector('.userInfo');
    console.log(userInfoContainer);

    // Actualitza la informació de l'usuari a l'HTML
    userInfoContainer.innerHTML = `
      <h1 class="text-2xl font-bold">${userData.name}</h1>
      <p class="text-lg text-gray-700">${userData.login}</p>
      <p class="text-md">${userData.bio}</p>
    `;
  } catch (error) {
    console.error("Error en obtenir la informació de l'usuari:", error);
  }
}

// Main function to display repository information
async function repos(username) {
  try {
    // Obtenir els repositoris de l'usuari
    const repositoris = await fetchUserRepo(username);
    console.log(repositoris);

    // Get the GitHub data container
    const githubDataContainer = document.querySelector('.repo-list');
    console.log(githubDataContainer);

    // Clear the container
    githubDataContainer.innerHTML = '';

    // Add each repository to the container
    repositoris.forEach((repo) => {
      const repoElement = document.createElement('div');
      repoElement.className = 'col-span-1 bg-white p-4 rounded shadow';

      const repoName = document.createElement('h2');
      repoName.className = 'text-xl font-bold mb-2';
      repoName.textContent = repo.name;
      repoElement.appendChild(repoName);

      

      const repoDescription = document.createElement('p');
      repoDescription.className = 'text-md';
      repoDescription.textContent = `Descripcio: ${repo.full_name}`;
      repoElement.appendChild(repoDescription);

      const repoLanguage = document.createElement('p');
      repoLanguage.className = 'text-md';
      repoLanguage.textContent = `Language: ${repo.language}`;
      repoElement.appendChild(repoLanguage);

      const repoCreate = document.createElement('p');
      repoCreate.className = 'text-md';
      repoCreate.textContent = `Create: ${repo.created_at}`;
      repoElement.appendChild(repoCreate);

      const repoLink = document.createElement('a');
      repoLink.className = 'text-blue-500 hover:underline';
      repoLink.href = `https://github.com/${username}/${repo.name}`;
      repoLink.textContent = 'Veure repositori';
      repoElement.appendChild(repoLink);


      githubDataContainer.appendChild(repoElement);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}



// Create new repository

async function newRepo() {}

async function deleteRepo() {}

// Call the main function with a username
function main() {
  userInfo('raulsoneira');
  repos('raulsoneira');
}

// make functions available to the browser
window.newRepo = newRepo;
window.deleteRepo = deleteRepo;

main();

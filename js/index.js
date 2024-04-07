// Function to search users on GitHub
async function searchUsers(query) {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await response.json();
    return data.items;
  }
  
  // Function to search repositories on GitHub
  async function searchRepos(query) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
    const data = await response.json();
    return data.items;
  }
  
  // Function to get repositories of a specific user
  async function getUserRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    return response.json();
  }
  
  // Function to display search results (users or repositories)
  function displayResults(results) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = results.map(result => `
      <li>
        <img src="${result.avatar_url}" alt="${result.login}" style="width: 50px; height: 50px;">
        <a href="${result.html_url}" target="_blank">${result.login}</a>
      </li>
    `).join('');
  }
  
  // Function to display repositories
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = repos.map(repo => `
      <li>
        <h3>${repo.full_name}</h3>
        <p>${repo.description}</p>
        <a href="${repo.html_url}" target="_blank">Visit Repo</a>
      </li>
    `).join('');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
  
    // Event listener for form submission
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      let results = await searchUsers(searchTerm);
      displayResults(results);
    });
  
    // Event listener for displaying repositories of a user when clicked
    const userList = document.getElementById('user-list');
    userList.addEventListener('click', async (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const username = e.target.textContent;
        const repos = await getUserRepos(username);
        displayRepos(repos);
      }
    });
  });
  
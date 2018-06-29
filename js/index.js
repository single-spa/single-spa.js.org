(function getContributors() {
  var repos = [
    { user: 'CanopyTax', repo: 'single-spa', id: 'contributors' },
    { user: 'CanopyTax', repo: 'single-spa-angularjs', id: 'angularJS' },
    { user: 'CanopyTax', repo: 'single-spa-angular', id: 'angular' },
    { user: 'PlaceMe-SAS', repo: 'single-spa-angular-cli', id: 'angularCli' },
    { user: 'CanopyTax', repo: 'single-spa-react', id: 'react' },
    { user: 'CanopyTax', repo: 'single-spa-vue', id: 'vue' },
    { user: 'CanopyTax', repo: 'single-spa-ember', id: 'ember' },
    { user: 'CanopyTax', repo: 'single-spa-preact', id: 'preact' },
    { user: 'CanopyTax', repo: 'single-spa-inferno', id: 'inferno' },
    { user: 'CanopyTax', repo: 'single-spa-svelte', id: 'svelte' },
    { user: 'pcmnac', repo: 'single-spa-cycle', id: 'cycle' },
  ]
  for (var i = 0; i <= repos.length - 1; i++){
    template(repos[i].user, repos[i].repo, repos[i].id)
  }
})();

function template(user, repo, id){
  if (window.location.pathname.endsWith('/contributors.html')) {
    fetch('https://api.github.com/repos/' + user + '/' + repo + '/contributors')
      .then(res => res.json())
      .then(data => {
        var contributorsEl = document.getElementById(id)
        contributorsEl.innerHTML = `
        ${data.map(item => (
            `  
          <div class='contributor' key=${item.id}>
            <a href='${item.html_url}' target='_blank' ref='noopener noreferrer'>
              <h3 class='contributorLogin'>
                ${item.login}
              </h3>
            </a>
            <img class='contributorImg' src=${item.avatar_url} alt='${item.login} avatar' />
          </div>  
          `
          )).join('')}      
      `
      })
      .catch(error => console.error('Error:', error))
  }
}




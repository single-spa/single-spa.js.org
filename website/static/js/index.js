(function(){
  if (window.location.pathname.endsWith('/contributors.html')){
    fetch('https://api.github.com/repos/CanopyTax/single-spa/contributors')
      .then(res => res.json())
      .then(data => {
        var contributorsEl = document.getElementById("contributors")

        contributorsEl.innerHTML = `
          ${data.map(item => (
            `
              <h2 class='contributorLogin'>
                ${item.login}
              </h2>
              <img class='contributorImg' src=${item.avatar_url} alt='${item.login} avatar' />
            `
          )).join('')}      
        `
      })
  }
})()
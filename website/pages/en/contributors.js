const React = require('react')
const CompLibrary = require('../../core/CompLibrary.js'); 
const Container = CompLibrary.Container;

const projects = [
  { user: "CanopyTax", repo: "single-spa" },
  { user: "CanopyTax", repo: "single-spa-angularjs" },
  { user: "CanopyTax", repo: "single-spa-angular" },
  { user: "pcmnac", repo: "single-spa-cycle" },
  { user: "CanopyTax", repo: "single-spa-ember" },
  { user: "CanopyTax", repo: "single-spa-inferno" },
  { user: "CanopyTax", repo: "single-spa-preact" },
  { user: "CanopyTax", repo: "single-spa-react" },
  { user: "CanopyTax", repo: "single-spa-svelte" },
  { user: "CanopyTax", repo: "single-spa-vue" },
  { user: "CanopyTax", repo: "single-spa.js.org" }
]

const getContributors = () => (
`document.addEventListener("DOMContentLoaded", () => {
  ${JSON.stringify(projects)}.forEach(({user, repo}) => {
    fetch(\`https://api.github.com/repos/\${user}/\${repo}/contributors\`)
      .then(res => res.json())
      .then(data => {
        const contributerElems = data.map(({html_url, login, id, avatar_url}) => (\`  
          <a href="\${html_url}" target="_blank" ref="noopener noreferrer" class="contributor" id=\${id}>
            <h3 class="contributorLogin">
              \${login}
            </h3>
            <span class="contributorImg" style="background-image: url('\${avatar_url}')"></span>
          </a>  
        \`)).join("")
        document.getElementById(\`\${repo}-contributors\`).innerHTML = contributerElems;
      })
      .catch(error => console.error("Error:", error))
  })
})`)

class Contributors extends React.Component{
  render(){
    return(
      <div className="mainContainer">
        <Container padding={['bottom']}>
          <h1 className="contributorHeader">Core Team Members</h1>
            <div className="contributorWrapper first" style={{paddingBottom: '40px'}}>
              <div className="contributorsList">
                {this.coreTeamMember("Joel Denning", "joeldenning", "https://avatars1.githubusercontent.com/u/5524384")}
                {this.coreTeamMember("Justin McMurdie", "TheMcMurder", "https://avatars2.githubusercontent.com/u/3059715")}
                {this.coreTeamMember("Anthony Frehner", "frehner", "https://avatars3.githubusercontent.com/u/3054066")}
                {this.coreTeamMember("Bret Little", "blittle", "https://avatars1.githubusercontent.com/u/1566869")}
              </div>
            </div>
          <h1 className="contributorHeader">Contributors</h1>
          {projects.map(({user, repo}, index) => (
            <div className={`contributorWrapper ${index === 0 ? 'first': ''}`} key={repo}>
              <a 
                href={`https://github.com/${user}/${repo}`} 
                className="repoLink" 
                target="_blank"
                rel="noopener noreferrer"
              >{repo}</a>
              <div id={`${repo}-contributors`} className="contributorsList"></div>
            </div>
          ))}
        </Container>
        <script dangerouslySetInnerHTML={{__html: getContributors()}}></script>
      </div>
    )
  }

  coreTeamMember(name, github, avatarUrl) {
    return (
      <a href={`https://github.com/${github}`} target="_blank" ref="noopener noreferrer" className="contributor">
        <h3 className="contributorLogin">
          {name}
        </h3>
        <span className="contributorImg" style={{backgroundImage: `url(${avatarUrl})`}}></span>
      </a>  
    )
  }
}

module.exports = Contributors
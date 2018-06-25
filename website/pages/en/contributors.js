const React = require('react')
const CompLibrary = require('../../core/CompLibrary.js'); 
const Container = CompLibrary.Container;

const projects = [
  {title: "single-spa", divId: "contributors"},
  {title: "single-spa-angularJS", divId: "angularJS"},
  {title: "single-spa-angular", divId: "angular"},

]

class Contributors extends React.Component{
  showCont(){
    const projects = [
      { user: "CanopyTax", repo: "single-spa", divId: "contributors" },
      { user: "CanopyTax", repo: "single-spa-angularJS", divId: "angularJS" },
      { user: "CanopyTax", repo: "single-spa-angular", divId: "angular" },
      { user: "PlaceMe-SAS", repo: "single-spa-angular-cli", divId: "angularCli" },
      { user: "CanopyTax", repo: "single-spa-cycle", divId: "cycle" },
      { user: "CanopyTax", repo: "single-spa-ember", divId: "ember" },
      { user: "CanopyTax", repo: "single-spa-inferno", divId: "inferno" },
      { user: "CanopyTax", repo: "single-spa-preact", divId: "preact" },
      { user: "CanopyTax", repo: "single-spa-react", divId: "react" },
      { user: "CanopyTax", repo: "single-spa-svelte", divId: "svelte" },
      { user: "pcmnac", repo: "single-spa-vue", divId: "vue" },

    ]
    return(
      projects.map( (project, i) => (
        <div className="contributorWrapper" key={i}>
          <a 
            href={`https://github.com/${project.user}/${project.repo}`} 
            className="repoLink" 
            target="_blank"
            rel="noopener noreferrer"
          >{project.repo}</a>
          <div id={project.divId}></div>
        </div>
      ))
    )
  }
  render(){
    return(
      <div className="mainContainer">
        <Container padding={['bottom']}>
          <h1 className="contributorHeader">Contributors</h1>
          {this.showCont()}
        </Container>
      </div>
    )
  }
}

module.exports = Contributors
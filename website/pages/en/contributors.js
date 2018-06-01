const React = require('react')
const CompLibrary = require('../../core/CompLibrary.js'); 
const Container = CompLibrary.Container;

class Contributors extends React.Component{

  render(){
    return(
      <div className="mainContainer">
        <Container padding={['bottom']}>
          <div className="showcaseSection">
            <div className="prose">
              <h1>Contributors</h1>
              <div id="contributors"></div>
            </div>
          </div>
        </Container>
        </div>
    )
  }
}

module.exports = Contributors
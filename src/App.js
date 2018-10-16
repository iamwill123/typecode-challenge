import React, { Component } from 'react';
import Header from './components/Header';
import logo_and_hamburger from './assets/logo_and_hamburger.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="article group">
          <div className="navbar">
            <div className="menu-icon">
              <img src={ logo_and_hamburger } alt="logo_and_hamburger icon" />
            </div>
          </div>

          <div className="hero">
            <div className="background">
              <div className="container">
                <div className="col span_1_of_8 spacer"></div>
                <div className="col span_7_of_8">
                  <Header />
                </div>
              </div>
            </div>
          </div>

          <div className="container marginTop100 marginTopNoneMobile">
            <div className="col span_1_of_8 spacer displayNoneMobile"></div>
            <div className="col span_1_of_8 content-left fontSize10">
              <div className="marginTop30">
                <hr />
                BY <span className="Copernicus-font author-text">Bob Loblaw</span>
              </div>
              <div className="Futura-font marginTop30">
                <hr />
                AUGUST 6, 2015
              </div>
              <div className="Futura-font marginTop30">
                <hr />
                <div className="tags">#ENVIRONMENT</div>
                <div className="tags">#SWIFT</div>
                <div className="tags">#FUNGUS</div>
              </div>
            </div>
            <div className="col span_1_of_8 spacer displayNoneMobile"></div>
            <div className="col span_5_of_8 content-right marginTopNoneMobile">
              <div className="content-body Palatino-font">
                <div className="marginTop30">
                  <span className="Futura-font grey-4D4D4D">NEW YORK, NY. </span>
                  Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.
                </div>
                
                <div className="marginTop30">
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum mollis mauris enim.
                </div>

                <div className="Copernicus-font marginTop30 color-8A98A6 offsetText offsetTextMobile">
                  Looking at it now, last December. We were built to fall apart. Then fall back together.
                </div>

                <div className="marginTop30">
                  Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida congue sed sit amet purus. Quisque lacus quam, egestas ac tincidunt a, lacinia vel velit. Aenean facilisis nulla vitae urna tincidunt.
                </div>

                <div className="marginTop30">
                  Nam vestibulum, arcu sodales feugiat consectetur, nisl orci bibendum elit, eu euismod magna sapien ut nibh. Donec semper quam scelerisque tortor. Mauris vel neque sit amet nunc gravida congue.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
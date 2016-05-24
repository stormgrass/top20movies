'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var getJSON = function(url) {
//   return new Promise(function(resolve, reject) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('get', url, true);
//     xhr.responseType = 'json';
//     xhr.onload = function() {
//       var status = xhr.status;
//       if (status == 200) {
//         resolve(xhr.response);
//       } else {
//         reject(status);
//       }
//     };
//     xhr.send();
//   });
// };

var d = new Date();
var n = d.getFullYear();
var backdrop = '';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    //declare empty initial state until API call has finished

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      data: []
    };
    return _this;
  }

  App.prototype.componentDidMount = function componentDidMount() {
    //call the API for the userlist
    $.getJSON('https://api.themoviedb.org/3/discover/movie?page=1&primary_release_year=' + n + '&sort_by=popularity.desc&api_key=d2e4954257fdd51820ae05f9c644a8f0').then(function (json) {

      this.setState({ data: json.results });
    }.bind(this));
  };
  //declare these variables after state has changed by calling the API
  //in order to initialize the list.js sorting library

  App.prototype.componentDidUpdate = function componentDidUpdate() {
    var options = { valueNames: ['monthly', 'total'] };
    var userList = new List(this.refs.users, options);
    backdrop = 'https://image.tmdb.org/t/p/original/' + this.state.data[0].backdrop_path;
    console.log(backdrop);
    $('body').css('background', 'url(' + backdrop + ') no-repeat center center fixed');
    $('body').css('background-size', 'cover');
  };

  App.prototype.render = function render() {
    var _this2 = this;

    //create the row via the constant   
    var rows = this.state.data.map(function (movie) {
      return React.createElement(MovieRow, { key: movie.title, data: movie });
    });

    //render the table
    return React.createElement(
      'div',
      { ref: 'users' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'headerbox' },
          React.createElement(
            'h1',
            null,
            React.createElement(
              'form',
              { onSubmit: this._changeYear.bind(this) },
              React.createElement(
                'label',
                null,
                '20 most popular films of '
              ),
              React.createElement('br', null),
              React.createElement('input', { type: 'text', placeholder: n, ref: function ref(c) {
                  return _this2._year = c;
                } })
            )
          ),
          React.createElement(
            'h3',
            null,
            'Pick a year to see its 20 most popular films*'
          ),
          React.createElement(
            'p',
            null,
            '*According to the users of themoviedb.org'
          )
        ),
        React.createElement(
          'div',
          { className: 'table-responsive' },
          React.createElement(
            'table',
            { className: 'table' },
            React.createElement(
              'th',
              null,
              'Poster'
            ),
            React.createElement(
              'th',
              null,
              'Name'
            ),
            React.createElement(
              'th',
              null,
              'Summary'
            ),
            React.createElement(
              'th',
              null,
              React.createElement(
                'button',
                { className: 'sort', 'data-sort': 'monthly' },
                'Rating'
              )
            ),
            React.createElement(
              'th',
              null,
              React.createElement(
                'button',
                { className: 'sort', 'data-sort': 'total' },
                'Release'
              )
            ),
            React.createElement(
              'tbody',
              { className: 'list' },
              rows
            )
          )
        ),
        React.createElement(
          'footer',
          { className: 'fineprint' },
          React.createElement(
            'small',
            null,
            React.createElement(
              'a',
              { href: 'http://themoviedb.org' },
              React.createElement('img', { src: 'http://res.cloudinary.com/stormgrass/image/upload/c_scale,w_57/v1463733430/tmdblogo.png' })
            ),
            ' ',
            React.createElement('br', null),
            'This product uses the ',
            React.createElement(
              'a',
              { target: '_blank', href: 'http://themoviedb.org' },
              'TMDb'
            ),
            ' API but is not endorsed or certified by TMDb.',
            React.createElement('br', null),
            'Made by ',
            React.createElement(
              'a',
              { target: '_blank', href: 'http://hemmer.tv' },
              'Richard'
            ),
            '.'
          )
        )
      )
    );
  };

  App.prototype._changeYear = function _changeYear(event) {
    event.preventDefault();
    event.stopPropagation();

    var l = this._year.value;
    if (l >= 1887 && l <= n) {
      $.getJSON('https://api.themoviedb.org/3/discover/movie?page=1&primary_release_year=' + l + '&sort_by=popularity.desc&api_key=d2e4954257fdd51820ae05f9c644a8f0').then(function (json) {
        this.setState({ data: json.results });
      }.bind(this));
    }
    $(function () {
      $('input').blur();
    });
  };

  return App;
}(React.Component);

//create a row for each user

var MovieRow = function MovieRow(props) {
  return React.createElement(
    'tr',
    { className: 'therow' },
    React.createElement(
      'td',
      { className: 'poster' },
      React.createElement('img', { className: 'img-responsive', src: 'https://image.tmdb.org/t/p/w500' + props.data.poster_path })
    ),
    React.createElement(
      'td',
      null,
      React.createElement(
        'a',
        { target: '_blank', href: 'https://www.themoviedb.org/movie/' + props.data.id },
        React.createElement(
          'em',
          null,
          React.createElement(
            'h4',
            null,
            props.data.title
          )
        )
      )
    ),
    React.createElement(
      'td',
      { className: 'film-overview' },
      React.createElement(
        'p',
        null,
        props.data.overview
      )
    ),
    React.createElement(
      'td',
      { className: 'monthly numbers' },
      props.data.vote_average
    ),
    React.createElement(
      'td',
      { className: 'total numbers' },
      props.data.release_date
    )
  );
};

React.render(React.createElement(App, null), document.getElementById('app'));
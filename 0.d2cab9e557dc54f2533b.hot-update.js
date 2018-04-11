exports.id = 0;
exports.modules = {

/***/ "./src/app.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__("./node_modules/express/index.js");

var _express2 = _interopRequireDefault(_express);

var _routes = __webpack_require__("./src/routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = __webpack_require__("./node_modules/body-parser/index.js");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = __webpack_require__("./node_modules/passport/lib/index.js");

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__("./node_modules/passport-local/lib/index.js");

var _expressSession = __webpack_require__("./node_modules/express-session/index.js");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = __webpack_require__("./node_modules/cookie-parser/index.js");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _user = __webpack_require__("./src/db/models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.static('dist'));
app.use(_express2.default.static('styles'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cookieParser2.default)());

app.use((0, _expressSession2.default)({ secret: 'cat' }));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

_passport2.default.use(new _passportLocal.Strategy({ usernameField: 'email' }, function (email, password, done) {
  _user2.default.query().findOne({ email: email }).then(function (user) {
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }).catch(function (e) {
    console.error(e);
    return done(e);
  });
}));

_passport2.default.serializeUser(function (user, done) {
  done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
  _user2.default.query().findById(id).then(function (user) {
    if (!user) {
      return done('user not found', false);
    }
    return done(null, user);
  }).catch(function (e) {
    console.error('error finding user', e);
    done(e);
  });
});

_routes2.default.setRoutes(app);
app.listen(3000, function () {
  return console.log('App listening on port 3000! What else is new?');
});

/***/ })

};
//# sourceMappingURL=0.d2cab9e557dc54f2533b.hot-update.js.map
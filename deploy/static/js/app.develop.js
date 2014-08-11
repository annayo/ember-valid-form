(function() {

var App = window.App = Ember.Application.create();


})();

(function() {

// This file exists to show the file naming conventions for mixins.
//
// After adding a mixin, this file should be deleted.
//
// Mixins should be an adjective followed by a 'Mixin' suffix.
// If the mixin is specific to a type of object (Route, View, Component), it
// should contain that type before the 'Mixin' suffix
//
// App.AnimatableMixin      good
// App.ResizableViewMixin   good
// App.AnimationMixin       bad, use adjective form
// App.Animatable           bad, use Mixin suffix


})();

(function() {

// This file exists to show the file naming conventions for models.
//
// After adding a model, this file should be deleted.
//
// Models should be singular nouns and should not have a 'Model' suffix.
//
// App.Article       good
// App.Articles      bad, use singular form
// App.ArticleModel  bad, don't use Model suffix

})();

(function() {

// This file exists to show the file naming conventions for components.
//
// After adding a component, this file should be deleted.
//
// Components should be compound words followed by the 'Component' suffix.
//
// App.SiteHeaderComponent   good
// App.HeaderComponent       bad, use two words to name the component
// App.SiteHeader            bad, use Component suffix


})();

(function() {

// This file exists to show the file naming conventions for handlebars helpers.
//
// After adding a helper, this file should be deleted.
//
// Helpers should be lowercase and dasherized, mirroring their syntax in handlebars.
//
// format-date.js         good
// format-date-helper.js  bad, omit '-helper' suffix.
// FormatDate.js          bad, use dasherized case


})();

(function() {

App.ApplicationController = Ember.ObjectController.extend();


})();

(function() {

App.ApplicationRoute = Ember.Route.extend();


})();

(function() {

App.ApplicationView = Ember.View.extend();


})();

(function() {

App.IndexController = Ember.ObjectController.extend();


})();

(function() {

App.IndexRoute = Ember.Route.extend();


})();

(function() {

App.IndexView = Ember.View.extend();


})();

(function() {

App.Router.map(function () {
	// Add routes here.
});


})();
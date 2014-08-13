App.CustomFileComponent = Ember.Component.extend({
	tagName: 'span',
	classNames: ['custom-file'],

	change: function () {
		this.set('value', this.$().find('input').val());
	}
});
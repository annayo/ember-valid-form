App.CustomCheckboxComponent = Ember.Component.extend({
	tagName: 'span',
	classNames: ['custom-checkbox'],
	classNameBindings: ['checked'],

	checkedProperty: null,

	click: function () {
		this.set('checked', this.$().find('input').is(':checked'));
	}
});
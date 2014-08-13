App.CustomSelectComponent = Ember.Component.extend({
	tagName: 'span',
	classNames: ['custom-select', 'fill'],
	classNameBindings: ['selected'],

	selected: false,
	selectedOption: null
});
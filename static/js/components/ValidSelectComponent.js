require('./ValidFieldComponent');

App.ValidSelectComponent = App.ValidFieldComponent.extend({
	classNames: 'valid-select',

	didInsertElement: function () {
		this._super();
		this.set('name', this.$().find('select').attr('name'));
	},

	change: function () {
		this.set('value', this.$().find('select').val() || null);
	},

	checkIfEnabled: function () {
		if (!this.get('isEnabled')) {
			this.$().find('select').attr('disabled', 'disabled');
		} else {
			this.$().find('select').removeAttr('disabled');
		}
	}.observes('isEnabled').on('didInsertElement'),
});
require('./ValidFieldComponent');

App.ValidCheckboxComponent = App.ValidFieldComponent.extend({
	validators: 'isChecked',

	init: function () {
		this._super();
		this.resetValue();
	},

	didInsertElement: function () {
		this._super();
		this.set('name', this.$().find('input').attr('name'));
	},

	click: function () {
		this.set('value', this.$().find('input').is(':checked'));
	},

	resetValue: function () {
		this.set('value', false);
	}
});
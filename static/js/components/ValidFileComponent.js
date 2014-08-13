require('./ValidFieldComponent');

App.ValidFileComponent = App.ValidFieldComponent.extend({

	didInsertElement: function () {
		this._super();
		this.set('name', this.$().find('input').attr('name'));
	},

	change: function () {
		this.set('value', this.$().find('input').val());
	}
});
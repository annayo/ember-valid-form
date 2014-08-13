require('./ValidFieldComponent');

App.ValidTextComponent = App.ValidFieldComponent.extend({

	keyUp: function () {
		if (this.get('hasError')) {
			this.setProperties({
				isKeybound: true,
				value: this.$().find('input').val()
			});
			// this.set('isKeybound', true);
			// this.set('value', this.$().find('input').val());
			this.validateType(this.get('validators').findBy('isActive'));
		} else {
			this.set('isKeybound', false);
		}
	},

	focusOut: function () {
		this.set('value', this.$().find('input').val());
	},

	didInsertElement: function () {
		this._super();

		var $field = this.$().find('input');
		this.set('name', $field.attr('name'));

		if (!this.get('isEnabled')) {
			$field.removeAttr('name');
		}
	},

	isEnabledDidChange: function () {
		var $field = this.$().find('input');
		if (this.get('isEnabled')) {
			$field.attr('name', this.get('name'));
		} else {
			$field.removeAttr('name');
		}
	}.observes('isEnabled')
});
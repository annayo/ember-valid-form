App.ValidFormComponent = Ember.Component.extend({
	tagName: 'form',
	classNames: ['valid-form'],
	classNameBindings: ['didSubmit'],
	attributeBindings: ['action', 'method', 'enctype', 'autocomplete'],

	children: null,

	isSubmitting: false,
	didSubmit: false,

	reloadAction: 'reset',

	didInsertElement: function () {
		this.set('children', this._childViews[0]._childViews);

		// NOTE: un-embery way to control native submit of multi-part form data
		// for legacy support (< IE10)
		this.$().on('submit', this.validateAll.bind(this));
	},

	validateAll: function (e) {
		e.preventDefault();

		if (this.get('isSubmitting')) {
			return;
		}

		this.get('children').forEach(function (field) {
			if (field.validateType) {
				field.validate();
			}
		});

		if (this.isValid()) {
			this.doSubmit(e);
		}
	},

	isValid: function () {
		var isValid = true;
		this.get('children').filterBy('hasError', true).forEach(function (field) {
			if (field.get('isEnabled')) {
				isValid = false;
			}
		});

		return isValid;
	},

	doSubmit: function (e) {
		this.set('isSubmitting', true);

		var self = this,
			formObj = this.$(),
			formURL = '/';
	 
		if (window.FormData) {
			var formData = new FormData(formObj[0]);

			$.ajax({
				url: formURL,
				type: 'POST',
				data: formData,
				mimeType: 'multipart/form-data',
				contentType: false,
				cache: false,
				processData: false,
				success: function(data, textStatus, jqXHR) {
					self.set('didSubmit', true);
					//_gaq.push(['_trackEvent', 'Submission', 'Submit', 'Success']);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					//_gaq.push(['_trackEvent', 'Submission', 'Submit', 'Error - ' + errorThrown]);
				},
				complete: function () {
					self.set('isSubmitting', false);
				}
			});
	   } else {
			//_gaq.push(['_trackEvent', 'Submission', 'Submit', 'Success']);
			this.$().off('submit').submit();
		}
	},

	// resetting child component values for re-submit/validation capability
	resetChildren: function () {
		this.get('children').filterBy('clearOnSubmit', true).forEach(function (field) {
			field.resetValue();
			Ember.addObserver(field, 'value', field, field.valueDidChange);
		}.bind(this));
	},

	// disable observers to avoid validation when values are reset ^ for re-submit
	disableObservers: function () {
		if (this.get('isSubmitting')) {
			this.get('children').filterBy('clearOnSubmit', true).forEach(function (field) {
				Ember.removeObserver(field, 'value', field, field.valueDidChange);
			}.bind(this));
		}
	}.observes('isSubmitting'),

	actions: {
		reload: function () {
			this.sendAction('reloadAction');
			Ember.run.later(function () {
				this.resetChildren();
				this.set('didSubmit', false);
			}.bind(this), 500);
		}
	}
});

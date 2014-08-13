App.ValidFieldComponent = Ember.Component.extend({
	tagName: 'label',
	layoutName:'components/valid-field',
	classNameBindings: ['hasError', 'isEnabled::disabled'],

	validators: 'required',
	isEnabled: true,
	clearOnSubmit: true,

	didFail: false,

	init: function () {
		this._super();

		this.setProperties({
			value: null,
			hasError: false,
			messages: [],
			parentView: this.get('_parentView')
		});

		if (this.get('validators')) {
			this.parseValidators();
		}
	},

	parseValidators: function () {
		var validator,
			hasMessage,
			validators = [];

		this.get('validators').split(', ').forEach(function (item) {
			hasMessage = item.indexOf(':');
			if (hasMessage > -1) {
				validator = {type: item.slice(0, hasMessage), message: item.slice(hasMessage+1)};
			} else {
				validator = {type: item};
			}

			validators.pushObject(validator);
		});

		this.set('validators', validators);
	},

	validate: function () {
		if (this.get('isEnabled')) {
			this.get('validators').forEach(function (validator) {
				this.validateType(validator);
			}.bind(this));
		}
	},

	validateType: function (validator) {
		var isValid,
			validation	= this.get('validation'),
			messages	= this.get('messages'),
			message 	= validator.message || validation[validator.type].message;

		// avoid validating presence and pattern at once
		// TODO: maybe a better way to achieve this
		if (validator.type !== 'required' && this.isNone(this.get('value'))) {
			messages.removeObject(message);
			return;
		}

		isValid = validation[validator.type].validate(this.get('value'));

		if (!isValid && messages.indexOf(message) < 0) {
			validator.isActive = true;
			this.get('messages').pushObject(message);

			//_gaq.push(['_trackEvent', 'Submission', 'Validate', validator.type + ' - ' + this.get('name')]);
		} else if (isValid) {
			validator.isActive = false;
			this.get('messages').removeObject(message);
		}
	},

	isNone: function (str) {
		return str === '' || str === null || str === undefined;
	},

	resetValue: function () {
		this.set('value', null);
	},

	valueDidChange: function () {
		if (this.isNone(this.get('value')) || this.get('isKeybound')) {
			return;
		}
		this.validate();
	}.observes('value'),

	messagesDidChange: function () {
		if (this.get('messages').length > 0) {
			this.set('hasError', true);
		} else {
			this.set('hasError', false);
		}
	}.observes('messages.@each'),

	isEnabledDidChange: function () {
		if (!this.get('isEnabled')) {
			this.set('messages', []);
		}
	}.observes('isEnabled'),

	validation: {
		required : {
			message : 'This field is required',
			validate : function (str) {
				var pattern = /\S/;
				return pattern.test(str) && str && str !== null && str !== undefined;
			}
		},
		alpha : {
			message : 'Please enter only alpha characters',
			validate : function (str) {
				var pattern = /^[a-zA-Z]*$/;
				return pattern.test(str.replace(/\s/g, ''));
			}
		},
		digits : {
			message : 'Please enter only digits',
			validate : function (value) {
				var pattern = /^[0-9]*$/;
				return pattern.test(value.replace(/\s/g, ''));
			}
		},
		file : {
			message : 'Only these file types are allowed: .gif, .jpg, .jpeg, .png, .txt, .pdf',
			validate : function (filename) {
				var pattern = /\.(gif|jpg|jpeg|png|txt|pdf)$/i;
				return pattern.test(filename);
			}
		},
		zip : {
			message : 'Please enter a 5-digit zip code',
			validate : function (zipcode) {
				var pattern = /^\d{5}$|^\d{5}-\d{4}$/;
				return pattern.test(zipcode);
			}
		},
		email : {
			message : 'Please enter a valid email address',
			validate : function (email) {
				var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				return pattern.test(email);
			}
		},
		isChecked : {
			message : 'Must be checked',
			validate : function (isChecked) {
				return isChecked;
			}
		},
		url : {
			message : 'Url should resemble: http://soundcloud.com/.../...',
			validate: function (url) {
				// Author: https://gist.github.com/dperini/729294
				var pattern = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
				return pattern.test(url);
			}
		}
	}
});
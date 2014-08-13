App.ShareLinkComponent = Ember.Component.extend({
	tagName: 'a',
	attributeBindings: ['href', 'target', 'title', 'data-track-category', 'data-track-action', 'data-track-label'],

	href: function () {
		var typeUrl = this.get('type') + 'Url';
		return this.get(typeUrl);
	}.property('type'),

	encodedDescription: function () {
		return encodeURIComponent(this.get('description'));
	}.property('content'),

	url: function () {
		return encodeURIComponent(window.location.href);
	}.property(),

	facebookUrl: function () {
		return 'https://www.facebook.com/sharer/sharer.php?u=' + this.get('url') + '&t=' + this.get('encodedDescription');
	}.property(),

	twitterUrl: function () {
		return 'https://twitter.com/share?url=' + this.get('url') + '&text=' + this.get('encodedDescription');
	}.property(),

	googleUrl: function () {
		return 'https://plus.google.com/share?url=' + this.get('url');
	}.property(),

	click: function (e) {
		e.preventDefault();

		var width = 350,
			height = 300,

			x =($(window).width()/2) - (width/2),
			y = ($(window).height()/2) - (height/2);

		window.open(this.get('href'), this.get('title').replace(/\s/g, ''), 'height=' + height + ',width=' + width + ',left=' + x + ',top=' + y);
	}
});
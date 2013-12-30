var Car = Backbone.Model.extend({
	defaults: {
		status: 'waiting',//go
		at: 0,
		next: -1,
		update_at: ''
	},
	go: function(index) {
		this.set({status:'going', at: index, next: index + 1});
	},
	arrived: function(waiting) {
		this.set({status:'going', at: index, next: -1});
	}
});

//module
var StationModel = Backbone.Model.extend({
    defaults: {
        index: 0,
        name: '',
        status: 'none',
		updated_at: ''
    },
    waiting: function() {
        this.set({status: 'waiting'});    
    },
    willAt: function() {
        this.set({status: 'next'});
    },
    leave: function() {
        this.set({status: 'passed'}); 
    },
	reset: function() {
		this.set({status: 'none'});
	}
});

var StationList = Backbone.Collection.extend({
    model: StationModel
});

var StationView = Backbone.View.extend({
	tagName: 'li',    
	template: _.template( $('#station-tmpl').html() ),
	events: {
		'click .start': 'go',
		'click .stop': 'arrive'
	},
	initialize: function() {
		this.model.bind('change:status', this.updateStatus, this);
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.addClass('station-' + this.model.escape('status'));
		return this;
	},
	updateStatus: function() {
		this.addClass('station-' + this.model.escape('status'));
	},
	go: function() {
		this.model.leave();
	},
	arrive: function() {
		this.model.waiting();
	}
});

var List = new StationList([
	{index: 0, name: '电视塔地铁站', 			status: 'none', updated_at: '8:30'},
	{index: 1, name: '伟丰花园', 			status: 'none', updated_at: ''},
	{index: 2, name: '鑫泰园', 				status: 'none', updated_at: ''},
	{index: 3, name: '东仪路十字西', 			status: 'none', updated_at: ''},
	{index: 4, name: '521医院', 				status: 'none', updated_at: ''},
	{index: 5, name: '电子正街丈八路十字西', 	status: 'none', updated_at: ''},
	{index: 6, name: '204所', 				status: 'none', updated_at: ''},
	{index: 7, name: '公路二局', 			status: 'none', updated_at: ''},
	{index: 8, name: 'Office', 				status: 'none', updated_at: ''}
]);

var StationApp = Backbone.View.extend({
	el: $('#stations'),
	events: {
		
	},
	initialize: function() {
		
	},
	render: function() {
		var that = this;
		List.each(function(m) {
			var view = new StationView({
				model: m
			});
			that.$el.append(view.render().el);
		});
	}
});

var app = new StationApp;
app.render();

//app

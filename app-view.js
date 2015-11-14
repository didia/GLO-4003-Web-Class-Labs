/**
 * Created by didia on 15-10-17.
 */
var app = app || {}
$(document).ready(function() {

    app.AppView = Backbone.View.extend({

        el: '.post-it-app',

        taskTemplate: _.template($('#task-template').html()),

        events: {
            'click .post-button': 'createTask',
            'keypress .new-todo': 'createOnEnter',
        },

        initialize: function () {

            this.$input = this.$('#task-content');

            this.$list = $('#content');

            this.listenTo(app.tasks, 'add', this.addOne);
            this.listenTo(app.tasks, 'reset', this.addAll);
            this.listenTo(app.tasks, 'all', _.debounce(this.render, 0));

            app.tasks.fetch({reset: true});
        },

        addOne: function (task) {
            var view = new app.TaskView({ model: task });
            this.$list.append(view.render().el);
        },

        addAll: function () {
            this.$list.html('');
            app.tasks.each(this.addOne, this);
        },

        createTask: function(e) {
            e.preventDefault();
            var task = this.$input.val().trim();
            app.tasks.create({'task': task}, { wait: true });
            this.$input.val("");
        }
    });
});

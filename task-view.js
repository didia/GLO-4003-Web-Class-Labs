/**
 * Created by didia on 15-10-18.
 */
var app = app || {};

(function ($) {
    'use strict';

    app.TaskView = Backbone.View.extend({
        tagName:  'div',

        template: _.template($('#task-template').html()),

        events: {
            'click button.on-edit': 'toggleEdit',
            'click button.off-edit': 'toggleEdit',
            'click button.edit-button': 'edit',
            'click button.delete-button': 'delete'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        toggleEdit: function () {
            this.$el.find(".off-edit").toggle();
            this.$el.find(".on-edit").toggle();
        },


        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        edit: function () {
            var textarea = this.$el.find('textarea')[0];
            if(textarea) {
                var new_value = $(textarea).val();
                this.model.save({task: new_value});
            }
        },

        delete: function() {
            this.model.destroy();
        }
    });
})(jQuery);
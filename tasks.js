/**
 * Created by didia on 15-10-17.
 */
var app = app || {};
$(function() {
   Tasks = Backbone.Collection.extend({
       url: "http://localhost:5000/tasks",

       model: Task,

       parse: function(response) {
            return response.tasks;
       }
    });

    app.tasks = new Tasks();
});

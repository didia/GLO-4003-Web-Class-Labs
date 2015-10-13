$(document).ready(function(){
    var endpoint = "http://localhost:5000/tasks"
    var all_tasks= [];

    function createTask(task) {
        var next_id = all_tasks[all_tasks.length - 1].id + 1;
        $.ajax({ 'url':endpoint + "/"+next_id, 'data': JSON.stringify({'task': task}), 'contentType': 'application/json', 'mimeType': 'application/json', 'method': 'POST'}).done(function(data) {
            all_tasks = data.tasks;
            updateTaskContainer();
            $("#task-content").val('');
        }).fail(function() {
           console.log("The api does not seem to work")
        });
    }

    function getTask(task_id) {
        $.ajax({ 'url':endpoint + "/"+task_id, 'method': 'GET'}).done(function(data) {
            task = getTaskView(data.task);
            $("#search-card").replaceWith(task);
            $("#content").append(getSearchCard());
        }).fail(function() {
            $("#search-card .aler").show();
        });
    }

    function editTask(task_id, task) {
        $.ajax({'url': endpoint + "/" + task_id, 'data': JSON.stringify({'task': task}), 'contentType': 'application/json', 'mimeType': 'application/json', 'method': 'PUT'}).done(function(data){
            all_tasks = data.tasks;
            updateTaskContainer();
        });
    }

    function deleteTask(task_id) {
        $.ajax({ 'url': endpoint + "/" + task_id, 'method': 'DELETE'}).done(function(data){
            all_tasks = data.tasks;
            updateTaskContainer();
        }).fail(function(){
            console.log("Delete task failed");
        });
    }

    function toggleEdit() {
        $(".off-edit").toggle();
        $(".on-edit").toggle();
    }

    function getSearchCard() {
        var html = "";
        html += "<div id = 'search-card' class = 'mdl-card mdl-shadow--2dp'>" +
                "<div>"+
                "<input id = 'search-id' placeholder = 'Enter a task id here to search'/>" +
                "<button class='mdl-button mdl-js-button mdl-button--raised search-button'> SEARCH </button>" +
                "</div>" +
                "<div class='alert alert-danger alert-dismissible' role='alert'> Oups, There seems to be no task with the provided id </div>" +
                "</div>";
        return html;

    }

    function getTaskView(task) {
        var html  = "";
        html += "<div class = 'mdl-card mdl-shadow--2dp'>" +
                "<p class='off-edit real-content'>" +  task.task + "</p>" +
                "<textarea data-target-id= '" + task.id + "' class='on-edit editable-content'>" + task.task + "</textarea>" +
                "<div class = 'mdl-card__actions actions'>" +
                "<button data-target-id = '" + task.id + "' class='mdl-button mdl-js-button mdl-button--raised off-edit delete-button'> DELETE</button> "  +
                "<button class='mdl-button mdl-js-button mdl-button--raised off-edit toggle-edit'> EDIT </button> " +
                "<button class='mdl-button mdl-js-button mdl-button--raised on-edit toggle-edit'> CANCEL</button> " +
                "<button data-target-id = '" + task.id + "' class='mdl-button mdl-js-button mdl-button--raised on-edit edit-button'> OKAY</button> " +
                "</div>" +
                "</div>";
        return html;
    }

    function updateTaskContainer() {
        var html = "";
        $.each(all_tasks, function(index, task) {
            html += getTaskView(task);
        });
        html += getSearchCard();
        $("#content").html(html);
    }

    $(document).on('click', 'button.post-button', function(e) {
        e.preventDefault();
        var task = $("#task-content").val();
        if(task !== "") {
            createTask(task);
        }
    });

    $(document).on('click', '.toggle-edit', function(e){
        toggleEdit();
    });

    $(document).on('click', 'button.delete-button', function(event){
        var task_id = $(this).data("target-id");
        deleteTask(task_id);
    });
    $(document).on('click', 'button.edit-button', function(event) {
        var task_id = $(this).data("target-id");
        var text_area_selector = "textarea[data-target-id='" + task_id + "']";
        var task = $(text_area_selector).val();
        editTask(task_id, task);
    });
    $(document).on('click', 'button.search-button', function(event){
        var task_id = $('#search-id').val();
        getTask(task_id);
    });

    function initialize() {
        $.get(endpoint).done(function(data){
            all_tasks = data.tasks;
            updateTaskContainer();
        }).fail(function(){
            alert("The api does not seem to work");
        });
    }

    initialize();
});


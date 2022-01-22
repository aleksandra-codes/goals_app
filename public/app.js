$(document).ready(function () {
  $.getJSON("/api/goals")
    .then((data) => addGoals(data))
    .catch(function (err) {
      console.log("Something went wrong");
    });

  $("#goalInput").keypress(function (event) {
    if (event.which == 13) {
      addGoal();
    }
  });

  $(".list").on("click", ".delete_btn", function (event) {
    event.stopPropagation();
    removeGoal($(this).parent().parent());
  });

  $(".list").on("click", ".completed_btn", function (event) {
    event.stopPropagation();
    toggleCompletedGoal($(this).parent().parent());
  });

  $(".list").on("click", ".current_btn", function (event) {
    event.stopPropagation();
    setCurrentGoal($(this).parent().parent());
  });
});

function addGoals(goals) {
  goals.forEach((goal) => {
    appendGoal(goal);
  });
}

function appendGoal(goal) {
  var newGoal = $(
    "<li class='list-group-item d-flex justify-content-between align-items-center'><p>" +
      goal.goal +
      "</p><div><button type='button' class='current_btn btn btn-primary btn-sm ml-2'>Current</button><button type='button' class='completed_btn btn btn-success btn-sm ml-2'>Completed</button><button type='button' class='delete_btn btn btn-danger btn-sm ml-2'>Delete</button></div></li>"
  );
  newGoal.data("id", goal._id);
  newGoal.data("completed", goal.completed);
  newGoal.data("current", goal.current);

  if (goal.completed) {
    newGoal.addClass("done text-muted");
    $(".list-completed").append(newGoal);
  } else if (goal.current) {
    newGoal.addClass("current text-primary");
    $(".list-priority").append(newGoal);
  } else {
    $(".list-general").append(newGoal);
  }
}

function addGoal() {
  var userInput = $("#goalInput").val();
  $.post("/api/goals", { goal: userInput })
    .then(function (newGoal) {
      $("#goalInput").val("");
      appendGoal(newGoal);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function removeGoal(goal) {
  var clickedId = goal.data("id");
  var deleteUrl = "/api/goals/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl,
  })
    .then(function (data) {
      goal.remove();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function toggleCompletedGoal(goal) {
  var updateId = goal.data("id");
  var updateUrl = "/api/goals/" + updateId;
  var isDone = !goal.data("completed");
  var isCurrent = !goal.data("current");
  if (!isDone & isCurrent) {
    var updateData = { completed: isDone };
    $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData,
    })
      .then(function (data) {
        goal.toggleClass("done text-muted");
        goal.data("completed", isDone);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (isDone & isCurrent) {
    var updateData = { completed: isDone };
    $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData,
    })
      .then(function (data) {
        goal.toggleClass("done text-muted");
        goal.data("completed", isDone);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    //completed false, current true
    //remove current styling
    var updateData = { completed: isDone, current: isCurrent };
    $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData,
    })
      .then(function (data) {
        goal.toggleClass("done text-muted");
        goal.removeClass("current text-primary");
        goal.data("completed", isDone);
        goal.data("current", isCurrent);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

function setCurrentGoal(goal) {
  var updateId = goal.data("id");
  var updateUrl = "/api/goals/" + updateId;
  var isCurrent = !goal.data("current");
  var isDone = !goal.data("completed");

  if (isCurrent & isDone) {
    var updateData = { current: isCurrent };
    console.log("isCurrent = false, isDone = false");
    $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData,
    })
      .then(function (data) {
        goal.toggleClass("current text-primary");
        goal.data("current", isCurrent);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (isCurrent & !isDone) {
    var updateData = { current: isCurrent, completed: isDone };
    console.log("isCurrent = false, isDone = true");
    $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData,
    })
      .then(function (data) {
        goal.toggleClass("current text-primary");
        goal.removeClass("done text-muted");
        goal.data("current", isCurrent);
        goal.data("completed", isDone);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else if (!isCurrent & isDone) {
    var updateData = { current: isCurrent };
    console.log("isCurrent = true, isDone = false");
    $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData,
    })
      .then(function (data) {
        goal.toggleClass("current text-primary");
        goal.removeClass("done text-muted");
        goal.data("current", isCurrent);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    console.log("isCurrent = true, isDone = true!!!");
  }
}

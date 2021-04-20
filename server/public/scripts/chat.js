const socket = io.connect("https://big-z-chat.herokuapp.com/");
const audio = new Audio("../assets/audio/button.mp3");

let output = "";

let nickName = "Anonymous123";

// window.onbeforeunload = function () {
//   return "Are you really want to perform the action?";
// };

$("#nkSubmitBtn").on("click", () => {
  const name = $("#nickName").val();
  if (name.length > 2 && name.length < 10) {
    nickName = name;
    socket.emit("join", { name: nickName });
    $("#nickName-container").slideUp();
  }
});

$("#btn").on("click", () => {
  bottomScroller();
  const msgData = $("#msg").val();
  socket.emit("chat", { name: nickName, message: msgData });
  $("#msg").val("");
  $("#msg").focus();
  socket.emit("typing", { name: "", status: "" });
});

$("#msg").keydown((key) => {
  if (key.key == "Enter") {
    bottomScroller();
    const msgData = $("#msg").val();
    socket.emit("chat", { name: nickName, message: msgData });
    $("#msg").val("");
    $("#msg").focus();
    socket.emit("typing", { name: "", status: "" });
  } else {
    socket.emit("typing", { name: nickName, status: "is typing..." });
  }
});

socket.on("msg", (data) => {
  audio.play();
  output += `<h1>${data}</h1>`;
  $("#output").html(output);
});

socket.on("status", (data) => {
  $("#status").html(`<h4 style="color: #58B19F;"><em>${data}</em></h4>`);
});

socket.on("join", (data) => {
  output += `<h1 style="color: #fbc531;">${data}</h1>`;
  $("#output").html(output);
});

socket.on("disconnect", (data) => {
  output += `<h1 style="color: #eb4d4b;">someone left</h1>`;
  $("#output").html(output);
});

function bottomScroller() {
  $(".content").animate(
    {
      scrollTop: $(".content")[0].scrollHeight,
    },
    "slow"
  );
}

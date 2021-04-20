const socket = io.connect("https://big-z-chat.herokuapp.com/");
const audio = new Audio("../assets/audio/button.mp3");

$("#btn").on("click", () => {
  audio.play();
  const msgData = $("#msg").val();
  socket.emit("chat", msgData);
  $("#msg").val("");
  $("#msg").focus();
});

$("#msg").keydown((key) => {
  if (key.key == "Enter") {
    audio.play();
    const msgData = $("#msg").val();
    socket.emit("chat", msgData);
    $("#msg").val("");
    $("#msg").focus();
  }
});

socket.on("msg", (data) => {
  $(".content").append(`<h1>${data}</h1>`);
});

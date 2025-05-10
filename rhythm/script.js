document.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    const note = document.getElementById("note1");
    note.style.backgroundColor = "green";
    setTimeout(() => {
      note.style.backgroundColor = "red";
    }, 200);
  }

  if (e.key === "s") {
    const note = document.getElementById("note2");
    note.style.backgroundColor = "green";
    setTimeout(() => {
      note.style.backgroundColor = "red";
    }, 200);
  }
});

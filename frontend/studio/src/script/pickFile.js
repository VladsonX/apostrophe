// Opens the browser file picker and resolves with the chosen file (or null).
const pickFile = (accept = "image/*") =>
  new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => resolve(input.files[0] ?? null);
    input.click();
  });

export default pickFile;

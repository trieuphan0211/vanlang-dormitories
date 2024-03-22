export const readFile = (file: any, setValue: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e: any) {
    setValue({
      fileName: file.name,
      fileFormat: file.type,
      value: e.target.result.replace(`data:${file.type};base64,`, ""),
    });
  };
};

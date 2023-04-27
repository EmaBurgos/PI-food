export const validation = (form, errors, setErrors, target) => {
  const regexURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (target === "title") {
    if (!form.title) setErrors({ ...errors, title: "Empty title is invalid" });
    else setErrors({ ...errors, title: "" });
  }
  if (target === "summary") {
    if (!form.summary) {
    setErrors({ ...errors, summary: "Empty summary is invalid" });
    } else if (form.summary.length > 200) {
    setErrors({
    ...errors,
    summary: "Summary can't contain more than 200 characters",
    });
    } else {
    setErrors({ ...errors, summary: "" });
    }
    }
  if (target === "instructions") {
    if (!form.instructions)
      setErrors({ ...errors, instructions: "Empty instructions are invalid" });
    else setErrors({ ...errors, instructions: "" });
  }
  if (target === "healthScore") {
    if (form.healthScore > 100) {
      setErrors({ ...errors, healthScore: "Health score limit is 100" });
    } else {
      setErrors({ ...errors, healthScore: "" });
    }
  }
  if (target === "image") {
    if (!regexURL.test(form.image)) {
      setErrors({
        ...errors,
        image:
          "Invalid URL, try https://img.freepik.com/vector-premium/corazon-vegetales-verdes-frutas_53562-4713.jpg?w=2000",
      });
    } else setErrors({ ...errors, image: "" });
  }
};

export const required = {
  value: true,
  message: "This field is required"
};

export const maxLength = (value: number) => ({
  value,
  message: "Too many characters"
});

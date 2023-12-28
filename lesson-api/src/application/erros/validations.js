export class RequiredFieldError extends Error {
  constructor(fieldName) {
    const message =
      fieldName === undefined
        ? "Field required"
        : `The field ${fieldName} is required`;
    super(message);
    this.name = "RequiredFieldError";
  }
}

export class InvalidMimeTypeError extends Error {
  constructor(allowed) {
    super(`Unsupported type. Allowed types: ${allowed.join(", ")}`);
    this.name = "InvalidMimeTypeError";
  }
}
export class MaxFileSizeError extends Error {
  constructor(maxSizeInMb) {
    super(`File upload limit is ${maxSizeInMb}MB`);
    this.name = "MaxFileSizeError";
  }
}

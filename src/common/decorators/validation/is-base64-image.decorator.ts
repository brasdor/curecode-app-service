import { registerDecorator, ValidationOptions } from "class-validator"

export function IsBase64Image(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isBase64Image",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== "string") {
            return false
          }

          // Regex for validating base64 image (e.g., data:image/png;base64,...)
          const base64Regex =
            /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/]+={0,2}$/

          return base64Regex.test(value)
        },
        defaultMessage() {
          return "The provided string is not a valid base64 image"
        },
      },
    })
  }
}

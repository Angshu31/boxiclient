import { NumberKind, StringKind, Type } from "@sinclair/typebox";
import { affector } from "../internal/affector";
import { DataType } from "../internal/DataType";
import { objectSchemaKey } from "../internal/keys";

const designTypes = new Map<Function, TypeboxTypeFunc>([
  [String, Type.String],
  [Number, Type.Number],
  [Boolean, Type.Boolean],
  [Function, Type.Function],
]);

export type TypeboxTypeFunc = typeof Type[keyof typeof Type];
export type GetTypeFunc = () => TypeboxTypeFunc | ReturnType<TypeboxTypeFunc>;

export type FieldOptions = {
  optional?: boolean;
  getType?: GetTypeFunc;
};

export function Field(getType?: GetTypeFunc);
export function Field(options?: FieldOptions);
export function Field(getType?: GetTypeFunc, options?: FieldOptions);

export function Field(...args: any[]) {
  const type = typeof args[0] === "function" ? args[0] : undefined;
  const options: FieldOptions = (type ? args[1] : args[0]) || {};

  if (type) options.getType = type;

  return affector((data, { propName, target, propKey }) => {
    if (!options.getType) {
      const type = Reflect.getMetadata("design:type", target, propKey);

      const objectType = Reflect.getMetadata(objectSchemaKey, type);

      options.getType = () => objectType || designTypes.get(type) || Type.Any;
    }

    const type = options.getType();
    const dataType =
      typeof type === "function" ? (new DataType(type, []) as any) : type;

    data.args[0][propName] = options.optional
      ? new DataType(Type.Optional, [dataType])
      : dataType;
  });
}

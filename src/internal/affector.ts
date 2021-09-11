// import { TObject, TProperties } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { DataType } from "./DataType";
import { effectKey } from "./keys";

export type Effect = (
  data: DataType<typeof Type.Object>,
  metadata: {
    target: Object;
    targetConstructor: Function;
    propKey: string | symbol;
    propName: string;
  }
) => void;

export const affector =
  (func: Effect): PropertyDecorator =>
  (target, propKey) => {
    const targetConstructor = target.constructor;
    Reflect.defineMetadata(
      effectKey,
      [
        ...(Reflect.getMetadata(effectKey, targetConstructor) || []),
        (data: any) =>
          func(data, {
            target,
            targetConstructor,
            propKey,
            propName: String(propKey),
          }),
      ],
      targetConstructor
    );
  };

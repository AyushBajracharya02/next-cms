export type Nullable<T> = { [K in keyof T]: T[K] | null };
export type ServerResponse<T> = (
    | {
          status: 200;
      }
    | { status: 500 }
    | {
          status: 400;
          errors: {
              [k in keyof T]?: string[];
          };
      }
    | { status: 409 }
) & { message: string };

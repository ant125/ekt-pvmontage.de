export type ProjectFormState =
  | { error?: string; fieldErrors?: Record<string, string> }
  | undefined;

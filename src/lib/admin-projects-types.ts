export type ProjectFormState =
  | { error?: string; fieldErrors?: Record<string, string> }
  | undefined;

export type UploadActionState =
  | { ok?: boolean; error?: string }
  | undefined;

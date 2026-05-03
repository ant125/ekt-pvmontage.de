import "server-only";

import { randomUUID } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const PROJECTS_BUCKET = "projects";

export type UploadKind = "cover" | "gallery";

export const ALLOWED_UPLOAD_MIME = new Set<string>([
  "image/webp",
  "image/jpeg",
  "image/png",
]);

export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

type UploadParams = {
  slug: string;
  file: File;
  kind: UploadKind;
};

export async function uploadProjectImage({
  slug,
  file,
  kind,
}: UploadParams): Promise<string> {
  const supabase = getSupabaseAdmin();

  const path = `${slug}/${kind}/${randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(PROJECTS_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type || "image/webp",
    });

  if (uploadError) {
    throw new Error(`Storage upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(PROJECTS_BUCKET).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error("Storage upload succeeded but public URL is empty.");
  }

  return data.publicUrl;
}

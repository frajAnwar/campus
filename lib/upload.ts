import { supabase } from "./supabase";

type Bucket =
  | "avatars"
  | "banners"
  | "assignments"
  | "resources"
  | "projects"
  | "events"
  | "messages";

const BUCKET_CONFIG: Record<
  Bucket,
  { maxSizeMB: number; allowedTypes: string[] }
> = {
  avatars: {
    maxSizeMB: 2,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  banners: {
    maxSizeMB: 5,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  assignments: { maxSizeMB: 10, allowedTypes: ["*"] },
  resources: { maxSizeMB: 25, allowedTypes: ["*"] },
  projects: {
    maxSizeMB: 5,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  events: {
    maxSizeMB: 5,
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  messages: { maxSizeMB: 10, allowedTypes: ["*"] },
};

export async function uploadFile(
  bucket: Bucket,
  file: File,
  userId: string
): Promise<{ url: string } | { error: string }> {
  const config = BUCKET_CONFIG[bucket];

  if (file.size > config.maxSizeMB * 1024 * 1024) {
    return { error: `File too large. Max ${config.maxSizeMB}MB.` };
  }

  if (
    config.allowedTypes[0] !== "*" &&
    !config.allowedTypes.includes(file.type)
  ) {
    return { error: `File type ${file.type} not allowed.` };
  }

  const ext = file.name.split(".").pop();
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl };
}

export async function deleteFile(
  bucket: Bucket,
  url: string
): Promise<void> {
  const path = url.split(`${bucket}/`)[1];
  if (path) await supabase.storage.from(bucket).remove([path]);
}

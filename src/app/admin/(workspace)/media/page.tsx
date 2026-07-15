import MediaLibrary from "@/components/admin/MediaLibrary";
import { getMediaAssets } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const { assets, error } = await getMediaAssets();

  return (
    <div className="mx-auto max-w-6xl">
      <p className="admin-kicker">Storage</p>
      <h1 className="admin-title">Media library</h1>
      <p className="admin-subtitle">
        Optimize screenshots, manage accessibility details, and reuse stable public URLs across projects.
      </p>

      {error ? (
        <div className="mt-10 border border-amber-400/30 bg-amber-400/5 p-6 text-sm leading-7 text-amber-100">
          <strong className="block text-white">Media library setup required</strong>
          {error} Run <code>supabase/migrations/20260715_media_library.sql</code> in the Supabase SQL Editor, then refresh this page.
        </div>
      ) : (
        <MediaLibrary initialAssets={assets} />
      )}
    </div>
  );
}

import type { UseCaseVideo } from "@/lib/site-data";

// Renders nothing when a case has no video — callers don't need to branch.
export function UseCaseVideoPlayer({ video, title }: { video?: UseCaseVideo; title: string }) {
  if (!video) return null;

  return (
    <div className="rounded overflow-hidden border border-line bg-bg aspect-video">
      <video
        controls
        preload="none"
        poster={video.poster}
        aria-label={`Video: ${title}`}
        className="w-full h-full"
      >
        <source src={video.src} />
        {video.captionsSrc ? (
          <track kind="captions" src={video.captionsSrc} default />
        ) : null}
      </video>
    </div>
  );
}

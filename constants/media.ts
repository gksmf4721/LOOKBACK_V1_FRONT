//video
export const VIDEO_EXTENSIONS = ['mp4', 'mov', 'webm', 'mkv'] as const;

export type VideoExtension = typeof VIDEO_EXTENSIONS[number];

export function isVideoExtension(ext: string): ext is VideoExtension {
    ext = ext.toLowerCase();
    return VIDEO_EXTENSIONS.includes(ext as VideoExtension);
};

//image
export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'heic', 'heif'] as const;

export type ImageExtension = typeof IMAGE_EXTENSIONS[number];

export const isImageExtension = (ext: string): ext is ImageExtension => {
    ext = ext.toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext as ImageExtension);
}


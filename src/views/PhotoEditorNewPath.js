export const PhotoEditorNewPath = path =>
    path.startsWith("file://")
        ? `${path}?${new Date().getTime()}`
        : `file://${path}?${new Date().getTime()}`;
export interface Media {
  id: string;
  type: "IMAGE" | "VIDEO" | "GIF";
  url: string;
  caption?: string;
}

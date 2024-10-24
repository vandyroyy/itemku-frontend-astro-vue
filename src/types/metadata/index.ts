export interface IPlaceholder {
  id: number,
  name: string,
  image_url: string,
  alt_text: string,
  web_target?: string,
  app_target?: string,
  target: string,
  sequence: number,
  placeholder_category_id: number,
}
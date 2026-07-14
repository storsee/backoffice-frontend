export class TemplateReqModel {
  name: string;
  categoryId: number = null;
  uniqueCode: string;
  tagline: string = '';
  description: string = '';
  price: number = 0;
  isFree: boolean = true;
  thumbnail: string;
  previewUrl: string = '';
  isActive: boolean = true;
  sortOrder: number = 0;
}

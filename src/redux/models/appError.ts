export interface AppError {
  statusCode?: number;
  code?: string;
  details?: Detail;
}

interface Detail {
  codes: any;
}

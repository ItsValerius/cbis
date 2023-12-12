export interface APIResponse {
  statusCode: number;
  headers: Headers;
  body: Body;
}

export interface Body {
  "@odata.context": string;
  responsev2: Responsev2;
}

export interface Responsev2 {
  "@odata.type": OdataType;
  operationStatus: string;
  predictionId: string;
  predictionOutput: PredictionOutput;
}

export type OdataType = "#Microsoft.Dynamics.CRM.expando";

export interface PredictionOutput {
  "@odata.type": OdataType;
  pageCount: number;
  result: Result;
  "readResults@odata.type": SOdataType;
  readResults: ReadResult[];
}

export interface ReadResult {
  "@odata.type": OdataType;
  text: string;
  location: Location;
}

export interface Location {
  "@odata.type": OdataType;
  page: number;
  boundingBox: BoundingBox;
}

export interface BoundingBox {
  "@odata.type": OdataType;
  left: number;
  top: number;
  width: number;
  height: number;
  polygon: Polygon;
}

export interface Polygon {
  "@odata.type": OdataType;
  "coordinates@odata.type": SOdataType;
  coordinates: Coordinate[];
}

export interface Coordinate {
  "@odata.type": OdataType;
  x: number;
  y: number;
}

export type SOdataType = "#Collection(Microsoft.Dynamics.CRM.crmbaseentity)";

export interface Result {
  "@odata.type": OdataType;
  "items@odata.type": SOdataType;
  items: Item[];
  fields: ResultFields;
  context: Context;
}

export interface Context {
  "@odata.type": OdataType;
  startPage: number;
  endPage: number;
  receiptType: ReceiptType;
}

export interface ReceiptType {
  "@odata.type": OdataType;
  type: string;
  confidence: number;
}

export interface ResultFields {
  "@odata.type": OdataType;
  merchantAddress: MerchantAddress;
  merchantPhoneNumber: MerchantAddress;
  total: MerchantAddress;
  merchantName: MerchantAddress;
}

export interface MerchantAddress {
  "@odata.type": OdataType;
  value: string;
  confidence: number;
  location: Location;
}

export interface Item {
  "@odata.type": OdataType;
  fields: ItemFields;
}

export interface ItemFields {
  "@odata.type": OdataType;
  name: MerchantAddress;
  totalPrice: MerchantAddress;
}

export interface Headers {
  "Cache-Control": string;
  Vary: string;
  "x-ms-service-request-id": string;
  "Set-Cookie": string;
  "Strict-Transport-Security": string;
  REQ_ID: string;
  "CRM.ServiceId": string;
  AuthActivityId: string;
  "x-ms-dop-hint": string;
  "x-ms-ratelimit-time-remaining-xrm-requests": string;
  "x-ms-ratelimit-burst-remaining-xrm-requests": string;
  "OData-Version": string;
  "X-Source": string;
  Public: string;
  Date: string;
  Allow: string;
  "Content-Type": string;
  Expires: string;
}

import { z } from "zod";

export const schema = z.object({
  statusCode: z.number(),
  headers: z.object({
    "Cache-Control": z.string(),
    Vary: z.string(),
    "x-ms-service-request-id": z.string(),
    "Set-Cookie": z.string(),
    "Strict-Transport-Security": z.string(),
    REQ_ID: z.string(),
    "CRM.ServiceId": z.string(),
    AuthActivityId: z.string(),
    "x-ms-dop-hint": z.string(),
    "x-ms-ratelimit-time-remaining-xrm-requests": z.string(),
    "x-ms-ratelimit-burst-remaining-xrm-requests": z.string(),
    "OData-Version": z.string(),
    "X-Source": z.string(),
    Public: z.string(),
    Date: z.string(),
    Allow: z.string(),
    "Content-Type": z.string(),
    Expires: z.string(),
  }),
  body: z.object({
    "@odata.context": z.string(),
    responsev2: z.object({
      "@odata.type": z.string(),
      operationStatus: z.string(),
      predictionId: z.string(),
      predictionOutput: z.object({
        "@odata.type": z.string(),
        pageCount: z.number(),
        result: z.object({
          "@odata.type": z.string(),
          "items@odata.type": z.string(),
          items: z.array(
            z.object({
              "@odata.type": z.string(),
              fields: z.object({
                "@odata.type": z.string(),
                name: z.object({
                  "@odata.type": z.string(),
                  value: z.string(),
                  confidence: z.number(),
                  location: z.object({
                    "@odata.type": z.string(),
                    page: z.number(),
                    boundingBox: z.object({
                      "@odata.type": z.string(),
                      left: z.number(),
                      top: z.number(),
                      width: z.number(),
                      height: z.number(),
                      polygon: z.object({
                        "@odata.type": z.string(),
                        "coordinates@odata.type": z.string(),
                        coordinates: z.array(
                          z.object({
                            "@odata.type": z.string(),
                            x: z.number(),
                            y: z.number(),
                          }),
                        ),
                      }),
                    }),
                  }),
                }),
                totalPrice: z.object({
                  "@odata.type": z.string(),
                  value: z.string(),
                  confidence: z.number(),
                  location: z.object({
                    "@odata.type": z.string(),
                    page: z.number(),
                    boundingBox: z.object({
                      "@odata.type": z.string(),
                      left: z.number(),
                      top: z.number(),
                      width: z.number(),
                      height: z.number(),
                      polygon: z.object({
                        "@odata.type": z.string(),
                        "coordinates@odata.type": z.string(),
                        coordinates: z.array(
                          z.object({
                            "@odata.type": z.string(),
                            x: z.number(),
                            y: z.number(),
                          }),
                        ),
                      }),
                    }),
                  }),
                }),
              }),
            }),
          ),
          fields: z.object({
            "@odata.type": z.string(),
            merchantAddress: z.object({
              "@odata.type": z.string(),
              value: z.string(),
              confidence: z.number(),
              location: z.object({
                "@odata.type": z.string(),
                page: z.number(),
                boundingBox: z.object({
                  "@odata.type": z.string(),
                  left: z.number(),
                  top: z.number(),
                  width: z.number(),
                  height: z.number(),
                  polygon: z.object({
                    "@odata.type": z.string(),
                    "coordinates@odata.type": z.string(),
                    coordinates: z.array(
                      z.object({
                        "@odata.type": z.string(),
                        x: z.number(),
                        y: z.number(),
                      }),
                    ),
                  }),
                }),
              }),
            }),
            merchantPhoneNumber: z.object({
              "@odata.type": z.string(),
              value: z.string(),
              confidence: z.number(),
              location: z.object({
                "@odata.type": z.string(),
                page: z.number(),
                boundingBox: z.object({
                  "@odata.type": z.string(),
                  left: z.number(),
                  top: z.number(),
                  width: z.number(),
                  height: z.number(),
                  polygon: z.object({
                    "@odata.type": z.string(),
                    "coordinates@odata.type": z.string(),
                    coordinates: z.array(
                      z.object({
                        "@odata.type": z.string(),
                        x: z.number(),
                        y: z.number(),
                      }),
                    ),
                  }),
                }),
              }),
            }),
            total: z.object({
              "@odata.type": z.string(),
              value: z.string(),
              confidence: z.number(),
              location: z.object({
                "@odata.type": z.string(),
                page: z.number(),
                boundingBox: z.object({
                  "@odata.type": z.string(),
                  left: z.number(),
                  top: z.number(),
                  width: z.number(),
                  height: z.number(),
                  polygon: z.object({
                    "@odata.type": z.string(),
                    "coordinates@odata.type": z.string(),
                    coordinates: z.array(
                      z.object({
                        "@odata.type": z.string(),
                        x: z.number(),
                        y: z.number(),
                      }),
                    ),
                  }),
                }),
              }),
            }),
            merchantName: z.object({
              "@odata.type": z.string(),
              value: z.string(),
              confidence: z.number(),
              location: z.object({
                "@odata.type": z.string(),
                page: z.number(),
                boundingBox: z.object({
                  "@odata.type": z.string(),
                  left: z.number(),
                  top: z.number(),
                  width: z.number(),
                  height: z.number(),
                  polygon: z.object({
                    "@odata.type": z.string(),
                    "coordinates@odata.type": z.string(),
                    coordinates: z.array(
                      z.object({
                        "@odata.type": z.string(),
                        x: z.number(),
                        y: z.number(),
                      }),
                    ),
                  }),
                }),
              }),
            }),
          }),
          context: z.object({
            "@odata.type": z.string(),
            startPage: z.number(),
            endPage: z.number(),
            receiptType: z.object({
              "@odata.type": z.string(),
              type: z.string(),
              confidence: z.number(),
            }),
          }),
        }),
        "readResults@odata.type": z.string(),
        readResults: z.array(
          z.object({
            "@odata.type": z.string(),
            text: z.string(),
            location: z.object({
              "@odata.type": z.string(),
              page: z.number(),
              boundingBox: z.object({
                "@odata.type": z.string(),
                left: z.number(),
                top: z.number(),
                width: z.number(),
                height: z.number(),
                polygon: z.object({
                  "@odata.type": z.string(),
                  "coordinates@odata.type": z.string(),
                  coordinates: z.array(
                    z.object({
                      "@odata.type": z.string(),
                      x: z.number(),
                      y: z.number(),
                    }),
                  ),
                }),
              }),
            }),
          }),
        ),
      }),
    }),
  }),
});

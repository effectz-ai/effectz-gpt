export interface WebhookPayload {
    object: string;
    entry: Array<{
      id: string;
      changes: Array<{
        value: {
          messaging_product: string;
          metadata: {
            display_phone_number: string;
            phone_number_id: string;
          };
          contacts: Array<{
            profile: {
              name: string;
            };
            wa_id: string;
          }>;
          messages: Array<{
            from: string;
            id: string;
            timestamp: string;
            text: {
              body: string;
            };
            type: string;
          }>;
        };
        field: string;
      }>;
    }>;
}

export type templateHeaderParam = {
  type: "image" | "video" | "text";
    image?:{
        link: string;
    }
    text?: string; 
}
export type templateHeaderParams = {
    type: 'header',
    parameters: Array<templateHeaderParam>
}

export type templateBodyParam = {
    type: 'text' | 'currency' | 'date_time';
    text?: string;
    currency?: {
        fallback_value: string;
        code: string;
        amount_1000: number;
    }
    date_time?:{
        fallback_value: string;
    }
}
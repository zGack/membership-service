export class DonationCreatedEvent {
    constructor(
        public readonly donationId: string,
        public readonly userId: string,
        public readonly amount: number,
    ) {}
}

/**
JSON SCHEMA for the DonationCreatedEvent: 
contrato técnico que garantiza que los eventos enviados por un productor y 
recibidos por un consumidor tienen la misma forma y tipos de datos
{
  "title": "DonationCreatedEvent",
  "type": "object",
  "properties": {
    "donationId": { "type": "string" },
    "userId": { "type": "string" },
    "amount": { "type": "number" }
  },
  "required": ["donationId", "userId", "amount"]
}
*/

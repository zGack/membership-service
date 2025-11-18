export class Membership {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly donationId: string,
    ) {}
}

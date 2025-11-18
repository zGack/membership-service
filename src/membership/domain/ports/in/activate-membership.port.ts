export interface ActivateMembershipPortIn {
    activate(donationId: string, userId: string): Promise<void>;
}

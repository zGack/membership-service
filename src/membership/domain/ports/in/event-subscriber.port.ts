export interface EventSubscriberPort<T> {
    handle(event: T): Promise<void>;
}

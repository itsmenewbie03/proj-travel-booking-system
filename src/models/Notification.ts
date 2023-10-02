interface Notification {
    notification_id: string;
    traveler_id: string;
    notification_type: string;
    content: string;
    timestamp: string;
    status: string;
}

export type { Notification };

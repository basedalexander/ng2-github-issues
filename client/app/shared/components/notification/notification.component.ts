import { Component, Input } from '@angular/core';

export type NotificationType = 'success' | 'warning' | 'error';

export interface INotification {
    type: NotificationType;
    message: string;
}

export class Notification implements INotification {
    constructor(public type: NotificationType,
                public message: string) {
    }
}

@Component({
    selector: 'notification',
    template: `
    <div *ngIf="active"
        class="notification-box notification-{{_notification?.type}}">
         {{_notification?.message}}
    </div>
    `,
    styleUrls: [
        'app/shared/components/notification/notification.component.css'
    ]
})
export class NotificationComponent {

    @Input() set notification(value: INotification) {
        if (value) {
			if (this.active) {
				this.close();
			}

			this.open(value);
        }
		else {
			return;
		}
    }

    protected _notification: INotification;

    private active: boolean = false;
    private timeoutId: number;
    private time: number = 6000;

    private open(notif: INotification): void {
        this._notification = notif;

        this.toggle();

        this.timeoutId = setTimeout(
            () => {
                this.toggle();
            },
            this.time
        );
    };

    private close(): void {
        clearTimeout(this.timeoutId);
        this.toggle();
    }

    private toggle(): void {
        this.active = !this.active;
    }
}

import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
    log(...args): void {
        console.log.apply(null, args);
    }

    info(...args): void {
        console.info.apply(null, args);
    }

    error(...args): void {
        console.error.apply(null, args);
    }
}
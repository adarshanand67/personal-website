"use client";

import { useState, useEffect } from 'react';
import { Clock, Wifi, Battery, BatteryLow, BatteryMedium, BatteryFull } from 'lucide-react';

export function SystemStatus() {
    const [time, setTime] = useState<string>('');
    const [uptime, setUptime] = useState<number>(0);
    const [isOnline, setIsOnline] = useState<boolean>(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const startTime = Date.now();
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
            setUptime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const formatUptime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full bg-gray-100/30 dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-700/30 font-mono text-[10px] text-gray-500 dark:text-gray-400 select-none">
            <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                <span className="flex items-center gap-1">
                    {isOnline ? "ONLINE" : "OFFLINE"}
                    <Wifi size={8} className={isOnline ? "text-green-500" : "text-red-500"} />
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Clock size={10} />
                <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
                <span>UPTIME: {formatUptime(uptime)}</span>
            </div>
        </div>
    );
}

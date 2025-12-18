"use client";

import { useState, useEffect } from 'react';
import { Clock, Wifi, Battery, BatteryLow, BatteryMedium, BatteryFull } from 'lucide-react';

export function SystemStatus() {
    const [time, setTime] = useState<string>('');
    const [uptime, setUptime] = useState<number>(0);
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((bat: any) => {
                const updateBattery = () => setBattery({ level: bat.level, charging: bat.charging });
                updateBattery();
                bat.addEventListener('levelchange', updateBattery);
                bat.addEventListener('chargingchange', updateBattery);
            });
        }

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

    const getBatteryIcon = () => {
        if (!battery) return <Battery size={10} />;
        if (battery.level > 0.8) return <BatteryFull size={10} className={battery.charging ? "text-green-500" : ""} />;
        if (battery.level > 0.3) return <BatteryMedium size={10} className={battery.charging ? "text-green-500" : ""} />;
        return <BatteryLow size={10} className="text-red-500 animate-pulse" />;
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
            {battery && (
                <div className="flex items-center gap-2">
                    {getBatteryIcon()}
                    <span>{Math.round(battery.level * 100)}%</span>
                </div>
            )}
            <div className="flex items-center gap-2">
                <span>UPTIME: {formatUptime(uptime)}</span>
            </div>
        </div>
    );
}

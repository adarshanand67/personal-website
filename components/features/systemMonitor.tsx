"use client";

import React, { useState, useEffect } from 'react';
import { X, Cpu, Server, Activity, Database, Terminal, Wifi } from 'lucide-react';
import { useStore } from '@/lib/store/useStore';

export function SystemMonitor() {
    const { isMatrixEnabled } = useStore();
    const [cpuLoad, setCpuLoad] = useState<number[]>([0]);
    const [memoryLoad, setMemoryLoad] = useState<number>(0);
    const [tasks, setTasks] = useState<number>(0);
    const [uptime, setUptime] = useState<number>(0);

    // Simulated Processes
    const processes = [
        { pid: 101, user: 'root', cpu: 0.5, mem: 1.2, time: '00:01:23', command: 'kernel_task' },
        { pid: 142, user: 'guest', cpu: 12.4, mem: 4.5, time: '00:00:45', command: 'chrome_helper' },
        { pid: 289, user: 'guest', cpu: 5.6, mem: 2.1, time: '00:00:12', command: 'music_daemon' },
        { pid: 310, user: 'guest', cpu: 22.1, mem: 8.9, time: '00:00:30', command: 'matrix_rain.sh' },
        { pid: 445, user: 'guest', cpu: 1.2, mem: 0.5, time: '00:00:05', command: 'zsh' },
        { pid: 512, user: 'root', cpu: 0.1, mem: 0.1, time: '00:03:10', command: 'init' },
        { pid: 667, user: 'guest', cpu: 0.8, mem: 1.1, time: '00:00:02', command: 'visualizer' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Update CPU simulated load graph
            setCpuLoad(prev => {
                const newValue = Math.floor(Math.random() * 60) + 10 + (isMatrixEnabled ? 20 : 0);
                const newHistory = [...prev, newValue].slice(-30); // Keep last 30 points
                return newHistory;
            });

            // Fluctuate memory and tasks
            setMemoryLoad(Math.floor(Math.random() * 10) + 40);
            setTasks(Math.floor(Math.random() * 5) + 140);
            setUptime(prev => prev + 1);

        }, 1000);

        return () => clearInterval(interval);
    }, [isMatrixEnabled]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in font-mono">
            <div
                className="absolute inset-0 z-0"
                onClick={() => useStore.getState().toggleSystemMonitor()}
            />
            <div className="relative z-10 w-full max-w-4xl bg-black border border-green-800 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.15)] overflow-hidden flex flex-col h-[600px]">

                {/* Header */}
                <div className="bg-green-900/20 px-4 py-2 border-b border-green-900 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-green-500" />
                        <span className="text-sm font-bold text-gray-300">htop - {process.env.NODE_ENV || 'production'}</span>
                    </div>
                    <div className="text-xs text-green-600">
                        Uptime: <span className="text-white">{formatTime(uptime)}</span>
                    </div>
                    <button
                        onClick={() => useStore.getState().toggleSystemMonitor()}
                        className="text-green-700 hover:text-green-500 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow overflow-hidden">

                    {/* Left Col: Gauges */}
                    <div className="space-y-6">

                        {/* CPU */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Cpu size={14} /> CPU Usage</span>
                                <span>{cpuLoad[cpuLoad.length - 1]}%</span>
                            </div>
                            <div className="h-24 bg-green-950/30 border border-green-900/50 rounded flex items-end justify-between px-1 pb-1 gap-0.5">
                                {cpuLoad.map((val, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${val}%` }}
                                        className="w-full bg-green-500/70 hover:bg-green-400 transition-all"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Memory */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Database size={14} /> Mem Usage</span>
                                <span>{memoryLoad} / 128 MB</span>
                            </div>
                            <div className="h-4 bg-gray-800 rounded overflow-hidden">
                                <div
                                    style={{ width: `${(memoryLoad / 128) * 100}%` }}
                                    className="h-full bg-yellow-500/80 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Swap */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Activity size={14} /> Swp Usage</span>
                                <span>0 / 512 MB</span>
                            </div>
                            <div className="h-4 bg-gray-800 rounded overflow-hidden">
                                <div
                                    style={{ width: `2%` }}
                                    className="h-full bg-red-500/80 transition-all duration-500"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Right Col: Process List */}
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="flex justify-between text-xs font-bold text-black bg-green-500 px-2 py-1 mb-2 rounded">
                            <span className="w-12">PID</span>
                            <span className="w-16">USER</span>
                            <span className="w-12">CPU%</span>
                            <span className="w-12">MEM%</span>
                            <span className="flex-1">COMMAND</span>
                        </div>
                        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-transparent flex-grow font-mono text-xs space-y-1">
                            {processes.map((proc, i) => (
                                <div key={i} className="flex justify-between px-2 py-1 hover:bg-green-900/30 text-gray-300">
                                    <span className="w-12 text-green-400">{proc.pid}</span>
                                    <span className="w-16">{proc.user}</span>
                                    <span className="w-12">{proc.cpu}</span>
                                    <span className="w-12">{proc.mem}</span>
                                    <span className="flex-1 text-white">{proc.command}</span>
                                </div>
                            ))}
                            {/* Fill empty space */}
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div key={`empty-${i}`} className="flex justify-between px-2 py-1 text-gray-800 pointer-events-none">
                                    <span className="w-12">~</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Keys */}
                <div className="bg-black border-t border-green-900/50 px-4 py-2 flex gap-4 text-xs font-bold">
                    <span className="bg-green-700 text-black px-1 rounded">F1 Help</span>
                    <span className="bg-green-700 text-black px-1 rounded">F2 Setup</span>
                    <span className="bg-green-700 text-black px-1 rounded">F10 Quit</span>
                </div>
            </div>
            {/* Hidden Close Overlay for click-out */}
            <div className="absolute inset-0 -z-10" />
        </div>
    );
}

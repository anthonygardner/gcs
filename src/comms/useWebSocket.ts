import { useState, useEffect, useRef } from 'react';

export function useWebSocket<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [connected, setConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (ws.current) return;

        ws.current = new WebSocket(url);
        ws.current.onopen = () => setConnected(true);
        ws.current.onclose = () => {
            setConnected(false);
            ws.current = null;
        };
        ws.current.onmessage = (event) => {
            const tsClient = performance.now();
            const parsed = JSON.parse(event.data);
            console.log({
                stm32: parsed.ts_stm32,
                gateway: parsed.ts_gw,
                client: tsClient
            });

            setData(parsed);
        };

        return () => {
            ws.current?.close();
            ws.current = null;
        };
    }, [url]);

    return { data, connected };
}
import { useWebSocket } from "../comms/useWebSocket";
import type { IMUData } from "./types";

export function useIMU(url: string) {
    return useWebSocket<IMUData>(url);
}
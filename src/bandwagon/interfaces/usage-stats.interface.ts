export interface UsageStatsItem {
  timestamp: string
  network_in_bytes: string
  network_out_bytes: string
  disk_read_bytes: string
  disk_write_bytes: string
  cpu_usage: string
}

export interface UsageStats {
  data: UsageStatsItem[]
}

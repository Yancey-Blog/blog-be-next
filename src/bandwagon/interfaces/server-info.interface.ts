export interface ServerInfo {
  vm_type: string
  ve_status: string
  ve_mac1: string
  ve_used_disk_space_b: string
  ve_disk_quota_gb: string
  is_cpu_throttled: string
  ssh_port: number
  live_hostname: string
  load_average: string
  mem_available_kb: number
  swap_total_kb: number
  swap_available_kb: number
  hostname: string
  node_ip: string
  node_alias: string
  node_location: string
  node_location_id: string
  node_datacenter: string
  location_ipv6_ready: boolean
  plan: string
  plan_monthly_data: number
  monthly_data_multiplier: number
  plan_disk: number
  plan_ram: number
  plan_swap: number
  plan_max_ipv6s: number
  os: string
  email: string
  data_counter: number
  data_next_reset: number
  ip_addresses: string[]
  private_ip_addresses: string[]
  ip_nullroutes: string[]
  iso1: string | null
  iso2: string | null
  available_isos: string[]
  plan_private_network_available: boolean
  location_private_network_available: boolean
  rdns_api_available: boolean
  ptr: { [index: string]: string | null }
  suspended: boolean
  policy_violation: boolean
  suspension_count: number | null
  total_abuse_points: number
  max_abuse_points: number
  error: number
  veid: number
}

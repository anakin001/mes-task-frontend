export interface machineType {
  name: string
  status: string
  utilization_percentage: string
}

export enum MachineStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  MAINTENANCE = 'maintenance',
}

export enum ProductionOrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export interface Product {
  name: string
  description: string
}

export enum ProductionLogStatus {
  STARTED = 'started',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export interface ProductionOrder {
  id: string
  product: Product
  quantity: number
  status: ProductionOrderStatus
  scheduled_start: Date
  scheduled_end: Date
  actual_start: Date
  actual_end: Date
}

export interface ProductionLog {
  id: string
  production_order: ProductionOrder
  machine: machineType
  status: ProductionLogStatus
}

export interface QualityInspection {
  id: string
  production_order: ProductionOrder
  inspected_at: Date
  defects_found: number
  notes: string
}

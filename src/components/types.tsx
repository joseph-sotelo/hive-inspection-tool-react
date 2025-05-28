export type FormData = {
  client: string,
  F_status: string,
  fieldmap_id_primary: string,
  partdeliv_yn: string,
  hives_contracted: number | string,
  beekeeper: string,
  bee_broker: string,
  average: number | string,
  minimum: number | string,
  grower: string,
  fieldmap_id_auxiliary: string,
  crossroads: string,
  team_leader: string,
  assistants: string[]
}

export type MobileSheetProps = FormData & {
  onMarkComplete: (formData: FormData) => void
}

export type HiveDropDialogProps = {
  object_id: string,
  record_id: string,
  count: number, 
  grades: number[],
  notes: string,  
  index: number
}
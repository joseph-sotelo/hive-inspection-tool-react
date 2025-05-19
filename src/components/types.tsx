export type FormData = {
  client: string,
  F_status: string,
  fieldmap_id_primary: string,
  hives_contracted: number | string,
  partdeliv_yn: string,
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

export type MobileSheetProps = {
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
  assistants: string[],
  onMarkComplete: (formData: FormData) => void
}
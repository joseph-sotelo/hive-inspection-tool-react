export type FormData = {
  client: string,
  F_status: string,
  fieldmap_id_primary: string,
  hives_contracted: number
  partdeliv_yn: string
}

export type MobileSheetProps = {
  client: string,
  F_status: string,
  fieldmap_id_primary: string,
  partdeliv_yn: string,
  hives_contracted: number
  onMarkComplete: (formData: FormData) => void
}
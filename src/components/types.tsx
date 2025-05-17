export type FormData = {
  client: string,
  F_status: string,
  fieldmap_id_primary: string
}

export type MobileSheetProps = {
  client: string,
  F_status: string,
  fieldmap_id_primary: string,
  onMarkComplete: (formData: FormData) => void
}
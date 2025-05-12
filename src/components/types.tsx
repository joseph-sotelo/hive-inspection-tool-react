export type FormData = {
  F_title: string,
  F_status: string,
  fieldmap_id_primary: string
}

export type MobileSheetProps = {
  F_title: string,
  F_status: string,
  fieldmap_id_primary: string,
  onMarkComplete: (formData: FormData) => void
}
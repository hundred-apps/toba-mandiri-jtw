/**
 * Tipe bersama untuk form dan tabel admin.
 *
 * Setiap halaman fitur mendefinisikan kolom dan field-nya sendiri di file
 * halaman, lalu meneruskannya ke komponen bersama AdminResourceList dan
 * AdminResourceForm.
 */

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'html'
  | 'number'
  | 'toggle'
  | 'select'
  | 'icon'
  | 'image'
  | 'slug'
  | 'repeater'
  | 'pair'
  | 'date'
  | 'password'
  | 'tags'
  | 'gallery'

export interface FieldOption {
  value: string
  label: string
}

export interface FieldDef {
  name: string
  label: string
  kind: FieldKind
  /** Field dua bahasa: nilai disimpan sebagai { id, en }. */
  bilingual?: boolean
  required?: boolean
  help?: string
  placeholder?: { id?: string; en?: string }
  /** Untuk field select: sumber data dari endpoint lain. */
  optionsFrom?: { resource: string; labelKey: string; valueKey: string }
  /** Untuk field select: opsi statis inline. */
  options?: FieldOption[]
  rows?: number
  min?: number
  max?: number
  step?: number
}

export interface ColumnDef {
  key: string
  label: string
  kind?: 'text' | 'image' | 'toggle' | 'status' | 'number' | 'bilingual' | 'date'
  width?: string
}

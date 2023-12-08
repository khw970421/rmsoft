export interface ISavedNotebooks {
  [key: string]: IMemos[]
}

export interface IMemos {
  title?: string, content?: string
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          author: string
          description: string | null
          end_time: string | null
          id: number
          start_time: string | null
          summary: string | null
        }
        Insert: {
          author?: string
          description?: string | null
          end_time?: string | null
          id?: number
          start_time?: string | null
          summary?: string | null
        }
        Update: {
          author?: string
          description?: string | null
          end_time?: string | null
          id?: number
          start_time?: string | null
          summary?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      alarm: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          isRead: boolean | null;
          post_id: string | null;
          target_user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          isRead?: boolean | null;
          post_id?: string | null;
          target_user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          isRead?: boolean | null;
          post_id?: string | null;
          target_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_alarm_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          }
        ];
      };
      club_activities: {
        Row: {
          club_id: string | null;
          id: string;
          progress: number | null;
          time: number | null;
          user_id: string;
        };
        Insert: {
          club_id?: string | null;
          id?: string;
          progress?: number | null;
          time?: number | null;
          user_id: string;
        };
        Update: {
          club_id?: string | null;
          id?: string;
          progress?: number | null;
          time?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_club_activities_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['id'];
          }
        ];
      };
      club_like: {
        Row: {
          club_id: string | null;
          id: string;
          user_id: string;
        };
        Insert: {
          club_id?: string | null;
          id?: string;
          user_id?: string;
        };
        Update: {
          club_id?: string | null;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_club_like_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['id'];
          }
        ];
      };
      clubs: {
        Row: {
          archive: boolean | null;
          book_author: string | null;
          book_category: string | null;
          book_cover: string | null;
          book_id: string | null;
          book_page: number | null;
          book_title: string | null;
          created_at: string;
          description: string | null;
          id: string;
          max_member_count: number | null;
          name: string | null;
          thumbnail: string | null;
        };
        Insert: {
          archive?: boolean | null;
          book_author?: string | null;
          book_category?: string | null;
          book_cover?: string | null;
          book_id?: string | null;
          book_page?: number | null;
          book_title?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          max_member_count?: number | null;
          name?: string | null;
          thumbnail?: string | null;
        };
        Update: {
          archive?: boolean | null;
          book_author?: string | null;
          book_category?: string | null;
          book_cover?: string | null;
          book_id?: string | null;
          book_page?: number | null;
          book_title?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          max_member_count?: number | null;
          name?: string | null;
          thumbnail?: string | null;
        };
        Relationships: [];
      };
      members: {
        Row: {
          club_id: string;
          id: string;
          role: Database['public']['Enums']['member_role'] | null;
          user_id: string | null;
        };
        Insert: {
          club_id: string;
          id?: string;
          role?: Database['public']['Enums']['member_role'] | null;
          user_id?: string | null;
        };
        Update: {
          club_id?: string;
          id?: string;
          role?: Database['public']['Enums']['member_role'] | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_members_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      messages: {
        Row: {
          club_id: string;
          created_at: string;
          id: string;
          is_edit: boolean;
          send_from: string;
          text: string;
        };
        Insert: {
          club_id: string;
          created_at?: string;
          id?: string;
          is_edit?: boolean;
          send_from: string;
          text: string;
        };
        Update: {
          club_id?: string;
          created_at?: string;
          id?: string;
          is_edit?: boolean;
          send_from?: string;
          text?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_messages_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_messages_send_from_fkey';
            columns: ['send_from'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      post: {
        Row: {
          club_id: string | null;
          created_at: string;
          id: string;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          club_id?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          club_id?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_post_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_post_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      post_comments: {
        Row: {
          content: string | null;
          created_at: string | null;
          id: string;
          post_id: string | null;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_post_comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_post_comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      posts: {
        Row: {
          club_id: string | null;
          content: string | null;
          created_at: string;
          id: string;
          thumbnail: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          club_id?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          thumbnail?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          club_id?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          thumbnail?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_posts_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          display_name: string | null;
          email: string | null;
          id: string;
          interests: string | null;
          introduction: string | null;
          most_favorite_book: string | null;
          photo_URL: string | null;
        };
        Insert: {
          display_name?: string | null;
          email?: string | null;
          id?: string;
          interests?: string | null;
          introduction?: string | null;
          most_favorite_book?: string | null;
          photo_URL?: string | null;
        };
        Update: {
          display_name?: string | null;
          email?: string | null;
          id?: string;
          interests?: string | null;
          introduction?: string | null;
          most_favorite_book?: string | null;
          photo_URL?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      quiz: {
        Row: {
          club_id: string | null;
          created_at: string | null;
          creator_id: string;
          id: string;
          schema: Json | null;
          title: string | null;
        };
        Insert: {
          club_id?: string | null;
          created_at?: string | null;
          creator_id?: string;
          id?: string;
          schema?: Json | null;
          title?: string | null;
        };
        Update: {
          club_id?: string | null;
          created_at?: string | null;
          creator_id?: string;
          id?: string;
          schema?: Json | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_quiz_creator_id_fkey';
            columns: ['creator_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      sentence_comments: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          sentence_id: string;
          user_id: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          sentence_id?: string;
          user_id?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          sentence_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_sentence_comments_sentence_id_fkey';
            columns: ['sentence_id'];
            isOneToOne: false;
            referencedRelation: 'sentences';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_sentence_comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      sentences: {
        Row: {
          club_id: string;
          created_at: string;
          id: string;
          sentence_content: string | null;
          sentence_page: number | null;
          user_id: string | null;
        };
        Insert: {
          club_id: string;
          created_at?: string;
          id?: string;
          sentence_content?: string | null;
          sentence_page?: number | null;
          user_id?: string | null;
        };
        Update: {
          club_id?: string;
          created_at?: string;
          id?: string;
          sentence_content?: string | null;
          sentence_page?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_sentences_club_id_fkey';
            columns: ['club_id'];
            isOneToOne: false;
            referencedRelation: 'clubs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_sentences_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      member_role: 'admin' | 'member';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

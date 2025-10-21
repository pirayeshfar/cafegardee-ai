
export type Language = 'en' | 'fa';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  type?: 'text' | 'loading' | 'error';
}

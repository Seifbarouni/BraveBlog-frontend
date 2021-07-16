export interface PostWithBg {
  id: number;
  title: string;
  content: string;
  user: string;
  bgUrl: string;
  createdAt: string;
  likes: number;
}

export interface LocationState {
  userUrl: string;
  minRead: number;
}

export interface Comment {
  user: string;
  comment: string;
}

export interface RoomData {
  userId: string;
  username: string;
}

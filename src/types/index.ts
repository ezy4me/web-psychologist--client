interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
  profile?: Profile;
  psychologist?: Psychologist;
  userTest: UserTest[];
  chat: Chat[];
  message: Message[];
  token: Token[];
}

interface Role {
  id: number;
  name: string;
  users: User[];
}

interface Token {
  token: string;
  exp: Date;
  user: User;
  userAgent: string;
}

interface Profile {
  id: number;
  name: string;
  phone: string;
  gender: string;
  birthday: string;
  description: string;
  image: string;
  userId: number;
  user: User;
}

interface Psychologist {
  id: number;
  education: string;
  qualification: string;
  experience: string;
  userId: number;
  user: User;
  article: Article[];
  psychologistFiles: PsychologistFiles[];
  test: Test[];
  chat: Chat[];
}

interface PsychologistFiles {
  id: number;
  fileName: string;
  description: string;
  psychologistId: number;
  psychologist: Psychologist;
}

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  isApproved: boolean;
  createdAt: Date;
  image: string;
  psychologistId: number;
  psychologist: {
    user: {
      profile: {
        name: string;
        image: string;
      };
    };
  };
}
export interface CreateArticle {
  title: string;
  subtitle: string;
  description: string;
  isApproved: boolean;
  createdAt: Date;
  image: string;
  psychologistId?: number;
  userId?: number;
}

export interface UpdateArticle {
  title?: string;
  subtitle?: string;
  description?: string;
  isApproved?: boolean;
  createdAt?: Date;
  image?: string;
  psychologistId?: number;
  userId?: number;
}

export interface Answer {
  id: number;
  text: string;
  score: number;
  questionId: number;
}

export interface Question {
  id: number;
  text: string;
  Answer: Answer[];
}

export interface TestQuestion {
  id: number;
  testId: number;
  test: {
    title: string;
  };
  questionId: number;
  question: Question;
}

export interface Test {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  isApproved: boolean;
  createdAt: Date;
  image: string;
  psychologistId: number;
  psychologist: {
    user: {
      profile: {
        name: string;
        image: string;
      };
    };
  };
}

interface Result {
  id: number;
  text: string;
  minScore: number;
  maxScore: number;
  testId: number;
  test: Test;
  userTest: UserTest[];
}

interface UserTest {
  id: number;
  userId: number;
  user: User;
  testId: number;
  test: Test;
  resultId: number;
  result: Result;
}

interface Chat {
  id: number;
  psychologistId: number;
  psychologist: Psychologist;
  userId: number;
  user: User;
  status: string;
  message: Message[];
}

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  chatId: number;
  chat: Chat;
  senderId: number;
  sender: User;
}

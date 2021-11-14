import { v4 as uuidV4 } from 'uuid';

class Category {
  id?: string;

  name: string;

  description: string;

  created_at: Date;

  // A responsabilidade de criar o Id passa a ser da classe
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };

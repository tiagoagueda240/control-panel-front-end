export class RequestClassroom{
    public id!: number;
    public requestStartDate!: Date;
    public requestFinishDate!: Date;
    public type!: string;
    public haveEquipment!: Boolean;
    public description!: string;
    public author!: Author;
    public status!: string;
}

class Author{
  public name!: string;
  public email!: string;
}

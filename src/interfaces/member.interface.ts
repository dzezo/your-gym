export interface IMember {
  id: string;
  name: string;
  start: Date;
  left: number;
  debt: number;
}

export interface IMemberDetails {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  memberships: IMembership[];
  totalDebt: number;
}

export interface IMembership {
  _id: string;
  mName: string;
  start: Date;
  end: Date;
  length: number;
  daysLeft: number;
  cost: number;
  debt: number;
  log: {
    _id: string;
    amount: number;
    date: Date;
  }[];
}

export const defaultMember = {
  _id: "",
  userId: "",
  name: "Pending",
  email: "Pending",
  phone: "Pending",
  memberships: [],
  totalDebt: 0,
};

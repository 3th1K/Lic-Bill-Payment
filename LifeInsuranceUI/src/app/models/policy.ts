import { PolicyType } from "./policy-type";
export class Policy {
    Id: number;
    Name: string;
    Description: string;
    Cost: number;
    PolicyType: PolicyType;
    PolicyTypeId: number;
}

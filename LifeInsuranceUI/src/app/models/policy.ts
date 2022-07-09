import { PolicyType } from "./policy-type";
export interface Policy {
    Id: number;
    Name: string;
    Description: string;
    Cost: number;
    PolicyType: PolicyType;
    PolicyTypeId: number;
}

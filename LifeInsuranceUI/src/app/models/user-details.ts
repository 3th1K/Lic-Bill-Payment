import { Address } from "./address";
import { Policy } from "./policy";
export interface UserDetails {
    Id: number;
    DateOfBirth: string;
    MartialStatus: boolean;
    Occupation: string;
    Salary: number;
    AadharNumber: number;
    PanNumber: string;
    Address: Address;
    Policy: Policy;
    AddressId: number;
    PolicyId: number;
}

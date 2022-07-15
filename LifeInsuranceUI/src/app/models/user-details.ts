import { Policy } from "./policy";
import { User } from "./user";
export class UserDetails {
    Id: number;
    DateOfBirth: string;
    MartialStatus: string;
    Occupation: string;
    Salary: string;
    AadharNumber: string;
    PanNumber: string;
    StreetAddressLine1: string;
    StreetAddressLine2: string;
    City: string;
    State: string;
    ZipCode: string;
    TenureOfPolicy: number;
    Policy: Policy;
    PolicyId: number;
    User: User;
    UserId: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User" | "Guest";
    status: "Active" | "Inactive"
}
export interface hashRepository {
    hash(password: string): Promise<string>
}
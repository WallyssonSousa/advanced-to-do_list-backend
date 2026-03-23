export interface TokenProviderPort {
  generate(payload: any): string;
}
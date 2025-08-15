import { turso } from "../db/connection.ts";

export async function queryOne<T>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const result = await turso.execute(sql, params);
  return (result.rows[0] as T) ?? null;
}
